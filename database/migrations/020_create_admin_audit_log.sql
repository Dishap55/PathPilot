-- =========================================================================
-- PathPilot Database Migration: Table 20 - admin_audit_log
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.admin_audit_log table (Exactly 7 approved columns)
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NULL REFERENCES public.admin_users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NULL,
    metadata JSONB NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_admin_audit_log_action_not_empty CHECK (length(trim(action)) > 0),
    CONSTRAINT chk_admin_audit_log_entity_type_not_empty CHECK (length(trim(entity_type)) > 0)
);

-- Note regarding admin_user_id nullable with ON DELETE SET NULL:
-- Audit logs are immutable historical security records. If an admin user record is
-- removed or de-provisioned, the audit log entries are preserved with admin_user_id set to NULL.

-- 2. Add documentation comment
COMMENT ON TABLE public.admin_audit_log IS 'Stores an immutable audit trail of administrative operations and configuration changes.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_id ON public.admin_audit_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created ON public.admin_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_entity ON public.admin_audit_log(entity_type, entity_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Admin SELECT: Only active administrators can view audit log records
DROP POLICY IF EXISTS "Allow active admins to view audit log" ON public.admin_audit_log;
CREATE POLICY "Allow active admins to view audit log"
    ON public.admin_audit_log
    FOR SELECT
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Client INSERT, UPDATE, DELETE:
-- No client write policies are granted.
-- Audit records are immutable historical security evidence and must only be
-- inserted via trusted backend / service-role operations following verified administrative actions.
