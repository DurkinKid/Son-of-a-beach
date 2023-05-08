import { useState } from "react";
import { Button, Form, Segment } from 'semantic-ui-react'

export default function BeachForm({handlePost}){
    const [state, setState] = useState({
        description:"",
        location: "",
        postdate: ""
    })
    const [image, setImage] = useState('')
   

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
        for (let key in state){
            formData.append(key, state[key])
        }
        handlePost(formData);
    }

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
             <Form.Input 
            placeholder="Coordinates"
            required
            name="location"
            onChange={handleChange}
            />
             <Form.Input 
            name="postdate"
            type="date"
            />
            <Button type="submit" color="orange">Post</Button>
            </Form>
        </Segment>
    )
}


