import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="logo">
                <Link to="/">BRYFT</Link>
            </div>
            <div className="footertext">
                TM &amp; Copyright 2023 Bryft.
                All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;