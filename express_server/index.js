const express = require('express');
const app = express();

//Port
const port = 5000;

//middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

//Authorization routes
app.use("/auth", require("./Auth/auth_routes/register"));
app.use("/auth", require("./Auth/auth_routes/login"));
app.use("/auth", require("./Auth/auth_routes/authorize"));


//Standard Routes
app.use("/user", require("./routes"));



//Listen for requests
app.listen(port, () => {
    console.log(`Express server app listening at http://localhost:${port}`);
})

