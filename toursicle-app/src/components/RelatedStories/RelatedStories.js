//import statements.
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText,MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {excerpt} from '../../utils/excerpt'
import './RelatedStories.scss';
import { Link } from 'react-router-dom';
//below component is for displaying related stories based on the main story.
const RelatedStories = ({relatedStories, storyId}) => {
    return (
        <>
          {relatedStories && relatedStories.length > 0 && (
            <>
            {/* the component will appear only when related stories are more than one */}
            {relatedStories.length > 1 && <h4 className='related-heading'>Related Stories</h4>}
            <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{paddingRight:"12px"}}>
            {relatedStories.filter((item) => item._id !== storyId).splice(0, 3).map((item) => (
                <MDBCol>
                    <MDBCard className='grow' style={{marginBottom:"15px"}}>
                        <Link to={`/story/${item._id}`}>
                            <MDBCardImage
                            src={item.imageFile}
                            alt={item.title}
                            position="top"
                            style={{maxWidth: "100%", height: "200px"}}
                            />
                        </Link>
                        <span className='text-start tag-card'>
                            {item.tags.map((tag) => (
                                <Link to={`/stories/tag/${tag}`}> #{tag}</Link>
                            ))}
                        </span>
                        <MDBCardBody>
                            <MDBCardTitle>{item.title}</MDBCardTitle>
                            {/* excerpt will restrict the description to 45 chars */}
                            <MDBCardText>{excerpt(item.description, 45)}</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            ))}
            </MDBRow>
            
            </>
          )}
        </>
    )
}

export default RelatedStories;