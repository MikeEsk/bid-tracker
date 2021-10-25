const express = require("express");
const router = express.Router();

//Password encryption
const bcrypt = require("bcrypt");

//Database
const pool = require("../../db");

//middleware
const validInfo = require("../middleware/validInfo");
const authorize_user = require("../middleware/authorize_user");

//JSON web token
const jwtGenUtility = require("../jwtGenUtility");


router.post('/login', validInfo, async (req, res) => {

    try {
        //Pull out user email and password
        const {email, password} = req.body;
    
        //Check for the email
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid email");
        }
    
        //Compare supplied password with encrypted password saved in db
        const checkPass = await bcrypt.compare(password, user.rows[0].user_password);
        if (!checkPass) {
            return res.status(401).json("Invalid password");
        }
        
        //If password is valid, supply user with a jwt for the session
        const bidtrack_jwttoken = jwtGenUtility(user.rows[0].user_id);
        return res.json({bidtrack_jwttoken});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR")
    }

});

module.exports = router;









