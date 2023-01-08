import React from "react";
import { MainStyles, Title, SubTitle, BtnTitle } from "./styled";

function Main() {
  return (
    <MainStyles>
      <div className="container">
        <Title>Bike Search</Title>
        <SubTitle>Поиск пропавших велосипедов </SubTitle>
        <button type="button" className="btn btn-warning d-block m-auto mt-5">
          <BtnTitle>Сообщить о краже</BtnTitle>
        </button>
      </div>
    </MainStyles>
  );
}

export default Main;
