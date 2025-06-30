import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import aiRoutes from './routes/ai.routes'
import codeRoutes from './routes/code.routes'
import analyticsRoutes from './routes/analytics.routes'
import http from 'http'
import peerRoutes from './routes/peer.routes'
import mentorRoutes from './routes/mentor.routes'
import { Server as SocketServer } from 'socket.io'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})
const roomDrivers = new Map<string, string>()
io.on('connection', socket => {
  console.log(`🔌 Socket connected: ${socket.id}`)

  // JOIN ROOM
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId)
    console.log(`🟢 ${socket.id} joined room: ${roomId}`)

    // If no driver, set current as driver
    if (!roomDrivers.has(roomId)) {
      roomDrivers.set(roomId, socket.id)
    }

    // Notify all in room about current driver
    io.to(roomId).emit('driver-update', roomDrivers.get(roomId))
  })

  socket.on('join-user-id', (userId: string) => {
    socket.join(userId)
    console.log(`📦 Socket ${socket.id} joined user room: ${userId}`)
  })

  socket.on('code-change', ({ roomId, code }) => {
    socket.to(roomId).emit('code-update', code)
  })

  socket.on('set-driver', ({ roomId }) => {
    roomDrivers.set(roomId, socket.id)
    io.to(roomId).emit('driver-update', socket.id)
  })

  socket.on('request-driver', ({ roomId }) => {
    const driverId = roomDrivers.get(roomId)
    if (driverId) {
      socket.emit('driver-update', driverId)
    }
  })

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`)

    for (const [roomId, driverId] of roomDrivers.entries()) {
      if (driverId === socket.id) {
        roomDrivers.delete(roomId)
        io.to(roomId).emit('driver-update', null)
      }
    }
  })
})
app.use('/api/ai', aiRoutes)
app.use('/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/code', codeRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/peer', peerRoutes)
app.use('/api/mentor', mentorRoutes)
app.set('io', io)
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.io running on http://localhost:${PORT}`)
})
