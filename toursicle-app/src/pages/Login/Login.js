import React, { useEffect, useState } from 'react';
import './Login.scss';
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
import { login } from '../../redux/features/authslice';
// import {GoogleLogin} from "react-google-login";

const initialState = {
  email: "",
  password: ""
};

// Login only page
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  },
    [error]
  );

  // initate login aciton
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }))
    }
  }

  // Text area trigger to modify form data state
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <div className="loginDiv">
      <MDBCard alignment="center">
        <MDBIcon far icon="user-circle" className="fa-2x" />
        <h4>Sign In</h4>
        <MDBCardBody>
          {/* Form start */}
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem className="col-md-12" feedback='Please enter a username.' invalid>
              <MDBInput
                label="Email"
                type="text"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem className="col-md-12" feedback='Please enter a password.' invalid>
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin 
            clientId="..."
            render={(renderProps) => (
              <MDBBtn 
              style={{width: "100%"}} 
              color="danger"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              >
                <MDBIcon className='me-2' fab icon="google" />
                Google Sign-In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
        </MDBCardBody>
        {/* Send user to signup */}
        <MDBCardFooter>
          <Link to="/signup">
            <p>Don't have an account ? Please Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
};

export default Login;