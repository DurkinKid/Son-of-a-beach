import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
  } from "semantic-ui-react";

import { useState } from "react";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { useNavigate } from "react-router-dom";


export default function SignUpPage({handleAuth}){

    const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNzwtfuRzoCdEhFwp11Fgl3pydR3fH1ryVU3owkHnLg&usqp=CAU&ec=48665699";

    const navigate = useNavigate()

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        passwordConf: "",
        description: "",
        })

    const [image, setImage] = useState("")

    const [error, setError] = useState("")

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput(e){
        console.log(e.target.files)
        setImage(e.target.files[0]);
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', image)
        for (let fieldname in state){
            formData.append(fieldname, state[fieldname])
        }
        console.log(formData.forEach((item) => console.log(item)));

        try {
            await userService.signup(formData);
            handleAuth();
            navigate('/');
            
        }catch(err){
            console.log(err.message, "error in signup")
            setError("Check terminal for error in signup")
        }
    }

    return (
        <Grid>
            <Grid.Column>
                <Header as="h1" color="orange">
                    <Image src={logo} />Sign Up
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input
                        name="username"
                        placeholder="username"
                        value={state.username}
                        onChange={handleChange}
                        required 
                        />
                        <Form.Input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={state.email}
                        onChange={handleChange}
                        required
                        />
                        <Form.Input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={state.password}
                        onChange={handleChange}
                        required
                        />
                        <Form.Input
                        name="passwordConf"
                        type="password"
                        placeholder="Confirm Password"
                        value={state.passwordConf}
                        onChange={handleChange}
                        required
                        />
                        <Form.TextArea
                        label="Tell us about yourself"
                        name="description"
                        value={state.description}
                        placeholder="Best Beach Phrase"
                        onChange={handleChange}
            />
                        <Form.Field>
                        <Form.Input
                        type="file"
                        name="photo"
                        placeholder="upload image"
                        onChange={handleFileInput}
                        />
                        </Form.Field>
                        <Button type="submit" className="btn">
                        Signup
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}
