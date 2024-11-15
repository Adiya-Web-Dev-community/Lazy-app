import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>AboutUs</Text>

      {/* Privacy Policy Content */}
      <View style={styles.section}>
        <Text style={styles.header}>Introduction</Text>
        <Text style={styles.text}>
          Welcome to our Privacy Policy page. Your privacy is important to us. This document outlines the types of personal information we collect, how we use it, and the measures we take to protect your privacy.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Information We Collect</Text>
        <Text style={styles.text}>
          We collect information in the following ways:
          {'\n\n'}
          1. **Personal Information**: Information that you provide directly, such as your name, email address, etc.
          {'\n'}
          2. **Usage Information**: Information about how you interact with our services, such as device information, browsing activity, and time spent on the app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information we collect to:
          {'\n\n'}
          1. Provide and improve our services.
          {'\n'}
          2. Respond to inquiries and support requests.
          {'\n'}
          3. Analyze user behavior to enhance user experience.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Your Rights</Text>
        <Text style={styles.text}>
          You have the following rights:
          {'\n\n'}
          1. **Access**: You can request to access the personal data we have about you.
          {'\n'}
          2. **Correction**: You can request to correct any inaccurate or incomplete information.
          {'\n'}
          3. **Deletion**: You can request to delete your personal data under certain circumstances.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about our privacy practices, please contact us at:
          {'\n\n'}
          Email: support@example.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
