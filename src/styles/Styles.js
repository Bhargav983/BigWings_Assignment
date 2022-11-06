import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 72, 147, 0.75)',
    marginTop:10,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
   paddingHorizontal:20,
  },
    placeApiContainer: {
        borderRadius: (25),
        borderWidth: 2,
        borderColor: 'red',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        minHeight: 46,
        marginTop:5,
        backgroundColor: 'white',
        width:'90%'
      },
      mapInputContainer: {
        
        width: '100%',
        alignSelf: 'flex-start',
        paddingLeft: 30,
        backgroundColor: 'rgba(255,255,255,0.6)',
      },
      locationSearchInput: {
        color: '#5d5d5d',
      },   
      button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
});