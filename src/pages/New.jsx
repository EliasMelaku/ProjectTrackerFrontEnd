import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const New = () => {
  const [itemId, setItemId] = useState(Number);

  const { id } = useParams();

  useEffect(() => {
    setNumber();
  }, []);

  const userLogin = {
      username: "monke",
      password: "string"
  }

  function setNumber() {
    axios
      .post(`https://localhost:7227/api/Auth/login`, userLogin)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (! localStorage.getItem('username')){
        console.log("nothing in local storage")
    }
  }

  return <div>{itemId}</div>;
};

export default New;
