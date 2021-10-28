import React from 'react'
import Disclaimer from './Disclaimer'

const Footer = () => {
    return (
        <footer>
            {window.matchMedia("only screen and (max-width: 760px)").matches && <Disclaimer/>}
            <p>Copyright Mikeesk &copy; 2021</p>
        </footer>
    )
}

export default Footer

