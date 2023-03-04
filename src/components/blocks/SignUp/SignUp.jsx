import React from "react";
import { useState } from "react";
import {
  MainStyles,
  RegistrationStyles,
  InputStyles,
  LabelStyles,
} from "./styled";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "e269c62f-0ec1-4e69-a9ad-c65947489938") {
      setMessage("Введите валидный Id Client");
    }
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
        { email, password, firstName, lastName, clientId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setClientId("");
          setMessage("Поздравлем! Вы зарегистрированы!");
          console.log(response);
        },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      )
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setFirstName(e.target.value);
  };
  const changeSurname = (e) => {
    setLastName(e.target.value);
  };
  const changeId = (e) => {
    setClientId(e.target.value);
  };
  return (
    <MainStyles>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <RegistrationStyles>
            <h2>Регистрация</h2>
            <LabelStyles>
              E-mail*
              <InputStyles
                onChange={changeMail}
                type="text"
                name="email"
                value={email}
                required
              />
            </LabelStyles>
            <LabelStyles>
              Пароль*
              <InputStyles
                onChange={changePassword}
                type="password"
                name="пароль"
                value={password}
                required
              />
            </LabelStyles>
            <LabelStyles>
              Имя
              <InputStyles
                onChange={changeName}
                type="text"
                name="имя"
                value={firstName}
              />
            </LabelStyles>
            <LabelStyles>
              Фамилия
              <InputStyles
                onChange={changeSurname}
                type="text"
                name="фамилия"
                value={lastName}
              />
            </LabelStyles>
            <LabelStyles>
              Client ID*
              <InputStyles
                onChange={changeId}
                type="text"
                name="client id"
                value={clientId}
                required
              />
            </LabelStyles>
            <button className="btn btn-warning">Зарегистрироваться</button>
            <p>{message}</p>
          </RegistrationStyles>
        </form>
      </div>
    </MainStyles>
  );
}

export default SignUp;