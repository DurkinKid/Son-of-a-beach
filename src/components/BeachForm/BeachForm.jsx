import { useState, useEffect } from "react";
import { Button, Form, Segment } from 'semantic-ui-react'
import  GooglePlacesAutocomplete  from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';









export default function BeachForm({handlePost}){
    const [state, setState] = useState({
        description:"",
        location: "",
        latitude: 0,
        longitude: 0,
        postDate: ""
    })
    const [image, setImage] = useState('')
    const [value, setValue] = useState(null)


   

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        
    }

    function handleFileInput(e){
        setImage(e.target.files[0])
    }

    function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', image)
        for (let fieldname in state){
            formData.append(fieldname, state[fieldname])
        }
        handlePost(formData);
    }

    useEffect(() => {
        if(value){
            geocodeByPlaceId(value.value.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
      
            setState({
                ...state,
                location: value.value.description,
                latitude: lat, 
                longitude: lng
            })
        })}
    },[value])

    return (
        <Segment>
            <Form onSubmit={handleSubmit}>
            <Form.Input 
            placeholder="Upload a photo"
            type="file"
            name="photo"
            onChange={handleFileInput}
            />
            <Form.Input 
            placeholder="Leave us Sbeachless"
            required
            name="description"
            onChange={handleChange}
            />
            <label>Location</label>
            <GooglePlacesAutocomplete
            type="text"
            label='Location'         
            apiKey="AIzaSyAPBJe1eXaGgb6NM3k_qUf85p7zmkZl7uI"
            selectProps={{value, onChange: setValue}}
            apiOptions={{langauge: 'en'}} 
            /><br/>
            
             <Form.Input 
            name="postDate"
            type="date"
            onChange={handleChange}
            />
            <Button type="submit" color="orange">Post</Button>
            </Form>
        </Segment>
    )
}


