import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import prisma from '../config/prisma';

export const getAnalyticsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const logs = await prisma.sessionLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  const totalSessions = logs.length;
  const aiLogs = logs.filter(l => l.type === 'ai');
  const execLogs = logs.filter(l => l.type === 'execution');

  const languageCount = logs.reduce((acc: Record<string, number>, log) => {
    acc[log.language] = (acc[log.language] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalSessions,
    aiPromptCount: aiLogs.length,
    executionCount: execLogs.length,
    languageCount,
    recent: logs.slice(0, 10)
  });
};
