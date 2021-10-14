const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//Routes

//Create a bid
app.post("/bids", async (req, res) => {
    try {
        
        const {company, price, reviewed} = req.body;
        const newBid = await pool.query("INSERT INTO bids (company, price, reviewed) VALUES ($1, $2, $3)", [company, price, reviewed]);
        res.json(newBid);

    } catch (err) {
        console.error(err.message);
    }
})

//Get all bids
app.get('/bids', async (req, res) => {
    try {

        const allBids = await pool.query("SELECT * FROM bids");
        res.json(allBids.rows);


    } catch (err) {
        console.error(err.message);
    };
})

//Delete a bid
app.delete('/bids/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const delBid = await pool.query("DELETE FROM bids WHERE bid_id = $1", [id]);
        res.json("The bid was sucessfully deleted");
        
    } catch (err) {
        console.error(err.message);
    }
})


//Toggle reviewed status
app.put('/bids/:id', async (req, res) => {
    try {
        
        const {id} = req.params;
        
        //Get current bid_id review status//
        const reviewed_bid = await pool.query("SELECT reviewed FROM bids WHERE bid_id = $1", [id]);
        reviewStatus = reviewed_bid.rows[0].reviewed;
        
        //Update with new review status
        const togReviewStatus = await pool.query("UPDATE bids SET reviewed = $1 WHERE bid_id = $2", [!reviewStatus, id]);
        
        //Send back review status to update state and check against database value
        res.send(!reviewStatus);

    } catch (err) {
        console.error(err.message);
    }

})





app.listen(port, () => {
    console.log(`Express server app listening at http://localhost:${port}`);
})

