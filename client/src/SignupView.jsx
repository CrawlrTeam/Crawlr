import React from 'react';
import { Grid } from 'semantic-ui-react';

const SignupView = props => (
  <Grid celled>
    <Grid.Row>
      <Grid.Column width={5}>
        <h2>Sign Up With Crawlr</h2>
        <form>
          <p> Username: </p> <input className="username" type="username" />
          <p> Password: </p> <input className="password" type="password" />
          <input onClick={props.submit} type="submit"></input>
        </form>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default SignupView;