import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from 'react-native-elements';
//Import Horizontal Divider not from index because it's make cycle
import HorizontalDivider from '../../components/Other/HorizontalDivider';

import { roundToTwoDecimal } from '../../utils/externalFunctions';
import colors from '../../utils/colors';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

class Alert extends React.Component {
    state = {
        count: 1,
        totalPrice: this.props.price,
    };

    handleAddButton = () => {
        const { price } = this.props;
        this.setState((prevState) => {
            return {
                count: prevState.count + 1,
                totalPrice: roundToTwoDecimal(prevState.totalPrice + price),
            };
        });
    };

    handleRemoveButton = () => {
        const { price } = this.props;
        this.setState((prevState) => {
            const newTotalPrice = prevState.totalPrice == price
                ? price
                : prevState.totalPrice - price;
            return {
                count: prevState.count <= 1 ? 1 : prevState.count - 1,
                totalPrice: roundToTwoDecimal(newTotalPrice),
            };
        });
    };

    handleAddToCart() {
        const count = this.state.count;
        const item = {...this.props, count};

        this.props.addItem(item);
        this.props.cancel();
    };

    handleCancelButton() {
        this.props.cancel();
    };

    render() {
        const { name } = this.props;
        const { count, totalPrice } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.background}></View>

                <View style={styles.alertContainer}>
                    <Text style={[styles.title, styles.large]}>{name}</Text>
                    <HorizontalDivider
                        width="100%"
                        height={3}
                        color={colors.gray}
                        radius={10}
                        margin={5}
                    />

                    <View style={styles.priceContainer}>
                        <Text style={styles.large}>Total: {totalPrice} $</Text>
                        <View style={styles.countContainer}>
                            <Button
                                title="—"
                                buttonStyle={{ width: 40, height: 40, borderRadius: 20 }}
                                onPress={this.handleRemoveButton}
                            />
                            <Text style={[styles.large, { margin: 10 }]}>{count}</Text>
                            <Button
                                title="+"
                                buttonStyle={{ width: 40, height: 40, borderRadius: 20 }}
                                onPress={this.handleAddButton}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Add"
                            onPress={() => this.handleAddToCart()}
                            buttonStyle={[styles.button, { backgroundColor: colors.green }]}
                        />
                        <Button
                            title="Cancel"
                            onPress={() => this.handleCancelButton()}
                            buttonStyle={[styles.button, { backgroundColor: colors.yellow }]}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        width: "100%",
    },
    alertContainer: {
        position: "relative",
        top: DEVICE_HEIGHT * .2,
        width: "90%",
        backgroundColor: "white",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 10,
        padding: 10,
        zIndex: 9999,
    },
    background: {
        position: "absolute",
        top: 0,
        opacity: .8,
        backgroundColor: colors.darkGray,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,   
        zIndex: 9000,
    },
    priceContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    countContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        width: 100,
        margin: 10,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
    },
    large: {
        fontSize: 18,
    },
});

const mapStateToProps = state => {
    return {
        alert: state.basket.alert,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (props) => dispatch(actions.addItem(props)),
        cancel: () => dispatch(actions.toggleAlert()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);