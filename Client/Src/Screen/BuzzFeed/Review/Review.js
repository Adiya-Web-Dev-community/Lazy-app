import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale} from '../../../utils/Scaling';
import {SubmitReview} from '../../../api/api';

export default function Review({
  visible = false,
  onClose = () => {},
  onSubmitReview = () => {},
  selectedPostData = {},
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const blogId = selectedPostData ? selectedPostData._id : '';
  const handleSubmit = async () => {
    if (name && email && message && rating) {
      const review = {
        blogId,
        name,
        email,
        rating: rating,
        message,
      };
      try {
        const response = await SubmitReview(review);
        console.log("Review..........",response)
        if (response.success) {
          onSubmitReview(response.data);
          setName('');
          setEmail('');
          setMessage('');
          setRating(0);
          onClose();
        } else {
          alert('Failed to submit review.');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred while submitting your review.');
      }
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Submit Your Review</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Rating:</Text>
          <View style={{marginVertical: 5}}>
            <Stars
              default={rating}
              count={5}
              half={true}
              update={val => setRating(val)}
              starSize={50}
              fullStar={
                <Icon name="star" size={30} style={[styles.myStarStyle]} />
              }
              emptyStar={
                <Icon
                  name="star-outline"
                  size={30}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name="star-half" size={30} style={[styles.myStarStyle]} />
              }
            />
          </View>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Your Message"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: scale(18),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: scale(20),
    color: COLORS.Black,
  },
  reviewList: {
    width: '100%',
    maxHeight: scale(200),
    marginBottom: scale(20),
  },
  reviewItem: {
    padding: scale(10),
    alignItems: 'flex-start',
  },
  reviewName: {
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  noReviewText: {
    fontStyle: 'italic',
    color: '#999',
  },
  input: {
    width: '100%',
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(5),
    padding: scale(10),
    marginBottom: scale(13),
  },
  messageInput: {
    height: scale(95),
    textAlignVertical: 'top',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#999',
    fontSize: 16,
  },
  myStarStyle: {
    color: 'gold',
    backgroundColor: 'transparent',
  },
  myEmptyStarStyle: {
    color: 'gray',
  },
});
