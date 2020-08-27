import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
//Import Horizontal Divider not from index because it's make cycle
import HorizontalDivider from '../../components/Other/HorizontalDivider';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import { navigate } from '../../routes/navigation';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import colors from '../../utils/colors';
import firebase from '../../utils/Firebase';

const image = require('../../assets/no_user.jpg');

function DrawerContent(props) {
    const { isSignedIn, name, signOut, basket } = props;
    
    const handleSignOut = () => {
        firebase.updateUserBasket(basket)
            .then( result => signOut())
            .catch( error => console.log(error));
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.lightPurple }}>
            <View style={styles.userContainer}>
                <Image style={styles.image} source={image}/>
                <Text style={styles.user}>{name}</Text>
            </View>
            <HorizontalDivider 
                width={"90%"}
                height={3}
                color={colors.pink}
            />
            {isSignedIn &&
                <>
                    <View style={styles.mainContainer}>
                        <DrawerItem
                            labelStyle={styles.label}
                            label="Home"
                            icon={() =>
                                <Icon
                                    name="home"
                                    size={20}
                                    color={colors.purple}
                                />
                            }
                            onPress={() => navigate("HomeScreen")}
                        />
                        <DrawerItem
                            labelStyle={styles.label}
                            label="Basket"
                            icon={() =>
                                <Icon
                                    name="shopping-cart"
                                    size={20}
                                    color={colors.purple}
                                />
                            }
                            onPress={() => navigate("BasketScreen")}
                        />
                    </View>

                    <View style={styles.botomContainer}>
                        <DrawerItem
                            labelStyle={styles.label}
                            label="Sign Out"
                            icon={() =>
                                <Icon
                                    name="sign-out"
                                    size={20}
                                    color={colors.purple}
                                />
                            }
                            onPress={() => handleSignOut()}
                        />
                    </View>
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 2,
    },
    botomContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
    label: {
        color: colors.white,
    },
    userContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 5,
    },
    user: {
        fontSize: 20,
        color: colors.white,
        flex: 1,
        textAlign: "center",
        margin: 5,
    },
});

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        name: state.auth.name,
        basket: state.basket.store,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(actions.signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);