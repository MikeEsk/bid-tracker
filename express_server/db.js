const Pool = require("pg").Pool;

const pool = new Pool({
    user: "mikeesk",
    host: "localhost",
    port: 5432,
    database: "bidtracker"
});

module.exports = pool;