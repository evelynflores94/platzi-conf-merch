import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ data }) => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: -2.217633,
    lng: -80.853088,
  };

  /* const defaultCenter = {
    lat: data.lat,
    lng: data.lng,
  };*/

  return (
    <LoadScript googleMapsApiKey="AIzaSyCD4vjRjBuK-_yGh2YhmUmq9WRX6yDKGJo">
      <GoogleMap mapContainerStyle={mapStyles} zoom={17} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
