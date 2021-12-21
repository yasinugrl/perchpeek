import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../redux/LocationReducers';

interface DetailScreenProps {
    route: any
    navigation: any
}

const DetailScreen = (props: DetailScreenProps) => {
    const { item } = props.route.params;
    const opacity = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const [detailItem, setDetailItem] = useState(item)


    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 250,
            delay: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={{
                    opacity,
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    right: 10,
                    zIndex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >

                <TouchableOpacity onPress={() => {
                    let updatedItem = detailItem
                    updatedItem.isLike = !updatedItem.isLike
                    setDetailItem(updatedItem)
                    dispatch(updateLocation(detailItem.id))
                }} style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 50, right: 20, backgroundColor: 'white', }}>
                    <Image source={require('../assets/heart.png')} style={{ width: 20, height: 20, tintColor: detailItem.isLike ? 'red' : 'gray' }} resizeMode='contain' />
                </TouchableOpacity>

            </Animated.View>

            <SharedElement id={`item.${detailItem.id}.photo`}>
                <Image source={{ uri: detailItem.image }} style={styles.postImage} />
            </SharedElement>

            <View style={styles.postDetails}>
                <Text style={styles.postTitle}>{detailItem.name}</Text>
                <Animated.Text
                    style={{
                        marginTop: 20,
                        opacity,
                        fontSize: 14,
                    }}
                >
                    {detailItem.description}
                </Animated.Text>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -20, right: 20, backgroundColor: 'white', }}>
                    <Image source={require('../assets/down.png')} style={{ width: 20, height: 20, tintColor: '#559df5' }} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {},
    wrapper: {
        flex: 1,
    },
    postDetails: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    postTitle: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    postPrice: {
        fontSize: 24,
    },
    postImage: {
        height: 300,
        width: '100%',
    },
});
