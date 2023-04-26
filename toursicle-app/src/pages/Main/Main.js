import React, { useEffect } from 'react';
import './Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MDBCol, MDBRow, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { getStories, setCurrentPage } from '../../redux/features/storySlice';
import StoryCard from '../../components/StoryCard/StoryCard';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation } from 'react-router-dom';

// Default page of site/landing page 
const Main = () => {
    const { stories, loading, currentPage, numberOfPages } = useSelector((state) => ({ ...state.story }));
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    const searchQuery = query.get("searchQuery");
    const location = useLocation();

    // story slice action
    useEffect(() => {
        dispatch(getStories(currentPage));
    }, [currentPage]);

    // get loader
    if (loading) {
        return <Spinner/>;
    }

    return (
        <div className="main">
            <MDBRow>
                {stories.length === 0 && location.pathname === "/" &&  (
                    // Case: when no story across user base
                    <MDBTypography className="text-center mb-0" tag="h2">No stories found</MDBTypography>
                )}

                {stories.length === 0 &&  (
                    // Case: search called but no result for query
                    <MDBTypography className="text-center mb-0" tag="h2">No match found for search term "{searchQuery}"</MDBTypography>
                )}

                {/* Render all story cards */}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {stories && stories.map((item) => <StoryCard key={item._id} {...item}/> )}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {/* Pagination element */}
            {stories.length && (
                <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} currentPage={currentPage} dispatch={dispatch}/>
            )}
            
        </div>
    )
};

export default Main;