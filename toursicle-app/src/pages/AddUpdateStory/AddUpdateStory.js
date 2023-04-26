import React, {useState, useEffect} from 'react';
import './AddUpdateStory.scss';
import {
    MDBCard, 
    MDBCardBody,
    MDBValidation,
    MDBValidationItem, 
    MDBBtn,
    MDBSpinner
} from "mdb-react-ui-kit";
import { MuiChipsInput } from "mui-chips-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createStory, updateStory } from "../../redux/features/storySlice";


const initialState = {
    title: "",
    description: "",
    tags: []
}

// Add & update common page render class
const AddUpdateStory = () => {
    const [storyData, setStoryData] = useState(initialState);
    const {error, loading, userStories} = useSelector((state) => ({...state.story}));
    const {user} = useSelector((state) => ({...state.auth})); // for saving the user's post under his name
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [chips, setChips] = useState([]);
    const {title, description, tags} = storyData; 
    const {id} = useParams();

    // Fetch data of particular story in case of update
    useEffect(() => {
        if(id) {
            const singleStory = userStories.find((story) => story._id === id);
            setStoryData({...singleStory});
        }
    }, [id])

    useEffect(() => { 
        // call only when there's any error
        error && toast.error(error); // display error coming from backend. 
    }, [error])

    const handleChange = (newChips) => {
        setChips(newChips)
        setStoryData({
            ...storyData, tags: newChips
        });
      }

    // Submit story
    const handleSubmit = (event) => {
        event.preventDefault();
        // storySlice, api.js, store.js - contains configuration needed to submit and save the data
        if(title && description && tags) {
            // dispatch the createStory action
            const updatedStoryData = {...storyData, name: user?.result?.name};
            if(!id) {
                dispatch(createStory({updatedStoryData, navigate, toast}));
            }
            else {
                dispatch(updateStory({id, updatedStoryData, toast, navigate}));
            }
            handleClear();
        }
    };

    // Change state of story data when data changes in input field
    const onInputChange = (event) => {
        const {name, value} = event.target; //destructure event data
        setStoryData({...storyData, [name]: value});
    };

    // Add tag event from MBD chip input element
    const handleAddTag = (tag) => {
        setStoryData({
            ...storyData, tags: [...storyData.tags, tag]
        }); //append tags in array
    };

    // MBD chip input element delete event handling
    const handleDeleteTag = (deleteTag) => {
        setStoryData({
            ...storyData, tags: storyData.tags.filter((tag) => tag !== deleteTag)
        });
    };

    // Clear all fields and corresponding data state
    const handleClear = () => {
        setStoryData({title: "", description: "", tags: []});
    };


    return (
        <div className="formDiv">
            <MDBCard alignment='center'>
                <h4>{id ? "Update story" : "Add Story"}</h4>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row r-3">
                        <MDBValidationItem className="col-md-12" feedback='Please enter a title.' invalid>
                            <input 
                                placeholder='Enter Title'
                                type='text'
                                value={title}
                                name='title'
                                onChange={onInputChange}
                                className='form-control'
                                required
                                invalid
                                validation="Please provide title"
                            />
                        </MDBValidationItem>

                        <MDBValidationItem className="col-md-12" feedback='Please enter a description.' invalid> 
                            <textarea 
                                placeholder='Enter Description'
                                type='text'
                                value={description}
                                name='description'
                                onChange={onInputChange}
                                className='form-control'
                                required
                                invalid
                                validation="Please provide description"
                            />
                        </MDBValidationItem>
                        <div className="col-md-12">
                            <MuiChipsInput 
                                name="tags"
                                variant="outlined"
                                placeholder="Enter Tag"
                                fullWidth
                                value={tags}
                                onChange={handleChange}
                            //    onAdd={(tag) => handleAddTag(tag)}
                            //    onDelete={(tag) => handleDeleteTag(tag)}
                            />
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase 
                                type="file"
                                mutliple={false}
                                onDone={({base64}) => 
                                    setStoryData({...storyData, imageFile: base64})
                                }
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{width:"100%"}} className="mt-2">
                                {loading && (
                                <MDBSpinner
                                size="sm"
                                role="status"
                                tag="span"
                                className="me-2"
                            />
                            )}
                                {id ? "Update" : "Submit"}
                            </MDBBtn>
                            <MDBBtn className="mt-2" color="danger" onClick={handleClear}>
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
};

export default AddUpdateStory;