import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';

export default function NewsPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <Image resizeMethod='contain'
        source={{ uri: 'https://via.placeholder.com/800x400' }} 
        style={styles.newsImage}
        resizeMode="cover"
      />
      {/* News Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Breaking News: Major Event Happening</Text>
        <Text style={styles.details}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
          Praesent mauris. Fusce nec tellus sed augue semper porta.
        </Text>
        <Text style={styles.details}>
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
        </Text>
        <Text style={styles.details}>
          Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem
          at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut
          ligula vel nunc egestas porttitor.
        </Text>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  newsImage: {
    width: width, 
    height: width * 0.6, // Aspect ratio of 16:9
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: 'white',
    marginTop: -10, // Overlap with the image slightly for a seamless look
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    marginBottom: 10,
  },
});
