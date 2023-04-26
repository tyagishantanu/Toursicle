//import statements
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// below component is for displaying the redirecting message based on used request or system trigger.
const RedirectOnLoading = () => {
    const [counter, setCounter] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((currentCounter) => --currentCounter)
        }, 1000);

        counter === 0 && navigate("/login");
        return () => clearInterval(interval);
    }, [counter, navigate])
    return( <div>
        <h3 style={{paddingLeft:"470px", paddingTop:"20px"}}>Redirecting you to login page in {counter} seconds</h3>
    </div>
    )
};

export default RedirectOnLoading;