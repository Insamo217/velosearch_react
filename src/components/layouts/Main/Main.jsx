import React from "react";
import { MainStyles, Title, SubTitle, BtnTitle } from "./styled";

function Main({ title, subtitle, btntext }) {
  return (
    <MainStyles>
      <div className="container">
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <button type="button" className="btn btn-warning d-block m-auto mt-5">
          <BtnTitle>{btntext}</BtnTitle>
        </button>
      </div>
    </MainStyles>
  );
}

export default Main;
