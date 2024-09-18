import {StyleSheet} from 'react-native';
import React from 'react';
import NavigationScreen from './Src/routes/NavigationScreen';
import 'react-native-gesture-handler';
import {AuthProvider} from './Src/api/AuthProvider';

export default function App() {
  return <NavigationScreen />;
}

const styles = StyleSheet.create({});
