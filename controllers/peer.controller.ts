import prisma from '../config/prisma'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { Response } from 'express'
import { RequestHandler } from 'express';

export const sendPeerRequest = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const fromId = req.userId!
  const { toEmail } = req.body

  const toUser = await prisma.user.findUnique({ where: { email: toEmail } })
  if (!toUser) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const existing = await prisma.peerRequest.findFirst({
    where: {
      fromId,
      toId: toUser.id,
      status: 'pending'
    }
  })
  if (existing) {
    res.status(400).json({ error: 'Request already sent' })
    return
  }

  const request = await prisma.peerRequest.create({
    data: { fromId, toId: toUser.id }
  })

  res.json({ message: 'Request sent', request }) // ✅ No return
}

export const acceptPeerRequest = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { requestId } = req.body
  const userId = req.userId!

  const request = await prisma.peerRequest.findUnique({ where: { id: requestId } })

  if (!request) {
    res.status(404).json({ message: 'Request not found' })
    return
  }

  if (request.toId !== userId) {
    res.status(403).json({ message: 'Unauthorized' })
    return
  }

  await prisma.peerRequest.update({
    where: { id: requestId },
    data: { status: 'accepted' }
  })

  const roomId = `${request.fromId}_${request.toId}`

  if (req.app.get('io')) {
    const io = req.app.get('io') as any
    io.to(request.fromId).emit('peer-accepted', { roomId })
    console.log(`📡 Notified ${request.fromId} -> peer-accepted: ${roomId}`)
  }

  res.json({ message: 'Request accepted', roomId })
  return
}

export const getMyPeerRequests = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId!
  console.log("Fetching peer requests for user:", userId);
  try {
    const requests = await prisma.peerRequest.findMany({
      where: { toId: userId, status: 'pending' },
      include: { fromUser: true }
    })

    res.json(requests)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch peer requests' })
  }
}
export const checkPeerStatus: RequestHandler = async (req, res) => {
  const fromId = req.params.userId;

  const acceptedRequest = await prisma.peerRequest.findFirst({
    where: {
      fromId,
      status: 'accepted'
    }
  });

  if (!acceptedRequest) {
    res.json({ accepted: false });
    return;
  }

  const roomId = `${acceptedRequest.fromId}_${acceptedRequest.toId}`;
  res.json({ accepted: true, roomId });
};

export const getMyPeers = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId!;

  const anyAccepted = await prisma.peerRequest.findFirst({
    where: {
      status: 'accepted',
      OR: [
        { fromId: userId },
        { toId: userId }
      ]
    }
  });

  if (!anyAccepted) {
    res.json([]); 
    return;
  }

  const peers = await prisma.peerRequest.findMany({
    where: {
      status: 'accepted',
      OR: [
        { fromId: userId },
        { toId: userId }
      ]
    },
    include: {
      fromUser: { select: { id: true, name: true, email: true } },
      toUser:   { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const seen = new Set();
  const uniquePeers: { id: string; name: string | null; email: string }[] = [];

  for (const req of peers) {
    const peer = req.fromId === userId ? req.toUser : req.fromUser;
    if (!seen.has(peer.id)) {
      seen.add(peer.id);
      uniquePeers.push({ id: peer.id, name: peer.name, email: peer.email });
    }
  }

  res.json(uniquePeers);
  return;
};