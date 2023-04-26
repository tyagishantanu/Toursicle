// import statements
import React, { useState } from "react";
import './Header.scss';
import {
    MDBNavbar,
    MDBIcon,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    
    MDBNavbarBrand,
    MDBCollapse
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/features/authslice";
import { searchStory } from "../../redux/features/storySlice";
import {useNavigate} from "react-router-dom"
import decode from "jwt-decode";
// below header component will contain buttons for app navigation and will be visible in all web components.
const Header = () => {
    //below hook is used to display buttons that will be visible for all audiance.
    const [showBasic, setShowBasic] = useState(false);
    //below hook is used for implementing search functionality
    const [search, setSearch] = useState("");
    const {user} = useSelector((state)=> ({...state.auth}));
    // dispatch hook for sending current data to redux store
    const dispatch = useDispatch();
    //navigate hook for navigating to different components
    const navigate = useNavigate();
    const token = user?.token;
    // below code is used to logout user if screen is idle for 5 mins.
    if(token)
    {
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout());
        }
    }
    // below code is for handling search
    const handleSubmit = (event) => {
        event.preventDefault();
        if(search) {
            dispatch(searchStory(search));
            navigate(`/stories/search?searchQuery=${search}`);
            setSearch("");
        } else {
            navigate("/");
        }
    }
    // below code is for logout feature
    const handleLogout = () => {
        dispatch(setLogout());
    }
    
    const componentReturn = (
        <MDBNavbar expand = 'lg' className="nav-bar">

            <MDBContainer>
                <MDBNavbarBrand href="/" className="nav-bar-app-name"> 
                        Toursicle
                </MDBNavbarBrand>
                 <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                    style={{color:"white"}}
                    >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?.verified && (
                          <>

                        <MDBNavbarItem>
                            <MDBNavbarLink href="/addStory">
                                <p className="header-text">Add Story</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/dashboard">
                                <p className="header-text">Dashboard</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        </>
                        )}  
                        {/* logout button will only be visible if user logins */}
                            {user?.result?.verified ? (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                    <p className="header-text" onClick={() => handleLogout()}>
                                    <MDBIcon fas icon="sign-out-alt" style={{paddingRight:"3px"}}/>
                                        Logout
                                        </p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            ) : (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                    <p className="header-text">Login</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                       
                        {user?.result.verified && (
                           <>
                           <MDBIcon far icon="user" style={{color: "white", paddingTop:"28px", paddingRight:"4px"}}/>
                           <h5>{user?.result?.name}</h5>
                           </>
                        )}
                    </MDBNavbarNav>

                    <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                        <div>
                        <input 
                            type="text"
                            className="header-form-control"
                            placeholder="Search Story"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </div>
                        <div className="div-search">
                            <MDBIcon fas icon="search" />
                        </div>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
    return componentReturn;
}


export default Header;