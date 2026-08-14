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
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE TABLE IF NOT EXISTS projects(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(200) NOT NULL,
description TEXT,
owner_id UUID NOT NULL,
status VARCHAR(20) DEFAULT 'active' CHECK(status IN('active','completed','archived')),
start_date DATE,
end_date DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_project_owner FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_project_owner ON projects(owner_id);
CREATE TABLE IF NOT EXISTS project_members(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
project_id UUID NOT NULL,
user_id UUID NOT NULL,
joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
role VARCHAR(20) NOT NULL DEFAULT 'member',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(project_id,user_id),
CONSTRAINT fk_pm_project FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
CONSTRAINT fk_pm_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_pm_project ON project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_pm_user ON project_members(user_id);
CREATE TABLE IF NOT EXISTS tasks(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
project_id UUID NOT NULL,
assigned_to UUID,
title VARCHAR(255) NOT NULL,
description TEXT,
priority VARCHAR(20) DEFAULT 'medium' CHECK(priority IN('low','medium','high')),
status VARCHAR(20) DEFAULT 'todo' CHECK(status IN('todo','in_progress','completed')),
deadline DATE,
attachment VARCHAR(255),
deleted_at TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_task_project FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
CONSTRAINT fk_task_user FOREIGN KEY(assigned_to) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_task_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_task_assigned ON tasks(assigned_to);
CREATE TABLE IF NOT EXISTS task_comments(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
task_id UUID NOT NULL,
user_id UUID NOT NULL,
comment TEXT NOT NULL,
deleted_at TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_comment_task FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE,
CONSTRAINT fk_comment_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_comment_task ON task_comments(task_id);
CREATE INDEX IF NOT EXISTS idx_comment_user ON task_comments(user_id);
CREATE TABLE IF NOT EXISTS activities(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID,
project_id UUID,
task_id UUID,
action VARCHAR(100) NOT NULL,
message TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_activity_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
CONSTRAINT fk_activity_project FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
CONSTRAINT fk_activity_task FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_project ON activities(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_task ON activities(task_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activities(created_at);
