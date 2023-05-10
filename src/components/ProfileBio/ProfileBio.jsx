import { Image, Grid, Segment } from "semantic-ui-react";

export default function ProfileBio({ loggedUser }) {
console.log(loggedUser)
    return (
      <Grid textAlign="center" columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image
              src={`${
                loggedUser.photoUrl
                  ? loggedUser?.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              } `}
              avatar
              size="small"
            />
          </Grid.Column>
          <Grid.Column  style={{ maxWidth: 450 }}>
            <Segment vertical>
              <h3>{loggedUser.username}</h3>
            </Segment>
            <Segment textAlign="left">
              <span className="profile-bio-span">{loggedUser.description}</span>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }