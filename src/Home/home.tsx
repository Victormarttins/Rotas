import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import CameraPage from '../component/TelaComponent';

export default function HomePage() {
    return (
       
        <View style={styles.container}>
    
            <MapView style={styles.map} />

        <CameraPage/>
       

   </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});




