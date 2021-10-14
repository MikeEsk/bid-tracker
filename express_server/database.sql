CREATE DATABASE bidtracker;

CREATE TABLE bids(
    bid_id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    price BIGINT,
    reviewed BOOLEAN
);

CREATE TABLE trade(
    id SERIAL PRIMARY KEY,
    trade VARCHAR(255),
    company VARCHAR(255)
);
