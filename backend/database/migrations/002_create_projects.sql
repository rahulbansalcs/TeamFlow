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
CONSTRAINT fk_project_owner
FOREIGN KEY(owner_id)
REFERENCES users(id)
ON DELETE CASCADE
);

CREATE INDEX idx_project_owner ON projects(owner_id);