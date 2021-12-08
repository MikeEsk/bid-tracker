const express = require("express");
const router = express.Router();

//Database
const pool = require("./db");

//middleware
const authorize_user = require("./Auth/middleware/authorize_user");



// ****** GET ROUTES ********


//Get all bids
router.get('/bids', authorize_user, async (req, res) => {
    
    const user_id = req.user.id
    try {
        // ***TODO***:  NEED TO CLEAN THIS QUERY UP
        const allBids = await pool.query(
            `SELECT * FROM trades,bids,companies 
            WHERE companies.trade = trades.trade 
            AND companies.company = bids.company 
            AND trades.user_id = $1
            AND companies.user_id = $1
            AND bids.user_id = $1`
        , [user_id]);
        res.json(allBids.rows);
        
    } catch (err) {
        console.error(err.message);
    };
})

//Get all trades
router.get('/trades', authorize_user, async (req, res) => {
    try {
        const user_id = req.user.id
        const allTrades = await pool.query("SELECT * FROM trades WHERE trades.user_id = $1 ORDER BY trade ASC", [user_id])
        res.json(allTrades.rows);
        
    } catch (err) {
        console.error(err.message);
    };
})

//Get trade data
router.get('/trades/:trade', authorize_user, async (req, res) => {
    try {
        const user_id = String(req.user.id)
        const {trade} = req.params;
        // ***TODO***:  NEED TO CLEAN THIS QUERY UP
        const tradedata = await pool.query(
            `SELECT * FROM trades,bids,companies 
            WHERE companies.trade=trades.trade 
            AND companies.company=bids.company 
            AND companies.trade = $1 
            AND bids.user_id = trades.user_id 
            AND trades.user_id = companies.user_id
            AND bids.user_id = $2`
        , [trade, user_id]);

        res.json(tradedata.rows);
        
    } catch (err) {
        console.error(err.message);
    }
})

//Get levelitems
router.get('/tradelevel/', authorize_user, async (req, res) => {
    try {
        const user_id = String(req.user.id)
        const levelitems = await pool.query(
            `SELECT bids.bid_id, bidlevelitems.item, bidlevelitems.item_name, bidlevelitems.price 
            FROM bids,bidlevelitems 
            WHERE bids.bid_id = bidlevelitems.bid_id 
            AND bids.user_id = $1`
        , [user_id]);

        res.json(levelitems.rows);

    } catch (err) {
        console.error(err.message);
    }
})


//Get lowest bids for all trades
router.get('/lowestbids', authorize_user, async (req,res) => {
    try {
        const user_id = req.user.id
        const allTrades = await pool.query("SELECT trade FROM trades WHERE trades.user_id = $1 ORDER BY trade ASC", [user_id]);
        const tradedata = allTrades.rows;
        const lowestbids = {};
        
        for (let i = 0; i < tradedata.length; i++) {
            var bidarray = []
            const tradeName = tradedata[i].trade;
            const bids = await pool.query(
                `SELECT bid_id, price FROM trades 
                INNER JOIN companies ON trades.trade = companies.trade
                INNER JOIN bids ON bids.company = companies.company
                WHERE companies.trade = $1 
                AND companies.user_id = $2
                AND trades.user_id = $2
                AND bids.user_id = $2`
            , [tradeName, user_id]);
            
            //Go through each bid and add items to it
            await Promise.all(bids.rows.map(
                async bid => {
                    const levelitems = await pool.query(
                        `SELECT SUM(bidlevelitems.price)
                        FROM bids,bidlevelitems 
                        WHERE bids.bid_id = bidlevelitems.bid_id 
                        AND bids.user_id = $1
                        AND bids.bid_id = $2`
                    , [user_id, bid['bid_id']]);

                    const sum = levelitems.rows[0]['sum']
                    var totalprice = 0

                    if (sum) totalprice = parseInt(bid['price']) + parseInt(sum)
                    else totalprice = parseInt(bid['price'])
                    
                    bidarray.push(totalprice)
                }
            ))

            lowestbids[tradeName] = Math.min(...bidarray);
        }

        res.json(lowestbids);
        
        
    } catch (err) {
        console.error(err.message);
    }
})



// *****  POST ROUTES  *********

//Get user loaded for session
router.post('/loaduser', authorize_user, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [id]);
        res.json({msg: 'Success', user_id: id, user_name: user.rows[0].user_name});
    
    } catch (err) {
        console.error(err.message);
    };
})

//Create a bid and add to companies if not existing
router.post("/bids", authorize_user, async (req, res) => {
    try {
        
        const {trade, company, price, reviewed} = req.body;
        const user_id = req.user.id;
        const newBid = await pool.query("INSERT INTO bids (company, price, reviewed, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [company, price, reviewed, user_id]);
        
        //  **TODO**   
        //  Need to add trade and contact data
        //  - If company, exists in bids, need to make an alert that says a bid already exists and you need to edit the existing one
        const newCompany = await pool.query("INSERT INTO companies (company, trade, user_id) VALUES ($1, $2, $3)", [company, trade, user_id]);
        
        res.json(newBid.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

//Add item to a bid
router.post("/additem", authorize_user, async (req, res) => {
    try {
        
        const { item_name, price, bid_id } = req.body;

        const addeditem = await pool.query("INSERT INTO bidlevelitems (bid_id, item_name, price) VALUES ($1, $2, $3) RETURNING *", [bid_id, item_name, price]);

        res.json(addeditem.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

router.post("/addtrade/", authorize_user, async (req, res) => {
    try {
        const user_id = req.user.id;
        const {trade} = req.body;
        const newTrade = await pool.query("INSERT INTO trades (trade, user_id) VALUES ($1, $2)", [trade, user_id]);
        
        res.json("Trade was added");

    } catch (err) {
        console.error(err.message);
    }
})




//  ******  PUT ROUTES  ******

//Toggle reviewed status
router.put('/bids/:id', authorize_user, async (req, res) => {
    try {
        
        const user_id = req.user.id;
        const {id} = req.params;
        
        //Get current bid_id review status//
        const reviewed_bid = await pool.query("SELECT reviewed FROM bids WHERE bid_id = $1 AND bids.user_id = $2", [id, user_id]);
        reviewStatus = reviewed_bid.rows[0].reviewed;
        
        //Update with new review status
        const togReviewStatus = await pool.query("UPDATE bids SET reviewed = $1 WHERE bid_id = $2 AND bids.user_id = $3", [!reviewStatus, id, user_id]);
        
        //Send back review status to update state and check against database value
        res.send(!reviewStatus);
        
    } catch (err) {
        console.error(err.message);
    }
    
})



//  ***** DELETE ROUTES ******

//Delete a bid
router.delete('/bids/:id', authorize_user, async (req, res) => {
    
    try {
        const user_id = req.user.id;
        const {id} = req.params;
        const delBid = await pool.query("DELETE FROM bids WHERE bid_id = $1 AND bids.user_id = $2", [id, user_id]);
        res.json("The bid was sucessfully deleted");
        
    } catch (err) {
        console.error(err.message);
    }
})

router.delete('/items/:itemid', authorize_user, async (req, res) => {

    try {
        const user_id = req.user.id;
        if (user_id) {
            const {itemid} = req.params;
            const delItem = await pool.query(
                `DELETE FROM bidlevelitems
                WHERE item = $1`
           ,[itemid]);
           res.json("the item was sucessfully deleted")
        }
        

    } catch (err) {
        console.error(err.message)
    }
})



//Delete a trade
router.delete('/removetrade/:tradeName', authorize_user, async (req, res) => {
    
    try {
        const user_id = req.user.id;
        const {tradeName} = req.params;

        //Delete bids and companies associated with trade
        const bidstoDelete = await pool.query(
            `SELECT * FROM trades,bids,companies 
            WHERE companies.trade = trades.trade 
            AND companies.company = bids.company 
            AND companies.trade = $1 
            AND bids.user_id = trades.user_id 
            AND bids.user_id = $2`
        , [tradeName, user_id]);
        
        bidstoDelete.rows.forEach(async bid => {
            await pool.query("DELETE FROM bids WHERE bid_id = $1", [bid.bid_id]);
            await pool.query("DELETE FROM companies WHERE company_id = $1", [bid.company_id]);
        });

        //Delete trade
        const tradeDelete = await pool.query("DELETE FROM trades WHERE trade = $1 AND user_id = $2", [tradeName, user_id]);
        
        res.json("The trade and associated bids and companies were sucessfully deleted");
        
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;