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
 
   console.log('routes=',route.params)
const origin = {latitude: parseFloat(curLat), longitude: parseFloat(curLong)};
const destination = {latitude: parseFloat(desLat), longitude: parseFloat(desLong)};

const GOOGLE_MAPS_APIKEY = 'AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE';
const handleDirections=(waypt1,waypt2)=>{
  const data={
      source:origin,
      destination:destination,
      params:[
          {key:"travelmode",value:"driving"},
          {key:"dir_action",value:"navigate"}
      ],
      waypoints: [
        waypt1,waypt2]
          
  }
  getDirections(data)
}
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
      handleDirections(coords[index1],coords[index2]);
  }
  catch(e){
      console.log("error==",e)
  }
}


  return (
    <View style={StyleSheet.absoluteFill}>

  </View>
  )
}
export default Map;