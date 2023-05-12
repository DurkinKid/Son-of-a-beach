import React, {useState, useEffect} from 'react';
import { Navigate, Link, useParams} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import * as postsApi from '../../utils/postsApi'
import * as favoritesApi from '../../utils/favoritesApi'
import * as commentsApi from '../../utils/commentsApi';
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


    async function addFavorite(postId){
        try {
            const data = await favoritesApi.create(postId);
            getPost()
        }catch(err){
            console.log(err, "error in add Favorite")
        }
    }

    async function removeFavorite(favoriteId){
        try {
            const data = await favoritesApi.removeFavorite(favoriteId);
            getPost()
        }catch(err){
            console.log(err, "error in remove favorite")
        }
    }

    async function addComment(postId, body){
        try {
            console.log(body, "body")
            const data = await commentsApi.create(postId, body)
            getPost()
        }catch(err){
            console.log(err, "error in add Favorite")
        }
    }

    async function removeComment(commentId){
        try {
            const data = await commentsApi.removeComment(commentId);
            getPost()
        }catch(err){
            console.log(err, "error in remove favorite")
        }
    }



    useEffect(() => {
        getPost();
      }, []);
    


if (error) {
    return (
        <>
        <Loading />
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
                    <PostDisplay posts={posts} isProfile={false} loggedUser={loggedUser} loading={loading} addFavorite={addFavorite} removeFavorite={removeFavorite} addComment={addComment} removeComment={removeComment} postPerCol={1}  />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

