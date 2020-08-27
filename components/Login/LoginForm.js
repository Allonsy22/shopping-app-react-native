import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import firebase from '../../utils/Firebase';
import colors from '../../utils/colors';

class LoginForm extends React.Component {
    state = {
        email: "test@gmail.com",
        password: "test12",
        errorMsgs: [],
        loading: false,
    };

    async signIn() {
        this.checkValid();
        const { email, password, errorMsgs } = this.state;
        if (errorMsgs.length === 0) {
            this.setLoadingTrue();
            try {
                await firebase
                    .signInWithEmailAndPassword(email, password)
                    .then(result => { this.onSignInSuccess() });
            } catch (error) {
                this.onSignInFailure(error);
            }
        }
    };

    onSignInSuccess() {
        this.props.signIn(firebase.getUserName());
        this.props.initUserBasket();
    };

    onSignInFailure(errorMessage) {
        const { errorMsgs } = this.state;
        this.setLoadingFalse();
        this.props.signOut();
        this.setState({ errorMsgs: [...errorMsgs, errorMessage] });
    };

    checkValid() {
        //simple validation
        const { password, errorMsgs } = this.state;
        errorMsgs.length = 0;
        if (password.length === 0) errorMsgs.push("Empty password field");
        this.setState({ errorMsgs });
    };

    setLoadingFalse() {
        this.setState({ loading: false });
    };

    setLoadingTrue() {
        this.setState({ loading: true });
    };

    renderErrorMsgs() {
        const { errorMsgs } = this.state;
        return errorMsgs.map((error, index) => {
            return <Text key={index} style={styles.error}>{error}</Text>
        })
    };

    render() {
        const { email, password, loading } = this.state;

        return (
            <View style={styles.container}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(email) => this.setState({ email })}
                    inputContainerStyle={[styles.input]}
                    leftIcon={
                        <Icon
                            name="envelope"
                            size={20}
                            color={colors.purple}
                        />
                    }
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry={true}
                    inputContainerStyle={[styles.input]}
                    leftIcon={
                        <Icon
                            name="unlock-alt"
                            size={20}
                            color={colors.purple}
                        />
                    }
                />
                {this.renderErrorMsgs()}
                <Button
                    title="Sign In"
                    buttonStyle={[{ backgroundColor: colors.purple }]}
                    onPress={() => this.signIn()}
                    loading={loading}
                    disabled={loading}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.lightPurple,
    },
    input: {
        borderWidth: 2,
        borderColor: colors.purple,
    },
    error: {
        fontSize: 15,
        textAlign: "center",
        color: colors.red,
    }
});

const mapDispatchToProps = dispatch => {
    return {
        signIn: (userName) => dispatch(actions.signIn(userName)),
        signOut: () => dispatch(actions.signOut()),
        initUserBasket: () => dispatch(actions.initUserBasket()),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);