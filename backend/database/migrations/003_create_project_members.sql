CREATE TABLE IF NOT EXISTS project_members(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
project_id UUID NOT NULL,
user_id UUID NOT NULL,
joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(project_id,user_id),
CONSTRAINT fk_pm_project
FOREIGN KEY(project_id)
REFERENCES projects(id)
ON DELETE CASCADE,
CONSTRAINT fk_pm_user
FOREIGN KEY(user_id)
REFERENCES users(id)
ON DELETE CASCADE
);