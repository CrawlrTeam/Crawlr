import React from 'react'
import { Grid, Header, Button } from 'semantic-ui-react';

const HomePage = props => (
  <div>
    <Grid celled>
      <Grid.Row>
        <Grid.Column>
          <Header>Welcome to Crawlr!</Header>
          <p> To get started . . .</p>
          <li> Click "Find A Crawl" to check out user created crawls in your area.</li>
          <li> Click "Create A Crawl" to build your own crawl out of our selection of top rated bars in your area!</li>
          <li> Register an account with us or sign in through Facebook to share with friends and join people's crawls!</li>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row length={2}>
        <Grid.Column width={8}>
        <Button fluid name='find' secondary onClick={props.onMenuClick}>Find a Crawl</Button>
        </Grid.Column>
        <Grid.Column width={8}>
        <Button fluid name='create' secondary onClick={props.onMenuClick}>Create a Crawl</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default HomePage;