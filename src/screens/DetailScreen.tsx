import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

interface DetailScreenProps {
    route: any
    navigation: any
}

const DetailScreen = (props: DetailScreenProps) => {
    const { item } = props.route.params;

    return (
        <View style={styles.container}>
            <SharedElement id={`item.${item.id}.photo`}>
                <Image
                    style={{ width: '100%', height: 200 }}
                    source={{ uri:  item.image }}
                />
            </SharedElement>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {}
});
