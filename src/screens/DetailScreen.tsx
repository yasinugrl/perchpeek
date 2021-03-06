import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
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
    const [isLike, setIsLike] = useState(item.isLike)


    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 250,
            delay: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.animatedViewStyle, { opacity}]}>
                <TouchableOpacity onPress={() => {
                    setIsLike(!isLike)
                    dispatch(updateLocation(item.id))
                }} style={styles.likeContainer}>
                    <Image source={require('../assets/heart.png')} style={[styles.like, { tintColor: isLike ? 'red' : 'gray'}]} resizeMode='contain' />
                </TouchableOpacity>
            </Animated.View>

            <SharedElement id={`item.${item.id}.photo`}>
                <Image source={{ uri: item.image }} style={styles.postImage} />
            </SharedElement>

            <View style={styles.postDetails}>
                <SharedElement id={`item.${item.id}.name`}>
                    <Text style={styles.postTitle}>{item.name}</Text>
                </SharedElement>

                <ScrollView style={{ flex: 1 }}>
                    <Animated.Text style={[styles.animatedText, { opacity}]}>
                        {item.description}
                    </Animated.Text>
                </ScrollView>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeButtonContainer}>
                    <Image source={require('../assets/down.png')} style={styles.closeImage} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {},
    wrapper: { flex: 1,},
    postDetails: { paddingVertical: 10, paddingHorizontal: 10, flex: 1},
    postTitle: { fontSize: 35, fontWeight: 'bold' },
    postImage: { height: 300, width: '100%', },
    animatedViewStyle: { position: 'absolute', top: 10, left: 10, right: 10, zIndex: 1,flexDirection: 'row', justifyContent: 'space-between' },
    likeContainer: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 50, right: 20, backgroundColor: 'white', },
    like: { width: 20, height: 20 },
    animatedText: { marginTop: 20, fontSize: 12 },
    closeImage: { width: 20, height: 20, tintColor: '#559df5' },
    closeButtonContainer: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -20, right: 20, backgroundColor: 'white', }
});
