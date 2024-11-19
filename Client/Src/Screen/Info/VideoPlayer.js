import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../Theme/Colors';
import WebView from 'react-native-webview';

export default function VideoPlayer() {
  return (
    <View style={styles.container}>
      {/* WebView for YouTube video */}
      <WebView
        source={{uri: 'https://www.youtube.com/watch?v=PuTrN28TW4k'}}
        javaScriptEnabled={true}
        style={styles.webview}
      />
      
      {/* Static Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>Video Title: How to Learn React Native</Text>
        <Text style={styles.description}>
          This video covers the basics of learning React Native for mobile application development.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  webview: {
   height:400
  },
  descriptionContainer: {
    flex:2,
    padding: 10,
    backgroundColor: COLORS.White,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  description: {
    fontSize: 14,
    color: COLORS.Black,
    marginTop: 5,
  },
});
