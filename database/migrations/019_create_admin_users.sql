-- =========================================================================
-- PathPilot Database Migration: Table 19 - admin_users
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.admin_users table (Exactly 5 approved columns)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_admin_users_user_id UNIQUE (user_id),
    CONSTRAINT chk_admin_users_role CHECK (role = 'admin')
);

-- 2. Add documentation comment
COMMENT ON TABLE public.admin_users IS 'Stores authorized administrative users and roles for platform administration.';

-- 3. Create approved performance index
CREATE INDEX IF NOT EXISTS idx_admin_users_active_role ON public.admin_users(user_id, is_active, role);

-- 4. Secure Authorization Helper: public.is_admin()
-- Evaluates securely without recursive RLS dependencies
CREATE OR REPLACE FUNCTION public.is_admin(lookup_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE user_id = lookup_user_id
          AND is_active = TRUE
          AND role = 'admin'
    );
$$;

-- Grant execution permission to authenticated and anon roles
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated, anon;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Admin SELECT: Only active administrators can view admin user records
DROP POLICY IF EXISTS "Allow active admins to view admin users" ON public.admin_users;
CREATE POLICY "Allow active admins to view admin users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Student / Client INSERT, UPDATE, DELETE:
-- No student or public write policies are granted.
-- Administrative bootstrapping and account promotion must be performed via
-- secure server-side service-role operations or controlled database bootstrap.
