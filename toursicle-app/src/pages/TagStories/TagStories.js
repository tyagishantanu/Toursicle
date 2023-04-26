import React, {useEffect} from 'react';
import { MDBBtn, MDBCard, MDBCardGroup, MDBCardImage, MDBCardTitle, MDBCardText,MDBRow, MDBCol } from 'mdb-react-ui-kit';
import{useParams, useNavigate} from "react-router-dom";
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux';
import{ getStoriesByTag } from '../../redux/features/storySlice'
import {excerpt} from '../../utils/excerpt'
import './TagStories.scss';

const TagStories =() => {
    const {tagStories, loading} = useSelector((state) => ({...state.story}))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tag} = useParams();

    // Stories slice action
    useEffect(() => {
        if(tag) {
            dispatch(getStoriesByTag(tag))
        }
    }, [tag])

    // call loader
    if(loading) 
    {
        return <Spinner />
    }

    return(
        <div className='tagsrc-container'>
            <h3 className='heading'>Stories with tags #{tag}</h3>
            {tagStories && tagStories.map((item) => (
                <MDBCardGroup key={item._id} className="card-group-2">
                    <MDBCard className='mt-2'>
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage
                                className='rounded'
                                src={item.imageFile}
                                alt={item.title}
                                fluid
                                />
                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardTitle>
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText>
                                   {excerpt(item.description, 40)}
                                </MDBCardText>
                                <div className='readmore-btn'>
                                    <MDBBtn size="sm" rounded color="info" onClick={() => navigate(`/story/${item._id}`)}>
                                        Read More
                                    </MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}

export default TagStories;