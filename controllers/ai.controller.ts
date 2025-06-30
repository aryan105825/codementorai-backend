import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import prisma from '../config/prisma'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!
const MODEL = 'mistralai/mistral-7b-instruct' 

export const aiAssistHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { prompt, language = 'JavaScript', code = '', error = '' } = req.body

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' })
    return
  }

  const fullPrompt = `You are a helpful code assistant.\nLanguage: ${language}\nPrompt: ${prompt}\nCode:\n${code}\nError:\n${error}`

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', 
          'X-Title': 'CodeMentor AI' 
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: 'You are a helpful coding assistant.' },
            { role: 'user', content: fullPrompt }
          ]
        })
      }
    )

    const result = await response.json()
    const reply = result?.choices?.[0]?.message?.content

    if (!reply) throw new Error('No output')
    await prisma.sessionLog.create({
      data: {
        userId: req.userId!,
        type: 'ai',
        prompt: prompt,
        language: language,
        success: true
      }
    })
    res.json({ response: reply })
  } catch (err: any) {
    console.error('🔥 OpenRouter ERROR:', err.message || err)
    await prisma.sessionLog.create({
      data: {
        userId: req.userId!,
        type: 'ai',
        prompt: prompt,
        language: language,
        success: false
      }
    })
    res.status(500).json({ error: 'OpenRouter AI failed to respond' })
  }
}
