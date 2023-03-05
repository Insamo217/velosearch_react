import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OfficerDetails from "./OfficerDetails";
import { FormStyles, ButtonClose } from "globalStyles";

function AllOfficers({ setApproved }) {
  //состояния для регистрации нового сотрудника
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [info, setInfo] = useState([]);
  const [newWorker, setNewWorker] = useState(false);
  const [detail, setDetail] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //загружаем список всех сотрудников
  const allWorkers = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setInfo(result.data.officers);
    setApproved(result.data.officers);
  };

  useEffect(() => {
    allWorkers();
  }, [newWorker]);

  //добавляем нового сотрудника
  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/officers",
        { email, password, firstName, lastName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setName("");
        setPassword("");
        setEmail("");
        setSurname("");
        setMessage("Новый сотрудник успешно зарегистрирован");
        allWorkers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = () => {
    setNewWorker(!newWorker);
  };
  const handleClose = () => {
    setNewWorker(!newWorker);
    setMessage("");
  };

  return (
    <FormStyles>
      <h2>Список всех зарегистрированных сотрудников</h2>
      <Link to={"/"}>
        <ButtonClose
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
        ></ButtonClose>
      </Link>
      <div>
        <ol className="list-group list-group-numbered mb-3">
          {(loading && <div className="loading">loading...</div>) ||
            info.map((worker) => (
              <div key={worker._id} className="approve">
                <Link
                  onClick={() => setDetail(!detail)}
                  className="link"
                  to={`/officers/${worker._id}`}
                >
                  <li className="list-group-item list-group-item-warning mt-1">
                    {worker.email}
                  </li>
                </Link>
              </div>
            ))}
        </ol>
        {(info.length === 0 && <div></div>) || (
          <button className="btn btn-outline-light" onClick={handleAdd}>
            Добавить сотрудника
          </button>
        )}
        {(newWorker && (
          <form method="post" className="addOfficer" onSubmit={handleSubmit}>
            <div>
              <span
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                {message}
              </span>
              <label>E-mail </label>
              <input
                onChange={changeMail}
                type="text"
                name="email"
                value={email}
                required
              />

              <label>Пароль</label>
              <input
                onChange={changePassword}
                type="password"
                name="пароль"
                value={password}
                required
              />

              <label>Имя</label>
              <input
                onChange={changeName}
                type="text"
                name="имя"
                value={firstName}
              />

              <label>Фамилия</label>
              <input
                onChange={changeSurname}
                type="text"
                name="фамилия"
                value={lastName}
              />
              <span onClick={handleClose} className="close">
                X
              </span>
              <button>Добавить</button>
            </div>
          </form>
        )) ||
          (detail && (
            <OfficerDetails
              detail={detail}
              setDetail={setDetail}
              info={info}
              allWorkers={allWorkers}
            />
          )) ||
          null}
      </div>
    </FormStyles>
  );
}

export default AllOfficers;
