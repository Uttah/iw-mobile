import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { Images } from 'App/Themes';
import { getItemsByKeysArr } from 'App/Services/Utils';

// Styles
import styles from './Styles/RootContainerStyles'
import { AppLoading, Asset, Font } from 'expo';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

async function cacheFonts() {
  await Font.loadAsync({
    'Roboto': require('../Fonts/Roboto-Regular.ttf'),
    'Roboto_medium': require('../Fonts/Roboto-Medium.ttf'),
    'Roboto_bold': require('../Fonts/Roboto-Bold.ttf'),
    'Roboto_italic': require('../Fonts/Roboto-Italic.ttf'),
    'OpenSans_semi': require('../Fonts/OpenSans-SemiBold.ttf'),
    'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
  });
}

class RootContainer extends Component {
  state = {
    isReady: false,
  };

  componentDidMount () {
    //if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  async _loadAssetsAsync() {
    const images = getItemsByKeysArr(Object.keys(Images), Images);
    const imageAssets = cacheImages(images);

    await Promise.all([...imageAssets, cacheFonts()]);
  }

  render () {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    );
  }
}

//wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)