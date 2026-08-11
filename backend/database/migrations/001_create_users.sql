CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phone VARCHAR(20),
avatar VARCHAR(255),
job_title VARCHAR(100),
department VARCHAR(100),
role VARCHAR(20) DEFAULT 'member' CHECK(role IN('admin','manager','member')),
status VARCHAR(20) DEFAULT 'active' CHECK(status IN('active','inactive')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);