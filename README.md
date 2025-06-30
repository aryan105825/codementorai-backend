# 🚀 CodeMentor AI

**Your personalized, full-stack AI-powered collaborative coding platform**

Built with ❤️ for developers to learn, code, and grow faster.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=flat-square&logo=socket.io&badgeColor=010101)](https://socket.io/)

---

## 🌟 Overview

CodeMentor AI revolutionizes the way developers learn and collaborate by combining AI-powered assistance with real-time peer collaboration, personalized learning roadmaps, and comprehensive feedback systems—all in one beautiful, intuitive platform.

### 🎯 Problem Statement

Most beginner and intermediate developers face these challenges:
- Struggle to understand, fix, and refactor code in real time
- Lack structured roadmaps tailored to their specific goals
- Need peer or mentor feedback, but real mentors are expensive or unavailable
- Miss insights into their coding habits and growth patterns

### 💡 Solution

CodeMentor AI provides:
- AI-powered code assistance with instant explanations and fixes
- Real-time peer collaboration with seamless screen sharing
- Personalized learning roadmaps for any tech stack or goal
- Comprehensive peer feedback and rating system
- Detailed analytics and progress tracking

---

## ✨ Features

### 🧠 AI-Powered Code Assistant
- **Instant Code Analysis**: Explain complex code snippets in plain English
- **Smart Debugging**: Identify and suggest fixes for bugs automatically
- **Code Refactoring**: Optimize code structure and performance
- **Multi-language Support**: Works with JavaScript, Python, Java, C++, and more
- **Context-Aware Suggestions**: Understands your project context for better recommendations

### 🤝 Real-time Collaboration
- **Live Coding Sessions**: Share your screen and code together in real-time
- **Driver/Observer Mode**: One person codes while others follow and provide input
- **Instant Room Creation**: Generate shareable links for immediate collaboration
- **Chat Integration**: Built-in messaging during coding sessions
- **Session Recording**: Save and review collaboration sessions

### 📊 Analytics Dashboard
- **Session Tracking**: Monitor total coding sessions and time spent
- **Language Statistics**: Visual breakdown of programming languages used
- **AI Usage Metrics**: Track AI prompt usage and effectiveness
- **Progress Visualization**: Charts showing your coding journey over time
- **Goal Achievement**: Track progress towards learning objectives

### 🗺️ AI Roadmap Generator
- **Personalized Learning Paths**: Custom roadmaps based on your goals and experience
- **Multiple Specializations**: Web Development, AI/ML, Mobile Dev, DevOps, and more
- **Step-by-step Guidance**: Detailed topics, tools, and resources for each step
- **Export Options**: Download as PDF or Markdown for offline study
- **Progress Tracking**: Mark completed topics and track your advancement

### ⭐ Peer Feedback System
- **Collaboration Ratings**: Rate your coding partners after each session
- **Detailed Reviews**: Leave constructive feedback and comments
- **Reputation Building**: Build your profile through positive reviews
- **Skill Validation**: Get recognition for your expertise in specific areas
- **Mentor Matching**: Connect with developers based on skills and ratings

### 👤 User Profile Management
- **Comprehensive Profiles**: Showcase your skills, experience, and achievements
- **Feedback History**: View all received ratings and reviews
- **Statistics Overview**: See your collaboration stats and growth metrics
- **Skill Badges**: Earn recognition for proficiency in different technologies
- **Activity Timeline**: Track your learning and collaboration journey

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Material-UI (MUI)** for consistent, accessible components
- **CodeMirror 6** for professional code editing experience
- **Framer Motion** for smooth animations and transitions
- **Socket.io Client** for real-time communication
- **Lucide React** for beautiful, consistent icons

### Backend
- **Node.js** with Express.js for robust API development
- **TypeScript** for server-side type safety
- **Socket.io Server** for real-time bidirectional communication
- **Prisma ORM** for type-safe database operations
- **JWT Authentication** for secure user sessions
- **bcrypt** for password hashing and security

### Database & Cloud Services
- **PostgreSQL** via Supabase for scalable data storage
- **Supabase Auth** for user authentication and management
- **OpenRouter API** for AI-powered code assistance
- **Vercel** for frontend deployment and hosting
- **Render/Railway** for backend API deployment

### Development Tools
- **ESLint** and **Prettier** for code quality
- **Prisma Studio** for database management
- **Git** for version control
- **npm** for package management

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- PostgreSQL database (or Supabase account)
- OpenRouter API key


## 📁 Project Structure

```
codementor-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Route handlers
│   │   ├── middleware/           # Custom middleware
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Helper functions
│   │   └── types/               # TypeScript type definitions
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── migrations/          # Database migrations
│   ├── package.json
│   └── server.ts                # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── AIEditor.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RoadmapGenerator.tsx
│   │   │   ├── PeerDashboard.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── Navbar.tsx
│   │   ├── context/             # React context providers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service functions
│   │   ├── types/               # TypeScript interfaces
│   │   └── utils/               # Helper functions
│   ├── public/                  # Static assets
│   ├── package.json
│   └── index.html
│
├── README.md
└── LICENSE
```

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test
```

### Frontend Testing
```bash
cd frontend
npm run test
```

### End-to-End Testing
```bash
npm run test:e2e
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Create a new service on Render or Railway
2. Connect your GitHub repository
3. Set environment variables
4. Configure build and start commands:
   - Build: `npm install && npx prisma generate`
   - Start: `npm start`

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include system information and error logs

---

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Collaboration Endpoints
- `GET /api/rooms` - Get user's rooms
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:id` - Get room details
- `DELETE /api/rooms/:id` - Delete a room

### AI Assistant Endpoints
- `POST /api/ai/explain` - Explain code
- `POST /api/ai/fix` - Fix code issues
- `POST /api/ai/refactor` - Refactor code
- `POST /api/ai/roadmap` - Generate learning roadmap

### Analytics Endpoints
- `GET /api/analytics/dashboard` - Get user analytics
- `GET /api/analytics/sessions` - Get session history
- `POST /api/analytics/track` - Track user activity

---

## 🌟 Roadmap

### Version 2.0 (Q4 2025)
- [ ] Voice and video chat integration
- [ ] Advanced code review automation
- [ ] GitHub integration for seamless workflow
- [ ] Mobile app development (React Native)

### Version 2.1 (Q1 2026)
- [ ] Team management and organization accounts
- [ ] Advanced analytics for managers
- [ ] Integration with VS Code and JetBrains IDEs
- [ ] Whiteboard functionality for system design

### Version 3.0 (Q2 2026)
- [ ] AI-powered mentorship matching
- [ ] Public project showcases
- [ ] Achievement system and coding challenges
- [ ] Advanced AI capabilities with code predictions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI & OpenRouter** for providing excellent AI APIs
- **Supabase** for the robust backend-as-a-service platform
- **Vercel** for seamless frontend deployment
- **Material-UI** team for the beautiful component library
- **Socket.io** community for real-time communication tools
- **Prisma** team for the amazing ORM and developer experience

---


**Made with ❤️ by Aryan Rajput | Built for LaunchHacks IV**
