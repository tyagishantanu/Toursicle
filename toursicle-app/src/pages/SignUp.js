import React, { useEffect, useState } from 'react';
import './Login/Login.scss';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBValidation,
    MDBValidationItem,
    MDBInput,
    MDBBtn,
    MDBCardFooter,
    MDBSpinner
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signup } from '../redux/features/authslice';

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
};

// directed users from login page to here
const SignUp = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { firstName, lastName, email, password, confirmPassword} = formValue;
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    },
        [error]
    );

    // password validation
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            // password and confirm password match case
            return toast.error("Password should match")
        }
        if (firstName && lastName && email && password && confirmPassword) {
            // initiate save
            dispatch(signup({ formValue, navigate, toast }))
        }
    }

    // input change trigger leading to state change
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <div className="loginDiv">
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h4>Sign Up</h4>
                <MDBCardBody>
                    {/* form start */}
                    <MDBValidation onSubmit={handleSubmit} className="row g-3">
                         {/* First name */}
                        <MDBValidationItem className="col-md-6" feedback='Please enter first name.' invalid>
                            <MDBInput
                                label="First Name"
                                type="text"
                                value={firstName}
                                name="firstName"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                        {/* Last name */}
                        <MDBValidationItem className="col-md-6" feedback='Please enter last name.' invalid>
                            <MDBInput
                                label="Last Name"
                                type="text"
                                value={lastName}
                                name="lastName"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                         {/* website user name */}
                        <MDBValidationItem className="col-md-12" feedback='Please enter username.' invalid>
                            <MDBInput
                                label="Email"
                                type="text"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                         {/* login password */}
                        <MDBValidationItem className="col-md-12" feedback='Please enter password.' invalid>
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                         {/* reconfirm password */}
                        <MDBValidationItem className="col-md-12" feedback='Please enter confirm password.' invalid>
                            <MDBInput
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                         {/* Trigger create account */}
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Register
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                     {/* redirect user back to login */}
                    <Link to="/login">
                        <p>Already have an account ? Please Sign In</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
};

export default SignUp;