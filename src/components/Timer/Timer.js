import axios from "axios";
import msg from "../../message";
export default function Timer(device, user) {
  var date = new Date();
  var ampm = date.getHours >= 12 ? "PM" : "AM";
  var min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  date =
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    min +
    " " +
    ampm;

  axios
    .post("/api/checkout/checkout", {
      userName: user.userName,
      device: device,
      checkoutTime: date,
      checkinTime: "etes"
    })
    .then(res => {
      msg.alert(
        "success",
        user.userName + ", you have checked out: " + device + "."
      );
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response.message);
    });
}
