import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { getLocations, LandMarks, updateLocation } from '../redux/LocationReducers';
import colors from '../styles/colors'
import BottomListItems from '../component/BottomListItems';
import {store} from '../redux/Store';


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
        console.log('fff: ', store.getState().locationsResponse.locations[0]);
        
    }, [])

    return (
        <View  
        testID='container'
        style={styles.container}>
            <MapView
                ref={refMap}
                testID='map'
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
                                testID='markers'
                                onPress={() => {
                                    setSelected(item.id)
                                    refContainer.current.scrollToIndex({ animated: true, index: item.id - 1 });
                                }}
                                key={item.id}
                                coordinate={item.latlng}
                            >
                                <View style={styles.markerContainerStyle}>
                                    <Image source={require('../assets/marker.png')} style={[styles.markerImageStyle, {tintColor: item.id == selected ? colors.blue : colors.gray}]} resizeMode='contain' />
                                    {item.isLike && <Image source={require('../assets/heart.png')} style={styles.markerLikeStyle} resizeMode='contain' />}
                                </View>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <BottomListItems
                refContainer={refContainer}
                {...props}
             />
        </View>
    );
};

export default ListScreen;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'red' },
    map: { ...StyleSheet.absoluteFillObject },
    markerContainerStyle: { padding: 10, width: 50, height: 50 },
    markerImageStyle: { width: 40, height: 40 },
    markerLikeStyle: { width: 20, height: 20, position: 'absolute', top: 5, left: 10 }
});
