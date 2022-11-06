import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {GOOGLE_MAPS_API_KEY} from '../../common/apiconstants';

navigator.geolocation = require('react-native-geolocation-service');

//Place Here Google Map Api Key
const GOOGLE_MAP_API_KEY = 'AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE';

//Google Auto Place Search Component
const GoogleAutoPlaceSearch = props => {
  const {refName, onPress, inputContainerStyle, inputStyle, placeholder} =
    props;
  return (
    
    <GooglePlacesAutocomplete
      ref={refName}
      placeholder={placeholder}
      autoFocus={false}
      minLength={2}
      onFail={error => console.error(error)}
      returnKeyType={'search'}
      autoCapitalize={'none'}
      listViewDisplayed={false}
      fetchDetails={true}
      onPress={onPress}
      isRowScrollable={true} 
      query={{
        key: GOOGLE_MAP_API_KEY,
        language: 'en',
        types: 'address',
      }}
      styles={{
        textInputContainer: inputContainerStyle,
        textInput: inputStyle,
        description: {
          color: 'black',
        },
        container: {
          flex: 1,
          width: '100%',
        },
       
      }}
      
      enablePoweredByContainer={false}
      {...props}
    />
   
  );
};

export default GoogleAutoPlaceSearch;
