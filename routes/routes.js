import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { connect } from 'react-redux';
import colors from '../utils/colors';

import {
    CategoryScreen,
    DetailsScreen,
    CardListScreen,
    BasketScreen,
    LoginScreen,
} from '../screens';

import {
    Toolbar,
    DrawerAndBackButton,
    DrawerContent,
} from '../components';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigation(props) {
    const { isSignedIn } = props;
    return (
        <Drawer.Navigator 
            drawerContent={props => <DrawerContent {...props}/>}
        >
            {isSignedIn && <Drawer.Screen name="Home" component={RootStack}/>}
            {!isSignedIn && <Drawer.Screen name="Login" component={LoginScreen} />}
        </Drawer.Navigator>
    )
};

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.purple,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => <Toolbar />,
                headerLeft: (props) => <DrawerAndBackButton {...props}/>,
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={CategoryScreen}
                options={{ title: "Home" }}
            />
            <Stack.Screen name="CardListScreen" component={CardListScreen} />
            <Stack.Screen 
                name="BasketScreen" 
                component={BasketScreen}
                options={{title: "Basket"}}
            />
            <Stack.Screen 
                name="DetailsScreen" 
                component={DetailsScreen} 
                options={{title: "Details"}}
            />
        </Stack.Navigator>
    )
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        name: state.auth.name,
    }
};

export default connect(mapStateToProps, null)(AppNavigation);