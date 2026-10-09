# Database Schema & Supabase Security Model

## 23 Primary Tables
1. `student_profiles`
2. `student_subject_levels`
3. `subjects`
4. `topics`
5. `questions`
6. `question_metadata`
7. `assessment_templates`
8. `template_questions`
9. `assessments`
10. `assessment_attempts`
11. `question_attempts`
12. `topic_progress`
13. `roadmap`
14. `roadmap_levels`
15. `reassessments`
16. `confidence_records`
17. `study_activity`
18. `notes`
19. `admin_users`
20. `admin_audit_log`
21. `ai_requests`
22. `execution_runs`
23. `sql_execution_runs`

## RLS Security Helper Functions
- `is_admin(user_id)`
- `owns_student_record(user_id, student_id)`
- `can_access_question(question_id)`
- `can_manage_template(user_id, template_id)`
