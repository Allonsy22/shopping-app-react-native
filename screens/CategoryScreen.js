import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CategoryCard } from '../components';

import { navigate } from '../routes/navigation';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class Categories extends React.Component {
    componentDidMount() {
        this.props.initCategoriesData();
    };

    onPressCategory(id, name) {
        const props = {
            id: id,
            title: name,
        };
        navigate("CardListScreen", props);
    };

    renderItem() {
        const { categories } = this.props;

        return categories.map((item, index) => {
            return (
                <TouchableOpacity 
                    activeOpacity={.5} 
                    key={index}
                    onPress={() => this.onPressCategory(item.id, item.name)}
                >
                    <CategoryCard
                        image={item.image}
                        name={item.name}
                        count={item.count}
                        index={index}
                    />
                </TouchableOpacity>
            )
        })
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderItem()}
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    }
});

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initCategoriesData: () => dispatch(actions.initCategoriesData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);