import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/colors';
import firebase from '../../utils/Firebase';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class RegisterForm extends React.Component {
    state = {
        name: "Alex",
        email: "test@gmail.com",
        password: "test12",
        repeatPassword: "test12",
        errorMsgs: [],
        loading: false,
    };

    async createNewUser() {
        this.checkIsValid();
        const { email, password, name, errorMsgs } = this.state;
        if (errorMsgs.length === 0) {
            this.setLoadingTrue();
            try {
                await firebase.createUserWithEmailAndPassword(email, password, name)
                    .then(result => {this.onRegisterSuccess()});
            } catch (error) {
                this.onRegisterFailure(error);
            }
        };
    };

    onRegisterSuccess() {
        this.props.signIn(this.state.name);
        this.props.initUserBasket();
    };

    onRegisterFailure(errorMessage) {
        const { errorMsgs } = this.state;
        this.setLoadingFalse();
        this.props.signOut();
        this.setState({ errorMsgs: [...errorMsgs, errorMessage] });
    };

    setLoadingFalse() {
        this.setState({loading: false});
    };

    setLoadingTrue() {
        this.setState({loading: true});
    };

    checkIsValid() {
        //simple validation
        const { name, repeatPassword, password, errorMsgs } = this.state;
        errorMsgs.length = 0;
        if (name.length < 4) errorMsgs.push("Name must have at least 4 char");
        if (password !== repeatPassword) errorMsgs.push("Password doesn't match");
        this.setState({ errorMsgs });
    };

    renderErrorMsgs() {
        const { errorMsgs } = this.state;
        return errorMsgs.map((error, index) => {
            return <Text key={index} style={styles.error}>{error}</Text>
        })
    };

    render() {
        const { 
            name, 
            email, 
            password, 
            repeatPassword,
            loading
         } = this.state;
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Name"
                    value={name}
                    onChangeText={(name) => this.setState({ name })}
                    inputContainerStyle={[styles.input]}
                    leftIcon={
                        <Icon
                            name="user"
                            size={20}
                            color={colors.purple}
                        />
                    }
                />
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
                <Input
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
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
                    title="Submit"
                    buttonStyle={[{ backgroundColor: colors.purple }]}
                    onPress={() => this.createNewUser()}
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

export default connect(null, mapDispatchToProps)(RegisterForm);