import React, {useState, useEffect} from 'react'
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert, } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from '../components/MapPreview'

const LocationPicker = (props) => {
    const [pickedLocation, setPickedLocation] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const mapPickedLocation = props.navigation.getParam('pickedLocation');
    const { onLocationPicked } = props
    
    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation)
        }
    },[mapPickedLocation, onLocationPicked])

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert('Permissions Error', 'you need to allow us to use the location', [{ text: 'OK' }])
            return false
        }
        return true
    }
    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    const getLocationHandler = async () => {
        setIsFetching(true)
        const hasPermission = await verifyPermission()
        if (!hasPermission) { return }
        try {
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 })
            setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
            onLocationPicked({ lat: location.coords.latitude, lng: location.coords.longitude })
        }
        catch(err){
            Alert.alert('failed toLocate','failed to get your location try again later or chose a place from the map',[{text:'OK'}])
        }
        setIsFetching(false)
    }
    return (
        <View style={styles.locationPicker}>
            
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
                {isFetching ? <ActivityIndicator size={'large'} color={Colors.primary}/> : <Text> no location chosen yet</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <Button title={'get user location'} color={Colors.primary} onPress={getLocationHandler} />
                <Button title={'pick on map'} color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width:'100%'
    }
})

export default LocationPicker