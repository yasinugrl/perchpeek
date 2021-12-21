import React, { useRef} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../redux/LocationReducers';
import colors from '../styles/colors';


interface BottomListItemsProps {
    refContainer: any
 }

const BottomListItems = (props: BottomListItemsProps) => {

    const { locations } = useSelector((state) => state.locationsResponse);
    const dispatch = useDispatch();

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.push('Detail', { item })} style={styles.renderItemContainer}>
                <SharedElement id={`item.${item.id}.photo`}>
                    <Image source={{ uri: item.image }} style={styles.imageStyle} />
                </SharedElement>
                <SharedElement id={`item.${item.id}.name`}>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                </SharedElement>
                <TouchableOpacity onPress={() => dispatch(updateLocation(item.id))} style={styles.likeContainerStyle}>
                    <Image source={require('../assets/heart.png')} style={[styles.likeImageStyle, { tintColor: item.isLike ? colors.red : colors.gray }]} resizeMode='contain' />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.listContainer}>
            <FlatList
                ref={props.refContainer}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={locations}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default BottomListItems;

const styles = StyleSheet.create({
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
    },
    renderItemContainer: { width: 250, height: 150, marginRight: 20, },
    imageStyle: { width: '100%', height: '100%', borderRadius: 20 },
    nameStyle: { width: 120, position: 'absolute', color: colors.white, bottom: 10, left: 10, fontSize: 25, fontWeight: 'bold' },
    likeContainerStyle: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 10, right: 10, backgroundColor: colors.white, },
    likeImageStyle: { width: 20, height: 20 },
});
