import { Card } from 'semantic-ui-react';
import Loading from '../Loader/Loader';

import PostCard from '../PostCard/PostCard';

export default function PostDisplay({loggedUser, posts, loading, isProfile}){
    if(loading) {
        return (
        <Loading size="large"/>
    );
}
    return(
        
    <Card.Group>
        {posts.map((post) => {
            return <PostCard key={post._id} isProfile={isProfile} loggedUser={loggedUser} post={post} loading={loading} />
        })}
      </Card.Group>
    )
}