-- Drop existing tables to ensure a clean slate
DROP TABLE IF EXISTS jira_issue_raw CASCADE;
DROP TABLE IF EXISTS roadmap_item CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS release_cycle CASCADE;
DROP TABLE IF EXISTS objective CASCADE;
DROP TABLE IF EXISTS roadmap_items CASCADE; -- Dropping old table name for safety

-- Raw Jira data table
CREATE TABLE jira_issue_raw (
    jira_key VARCHAR(255) PRIMARY KEY,
    raw_data JSONB NOT NULL,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Roadmap Visualization DB Schema
CREATE TABLE department (
    name VARCHAR PRIMARY KEY
);

CREATE TABLE team (
    name VARCHAR PRIMARY KEY,
    department VARCHAR REFERENCES department(name)
);

CREATE TABLE roadmap_item (
    id SERIAL PRIMARY KEY,
    jira_key VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(255) NOT NULL,
    release VARCHAR(255),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    name VARCHAR PRIMARY KEY,
    primary_project VARCHAR NOT NULL,
    secondary_projects TEXT[],
    component_filter TEXT[]
);

CREATE TABLE release_cycle (
    name VARCHAR PRIMARY KEY,
    start_date DATE,
    end_date DATE
);

CREATE TABLE objective (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    url TEXT
);
