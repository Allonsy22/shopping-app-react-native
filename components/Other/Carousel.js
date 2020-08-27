import React from "react";
import { 
    StyleSheet, 
    View, 
    ScrollView, 
    Dimensions, 
    Image
 } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height * .4; // 30%
const INTERVAL = 3000;

export default class BackgroundCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
        this.scrollRef = React.createRef();
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.setState(
                prev => ({
                    selectedIndex:
                        prev.selectedIndex === this.props.images.length - 1
                            ? 0
                            : prev.selectedIndex + 1
                }),
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        x: DEVICE_WIDTH * this.state.selectedIndex,
                        y: 0
                    });
                }
            );
        }, INTERVAL);
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    setSelectedIndex = event => {
        const contentOffset = event.nativeEvent.contentOffset;
        const viewSize = event.nativeEvent.layoutMeasurement;

        // Divide the horizontal offset by the width of the view to see which page is visible
        const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
        this.setState({ selectedIndex });
    };

    render() {
        const { images } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {images.map(image => (
                        <Image
                            style={styles.backgroundImage}
                            source={{ uri: image }}
                            key={image}
                        />
                    ))}
                </ScrollView>
                <View style={styles.circleContainer}>
                    {images.map((image, i) => (
                        <View
                            style={[
                                styles.whiteCircle,
                                { opacity: i === selectedIndex ? 1 : 0.5 }
                            ]}
                            key={image}
                            active={i === selectedIndex}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: "100%",
        position: "relative",
        top: 0,
    },
    backgroundImage: {
        height: HEIGHT,
        width: DEVICE_WIDTH,
        resizeMode: "cover",
    },
    circleContainer: {
        position: "relative",
        bottom: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 10
    },
    whiteCircle: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: "#B5B5B5",
        borderRadius: 5,
        margin: 5,
        backgroundColor: "#FFFFFF"
    }
});