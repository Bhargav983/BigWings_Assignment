import React from 'react';
import { Text, View } from 'react-native';

const Map2 = ({navigation,route}) => {
    
   const {OriLat,OriLong,curLat,curLong} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world! {OriLat} {OriLong} {curLat} {curLong}</Text>
    </View>
  )
}
export default Map2;