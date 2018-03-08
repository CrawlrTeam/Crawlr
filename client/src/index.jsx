import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage.jsx';
import FindPage from './FindPage.jsx';
import LandingPage from './LandingPage.jsx';
import Search from './Search.jsx';
import MapContainer from './MapContainer.jsx';
import CrawlEntryList from './CrawlEntryList.jsx';
import CrawlCreateForm from './CrawlCreateForm.jsx'
import DirectionsMap from './DirectionsMap.jsx';
import LoginView from "./LoginView.jsx";
import SignupView from "./SignupView.jsx";

import $ from 'jquery';
import { Grid, Menu, Button } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topCrawlsList: [],
      findSearch: '',
      crawlList: [],
      barAdded: [],
      searchValue: '',
      barList: [],
      location: {lat: 30.2672, lng: -97.7431},
      activeItem: 'home',
      landingPageView: true,
      crawlListView: false,
      directionMapView: false,
      city: ''
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleUserCreation = this.handleUserCreation.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.getIntialCrawlList = this.getIntialCrawlList.bind(this);
    this.handleFindSearch = this.handleFindSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBarAdd = this.handleBarAdd.bind(this);
    this.handleBarRemove = this.handleBarRemove.bind(this);
    this.createCrawl = this.createCrawl.bind(this);
    this.saveCrawl = this.saveCrawl.bind(this);
    this.cancelCrawl = this.cancelCrawl.bind(this);
  }

  //changes what feature is shown (home, find a crawl, create a crawl)
  //called in index.jsx and HomePage.jsx
  handleMenuClick(e, { name }) {
    this.setState({
      activeItem: name
    });
  }

  //shows login and sign up pages when their respecitive buttons are clicked
  //called in index.jsx
  handleButtonClick(e) {
    this.setState({
      activeItem: e.target.name || "home"
    });
  }

  //gets the info from user from the sign up view and sends via a post route to the server and then the database
  //called in SignUpView.jsx
  handleUserCreation(e) {
    e.preventDefault();
    const name = $(".username").val();
    const pw = $(".password").val();
    const newuser = {username: name, password: pw};
    $.post('/signup', newuser, () => {
      this.setState({
        activeItem: 'home'
      });
    });
  }

  //gets the info from the login page and sends the info to the database via the server and then sets the view back to the home page view
  //called in LoginView.jsx
  handleAuth(e) {
    e.preventDefault();
    const name = $(".username").val();
    const pw = $(".password").val();
    const thisuser = {username: name, password: pw};
    $.post('/login', thisuser, () => {
      this.setState({
        activeItem: 'home'
      });
    });
  }

  //gets all the crawls for intial loading of find a crawl
  //called in FindPage.jsx
  getIntialCrawlList() {
    $.get('/all', data => {
      this.setState({
        crawlList: data
      });
    });
  }

  //handles city search from find a crawl, makes a post request, that gets routed to our data base and returns crawls from the database that belong to the city that was being searched
  //called in FindPage.jsx
  handleFindSearch (searchText) {
    this.setState({findSearch: searchText});
    let location = {city: searchText};
    $.post('/FindCrawls', location, (data) => {
      this.setState({
        crawlList: data
      });
    });
  }

  //handles city search from create a crawl, makes a post request for bars at that city and sets the state with the new info and changes a view state
  //called in Search.jsx
  handleSearch (searchText) {
    this.setState({searchValue: searchText});
    let location = {location: searchText};
    $.post('/Search', location, (data) => {
      this.setState({
        barList: data.barList || [],
        location: data.coor,
        landingPageView: false,
        city: searchText
      });
    });
  }

  //adds a new bar to state when a marker is double clicked in create a crawl
  //called in BarMap.jsx
  handleBarAdd(bar) {
    var newBarList = this.state.barAdded;
    newBarList.push(bar);
    this.setState({
      barAdded: newBarList,
      crawlListView: true
    });
  }

  //removes a bar from state when the user clicks an x in create a crawl
  //called in CrawlEntry.jsx
  handleBarRemove(e) {
    var newBarList = this.state.barAdded;
    newBarList.splice(e.target.name, 1);
    this.setState({
      barAdded: newBarList
    });
  }

  //changes the view to the directions map view
  //called in CrawlEntryList.jsx
  createCrawl() {
    this.setState({
      directionMapView: true,
      crawlListView: false
    });
  }

  //creates an object literal with using info from the create a crawl form and state.  This object literal is then sent to the database via the server
  //called in CrawlCreateForm.jsx
  saveCrawl(e) {
    e.preventDefault();
    const crawlname = $("#crawl-name").val();
    const crawldesc = $("#crawl-description").val();
    const crawl = {
      name: crawlname,
      description: crawldesc,
      bars: this.state.barAdded,
      city: this.state.city
    }
    $.post('/create', crawl)
    this.setState({
      barAdded: [],
      barList: [],
      location: {},
      activeItem: "home",
      landingPageView: true,
      directionMapView: false
    });
  }

  //goes back to the building a crawl view from direction map
  //called in CrawlCreateForm.jsx
  cancelCrawl() {
    this.setState({
      directionMapView: false,
      crawlListView: true
    })
  }

  render() {
    const { activeItem } = this.state.activeItem;
    return (
      <div>
       <Menu fixed="top" inverted>
          <Menu.Item
            color="yellow"
            name='home'
            active={this.state.activeItem === 'home'}
            onClick={this.handleMenuClick}
          >
            Home
          </Menu.Item>
          <Menu.Item
            name='find'
            color="yellow"
            active={this.state.activeItem === 'find'}
            onClick={this.handleMenuClick}
          >
            Find a Crawl
          </Menu.Item>
          <Menu.Item
            name='create'
            color="yellow"
            active={this.state.activeItem === 'create'}
            onClick={this.handleMenuClick}
          >
            Create a Crawl
          </Menu.Item>
          <div className="right menu">
            <Button
              role="button"
              name="login"
              onClick={this.handleButtonClick}
            >
              Log In
            </Button>
            <Button
              role="button"
              name="signup"
              onClick={this.handleButtonClick}
            >
              Sign Up!
            </Button>
            <Button>
              <div href="/logout">Log Out</div>
            </Button>
          </div>
        </Menu>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <img src="./images/crawlrlogo.png"></img>
            </Grid.Column>
            <Grid.Column width={7}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          {this.state.activeItem === 'login' &&
          <LoginView submit={this.handleAuth} />
          }
          {this.state.activeItem === 'signup' &&
          <SignupView submit={this.handleUserCreation} />
          }
          {this.state.activeItem === 'home' &&
          <Grid celled>
            <Grid.Row>
              <HomePage
                onMenuClick={this.handleMenuClick}
                topCrawls={this.state.topCrawlsList}
              />
            </Grid.Row>
          </Grid>
          }
          {this.state.activeItem === 'find' &&
          <Grid celled>
            <Grid.Row>
              <FindPage
                handleSubmit={this.handleFindSearch}
                crawls={this.state.crawlList}
                getIntialCrawlList={this.getIntialCrawlList}
              />
            </Grid.Row>
          </Grid>
          }
          {this.state.activeItem === 'create' &&
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={7}>
                <h3>First, enter your city of choice!</h3>
                <Search handleSubmit={this.handleSearch}/>
              </Grid.Column>
              <Grid.Column width={5}>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={11}>
                {this.state.landingPageView &&
                <LandingPage />}
                {
                !this.state.directionMapView &&
                !this.state.landingPageView &&
                <MapContainer
                  addbar={this.handleBarAdd}
                  barlist={this.state.barList}
                  baradded={this.state.barAdded}
                  location={this.state.location}
                />
                }
                {this.state.directionMapView &&
                <DirectionsMap crawlBars={this.state.barAdded} />}
              </Grid.Column>
              <Grid.Column width={5}>
                {
                !this.state.landingPageView &&
                !this.state.directionMapView &&
                !this.state.crawlListView &&
                !this.state.barAdded.length &&
                <div><h4>Double click on a marker to start adding bars to your crawl!</h4></div>
                }
                {this.state.crawlListView &&
                  <CrawlEntryList
                    removebar={this.handleBarRemove}
                    barAdded={this.state.barAdded}
                    createCrawl={this.createCrawl}
                  />}
                {this.state.directionMapView &&
                <CrawlCreateForm
                  barAdded={this.state.barAdded}
                  cancelcrawl={this.cancelCrawl}
                  savecrawl={this.saveCrawl}
                />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
        </Grid>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));