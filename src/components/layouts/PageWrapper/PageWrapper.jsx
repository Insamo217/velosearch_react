import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";

function PageWrapper() {
  return (
    <>
      <Header
        phone="+7-000-000-00"
        mail="test@example.com"
        btnNameLogin="Login"
        btnNameSign="Sign-up"
      />
      <Main
        title="Bike Search"
        subtitle="Поиск пропавших велосипедов"
        btntext="Сообщить о краже"
      />
      <Footer infoText="© 2023 Учебный проект Skillfactory" />
    </>
  );
}

export default PageWrapper;
