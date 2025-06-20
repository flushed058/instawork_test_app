DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'members_api') THEN
        CREATE DATABASE members_api;
    END IF;
END
$$;