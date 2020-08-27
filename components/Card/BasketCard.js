import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SlideAnimation } from '../../utils/animation';
import { roundToTwoDecimal } from '../../utils/externalFunctions';
import { navigate } from '../../routes/navigation';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import * as actions from '../../store/actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class ItemCard extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        count: PropTypes.number.isRequired,
    };

    slideAnimationProps = new SlideAnimation().get();
    panResponder = this.slideAnimationProps.panResponder;
    opacity = this.slideAnimationProps.opacity;
    translateX = this.slideAnimationProps.translateX;

    async addItem(props) {
        await this.props.addItem({
            id: props.id,
            count: 1,
        });
    };

    async removeItem(props) {
        await this.props.removeItem(props);
    };

    async deleteItem(props) {
        await this.props.deleteItem(props);
    };

    goToDetailScreen() {
        const item = this.props;
        navigate("DetailsScreen", {...item});
    };

    render() {
        const {
            name,
            price,
            images,
            count,
        } = this.props;
        const totalPrice = roundToTwoDecimal(price * count);

        return (
            <View style={styles.mainContainer}>
                <Animated.View
                    style={[styles.cardConstainer, {
                        transform: [{ translateX: this.translateX }]
                    }]}
                    {...this.panResponder.panHandlers}
                >
                    <Image
                        source={{ uri: images[0] }}
                        style={styles.image}
                    />
                    <View style={styles.details}>
                        <TouchableOpacity onPress={() => this.goToDetailScreen()}>
                            <Text style={{ textAlign: "center" }}>{name}</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.countContainer}>
                            <Button
                                title=""
                                buttonStyle={[styles.button]}
                                onPress={() => this.removeItem(this.props)}
                                icon={
                                    <Icon
                                        name="minus"
                                        size={15}
                                        color={colors.white}
                                    />
                                }
                            />
                            <Text style={{ margin: 10, fontSize: 20 }}>{count}</Text>
                            <Button
                                title=""
                                buttonStyle={[styles.button]}
                                onPress={() => this.addItem(this.props)}
                                icon={
                                    <Icon
                                        name="plus"
                                        size={15}
                                        color={colors.white}
                                    />
                                }
                            />
                        </View>
                        <Text style={styles.price}>{totalPrice} $</Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[styles.buttonContainer, { opacity: this.opacity }]}
                    {...this.panResponder.panHandlers}
                >
                    <Button
                        title=""
                        onPress={() => this.deleteItem(this.props)}
                        buttonStyle={{ backgroundColor: colors.red, width: 50, height: 50 }}
                        icon={
                            <Icon
                                name="trash"
                                size={30}
                                color={colors.white}
                            />
                        }
                    />
                </Animated.View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "90%",
        alignSelf: 'center',
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 5,
        backgroundColor: "#fff",
    },
    cardConstainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    countContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    image: {
        width: 150,
        aspectRatio: 1,
    },
    details: {
        flex: 1,
        margin: 5,
    },
    price: {
        fontSize: 22,
        alignSelf: 'center',
        margin: 5,
    },
    buttonContainer: {
        position: "absolute",
        right: 0,
        width: DEVICE_WIDTH * .3,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        zIndex: -1,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
});

const mapDispatchToProps = dispatch => {
    return {
        addItem: (props) => dispatch(actions.addItem(props)),
        removeItem: (props) => dispatch(actions.removeItem(props)),
        deleteItem: (props) => dispatch(actions.deleteItem(props)),
    };
};


export default connect(null, mapDispatchToProps)(ItemCard);