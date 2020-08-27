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
import { Rating, Button } from 'react-native-elements';

import { SlideAnimation } from '../../utils/animation';
import { navigate } from '../../routes/navigation';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import * as actions from '../../store/actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class ItemCard extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        rating: PropTypes.number,
    };

    slideAnimationProps = new SlideAnimation().get();
    panResponder = this.slideAnimationProps.panResponder;
    opacity = this.slideAnimationProps.opacity;
    translateX = this.slideAnimationProps.translateX;

    async addItem() {
        const { addItem } = this.props;
        await addItem({
            props: this.props,
            count: 1,
        });
    };

    goToDetailScreen() {
        const item = this.props;
        navigate("DetailsScreen", {...item, count: 1});
    };

    render() {
        const {
            name,
            price,
            images,
            rating,
        } = this.props;

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
                            <Text>{name}</Text>
                        </TouchableOpacity>
                        <Rating
                            showRating
                            fractions={1}
                            startingValue={rating || 0}
                            imageSize={20}
                            readonly
                            showRating={false}
                            style={{ margin: 10 }}
                        />
                        <Text style={styles.price}>{price} $</Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[styles.buttonContainer, { opacity: this.opacity }]}
                >
                    <Button
                        title="Add to Cart"
                        onPress={() => this.addItem()}
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
    }
});

const mapStateToProps = state => {
    return {
        store: state.basket.store,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (props) => dispatch(actions.addItem(props)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);