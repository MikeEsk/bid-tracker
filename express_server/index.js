const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());


//*****  GET ROUTES   *******


//Get all bids
app.get('/bids', async (req, res) => {
    try {
        const allBids = await pool.query("SELECT * FROM trades,bids,companies WHERE companies.trade=trades.trade AND companies.company=bids.company");
        res.json(allBids.rows);
    
    } catch (err) {
        console.error(err.message);
    };
})

//Get all trades
app.get('/trades', async (req, res) => {
    try {
        const allTrades = await pool.query("SELECT * FROM trades ORDER BY trade ASC")
        res.json(allTrades.rows);
        
    } catch (err) {
        console.error(err.message);
    };
})

//Get trade data
app.get('/trades/:trade', async (req, res) => {
    try {
        
        const {trade} = req.params;
        const tradedata = await pool.query("SELECT * FROM trades,bids,companies WHERE companies.trade=trades.trade AND companies.company=bids.company AND companies.trade = $1", [trade]);
        
        res.json(tradedata.rows);
        
    } catch (err) {
        console.error(err.message);
    }
})


//Get lowest bids for all trades
app.get('/lowestbids', async (req,res) => {
    try {
        const allTrades = await pool.query("SELECT * FROM trades ORDER BY trade ASC")
        const tradedata = allTrades.rows;
        const lowestbids = {};

        for (let i = 0; i < tradedata.length; i++) {
            const tradeName = tradedata[i].trade;
            const lowestbid = await pool.query("SELECT MIN(price) FROM trades,bids,companies WHERE companies.trade=trades.trade AND companies.company=bids.company AND companies.trade = $1", [tradeName]);
            lowestbids[tradeName] = lowestbid.rows[0].min;
            console.log(lowestbids);
        }
        res.json(lowestbids);
        

    } catch (err) {
        console.error(err.message);
    }
})



// *****  POST ROUTES  *********

//Create a bid and add to companies if not existing
app.post("/bids", async (req, res) => {
    try {
        
        const {trade, company, price, reviewed} = req.body;
        const newBid = await pool.query("INSERT INTO bids (company, price, reviewed) VALUES ($1, $2, $3) RETURNING *", [company, price, reviewed]);
        
        //  **TODO**   
        //  Need to add trade and contact data
        //  - If company, exists in bids, need to make an alert that says a bid already exists and you need to edit the existing one
        const newCompany = await pool.query("INSERT INTO companies (company, trade) VALUES ($1, $2)", [company, trade]);
        
        res.json(newBid.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

app.post("/addtrade/", async (req, res) => {
    try {
        
        const {trade} = req.body;
        const newTrade = await pool.query("INSERT INTO trades (trade) VALUES ($1)", [trade]);
        
        res.json("Trade was added");

    } catch (err) {
        console.error(err.message);
    }
})




//  ******  PUT ROUTES  ******

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



//  ***** DELETE ROUTES ******

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


//Delete a trade
app.delete('/removetrade/:tradeName', async (req, res) => {
    try {
        const {tradeName} = req.params;
        const delBid = await pool.query("DELETE FROM trades WHERE trade = $1", [tradeName]);
        res.json("The bid was sucessfully deleted");
        
    } catch (err) {
        console.error(err.message);
    }
})









app.listen(port, () => {
    console.log(`Express server app listening at http://localhost:${port}`);
})

