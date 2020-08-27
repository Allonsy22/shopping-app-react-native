import React from 'react';
import { View } from 'react-native';

export default function HorizontalDivider(props) {
    const { 
        width = 30, 
        height = 30, 
        color = "white", 
        radius = 15, 
        marginVertical = 5,
        marginHorizontal = 0,
     } = props;
    return (
        <View style={
            {
                width,
                height,
                backgroundColor: color,
                borderRadius: radius,
                marginVertical,
                marginHorizontal,
                alignSelf: "center",
            }
        }
        />
    );
}