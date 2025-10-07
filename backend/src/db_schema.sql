-- Roadmap Visualization DB Schema
CREATE TABLE roadmap_item (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    roadmap_state VARCHAR,
    labels TEXT[],
    parent VARCHAR,
    components TEXT[],
    department VARCHAR,
    team VARCHAR,
    product VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE product (
    name VARCHAR PRIMARY KEY,
    primary_project VARCHAR NOT NULL,
    secondary_projects TEXT[],
    component_filter TEXT[]
);
CREATE TABLE department (
    name VARCHAR PRIMARY KEY
);
CREATE TABLE team (
    name VARCHAR PRIMARY KEY,
    department VARCHAR REFERENCES department(name)
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
