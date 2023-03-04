import React from "react";
import GlobalStyle from "globalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "components/blocks/Auth/Auth";
import SignUp from "components/blocks/SignUp/SignUp";
import Main from "components/layouts/Main/Main";
import Header from "components/layouts/Header/Header";
import Footer from "components/layouts/Footer/Footer";
import Report from "components/blocks/Report/Report";
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
        console.log(response);
        if (response.data.data.user.approved === true) {
          setAdmin(!admin);
          localStorage.setItem("admin", true);
        }
        setMessage("Вы авторизованы");
      })
      .catch((error) => {
        setMessage("Вы ввели неверный логин или пароль");
      });
  };
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
          path="auth/sign_in"
          element={
            <>
              <GlobalStyle />
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
            </>
          }
        />
        <Route
          path="auth/sign_up/"
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
