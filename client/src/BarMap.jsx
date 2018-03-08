import React from 'react';
import ReactDOM from 'react-dom';
import Google from 'google-maps-react';

class BarMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
    this.handleWindowClick = this.handleWindowClick.bind(this);
  }

  handleWindowClick() {
    this.props.addbar(this.state.selected);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevProps.location !== this.props.location) {
      this.loadMap();
    }
  }

  //For more info on Google-maps-react here's the docs we used. https://github.com/fullstackreact/google-maps-react It's a good adaptation of built in maps but is missing some features. We had trouble implementing info windows with "Add this to bar list" events using this module, so feel free to try something else if you want that functionality!

  loadMap() {
    if (this.props && this.props.google) {
      const barmap = this;
      const location = this.props.location
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = document.getElementById('map');
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign({}, {
        center: location,
        zoom: 13,
        getsureHandling: 'cooperative',
        mapTypeId: 'terrain'
      });
      this.map = new maps.Map(node, mapConfig);
      this.props.barlist.map(bar => {
        const infostring = `<div>
        <h1>${bar.name}</h1>
        <p>${bar.formatted_address}</p>
        <p>Rating: ${bar.rating}</p>
        <p>Double click pin to add to crawl </p>
        </div>`;
        const info = new google.maps.InfoWindow({
          content: infostring
        });
        const marker = new google.maps.Marker({
          position: {lat: bar.geometry.location.lat, lng: bar.geometry.location.lng},
          map: this.map,
          title: bar.name
        });
        marker.addListener('click', function() {
          if (barmap.state.info) {
            barmap.state.info.close();
          }
          barmap.setState({
            selected: bar,
            info: info
          });
          info.open(map, marker);
        });
        marker.addListener('dblclick', function(){
          if (barmap.props.baradded.length < 6) {
            barmap.handleWindowClick();
          };
        });
      });
    }
  }

  render() {
    const style = {
      width: '46vw',
      height: '46vh',
    };
    return (
      <div ref="map" id="map" style={style}>
        loading map...
      </div>
    );
  }
}

export default BarMap;