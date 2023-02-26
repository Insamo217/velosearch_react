import React from "react";
import GlobalStyle from "globalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "components/blocks/Auth/Auth";
import SignUp from "components/blocks/SignUp/SignUp";
import Main from "components/layouts/Main/Main";
import Header from "components/layouts/Header/Header";
import Footer from "components/layouts/Footer/Footer";
import Report from "components/blocks/Report/Report";

function App() {
  return (
    <Router>
      <Header
        phone="+7-000-000-00"
        mail="test@example.com"
        btnNameLogin="Login"
        btnNameSign="Sign-up"
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <GlobalStyle />
              <Main
                title="Bike Search"
                subtitle="Поиск пропавших велосипедов"
                btntext="Сообщить о краже"
              />
            </>
          }
        />
        <Route
          path="/login/"
          element={
            <>
              <GlobalStyle />
              <Auth />
            </>
          }
        />
        <Route
          path="/registration/"
          element={
            <>
              <GlobalStyle />
              <SignUp />
            </>
          }
        />
        <Route
          path="/report/"
          element={
            <>
              <GlobalStyle />
              <Report />
            </>
          }
        />
      </Routes>
      <Footer infoText="© 2023 Учебный проект Skillfactory" />
    </Router>
  );
}
export default App;
