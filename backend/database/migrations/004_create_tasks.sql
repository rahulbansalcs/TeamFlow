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
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_task_project
FOREIGN KEY(project_id)
REFERENCES projects(id)
ON DELETE CASCADE,
CONSTRAINT fk_task_user
FOREIGN KEY(assigned_to)
REFERENCES users(id)
ON DELETE SET NULL
);

CREATE INDEX idx_task_project ON tasks(project_id);
CREATE INDEX idx_task_assigned ON tasks(assigned_to);