//import statements
import { MDBFooter, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import './Footer.scss';

// created footer component that will be shown in all the screens
const Footer = () => {
    const componentReturn = (
      // used material design botstrap footer componenet for the footer
        <MDBFooter color="primary" bgColor='light' 
            className='text-lg-left'>
                <div>        
                  <a className='text-white' href='/'>
                    Toursicle.com
                  </a>
                  {/* added social media links in the footer as well */}
                  <div className="footer-connect">
                      <MDBBtn outline color="light" floating className='m-1 footer-social-buttons' href='https://www.facebook.com/' target="_blank" role='button'>
                          <MDBIcon fab icon='facebook-f' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1 footer-social-buttons' href='https://twitter.com/' target="_blank" role='button'>
                          <MDBIcon fab icon='twitter' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1 footer-social-buttons' href='https://www.google.com/' target="_blank" role='button'>
                          <MDBIcon fab icon='google' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1 footer-social-buttons' href='https://www.instagram.com/' target="_blank" role='button'>
                          <MDBIcon fab icon='instagram' />
                        </MDBBtn>
                      </div>
                </div>  
            </MDBFooter>
    )
    return componentReturn;
}


export default Footer;