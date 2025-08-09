const dotenv = require('dotenv');
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

dotenv.config();

app.use(express.json())
app.use(cookieParser())

// penting: credentials + origin FE
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:5173',
  credentials: true,
}))

// routes
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

// health
app.get('/health', (_, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API running on ${PORT}`))
