import React, {useState, useEffect} from 'react';
import { Navigate, Link, useParams} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import * as postsApi from '../../utils/postsApi'
import { Grid } from 'semantic-ui-react';

import tokenService from '../../utils/tokenService';
import HeaderPage from '../../components/Header/Header';
import BeachForm from '../../components/BeachForm/BeachForm';
import PostDisplay from '../../components/PostDisplay/PostDisplay';
import Loading from '../../components/Loader/Loader';








export default function FeedPage({loggedUser}){

    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    async function handlePost(post){
        try {
            setLoading(true);
            const reponseData = await postsApi.create(post);
            console.log(reponseData, "response from the server")
            setPost([reponseData.data, ...posts]);
            setLoading(false)
        }catch(err){
            setLoading(false)
            console.log(err, "error in add post function in feedpage component")
            setError("error in creating post, try again")
        }
    }

    async function getPost(){
        try {
            const response = await postsApi.getAll();
            console.log(response, "data");
            setPost(response.posts);
            setLoading(false);
        }catch(err){
            console.log(err.message, " error in getPost")
            setLoading(false)
        }
    }

    useEffect(() => {
        getPost();
      }, []);
    


if (error) {
    return (
        <>
        <HeaderPage loggedUser={loggedUser} />
        </>
    );
}
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
            <h2>Welcome You Son's of Beaches</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <BeachForm handlePost={handlePost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <PostDisplay posts={posts} isProfile={false} loggedUser={loggedUser} loading={loading} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

