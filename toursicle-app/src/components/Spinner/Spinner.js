// import statements
import React from 'react';
import {MDBSpinner} from 'mdb-react-ui-kit';
// spinner component will display a circular loading element. This will get called during API calls when there is loading time
const Spinner = () => {
    return(
        <div className='d-flex justify-content-center' style={{paddingTop:"20px"}}>
            <MDBSpinner role='status' color='primary'>
                <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
        </div>
    )
};

export default Spinner;
