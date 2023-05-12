import { Card, Grid } from 'semantic-ui-react';
import Loading from '../Loader/Loader';

import PostCard from '../PostCard/PostCard';

export default function PostDisplay({loggedUser, posts, loading, isProfile, removeFavorite, addFavorite, addComment, removeComment, postPerCol}){
    if(loading) {
        return (
        <Loading size="large"/>
    );
}
    return(
    <Grid>
        <Grid.Column>
        <Card.Group>
        {posts.map((post) => {
            return <PostCard key={post._id} isProfile={isProfile} loggedUser={loggedUser} post={post} loading={loading} removeFavorite={removeFavorite} addFavorite={addFavorite} addComment={addComment} removeComment={removeComment} postPerCol={postPerCol} />
        })}
      </Card.Group>
        </Grid.Column>
    </Grid>
    
    )
}