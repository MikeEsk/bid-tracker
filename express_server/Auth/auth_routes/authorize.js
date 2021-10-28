const express = require("express");
const router = express.Router();


//middleware
const authorize_user = require("../middleware/authorize_user");


router.post('/authorize', authorize_user, async (req, res) => {

    //Authorize_user middleware checks if json web token is valid and stores user_id in req.user
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR")
    }

});

module.exports = router;