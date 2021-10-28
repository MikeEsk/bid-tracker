const jwt = require("jsonwebtoken");

//Middleware checks token in local storage

module.exports = function(req, res, next) {
    //Pull token out of header
    const token = req.header('bidtrack_jwttoken')

    if (!token) {
        return res.status(403).json({ msg: "Authorization is denied"});
    }

    //Verify the user's token
    try {
        //Use json webtoken to validate the token
        const verify = jwt.verify(token, process.env.jwt_SECRET_KEY);

        //Set the current user in the request object to the UUID from the jwt
        req.user = verify.user;
        
        //Middleware is complete, pass onto the route
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid"});
    }
}