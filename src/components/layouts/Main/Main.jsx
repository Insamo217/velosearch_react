import React from "react";
import { MainStyles, Title, SubTitle, BtnTitle } from "./styled";
import { Link } from "react-router-dom";

function Main({ title, subtitle, btntext }) {
  return (
    <MainStyles>
      <div className="container">
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <button type="button" className="btn btn-warning d-block m-auto mt-5">
          <Link to={"/report/"}>
            <BtnTitle>{btntext}</BtnTitle>
          </Link>
        </button>
      </div>
    </MainStyles>
  );
}

export default Main;
