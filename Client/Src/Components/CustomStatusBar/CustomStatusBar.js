import React from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomStatusBar = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: StatusBar.currentHeight,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CustomStatusBar;
