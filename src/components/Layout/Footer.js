import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy; Danil Skripchenko</h1>
      <p className="text-center mt-3">
        {/* <Link to="/about">Про нас</Link>| */}
        <Link to="/contact">Контакти</Link>|
        <Link to="/policy">Політика конфіденційності</Link>
      </p>
    </div>
  )
}

export default Footer