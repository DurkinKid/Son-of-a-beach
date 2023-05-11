import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";






export default function PostCard({post, loggedUser, isProfile, addFavorite, removeFavorite}){
  console.log(post.postDate)
  

  const [showMap, setShowMap] = useState(false)

  const handleLocationClick = async () => {
    // const results = await geocodeByPlaceId(post.place_id);
    // const { lat, lng } = await getLatLng(results[0]); // results is an array, so use results[0]
    setShowMap(true);
  };

  const defaultProps = {center: {
    lat: post.latitude,
    lng: post.longitude
  },zoom:8}

  // const loader = new Loader({
  //   apiKey: "AIzaSyAPBJe1eXaGgb6NM3k_qUf85p7zmkZl7uI",
  //   version: "weekly"
  // });
  
  // loader.load().then(async () => {
  //   const { Map } = await google.maps.importLibrary("maps");
  
  //   map = new Map(document.getElementById("map"), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // });
   
  


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
      
      <Card raised>
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
                  post.photoUrl
                    ? post.photoUrl
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
      <Card.Content extra>
        <Icon
          name={"heart"}
          size="large"
          color={faveColor}
          onClick={clickHandler}
        />
        {post.favorites.length} Favorites
      </Card.Content>
    </Card>
    );
}

