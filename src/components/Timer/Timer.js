

import axios from "axios";

export default function Timer(device,user){
	var date = new Date();
	var ampm = date.getHours>=12? 'PM':'AM';
	var min = date.getMinutes()<10? '0' + date.getMinutes() :date.getMinutes();
	date = (date.getMonth()+1 )+ '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + min + " " + ampm;
	alert(user.userName + ", you have checked out: " + device + ".");

 axios
      .post("/api/devices/checkout", {userName: user.userName, device: device, checkoutTime: date, checkinTime: "etes"})
      .then(res => {
		  console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.message);
      });
}


