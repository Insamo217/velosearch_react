import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ReportAuthDetailStyles } from "./styled";
import { InputStyles, ButtonClose, LabelStyles } from "globalStyles";
import { Link } from "react-router-dom";

function ForAuth({ newMessage, setNewMessage, approved, setApproved }) {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [officer, setOfficer] = useState("");

  let listOfApproved = approved.filter((officer) => officer.approved === true);
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
  };
  const handleOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = approved.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
  };

  useEffect(() => {
    setOfficer(officer);
  }, [officer]);
  useEffect(() => {
    setType(type);
  }, [type]);
  useEffect(() => {
    allWorkers();
  }, [newMessage]);

  const allWorkers = async () => {
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setApproved(result.data.officers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/cases/",
        {
          licenseNumber,
          ownerFullName,
          color,
          date,
          description,
          type,
          officer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLicenseNumber("");
        setOwnerFullName("");
        setColor("");
        setType("");
        setDate("");
        setDescription("");
        setMessage("???????????? ????????????????????");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ReportAuthDetailStyles>
      <form method="post" onSubmit={handleSubmit}>
        <h2>???????????????? ?? ??????????</h2>
        <p>{message}</p>
        <div>
          <Link to={`/cases/`}>
            <ButtonClose
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={() => setNewMessage(!newMessage)}
            ></ButtonClose>
          </Link>

          <div>
            <LabelStyles>?????????????????????????? ?????????????????? </LabelStyles>
            <select onChange={handleOfficer} value={officer}>
              <option>???????????????? ????????????????????</option>
              {listOfApproved.map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.firstName} {officer.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <LabelStyles>?????????? ????????????????</LabelStyles>
            <InputStyles
              onChange={handleNumber}
              value={licenseNumber}
              type="text"
              required
            />
            <LabelStyles>?????? ??????????????</LabelStyles>
            <InputStyles
              onChange={handleName}
              value={ownerFullName}
              type="text"
              required
            />
          </div>
          <div>
            <LabelStyles>???????? ???????????????????? </LabelStyles>
            <InputStyles onChange={handleColor} value={color} type="text" />
            <LabelStyles>???????? ??????????</LabelStyles>
            <InputStyles onChange={handleDate} value={date} type="date" />
          </div>
          <div>
            <LabelStyles>???????????????????????????? ????????????????????</LabelStyles>
            <InputStyles
              onChange={handleInfo}
              value={description}
              type="text"
            />
            <LabelStyles>?????? ???????????????????? </LabelStyles>
            <select onChange={handleType} value={type} required>
              <option value="">???????????????? ?????? ????????????????????</option>
              <option value="general">general</option>
              <option value="sport">sport</option>
            </select>
          </div>
          <button className="btn btn-warning mt-3" type="submit">
            ??????????????????
          </button>
        </div>
      </form>
    </ReportAuthDetailStyles>
  );
}

export default ForAuth;
