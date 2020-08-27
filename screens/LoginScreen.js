import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';
import { LoginForm, RegisterForm } from '../components';
import { FadeIn, ZoomInOut } from '../utils/animation';
import colors from '../utils/colors';

const DEVICE_WIDTH = Dimensions.get("window").width;

export default class LoginScreen extends React.Component {
    state = {
        isLoginForm: false,
        isRegisterForm: false,
    };

    switchForm() {
        const { isLoginForm, isRegisterForm } = this.state;
        this.setState({
            isLoginForm: !isLoginForm,
            isRegisterForm: !isRegisterForm,
        });
    };

    showForm() {
        this.setState({ isLoginForm: true });
    };

    renderCircle() {
        const { isLoginForm, isRegisterForm } = this.state;
        if (!isLoginForm && !isRegisterForm) {
            return (
                <ZoomInOut.View style={styles.circle} />
            )
        }
        return (
            <ZoomInOut.View style={styles.circle} isZoomOut={true}/>
        )
    };

    renderForm() {
        // use else if construction because amimation use opacity and we don't  
        // need have transparent form behind text "it's time to go shopping"
        const { isRegisterForm, isLoginForm } = this.state;
        if (isRegisterForm) {
            return (
                <FadeIn.View>
                    <RegisterForm />
                    <TouchableOpacity
                        onPress={() => this.switchForm()}
                        style={{ width: "50%", margin: 10 }}
                    >
                        <Text style={styles.switch}>Sign In</Text>
                    </TouchableOpacity>
                </FadeIn.View>
            )
        } else if (isLoginForm) {
            return (
                <FadeIn.View>
                    <LoginForm />
                    <TouchableOpacity
                        onPress={() => this.switchForm()}
                        style={{ width: "50%", margin: 10 }}
                    >
                        <Text style={styles.switch}>Registration</Text>
                    </TouchableOpacity>
                </FadeIn.View>
            )
        }

    };

    render() {
        const { isLoginForm, isRegisterForm } = this.state;
        return (
            <View style={styles.container}>
                {this.renderCircle()}
                {!isLoginForm && !isRegisterForm &&
                    <TouchableOpacity onPress={() => this.showForm()}>
                        <Text style={styles.text}>It's time to go shopping</Text>
                    </TouchableOpacity>
                }
                {this.renderForm()}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.purple,
    },
    circle: {
        width: DEVICE_WIDTH / 2,
        height: DEVICE_WIDTH / 2,
        borderRadius: DEVICE_WIDTH / 4,
        position: "absolute",
        alignSelf: "center",
        backgroundColor: colors.lightPurple,
    },
    text: {
        width: 200,
        fontSize: 22,
        textAlign: "center",
    },
    switch: {
        fontSize: 15,
        color: colors.purple,
        borderColor: colors.purple,
        borderWidth: 1,
    }
});
