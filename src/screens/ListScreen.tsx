import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, LandMarks, updateLocation } from '../redux/LocationReducers';
import { SharedElement } from 'react-navigation-shared-element';
import MapView, { Marker } from 'react-native-maps';
import colors from '../styles/colors'
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
        locations.length == 0 && dispatch(getLocations())
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.push('Detail', { item })} style={{ width: 250, height: 150, marginRight: 20, }}>
                <SharedElement id={`item.${item.id}.photo`}>
                    <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                </SharedElement>
                <Text style={{ width: 120, position: 'absolute', color: colors.white, bottom: 10, left: 10, fontSize: 25, fontWeight: 'bold' }}>{item.name}</Text>


                <TouchableOpacity onPress={() => dispatch(updateLocation(item.id))} style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 10, right: 10, backgroundColor: colors.white, }}>
                    <Image source={require('../assets/heart.png')} style={{ width: 20, height: 20, tintColor: item.isLike ? colors.red : colors.gray }} resizeMode='contain' />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={refMap}
                style={styles.map}
                region={{
                    latitude: 51.500782626551675,
                    longitude: -0.12552662330828043,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {
                    locations.map((item: LandMarks) => {
                        return (
                            <Marker
                                onPress={() => {
                                    setSelected(item.id)
                                    refContainer.current.scrollToIndex({ animated: true, index: item.id - 1 });
                                    refMap.current.animateToRegion({
                                        latitude: item.latlng.latitude,
                                        longitude: item.latlng.longitude,
                                        latitudeDelta: 0.1,
                                        longitudeDelta: 0.1,
                                    });
                                }}
                                key={item.id}
                                coordinate={item.latlng}
                            >
                                <View style={{ padding: 10, width: 50, height: 50 }}>
                                    <Image source={require('../assets/marker.png')} style={{ width: 40, height: 40, tintColor: item.id == selected ? colors.blue : colors.gray }} resizeMode='contain' />
                                    {item.isLike && <Image source={require('../assets/heart.png')} style={{ width: 20, height: 20, position: 'absolute', top: 5, left: 10  }} resizeMode='contain' />}

                                </View>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <View style={styles.listContainer}>
                <FlatList
                    ref={refContainer}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={locations}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
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
        paddingLeft: 10,
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
