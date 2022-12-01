/*eslint-disable*/
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({ loc }) {
  const [lat, setLat] = useState(59.955413);
  const [long, setLong] = useState(337844);
  const defaultProps = {
    center: {
      lat: 33.5651,
      lng: 73.0169,
    },
    zoom: 13,
  };

  const handleApiLoaded = (map, maps) => {
    console.log(map);
    console.log(maps);
  };

  function _onClick(obj) {
    // console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
    setLat(obj.lat);
    setLong(obj.lng);
    loc(obj.lat, obj.lng);
  }
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk",
          libraries: ["places", "geometry", "drawing", "visualization"],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={_onClick}
      >
        <AnyReactComponent lat={lat} lng={long} text="📌" />
        {/* <LocationOnIcon
          lat={lat}
          lng={long}
          sx={{ color: "red", fontSize: "large", "&.MuiIcon-fontSizeLarge": { fontSize: "100px" } }}
        /> */}
        {/* </AnyReactComponent> */}
      </GoogleMapReact>
    </div>
  );
}
