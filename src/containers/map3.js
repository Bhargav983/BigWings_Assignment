import React,{useEffect,useState} from 'react';

import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import MapView from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';  
import { Polyline } from 'react-native-maps';
const Map3 = ({navigation,route}) => {
    var Polyline = require('@mapbox/polyline');
    const [waypts1, setwaypts1] = useState({
        latitude:  '',
        longitude:''
      }
    );
    const [waypts2, setwaypts2] = useState({
        latitude:  0.0,
        longitude:0.0
      }
    );
  const {desLat,desLong,curLat,curLong} = route.params;

  //  const {OriLat,OriLong,curLat,curLong} = route.params;
   console.log(route.params)
const origin = {latitude: 17.4368, longitude:78.4007};
const destination = {latitude: 17.4421, longitude:78.3772};

const GOOGLE_MAPS_APIKEY = 'AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.48;
const LONGITUDE = 71.07;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var mapView = null;

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

// useEffect(
//     ()=>{handleDirections()},[]
// )
useEffect(
    ()=>{getdirections()},[]
)
const handleDirections=()=>{
    const data={
        source:{latitude: 17.4368, longitude:78.4007},
        destination:{latitude: 17.4421, longitude:78.3772},
        params:[
            {key:"travelmode",value:"walking"},
            {key:"dir_action",value:"navigate"}
        ]
            
    }
    getDirections(data)
}
const getdirections=async()=>{
    try{
        //  let startLoc="17.4368, 78.4007";
        // let destinationLoc= "17.4421, 78.3772";
    
        let startLoc = (curLat+", "+curLong).toString()
      let destinationLoc = (desLat+","+desLong).toString()
      console.log(typeof(startLoc))
        let resp=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}
        &mode="walking"&key=AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE`)
        setTimeout(() => {
         },3000);
        let respJson = await resp.json();
        // console.log("respJson=",respJson)
        // console.log("respJson=",Polyline.decode(respJson.routes[0].overview_polyline.points))
        if(respJson.routes[0].overview_polyline){

            let points= Polyline.decode(respJson.routes[0].overview_polyline.points)
            // console.log("points==",points)
            let coords=points.map((point,index)=>{
                return{
                    latitude:point[0],
                    longitude:point[1]
                }
            })
            let index1= parseInt(coords.length / 3.0)
          let index2= parseInt(coords.length * 2.0/ 3.0)
          setwaypts1(coords[index1])
          setwaypts2(coords[index2])
          console.log('waypts1',waypts1.latitude)
          console.log('waypts2',waypts2)
             console.log(coords.length)
        }
       
    }
    catch(e){
        console.log("error==",e)
    }
}
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
           <Marker  coordinate={origin} title={'Starting Point'}  pinColor={'green'} />  
          <Marker  coordinate={destination} title={'Reaching Point'}  pinColor={'red'} />  
          
         {/* {
         (waypts1.latitude!=='') ?
          (<Marker coordinate={waypts1} title={'WayPoint 1'} pinColor={'blue'}/>
          <Marker coordinate={waypts2} title={'WayPoint 2'} pinColor={'blue'}/>:null)
        }  */}
       
    <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="green"
    //   waypoints= {[{latitude: 17.4489, longitude:78.3832},{latitude:17.4477,longitude:78.4980}]}
      waypoints={[]}
    //   optimizeWaypoints={true}
      onStart={(params) => {
        console.log(`Started routing between "${params.origin}" and "${params.destination}"${(params.waypoints.length ? " using waypoints: " +params.waypoints[0].latitude +params.waypoints.join(', ') : "")}`);
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
export default Map3;