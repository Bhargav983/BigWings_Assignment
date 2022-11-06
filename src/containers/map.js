import React,{useEffect,useState} from 'react';

import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import MapView from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';  
import { Polyline } from 'react-native-maps'; 

const Map = ({navigation,route}) => {
  // const {OriLat,OriLong,} = route.params;
  var Polyline = require('@mapbox/polyline');
  const {desLat,desLong,curLat,curLong} = route.params;
  const [waypts1, setwaypts1] = useState({
    latitude:  0.0,
    longitude:0.0
  }
);
const [waypts2, setwaypts2] = useState({
  latitude:  0.0,
  longitude:0.0
}
);
   console.log('routes=',route.params)
const origin = {latitude: parseFloat(curLat), longitude: parseFloat(curLong)};
const destination = {latitude: parseFloat(desLat), longitude: parseFloat(desLong)};

const GOOGLE_MAPS_APIKEY = 'AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.48;
const LONGITUDE = 71.07;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var mapView = null;

useEffect(
  ()=>{getdirections()},[]
)
const getdirections=async()=>{
  try{
      // let startLoc="17.4368, 78.4007";
      let startLoc = curLat+", "+curLong
      let destinationLoc = desLat+", "+desLong
      console.log("loc=",startLoc,destinationLoc);
      // let startLoc="17.4477,78.4980"
      // let destinationLoc= "17.4421, 78.3772";
      let resp=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}
      &mode="walking"&key=AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE`)
      
      let respJson = await resp.json();
      // console.log("respJson=",respJson)
      // console.log("respJson=",Polyline.decode(respJson.routes[0].overview_polyline.points))
      let points= Polyline.decode(respJson.routes[0].overview_polyline.points)
      // console.log("points==",points)
      let coords=points.map((point,index)=>{
          return{
              latitude:point[0],
              longitude:point[1]
          }
      })
      // console.log(coords)
      let index1= parseInt(coords.length / 3.0)
      let index2= parseInt(coords.length * 2.0/ 3.0)
      setwaypts1(coords[index1])
      setwaypts2(coords[index2])
       console.log(waypts1)
  }
  catch(e){
      console.log("error==",e)
  }
}
const  onReady = (result) => {
  mapView.fitToCoordinates(result.coordinates, {
    edgePadding: {
      right: (width / 10),
      bottom: (height / 10),
      left: (width / 10),
      top: (height / 10),
    },
  });
}
const [position, setPosition] = useState({
  latitude: 10,
  longitude: 10,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
});

  return (
    <View style={StyleSheet.absoluteFill}>

    <MapView 
     initialRegion={{
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}  
    style={StyleSheet.absoluteFill}
          ref={c => mapView = c}
          >
          <Marker  coordinate={origin} title={'Starting '}  pinColor={'green'} />  
          <Marker  coordinate={destination} title={'Reaching '}  pinColor={'red'} />  
          
          <Marker coordinate={waypts1} title={'WayPoint 1'} pinColor={'blue'}/>
          <Marker coordinate={waypts2} title={'WayPoint 2'} pinColor={'blue'}/>
    <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="green"
      waypoints= {[]}
      onStart={(params) => {
        console.log(`Started routing between "${params.origin}" and "${params.destination}"${(params.waypoints.length ? " using waypoints: " + params.waypoints.join(', ') : "")}`);
      }}
      onReady={(result)=>onReady(result)}
      onError={(errorMessage) => {
        console.log('errorMessage=',errorMessage);
        alert('Not possible to find routes')
      }}
      resetOnChange={false}
    />
  </MapView>
  </View>
  )
}
export default Map;