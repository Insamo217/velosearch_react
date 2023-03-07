import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import ForAuth from "../Report/ForAuth";
import ReportDetail from "./ReportDetail";
import { FormStyles, ButtonClose } from "globalStyles";

function Messages({ approved, setApproved }) {
  const [cases, setCases] = useState([]);
  const [detail, setDetail] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDetail = () => {
    setDetail(!detail);
  };
  const allMessages = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setCases(result.data.data);
  };

  useEffect(() => {
    allMessages();
  }, [detail, newMessage]);

  return (
    <FormStyles>
      <h3>Все сообщения о кражах</h3>
      {(loading && (
        <div className="loading" style={{ alignSelf: "center" }}>
          loading...
        </div>
      )) ||
        (cases.length === 0 && <div></div>) ||
        (newMessage && (
          <ForAuth
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            approved={approved}
            setApproved={setApproved}
          />
        ))}
      <ol>
        {cases.map((item) => (
          <li key={item._id} className="mb-3">
            <Link onClick={handleDetail} to={`/cases/${item._id}`}>
              <li>
                {item.ownerFullName}{" "}
                <span
                  className="badge"
                  style={{
                    backgroundColor:
                      (item.status === "new" && "green") ||
                      (item.status === "in_progress" && "rgb(209, 130, 19)") ||
                      (item.status === "done" && "red"),
                  }}
                >
                  {item.status}
                </span>
              </li>
            </Link>
          </li>
        ))}
      </ol>
      <button
        className="btn btn-outline-light mt-3"
        onClick={() => setNewMessage(!newMessage)}
      >
        Добавить сообщение
      </button>
      <Link to={"/"}>
        <ButtonClose
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
        ></ButtonClose>
      </Link>
      {detail && (
        <ReportDetail
          cases={cases}
          detail={detail}
          setDetail={setDetail}
          approved={approved}
          setApproved={setApproved}
        />
      )}
    </FormStyles>
  );
}

export default Messages;
