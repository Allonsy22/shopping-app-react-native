import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Alert, Carousel } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import colors from '../utils/colors';

class Details extends React.Component {
    componentDidMount() {
        // Toggle alert if user go back when alert was true
        const { alert, showAlert } = this.props;
        if (alert) showAlert();
    };

    renderProductDetail = (productDetailString) => {
        const productDetailList = productDetailString.split("\n");
        return productDetailList.map((li, index) => {
            return (
                <Text style={styles.text} key={index}>• {li.trim()}</Text>
            );
        });
    };

    renderExtraInfo = (extraInfoArr) => {
        return extraInfoArr.map((item, index) => {
            for (let key in item) {
                return (
                    <Text
                        style={styles.text}
                        key={index}
                    >
                        {key}: {item[key]}
                    </Text>
                )
            }
        })
    };

    onPressAdd() {
        this.props.showAlert();
    };

    render() {
        const item = this.props.route.params;
        const { alert } = this.props;
        const {
            images,
            name,
            price,
            extraInfo,
            description,
            productDetails
        } = item;
        return (
            <View style={styles.container}>
                <Carousel images={images} />
                {alert && <Alert {...item} />}
                <ScrollView
                    style={styles.card}
                >
                    <Text style={styles.name}>{name}</Text>
                    <View>
                        <Text style={styles.price}>{price} $</Text>
                        <Text style={[styles.text, styles.title]}>Description:</Text>
                        <Text style={styles.text}>{description}</Text>
                        <Text style={[styles.text, styles.title]}>Product Details:</Text>
                        {this.renderProductDetail(productDetails)}
                    </View>
                    <Button
                        title="Add to Cart"
                        onPress={() => this.onPressAdd()}
                        icon={
                            <Icon
                                name="shopping-bag"
                                size={25}
                                color={colors.white}
                                style={{ margin: 5 }}
                            />
                        }
                        buttonStyle={{ margin: 25, backgroundColor: colors.purple }} />
                </ScrollView>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        width: "90%",
        flex: 1
    },
    name: {
        fontSize: 22,
        textAlign: "center",
        fontStyle: "italic",
    },
    price: {
        fontSize: 25,
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        textAlign: "justify",
        marginTop: 5,
    },
    title: {
        marginTop: 10,
        fontWeight: "bold",
        borderTopWidth: 2,
        borderColor: "#B5B5B5",
    },
});

const mapStateToProps = state => {
    return {
        alert: state.basket.alert,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showAlert: () => dispatch(actions.toggleAlert()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);