import {Link} from 'react-router-dom'
import React from 'react'

const BidTrackAbout = () => {
    return (
        <div>
            <React.Fragment>
                <h2>This website was created my Mike Eskridge as part of his web development portfolio.</h2>
                <br></br>
                <h4>This web application uses React.js for client side rendering and requests from the backend. It uses a functional component structure with the Context API for state management, coupled with a Reducer for updating state. The backend RESTful API uses Express.js with the Node.js runtime to receive and process asynchronous fetch calls from the client side. The server uses a PostgreSQL database for persistent data management of the users, companies, subcontractors, trades, and bids with a multi-table schema. JSON Web Tokens are used along with bcrypt encryption for secure data storage of client information.
                </h4>
                <br></br>
                <h4>The website is deployed on an AWS EC2 instance using Ubuntu.  NGINX is used as a reverse proxy to allow for seamless interaction between the React front end and the Express API back end.</h4>
                <Link to='/'>Go Back</Link>
            </React.Fragment>
        </div>
    )
}

export default BidTrackAbout
