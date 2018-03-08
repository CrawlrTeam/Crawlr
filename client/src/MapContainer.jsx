import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import BarMap from './BarMap.jsx';

const MapContainer = props => (
  <div>
    <BarMap
      addbar={props.addbar}
      baradded={props.baradded}
      barlist={props.barlist}
      location={props.location}
      google={props.google}
    />
  </div>
);

 export default GoogleApiWrapper({
  apiKey: 'AIzaSyAkRQG5OG1z4VNep44EcCu1wdsGUq3_6X4',
 })(MapContainer);