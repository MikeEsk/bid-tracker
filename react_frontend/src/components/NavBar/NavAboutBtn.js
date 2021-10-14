import React from 'react'
import { Link } from 'react-router-dom'

function NavAboutBtn() {
    return (
        <Link to='/about'> 
            <button>About</button>
        </Link>
    )
}

export default NavAboutBtn
