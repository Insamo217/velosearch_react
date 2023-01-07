import React from "react";
import { HeaderStyles } from "./styled";
import logo from "assets/logo.png";

function Header() {
  return (
    <HeaderStyles>
      <div className="container">
        <div class="row">
          <div className="col-md-6">
            <img src={logo} alt="" />
          </div>
          <div className="col-md-2">
            <p>tel</p>
          </div>
          <div className="col-md-2">
            <p>contacts</p>
          </div>
          <div className="col-md-2">
            <p>auth</p>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
}

export default Header;
