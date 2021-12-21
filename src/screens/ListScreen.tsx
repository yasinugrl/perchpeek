import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../redux/LocationReducers';
import { SharedElement } from 'react-navigation-shared-element';
import MapView, { Marker } from 'react-native-maps';
interface ListScreenProps {
    navigation: any
}

const ListScreen = (props: ListScreenProps) => {
    const { locations } = useSelector((state) => state.locationsResponse);
    const dispatch = useDispatch();

    const refContainer = useRef(null); 
    const refMap = useRef(null); 
    const [selected, setSelected] = useState(0); 

    useEffect(() => {
        dispatch(getLocation())
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.push('Detail', { item })} style={{ width: 250, height: 150, marginRight: 20, }}>
                <SharedElement id={`item.${item.id}.photo`}>
                    <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                </SharedElement>
                <Text style={{ width: 100, position: 'absolute', color: 'white', bottom: 10, left: 10, fontSize: 25, fontWeight: 'bold' }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
           
        </View>
    );
};

export default ListScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    listContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        paddingBottom: 30,
        paddingTop: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    }
});
