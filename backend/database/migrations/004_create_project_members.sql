CREATE TABLE project_members(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
role VARCHAR(20) NOT NULL DEFAULT 'member',
created_at TIMESTAMP DEFAULT NOW(),
UNIQUE(project_id,user_id)
);