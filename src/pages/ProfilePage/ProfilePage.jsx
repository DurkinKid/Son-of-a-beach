import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import userService from "../../utils/userService";
import * as favoritesApi from '../../utils/favoritesApi';
import Loading from "../../components/Loader/Loader";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import ProfileBio from "../../components/ProfileBio/ProfileBio";

export default function ProfilePage({loggedUser}){

    const [posts, setposts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { username } = useParams();
    console.log(loggedUser.username, "Logged in user")

    useEffect(() => {
 
        getProfile();
      }, []);

      async function getProfile(){
        try {
            const data = await userService.getProfile(username);
            setLoading(false);
            setposts(data.posts);
            setProfileUser(data.user);
        }catch(err){
            console.log(err, "error in getProfile in profile bio component")
            setError("Profile does not exist");
        }
      }

      async function addFavorite(postId){
        try {
           const data = await favoritesApi.create(postId)
           getProfile() 
        }catch(err){
            console.log(err, "error in addFavorite in profile bio component")
        }
      }

      async function removeFavorite(favoriteId){
        try {
            const data = await favoritesApi.removeFavorite(favoriteId)
            getProfile()
        }catch(err){
            console.log(err, "error in remove like function in profile bio component")
        }
      }

      if (error) {
        return (
          <>
            
            <ErrorMessage error={error} />;
          </>
        );
      }
    
      if (loading) {
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
                <ProfileBio loggedUser={profileUser}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
            <Grid.Column>
                <PostDisplay addFavorite={addFavorite} removeFavorite={removeFavorite} loggedUser={loggedUser} isProfile={true} posts={posts} />
            </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}