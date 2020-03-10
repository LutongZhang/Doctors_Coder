import React, { Component, useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { register } from "../../redux/user.redux";


const Register = props => {
  const dispatch = useDispatch();
      const [userForm, setusreForm] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      const handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setusreForm({
          ...userForm,
          [name]: value
        });
      };
      const handleSubmit = event => {
        event.preventDefault();
        dispatch(register(userForm));
      };

      return (
        <Formik
            initialValues={{
                userName: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}

            validationSchema={Yup.object().shape({
                userName: Yup.string()
                    .required('Username is required'),
                firstName: Yup.string()
                    .required('First Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required'),
            })}
        >
            {({ errors, status, touched }) => (
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                        <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2">Register</button>
                        <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Register;