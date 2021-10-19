/* SCHEMA for Postgress Database */

CREATE DATABASE bidtracker;

CREATE TABLE bids(
    bid_id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    price BIGINT,
    reviewed BOOLEAN
);

CREATE UNIQUE INDEX bid_company_name ON bids (company);

CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    trade VARCHAR(255),
    contact VARCHAR(255)
);

CREATE UNIQUE INDEX company_name ON companies (company);

CREATE TABLE trades(
    trade_id SERIAL PRIMARY KEY,
    trade VARCHAR(255),
)

CREATE UNIQUE INDEX trade_name ON trades (trade);








