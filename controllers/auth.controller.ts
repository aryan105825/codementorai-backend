import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  }  catch (err: any) {
  console.error("🔥 Registration error:", err);
  res.status(500).json({ error: 'Registration failed' });
}

};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await comparePasswords(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
