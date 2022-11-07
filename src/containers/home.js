import React, {useEffect, useRef} from 'react';
import { Text, View ,TouchableOpacity,Button,Image} from 'react-native';
import GoogleAutoPlaceSearch from '../common/GoogleAutoPlaceSearch';
// import Geolocation from 'react-native-geolocation-service';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {styles} from '../styles/Styles';
import { appPermission,permissionType } from '../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
const Home = ({navigation}) => {

  const googlePlaceInput = useRef();
  
  const [location, setLocation] = React.useState('');
  const [geoLocation, setGeoLocation] = React.useState([]);
  const [curLocation,setCurLocation] = React.useState([]);
  const [searchLocationInput, setSearchLocationInput] = React.useState('');
  const [curLat,setCurLat]=React.useState('');
  const [curLong,setCurLong]=React.useState('');
  const [oriLat,setOriLat]=React.useState('');
  const [oriLong,setOriLong]=React.useState('');
  const [isSubmitDisabled,setIsSubmitDisabled] = React.useState(true);
 
  
  useEffect(
    ()=>{
       onMove()
    },[]
  )
 const  onMove = async () => {
  // await appPermission('location');
  // alert('inside get current ');
    try{
    Geolocation.getCurrentPosition((data) => {
        console.log(data)
        // alert(data)
        // this.setState({ curLat:JSON.stringify(data.coords.latitude),curLong:JSON.stringify(data.coords.longitude) });
        setCurLat(JSON.stringify(data.coords.latitude));
        setCurLong(JSON.stringify(data.coords.longitude));
        // if(!curLat)
        // {
        //   onMove()
        // }

        // alert('curLat=',curLat.toString(),'curLong',curLong.toString())
        // console.log('curLat',curLat);
        // console.log('curLong',curLong);
        // navigation.navigate('Map',{OriLat:oriLat.toString(),OriLong:oriLong.toString(),curLat:curLat.toString(),curLong:curLong.toString()});
      })}
      catch(e){
        
        console.log(e);
      }
      
      // navigation.navigate('Map2',{OriLat:oriLat.toString(),OriLong:oriLong.toString(),curLat:curLat.toString(),curLong:curLong.toString()});
    
}
useEffect(()=>{
  if(!searchLocationInput)
   setIsSubmitDisabled(true)
   else
   setIsSubmitDisabled(false)
},[searchLocationInput])
  const gotoMap=()=>{
    console.log('curLat',curLat);
        console.log('curLong',curLong);
    
    navigation.navigate('Map',{desLat:oriLat.toString(),desLong:oriLong.toString(),curLat:curLat.toString(),curLong:curLong.toString()});
  }
  const onListItemPress = details => {
    if (!details.address_components) {
      // setIsSubmitDisabled(true)
      return;
    }
    let placeInputText = googlePlaceInput.current.getAddressText();
    setLocation(placeInputText);
    // Geo Location
    const geometry = details.geometry.location;
    const geo_location = [geometry.lat, geometry.lng];
    setGeoLocation(geo_location);
    setOriLat(geo_location[0]);
    setOriLong(geo_location[1])
    // setIsSubmitDisabled(false)
    console.log(geo_location[0],geo_location[1])
  };
  return (
    <View
      style={{
        flex: 1,backgroundColor:'lightgreen'
      }}>
        <View style={{alignItems:'center',justifyContent:'center',marginTop:90}}> 
        <Image source={require('../assets/images/logo.png')} width={50} height={30}/>
        </View>
        <Text style={{marginLeft:20,marginTop:100,fontSize:17,fontWeight:'bold'}}>Type location below :</Text>
        <View style={{alignItems:'center',justifyContent:'center'}}> 
        

       <View style={styles.placeApiContainer}>
                {/* <Search_Icon style={styles.searchIcon} /> */}
                
                <GoogleAutoPlaceSearch
                  refName={googlePlaceInput}
                  onPress={(data, details = null) => {
                    onListItemPress(details);
                  }}
                  inputContainerStyle={styles.mapInputContainer}
                  inputStyle={styles.locationSearchInput}
                  placeholder={'Enter Your Location'}
                  textInputProps={{
                    onChangeText: text => {
                      setSearchLocationInput(text);
                    },
                    placeholderTextColor: 'red',
                    style: {
                      color: 'black',
                    },
                  }}
                />
               
                
              </View>
              
              <View style={{marginTop:100,alignItems:'center',justifyContent:'center'}}>
              <Button
                title="  Go Map  "
                color="green"
                onPress={()=>gotoMap()}
                disabled={isSubmitDisabled}
                style={{borderRadius:15}}
              />
              </View>
           
    </View>
    </View>
  )
}


export default Home;