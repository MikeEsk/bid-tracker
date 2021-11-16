/* SCHEMA for Postgress Database */

CREATE DATABASE bidtracker;

    /* TABLE for bids */
CREATE TABLE bids(
    bid_id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL,
    reviewed BOOLEAN,
    user_id VARCHAR(255)
);
CREATE UNIQUE INDEX bid_from_company ON bids (company, user_id);

    /* TABLE for companies */
CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    trade VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    user_id VARCHAR(255)
);
CREATE UNIQUE INDEX company_name ON companies (company, user_id);

    /* TABLE for trades */
CREATE TABLE trades(
    trade_id SERIAL PRIMARY KEY,
    trade VARCHAR(255) NOT NULL,
    user_id VARCHAR(255)
)
CREATE UNIQUE INDEX trade_name ON trades (trade, user_id);

    /* TABLE for users
        - Has UUID for creating a unique user_id versus serial */
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  PRIMARY KEY(user_id),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

    /* LEVELING FOR BIDS*/
CREATE TABLE bidlevelitems (
    bid_id INTEGER NOT NULL,
    item SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL
);


