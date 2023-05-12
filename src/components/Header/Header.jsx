import React from 'react';
import { Header, Image, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



export default function HeaderPage({ loggedUser, handleLogout }) {
  return (
  <>
    
    <Header as="h2">

      <Segment>
        <Link to="/">
          <Icon name="home" />
        </Link>
     
        {!loggedUser && (
          <>
            <Link to="/signup">Sign-Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </>
        )}
      
      {loggedUser && (
        <>
        <Link to={`/${loggedUser.username}`}>
          <Image
            src={
              loggedUser.photoUrl
                ? loggedUser.photoUrl
                : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
            }
            avatar
          />
        </Link>
        </>
      )}
      
      </Segment>
    </Header>
    
    </>
  );
}
