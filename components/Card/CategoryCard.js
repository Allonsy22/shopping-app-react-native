import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import PropTypes from 'prop-types';

export default class CategoryCard extends React.Component {
    static propTypes = {
        image: PropTypes.string,
        count: PropTypes.number,
        name: PropTypes.string,
        index: PropTypes.number,
    };

    render() {
        const { image, count, name, index } = this.props;
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
                <View style={
                    [
                        styles.details,
                        { alignItems: index % 2 == 0 ? "flex-end" : "flex-start" }
                    ]
                }>
                    <Text style={styles.text}>{name}</Text>
                    <Text>{count} Producs</Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 150,
        marginTop: 5,
    },
    image: {
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        zIndex: 1000,
    },
    details: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 70,
        backgroundColor: "grey",
        opacity: .7,
        zIndex: 2000,
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    }
});