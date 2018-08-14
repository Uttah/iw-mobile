import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from 'native-base';
import styles from './Styles/LoadingStyles';

export default class Loading extends Component {
    render() {
        return (
            <View style={[styles.container]}>
                <Spinner/>
            </View>
        );
    }
}
