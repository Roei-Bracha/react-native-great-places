import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const PlacesListScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <Text>PlacesListScreen</Text>
        </View>
    )
}

PlacesListScreen.navigationOptions = {
    headerTitle:'All Places'
}

const styles = StyleSheet.create({
    screen: {
        
    }
})

export default PlacesListScreen