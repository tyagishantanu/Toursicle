//import statements
import { 
        MDBCardBody, MDBCard, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBBtn,MDBIcon, MDBTooltip 
    } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import './StoryCard.scss';
import {useSelector, useDispatch} from "react-redux";
import { likeStory } from "../../redux/features/storySlice";

// the stories added by the user will be displayed in story cards.
const StoryCard = ({_id, title, description, tags, imageFile, name, likes}) => {

    const {user} = useSelector((state) => ({...state.auth}));
    const userId = user?.result?._id;

    const dispatch = useDispatch();

    const excerpt = (txt) => {
        if(txt.length > 45){
            txt = txt.substring(0, 45) + "...";
        }
        return txt;
    };
    // below component is for giving likes to the story.
    const Likes = () => {
        if(likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip tag="a" title={`You and ${likes.length - 1} others liked`}>
                            {likes.length} Likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} Like${likes.length > 1 ? 's' : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon="thumbs-up" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        )
    };
    // below function is used for handling like functionality.
    const handleLike = () => {
        dispatch(likeStory({ _id }));
    };

    return (
        <MDBCardGroup>
            <MDBCard className="grow">
            <MDBCardImage 
                src={imageFile}
                alt={title}
                position="top"
                style={{maxWidth: "100%", height: "180px"}}
            />
            <div className="top-left">{name}</div>
            <div className="tag-container">
            <span className="text-start tag-card">
                {tags.map((tag, index) => (
                    <Link key={index} to={`stories/tag/${tag}`}> #{tag}</Link>
                ))}
                </span>
                <span className="like-panel">
                <MDBBtn className="btn-card" tag="a" color="none" onClick={!user?.result ? null :  handleLike}>
                    {!user?.result ? (
                        // only logged in users would be able to like stories.
                        <MDBTooltip title="Please Log in to like story." tag="a">
                            <Likes />
                        </MDBTooltip>
                    ) : (
                        <Likes />
                    )}
                </MDBBtn>
                </span>
            </div>
            <MDBCardBody>
                <MDBCardTitle className="card-title">{title}</MDBCardTitle>
                <MDBCardText className="text-start">{excerpt(description)}
                    {/* Read more will help expand the story card in a detailed view */}
                    <Link className="link" to={`/story/${_id}`}>Read More</Link>
                </MDBCardText>
            </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
}

export default StoryCard;