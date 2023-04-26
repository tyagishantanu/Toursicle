import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getRelatedStories, getStory } from "../../redux/features/storySlice";
import moment from "moment";
import RelatedStories from "../../components/RelatedStories/RelatedStories";
import DisqusThread from "../../components/Discussions/Discussions";
import "./SingleStory.scss";
import axios from 'axios';
import './SingleStory.scss';

// Show details of single story when opened through home page
const SingleStory = () => {
    const { story, relatedStories } = useSelector((state) => ({ ...state.story }));
    const {id} = useParams();
    const dispatch = useDispatch();
    const tags = story?.tags;
    const navigate = useNavigate();

    // related stories fetch according to tags of current story
    useEffect(() => {
        tags && dispatch(getRelatedStories(tags));
    }, [tags])

    // Story slice
    useEffect(() => {
        if(id)
            dispatch(getStory (id));
    }, [id]);
   
    const [data, setData] = useState({});

    // external api url to render weather information
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${story.title}&units=imperial&appid=e4c78da1c12b69df409355a3da7b4c8d`;


    useEffect (() => {
        if(story.title)
        {
        axios.get(url).then((res) => {
            setData(res.data)
            console.log(res.data)
        })
        .catch(function (error)
        {
            console.log(error.response.status);
        });
    }
    }, [story.title])

    
    return (
       <>
       <MDBContainer>
        <MDBCard className="mb-3 mt-2">
             {/* Article image  */}
            <MDBCardImage 
                src={story.imageFile}
                alt={story.title}
                position="top"
                style={{width: "100%", maxHeight: "600px"}}
            />
             {/* Description section */}
            <MDBCardBody>
                <MDBBtn color="none" tag="a" onClick= {() => navigate("/")}>
                     <MDBIcon fas size="lg" style={{float: "left", color: "#000", width:"30%" }} icon="long-arrow-alt-left"></MDBIcon>
                </MDBBtn>

                <h3 className="storyTitle">{story.title}</h3>
                <div className="creator-class">
                    <p>Created By: {story.name}</p>
                </div>
                <div className="tag-class">
                    <span className="text-start">{story && story.tags && story.tags.map((item) => `#${item}`)}</span>
                </div>
                <br />
                <MDBCardText className="text-start">
                    <MDBIcon
                        style={{float: "left", margin: "5px", paddingTop: "5px"}}
                        far
                        icon="calendar-alt"
                        size="lg"
                    />
                    <small className="text-muted">
                        {moment(story.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className="lead mb-0 text-start">
                    {story.description}
                </MDBCardText>

                 {/* Weather information render */}
                {data.main ? 
                <MDBCardText
                    className="weather-con">    
                    <MDBIcon 
                        fas
                        icon="temperature-high" 
                        size="lg"
                    />
                    <small className="temp">
                        {data.main ? <small style={{paddingRight:"10px"}}>{data.main.temp.toFixed()}°F</small> : null}
                        {data.weather ? <small>{data.weather[0].main}</small> : null}
                    </small>
                    <MDBIcon 
                        fas
                        icon="tint" 
                        size="lg"
                    />
                    <small className="temp">
                    {data.main ? <small>{data.main.humidity}%</small> : null}
                    </small>
                    <MDBIcon 
                        fas
                        icon="wind" 
                        size="lg"
                    />
                    <small className="temp">
                    {data.main ? <small>{data.wind.speed.toFixed()}MPH</small> : <MDBCardText>Could not load weather details</MDBCardText>}
                    </small>
                </MDBCardText> : null}
            </MDBCardBody>
            {/* Related stories by tag */}
            <RelatedStories relatedStories={relatedStories} storyId={id} />
        </MDBCard>
        {/* comments & discussion section */}
        <DisqusThread title={story.title} id={id} path={'/story/${id}'}/>
       </MDBContainer>
       </>
    )
}

export default SingleStory;