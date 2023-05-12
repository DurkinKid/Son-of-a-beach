import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import CommentsPage from "../CommentsPage/CommentsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";






export default function PostCard({post, loggedUser, isProfile, addFavorite, removeFavorite, addComment, removeComment}){
  console.log(post.postDate)
  

  const [showMap, setShowMap] = useState(false)

  const handleLocationClick = async () => {
    // const results = await geocodeByPlaceId(post.place_id);
    // const { lat, lng } = await getLatLng(results[0]); // results is an array, so use results[0]
    setShowMap(!showMap);
  };

  const defaultProps = {center: {
    lat: post.latitude,
    lng: post.longitude
  }, zoom:8}
   
  


  const faveIndex = post.favorites.findIndex(
    (favorite) => favorite.username === loggedUser.username
  );
  // if not the result will be -1 indicating the user is not in the post.likes array
  // which means they haven't liked the post

  const faveColor = faveIndex > -1 ? "red" : "grey";

  const clickHandler =
    faveIndex > -1
      ? () => removeFavorite(post.favorites[faveIndex]._id)
      : () => addFavorite(post._id);
      
  const postDate = new Date(post.postDate);
  const formattedDate = `${postDate.toLocaleString('default', { month: 'long' })} ${postDate.getDate()}, ${postDate.getFullYear()}`;

  

    return (
      
      <Card centered raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="center">
          <Card.Header>
            <Link to={`/${loggedUser.username}`}>
              <Image
                size="large"
                avatar
                src={
                  loggedUser.photoUrl
                    ? loggedUser.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {loggedUser.username}
            </Link>
          </Card.Header>
        </Card.Content>
       )}
       <Card.Content textAlign="center">
        <Card.Description>
                {post.description}
        </Card.Description>
        </Card.Content> 
      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Content textAlign="center">
        <Card.Description>
          <div onClick={handleLocationClick}>{post.location}</div>
        </Card.Description>
      </Card.Content>

      {showMap && (
        <Card.Content textAlign="center">
          <div style={{ height: "200px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyAPBJe1eXaGgb6NM3k_qUf85p7zmkZl7uI",
            language: "en" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <div></div>
            </GoogleMapReact>
          </div>
        </Card.Content>
      )}

      <Card.Content textAlign="center">
        <Card.Description>{formattedDate}</Card.Description>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        <Icon 
          name={"heart"}
          size="large"
          color={faveColor}
          onClick={clickHandler}
        />
        {post.favorites.length}
        <Icon
        name="comment"
        size="large"
        color="blue"
        onClick={() => {
          let commentEl = document.getElementById(`p${post._id}`)
          if(commentEl.style.display === "none"){
            commentEl.style.display = "block"
          }else if (commentEl.style.display === "block"){
            commentEl.style.display = "none"
          }
        }}
        />{post.comments.length}
      </Card.Content>
      <CommentsPage post={post} addComment={addComment} removeComment={removeComment} loggedUser={loggedUser} />
    </Card>
    );
}

