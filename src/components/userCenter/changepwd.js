import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { change_password } from "../../redux/user.redux";
import {Form, Col, Button} from "react-bootstrap"


import axios from "axios";




const ChangePwd = props => {
  
  const dispatcher = useDispatch();
 
 

  const [currForm, setForm] = useState({
    old_password: "",
    new_password: ""
  });

  const formUpdate = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({
      ...currForm,
      [name]: value
    });
  };


  const handleSubmit = e => {
    e.preventDefault();
    dispatcher(change_password(currForm));
    
  };

  
  
  
  
  
  
  
  return ( 
  
  
  <div class="text-center">
   <h4 class="display-4">
     Change Password
   </h4>
   <Form>
          <Form.Group as={Col}>
            <Form.Control
              type="password"
              name="old_password"
              placeholder="Old Password"
              value={currForm.old_password}
              onChange={formUpdate}
            ></Form.Control>
           
          </Form.Group>
          {/* End of username form*/}
          <Form.Group as={Col}>
            <Form.Control
              type="password"
              name="new_password"
              placeholder="New Password"
              value={currForm.new_password}
              onChange={formUpdate}
            ></Form.Control>
           
          </Form.Group>
          {/* End of password form*/}

  

   <Button type="submit" variant="outline-primary" onClick={handleSubmit}>
            Submit
          </Button>

          </Form>

  </div>
    
            
    );
};

export default ChangePwd;
