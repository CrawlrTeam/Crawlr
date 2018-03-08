import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

const LoginView = props => (
  <Grid celled>
    <Grid.Row>
      <Grid.Column width={8}>
        <h2>Log In to Crawlr Account</h2>
        <form>
          <p> Username: </p> <input className="username" type="username" />
          <p> Password: </p> <input className="password" type="password" />
          <input onClick={props.submit} type="submit"></input>
        </form>
      </Grid.Column>
      <Grid.Column width={8}>
        <h2>Log in through Facebook</h2>
        <Button
          role="button"
          color='facebook'
          href="/auth/facebook">
          <div name="facebook"> <Icon name='facebook' /></div>
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LoginView;