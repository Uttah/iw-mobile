import React, { Component } from 'react'
import {  View, Text } from 'react-native'
import styles from './Styles/ListItemStyles'

export default class ListItem extends Component {

    render() {
        const { number, text } = this.props;

        return (
            <View style={styles.container} key={number}>
                <View style={styles.number}><Text style={styles.numbertext}>{number}</Text></View>
                <View style={styles.text}><Text style={styles.textinner}>{text}</Text></View>
            </View>
        );
    }
}