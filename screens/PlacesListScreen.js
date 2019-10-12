import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Platform, FlatList} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector} from 'react-redux'
import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem';
import {useDispatch }from 'react-redux'
import { loadPlaces } from '../store/places-actions';

const PlacesListScreen = (props) => {
    const places = useSelector((state) => (state.places.places))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPlaces())
    },[dispatch])
    return (
        <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() => {
              props.navigation.navigate('PlaceDetail', {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id
              });
            }}
          />
        )}
      />
    )
}

PlacesListScreen.navigationOptions = navData => {
    return ({
        headerTitle: 'All Places',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title="add place" iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={()=>{navData.navigation.navigate('NewPlace')}}/>
        </HeaderButtons>
    })

}

const styles = StyleSheet.create({
    screen: {
        
    }
})

export default PlacesListScreen