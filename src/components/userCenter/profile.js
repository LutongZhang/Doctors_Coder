import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = props => {
  const [checkedOut, setCheckedOut] = useState([]);
  const user = useSelector(state => state.user);

  const getUserCheckout = () => {
    axios
      .post("/api/devices/getUserCheckout", { userName: user.userName })
      .then(res => {
        setCheckedOut(res.data);
      })
      .catch(err => {});
  };
  useEffect(() => {
    getUserCheckout();
  }, []);
  const list = checkedOut.map(checkedOut => {
    return (
      <tr>
        <td>
          {" "}
          <b>{checkedOut.userName} </b>
        </td>
        <td>
          {" "}
          <i>{checkedOut.device}</i>{" "}
        </td>
        <td> {checkedOut.checkoutTime} </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Checkout history for {user.userName}</h1>
      <table>{list}</table>
    </div>
  );
};

export default Profile;
