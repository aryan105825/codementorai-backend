import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  sendPeerRequest,
  acceptPeerRequest,
  getMyPeerRequests,
  getMyPeers
} from '../controllers/peer.controller';
import { checkPeerStatus } from '../controllers/peer.controller';

const router = Router();

router.post('/send', authenticate, sendPeerRequest);
router.post('/accept', authenticate, acceptPeerRequest);
router.get('/my', authenticate, getMyPeerRequests);
router.get('/status/:userId', authenticate , checkPeerStatus);
router.get('/my-peers', authenticate, getMyPeers); 

export default router;
