const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const logger = require('./config/logger');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const topicRoutes = require('./routes/topicRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const questionRoutes = require('./routes/questionRoutes');
const codeRoutes = require('./routes/codeRoutes');
const sqlRoutes = require('./routes/sqlRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const progressRoutes = require('./routes/progressRoutes');
const reassessmentRoutes = require('./routes/reassessmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aiRoutes = require('./routes/aiRoutes');
const bestuRoutes = require('./routes/bestuRoutes');
const adminRoutes = require('./routes/adminRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'PathPilot Backend API'
  });
});

// Domain Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/sql', sqlRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reassessment', reassessmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/bestu', bestuRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notes', noteRoutes);

// Error Handling Middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    logger.info(`PathPilot Server running on http://localhost:${env.PORT}`);
  });
}

module.exports = app;
