const express = require("express");
const router = express.Router();

//Password encryption
const bcrypt = require("bcrypt");

//Database
const pool = require("../../db");

//middleware
const validInfo = require("../middleware/validInfo");

//JSON web token
const jwtGenUtility = require("../jwtGenUtility");



router.post("/register", validInfo, async (req, res) => {

    //Pull out user info
    const {email, user, password} = req.body;

    //Salt rounds
    const saltRounds = 10;
    
    try {
        //Check database if user currently exists
        const user_exists = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user_exists.rows.length > 0) {
            return res.status(401).json("This user already exists.  Please try a different email");
        }

        // Use bcrypt to salt password and create encrypted password for database
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt);

        //Insert into databse with encrypted password
        let new_user = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [user, email, encryptedPassword]);
        
        //Get a token for the user
        const bidtrack_jwttoken = jwtGenUtility(new_user.rows[0].user_id);

        return res.json({ bidtrack_jwttoken });
                
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR");
    }


})



module.exports = router;