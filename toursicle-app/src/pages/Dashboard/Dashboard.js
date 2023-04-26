import React, { useEffect } from 'react';
import{ MDBCard, MDBCardGroup, MDBCardImage, MDBRow, MDBCol, MDBCardTitle, MDBCardText, MDBCardBody, MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { getStoriesByUser, deleteStory } from '../../redux/features/storySlice';
import { Link } from "react-router-dom";
import './Dashboard.scss';
import Spinner from '../../components/Spinner/Spinner';
// import { deleteStory } from '../../redux/api';
import { toast } from "react-toastify"

const Dashboard = () => {
    const {user} = useSelector((state) => ({...state.auth}));
    const {userStories, loading} = useSelector((state) => ({...state.story}));
    const userId = user?.result?._id;
    const dispatch = useDispatch();

    useEffect(() => {
        if(userId)
        {
            dispatch(getStoriesByUser(userId))
        }
    }, [userId]);

    // cutoff lengthy strings when rendering
    const excerpt = (txt) => {
        if(txt.length > 45){
            txt = txt.substring(0, 40) + "...";
        }
        return txt;
    }

    // Show loading for long api fetch time
    if (loading) {
        return <Spinner/>;
    }

    // delete confirmation and then actual delete
    const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to remove this story ?")) {
        dispatch(deleteStory({id, toast}));
      }
    }
    
    // 
    return (
        <div className='dash-container'>
          {userStories.length === 0 &&  (
            // State when no stories created for account 
            <h2 className='noStoryH2'>No stories from user {user?.result?.name}</h2>
          )}
          {userStories.length > 0 &&  (
            <>
              {/* State when stories present in account */}
              <h4 className="heading">Welcome {user?.result?.name}</h4>
              {/* <hr style={{ maxWidth: "570px" }} /> */}
            </>
          )}

          {/* Render list of all stories available for account */}
          {userStories &&
            userStories.map((item) => (
              <MDBCardGroup key={item._id} className="card-group-2">
                <MDBCard className='grow'>
                  <MDBRow>
                    <MDBCol md="4">
                      <MDBCardImage
                        className="rounded"
                        src={item.imageFile}
                        alt={item.title}
                        fluid
                      />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody>
                        <MDBCardTitle>
                          {item.title}
                        </MDBCardTitle>
                        <MDBCardText>
                          <small className="text-muted">
                            {excerpt(item.description)}
                          </small>
                        </MDBCardText>
                        <div className='story-btn'>
                          <MDBBtn className="mt-1" tag="a" color="none">
                            <MDBIcon
                              fas
                              icon="trash"
                              style={{ color: "#dd4b39" }}
                              size="lg"
                              onClick={() => handleDelete(item._id)}
                            />
                          </MDBBtn>
                          <Link to={`/updateStory/${item._id}`}>
                            <MDBIcon
                              fas
                              icon="edit"
                              style={{ color: "#55acee", marginLeft: "10px" }}
                              size="lg"
                            />
                          </Link>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCardGroup>
            ))}
        </div>
      );
};

export default Dashboard;