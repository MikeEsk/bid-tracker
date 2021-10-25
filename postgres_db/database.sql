/* SCHEMA for Postgress Database */

CREATE DATABASE bidtracker;

    /* TABLE for bids */
CREATE TABLE bids(
    bid_id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL,
    reviewed BOOLEAN
);
CREATE UNIQUE INDEX bid_company_name ON bids (company);

    /* TABLE for companies */
CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    trade VARCHAR(255) NOT NULL,
    contact VARCHAR(255)
);
CREATE UNIQUE INDEX company_name ON companies (company);

    /* TABLE for trades */
CREATE TABLE trades(
    trade_id SERIAL PRIMARY KEY,
    trade VARCHAR(255) NOT NULL,
)
CREATE UNIQUE INDEX trade_name ON trades (trade);

    /* TABLE for users
        - Has UUID for creating a unique user_id versus serial */
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  PRIMARY KEY(user_id),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);



