# API Specification

All API endpoints follow a standardized response envelope:
```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {}
}
```

## Key Endpoints
- **Auth**: `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`
- **Profile**: `/api/profile`, `/api/profile/subject-levels`
- **Subjects & Topics**: `/api/subjects`, `/api/topics/:subjectId`, `/api/topics/:topicId/material`
- **Assessment**: `/api/assessment/start`, `/api/assessment/:id`, `/api/assessment/:id/submit`, `/api/assessment/result/:id`
- **Practice & Code Execution**: `/api/questions/:id`, `/api/questions/:id/attempt`, `/api/code/run`, `/api/code/submit`, `/api/sql/execute`
- **Roadmap & Progress**: `/api/roadmap`, `/api/progress`, `/api/reassessment`
- **Dashboard**: `/api/dashboard`, `/api/dashboard/analytics`, `/api/dashboard/weak-areas`
- **AI Mentor**: `/api/ai/analyze`, `/api/ai/explain`
- **Admin**: `/api/admin/students`, `/api/admin/templates`, `/api/admin/questions`, `/api/admin/ai/generate-question`
