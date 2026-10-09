-- =========================================================================
-- PathPilot Database Migration: Integration - Link assessment_attempts to execution_runs
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- Attach the deferred foreign key relationship:
-- public.assessment_attempts.execution_run_id -> public.execution_runs(id) ON DELETE SET NULL

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_assessment_attempts_execution_run' 
          AND table_schema = 'public' 
          AND table_name = 'assessment_attempts'
    ) THEN
        ALTER TABLE public.assessment_attempts
            ADD CONSTRAINT fk_assessment_attempts_execution_run
            FOREIGN KEY (execution_run_id)
            REFERENCES public.execution_runs(id)
            ON DELETE SET NULL;
    END IF;
END $$;
