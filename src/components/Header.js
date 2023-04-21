import React from "react";
import logoVector from "../images/logo-Vector.svg"

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoVector} alt="Логотип Mesto Russia" />
    </header>
  );
}
