import React from 'react';
import { ScrollView, StyleSheet, View, Text,} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BasketCard } from '../components';

import { connect } from 'react-redux';
import { roundToTwoDecimal } from '../utils/externalFunctions';
import colors from '../utils/colors';

class Basket extends React.Component {
    renderItem(items) {
        return items.map((item, index) => {
            return <BasketCard
                {...item}
                key={index}
            />
        })
    };

    render() {
        const items = this.props.basket;
        const totalPrice = items.reduce((accum, current) => {
            return accum + current.price * current.count;
        }, 0);
        const totalCount = items.reduce((accum, current) => {
            return accum + current.count;
        }, 0);

        return (
            <View style={{flex: 1}}>
                <View style={styles.totalContainer}>
                    { totalCount === 0 && <Text style={styles.text}>Empty basket</Text>}
                    <Text style={styles.text}>Total count: {totalCount}</Text>
                    <Text style={styles.text}>Total price: {roundToTwoDecimal(totalPrice)} $</Text>
                </View>
                <ScrollView>
                    {this.renderItem(items)}
                </ScrollView>
                <Button 
                    title="Make Order"
                    onPress={() => {}}
                    buttonStyle={[styles.button]}
                    icon={
                        <Icon 
                            name="credit-card"
                            size={20}
                            color={colors.pink}
                            style={{marginRight: 5}}
                        />
                    }
                />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    constainer: { 
        alignItems: "center",
        justifyContent: "space-around",
    },
    totalContainer: {
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
    },
    button: {
        margin: 20,
        width: 200,
        alignSelf: "center",
        backgroundColor: colors.purple,
    }
});

const mapStateToProps = state => {
    return {
        basket: state.basket.store,
        count: state.basket.count,
    };
};

export default connect(mapStateToProps, null)(Basket);