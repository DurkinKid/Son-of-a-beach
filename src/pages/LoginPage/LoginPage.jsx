import React, {useState} from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";


export default function LoginPage({handleAuth}){

  const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNzwtfuRzoCdEhFwp11Fgl3pydR3fH1ryVU3owkHnLg&usqp=CAU&ec=48665699";

  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Making the POST request to /api/users/login on our express server
      await userService.login(state);
      handleAuth();
      navigate("/");
    } catch (err) {
      
      setError(err.message);
    }
  }


    return (
      <Grid>
    <Grid.Column>
      <Header as='h1' color='orange' textAlign='center'>
        <Image src={logo} /> Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input icon='user' iconPosition='left' placeholder='E-mail address' type="email" name="email" value={state.email} onChange={handleChange} required />
          <Form.Input
            name="password"
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={state.password}
            onChange={handleChange}
            required
          />

          <Button color='orange' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/signup'>Sign Up</a>
        {error ? <ErrorMessage error={error} /> : null}
      </Message>
    </Grid.Column>
  </Grid>
      );
}

