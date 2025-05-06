-- This file is used to create groups and user to have permission to only edit data in a given schema 

-- Create role if not exists
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nutrition_readwrite') THEN
        CREATE ROLE nutrition_readwrite;
    END IF;
END
$$;

--Checking to existence of Schema before previleges are added 

CREATE SCHEMA IF NOT EXISTS nutrition;

-- Allow access to the schema
GRANT USAGE ON SCHEMA nutrition TO nutrition_readwrite;

-- Allow SELECT, INSERT, DELETE on all existing tables in schema
GRANT SELECT, INSERT, DELETE ON ALL TABLES IN SCHEMA nutrition TO nutrition_readwrite;

-- Grant USAGE, SELECT permissions on all sequences in the schema
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA nutrition TO nutrition_readwrite;

-- Ensure future tables also inherit the privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA nutrition
GRANT SELECT, INSERT, DELETE ON TABLES TO nutrition_readwrite;

ALTER DEFAULT PRIVILEGES IN SCHEMA nutrition
GRANT USAGE, SELECT ON SEQUENCES TO nutrition_readwrite;


-- Now make the users that needs to have these permissions Use the command below 

-- CREATE USER user_name WITH PASSWORD 'strong_password';

-- Replacing the user_name with the name you want and the strong_password with the password you want.

-- Once the user is cerated we will need to assign the user to the nutrition_readwrite group so that they inheret the nessecery permissions

-- GRANT nutrition_readwrite TO user_name;

-- Replace the user_name with the name you gave to the user.

-- TO set the default search path to the desired schema 

-- ALTER ROLE user_name SET search_path TO nutrition,public;

-- replacing user_name with actual user name. 
