import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MainStyles, ReportStyles, InputStyles, LabelStyles } from "./styled";

function Report() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleNumber = (e) => {
    setLicenseNumber(e.target.value);
  };
  const handleName = (e) => {
    setOwnerFullName(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleInfo = (e) => {
    setDescription(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
    console.log(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://sf-final-project-be.herokuapp.com/api/public/report", {
        ownerFullName: ownerFullName,
        licenseNumber: licenseNumber,
        type: type,
        clientId: "e269c62f-0ec1-4e69-a9ad-c65947489938",
        color: color,
        date: date,
        description: description,
      })
      .then((res) => {
        setLicenseNumber("");
        setOwnerFullName("");
        setColor("");
        setType("");
        setDate("");
        setDescription("");
        setMessage("Заявка отправлена");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <MainStyles>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <ReportStyles>
            <p>{message}</p>
            <h2>Сообщить о краже</h2>
            <LabelStyles>Номер лицензии* </LabelStyles>
            <InputStyles
              onChange={handleNumber}
              value={licenseNumber}
              type="text"
              required
            />
            <LabelStyles>ФИО клиента* </LabelStyles>
            <InputStyles
              onChange={handleName}
              value={ownerFullName}
              type="text"
              required
            />
            <LabelStyles>Цвет велосипеда </LabelStyles>
            <InputStyles onChange={handleColor} value={color} type="text" />
            <LabelStyles>Дата кражи</LabelStyles>
            <InputStyles onChange={handleDate} value={date} type="date" />
            <LabelStyles>Дополнительная информация</LabelStyles>
            <InputStyles
              onChange={handleInfo}
              value={description}
              type="text"
            />
            <LabelStyles>Тип велосипеда*</LabelStyles>
            <select onChange={handleType} value={type} required>
              <option value="">Выберите тип велосипеда</option>
              <option value="mtb">MTB</option>
              <option value="cross">Cross</option>
              <option value="road">Road</option>
            </select>
            <button className="btn btn-warning">Отправить</button>
          </ReportStyles>
        </form>
      </div>
    </MainStyles>
  );
}

export default Report;
