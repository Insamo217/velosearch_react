import React from "react";
import GlobalStyle from "globalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "components/blocks/Auth/Auth";
import SignUp from "components/blocks/SignUp/SignUp";
import Main from "components/layouts/Main/Main";
import Header from "components/layouts/Header/Header";
import Footer from "components/layouts/Footer/Footer";
import Report from "components/blocks/Report/Report";
import Messages from "components/blocks/Messages/Messages";
import AllOfficers from "components/blocks/AllOfficers/AllOfficers";
import { Styles } from "globalStyles";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(
    localStorage.getItem(localStorage.getItem("admin") || false)
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/auth/sign_in",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      .then((response) => {
        setLoading(false);
        setData(response.data);
        localStorage.setItem("token", response.data.data.token);

        if (response.data.data.token) {
          setAdmin(!admin);
          localStorage.setItem("admin", true);
          window.location.replace("/");
        }
        setMessage("Вы авторизованы");
      })
      .catch((error) => {
        setMessage("Вы ввели неверный логин или пароль");
      });
  };
  return (
    <Router>
      <GlobalStyle />
      <Header
        phone="+7-000-000-00"
        mail="test@example.com"
        btnNameLogin="Войти"
        btnNameSign="Регистрация"
        btnNameOfficers="Сотрудники"
        btnNameCases="Сообщения"
        setAdmin={setAdmin}
        admin={admin}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main
                title="Bike Search"
                subtitle="Поиск пропавших велосипедов"
                btntext="Сообщить о краже"
              />
            </>
          }
        />
        <Route
          path="/sign_in/"
          element={
            <Styles>
              <Auth
                admin={admin}
                setAdmin={setAdmin}
                data={data}
                setData={setData}
                password={password}
                setPassword={setPassword}
                setEmail={setEmail}
                message={message}
                email={email}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            </Styles>
          }
        />
        <Route
          path="/sign_up/"
          element={
            <Styles>
              <SignUp />
            </Styles>
          }
        />
        <Route
          path="/report/"
          element={
            <Styles>
              <Report approved={approved} setApproved={setApproved} />
            </Styles>
          }
        />
        <Route
          path="/officers/"
          element={
            <Styles>
              <AllOfficers approved={approved} setApproved={setApproved} />
            </Styles>
          }
        ></Route>
        <Route
          path="/cases/"
          element={
            <Styles>
              <Messages approved={approved} setApproved={setApproved} />
            </Styles>
          }
        ></Route>
        <Route
          path="/officers/:id"
          element={
            <Styles>
              <AllOfficers approved={approved} setApproved={setApproved} />
            </Styles>
          }
        ></Route>
        <Route
          path="/cases/:id"
          element={
            <Styles>
              <Messages approved={approved} setApproved={setApproved} />
            </Styles>
          }
        ></Route>
      </Routes>

      <Footer infoText="© 2023 Учебный проект Skillfactory" />
    </Router>
  );
}
export default App;
