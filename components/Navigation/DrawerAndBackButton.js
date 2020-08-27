import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import { goBack, openDrawer } from '../../routes/navigation';

export default function DrawerAndBackButton(props) {
    const canGoBack = props.canGoBack;
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={[styles.button]}
                title=""
                icon={
                    <Icon
                        name="bars"
                        size={25}
                        color={colors.white}
                    />
                }
                onPress={() => openDrawer()}
            />
            {canGoBack && 
                <Button
                buttonStyle={[styles.button]}
                title=""
                icon={
                    <Icon
                        name="chevron-left"
                        size={25}
                        color={colors.white}
                    />
                }
                onPress={() => goBack()}
            />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    },
    button: {
        backgroundColor: "transparent",
    }
});