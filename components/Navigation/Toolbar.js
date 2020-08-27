import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from '../../routes/navigation';
import { connect } from 'react-redux';
import colors from '../../utils/colors';

const Toolbar = (props) => {
    const { count } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigate("BasketScreen")}
            >
                <Text style={styles.badge}>{count > 99 ? "99+" : count}</Text>
                <Icon 
                    name="shopping-cart"
                    size={40}
                    color={colors.white}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.purple,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 5,
    },
    button: {
        width: 50,
    },
    badge: {
        position: "absolute",
        right: 0,
        width: 30,
        height: 30,
        lineHeight: 30,
        borderRadius: 15,
        backgroundColor: colors.green,
        textAlign: "center",
        color: colors.white,
        zIndex: 100,
    }
});

const mapStateToProps = state => {
    return {
        count: state.basket.count,
    };
};

export default connect(mapStateToProps, null)(Toolbar);