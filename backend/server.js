const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const errorMiddleware = require('./middleware/errorMiddleware');

// Route module imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const questionRoutes = require('./routes/questionRoutes');
const progressRoutes = require('./routes/progressRoutes');
const reassessmentRoutes = require('./routes/reassessmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 1. Security Headers via Helmet
app.use(helmet());

// 2. CORS Configuration
const allowedOrigins = [
  env.CLIENT_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, server-to-server, health probes)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow any localhost origin in development
    if (env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Not allowed by CORS origin restriction.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parsers with payload limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Request Logging
app.use((req, res, next) => {
  if (env.NODE_ENV !== 'test') {
    const startTime = Date.now();
    res.on('finish', () => {
      const elapsed = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} (${elapsed}ms)`);
    });
  }
  next();
});

// 5. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'PathPilot API',
    status: 'healthy'
  });
});

// Also support root /health
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'PathPilot API',
    status: 'healthy'
  });
});

// 6. Registered Domain Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reassessment', reassessmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// 7. 404 Catch-All Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
});

// 8. Centralized Error Handling Middleware
app.use(errorMiddleware);

// 9. Server Initialization (Only listen when executed directly, not when required as a module)
if (require.main === module) {
  app.listen(env.PORT, () => {
    console.log(`================================================`);
    console.log(`🚀 PathPilot API Backend running on port ${env.PORT}`);
    console.log(`📡 Health Check: http://localhost:${env.PORT}/api/health`);
    console.log(`🛡️  Environment: ${env.NODE_ENV}`);
    console.log(`================================================`);
  });
}

module.exports = app;
