import React from "react";
import logo from '../images/logo.svg';


export default function Header() {
    return (
        <header className="header container">
            <img className="header__logo"
                 src={logo}
                 alt="Логотип социальной сети Место" />
        </header>
    );
}