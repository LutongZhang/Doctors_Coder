import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { change_password } from "../../redux/user.redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, ModalBody } from "react-bootstrap";
import * as Yup from "yup";

const ChangePwd = props => {
  const dispatcher = useDispatch();

  const [currForm, setForm] = useState({
    old_password: "",
    new_password: ""
  });

  const handleChange = e => {
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
    <Formik
      initialValues={{ new_password: "", old_password: "" }}
      validationSchema={Yup.object().shape({
        old_password: Yup.string().required("Password is required."),
        new_password: Yup.string()
          .min(6, "New Password must be at least 6 characters.")
          .required("New password is required.")
      })}
    >
      {({ errors, status, touched }) => (
        <Form
          className="text-center"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <h3 className="display-4">Change Password</h3>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div htmlFor="old_password" className="col-xs-3 form-group">
                  <Field
                    name="old_password"
                    type="password"
                    placeholder="Old Password"
                    className={
                      "form-control" +
                      (errors.old_password && touched.old_password
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="old_password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div htmlFor="new_password" className="form-group">
                  <Field
                    name="new_password"
                    type="password"
                    placeholder="New Password"
                    className={
                      "form-control" +
                      (errors.new_password && touched.new_password
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="new_password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <button type="submit" className="btn btn-secondary mr-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default ChangePwd;
