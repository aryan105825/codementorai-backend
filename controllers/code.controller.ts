import axios from 'axios'
import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import prisma from '../config/prisma'

export const executeCode = async (req: AuthenticatedRequest, res: Response) => {
  const { code, languageId } = req.body

  try {
    const submission = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: code,
        language_id: languageId || 63 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    )
    await prisma.sessionLog.create({
      data: {
        userId: req.userId!,
        type: 'execution',
        language: 'JavaScript', 
        success: !submission.data.stderr
      }
    })
    res.status(200).json(submission.data)
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: 'Code execution failed' })
  }
}
