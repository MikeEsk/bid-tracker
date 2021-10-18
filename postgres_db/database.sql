CREATE DATABASE bidtracker;

CREATE TABLE bids(
    bid_id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    price BIGINT,
    reviewed BOOLEAN
);

CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    trade VARCHAR(255),
    contact VARCHAR(255)
);

CREATE TABLE trades(
    trade_id SERIAL PRIMARY KEY,
    trade VARCHAR(255),
)


/* ---- Commands  ------

- Need to select a trade and it returns all companies and their bids



*/






