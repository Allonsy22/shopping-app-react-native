import React from 'react';
import { PanResponder, Animated, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

export class SlideAnimation {
    constructor() {
        this.translateX = new Animated.Value(0);
        this.opacity = new Animated.Value(0);
    };

    init() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (e, gestureState) => {
                // 10 is optimal value for normal scrolling inside FlatList
                return Math.abs(gestureState.dx) > 10;
            },
            onPanResponderMove: (e, gesture) => {
                if (gesture.dx > 0) return;
                if (gesture.dx < -30) {
                    Animated.timing(this.opacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true
                    }).start();

                    Animated.event([null, { dx: this.translateX, useNativeDriver: true }])(e, gesture);
                }
            },
            onPanResponderRelease: (e, { vx, dx }) => {
                // If scroll more than 20% (left) of device width then translate
                // move to 30% of device width
                if (Math.abs(dx) >= .2 * DEVICE_WIDTH && Math.sign(dx) == -1) {
                    Animated.parallel([
                        Animated.timing(this.translateX, {
                            toValue: dx < 0 ? -DEVICE_WIDTH * .3 : DEVICE_WIDTH,
                            duration: 300,
                            useNativeDriver: true
                        }),

                    ]).start();
                } else {
                    Animated.parallel([
                        Animated.spring(this.translateX, {
                            toValue: 0,
                            useNativeDriver: true
                        }),
                        Animated.timing(this.opacity, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true
                        })
                    ]).start();
                }
            },
        });
    };

    get() {
        this.init();
        return {
            panResponder: this.panResponder,
            opacity: this.opacity,
            translateX: this.translateX,
        }
    };
};

function ZoomInOutView(props) {
    const scale = new Animated.Value(.9);
    const {
        inOutDuration = 1700,
        outDuration = 1000,
        zoomOutScale = 5,
        isZoomOut = false,
    } = props;

    const start = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.3,
                    duration: inOutDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: .9,
                    duration: inOutDuration,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const zoomOut = () => {
        Animated.timing(scale, {
            toValue: zoomOutScale,
            duration: outDuration,
            useNativeDriver: true,
        }).start();
    };

    if ( isZoomOut ) {
        zoomOut();
    } else {
        start();
    }
    return (
        <Animated.View 
            style={[
                props.style, 
                { transform: [{ scale: scale }] }
            ]}
        >
            {props.children}
        </Animated.View>
    )
};

function FadeInView(props) {
    const opacity = new Animated.Value(0);

    const start = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    start();
    return (
        <Animated.View
            style={{ 
                opacity: opacity,
                width: "90%",
                height: "100%",
                justifyContent: "center",
            }}
        >
            {props.children}
        </Animated.View>
    );
}

export const FadeIn = {
    View: FadeInView,
};

export const ZoomInOut = {
    View: ZoomInOutView,
};
