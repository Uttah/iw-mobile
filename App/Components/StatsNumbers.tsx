import React, { Component } from 'react';
import { View } from 'react-native';
import StatsNumber from './StatsNumber';
import styles from './Styles/StatsNumbersStyles';

export default class StatsNumbers extends Component {
  render() {
    const { style, stats } = this.props;
    return (
      <View style={[styles.container, style]}>
        {stats.map((statsEl, index) => <StatsNumber number={statsEl.number} text={statsEl.text} key={index}/>)}
      </View>
    );
  }
}