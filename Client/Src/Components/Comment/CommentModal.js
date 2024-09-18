import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale} from '../../utils/Scaling';
import {PostComment} from '../../api/api';

const CommentModal = ({
  visible,
  onClose,
  onSubmit,
  comments = [],
  currentUser,
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit({
        user: currentUser,
        text: commentText.trim(),
        username: 'currentUser',
      });
      setCommentText('');
    }
  };

  const renderComment = ({item}) => (
    <View
      style={[
        styles.commentContainer,
        item.user === currentUser
          ? styles.currentUserComment
          : styles.otherUserComment,
      ]}>
      {item.user !== currentUser && (
        <Image
          source={require('../../Screen/assets/Logo1.webp')}
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.commentContent,
          item.user === currentUser
            ? styles.currentUserCommentContent
            : styles.otherUserCommentContent,
        ]}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
      {item.user === currentUser && (
        <Image
          source={require('../../Screen/assets/Logo1.webp')}
          style={[styles.avatar, styles.currentUserAvatar]}
        />
      )}
    </View>
  );

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Comments</Text>
          {comments.length > 0 ? (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.commentList}
            />
          ) : (
            <View style={styles.centeredContainer}>
              <Text style={styles.noCommentsText}>
                No comments yet.{'\n'} Start the conversation!
              </Text>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Write a comment..."
              style={styles.commentInput}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.White,
    borderTopRightRadius: moderateScale(18),
    borderTopLeftRadius: moderateScale(18),
    padding: scale(20),
    height: '70%',
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.Black,
    textAlign: 'center',
  },
  commentList: {
    flex: 1,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: moderateScale(8),
    paddingHorizontal: scale(2),
  },
  currentUserComment: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  otherUserComment: {
    justifyContent: 'flex-start',
  },
  commentContent: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserCommentContent: {
    backgroundColor: COLORS.White,
  },
  otherUserCommentContent: {
    backgroundColor: '#f9f9f9',
  },
  username: {
    fontWeight: 'bold',
    color: COLORS.Black,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: COLORS.Black,
  },
  noCommentsText: {
    fontSize: 16,
    color: COLORS.Gray,
    textAlign: 'center',
    marginVertical: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.White,
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    zIndex: 1,
  },
  closeButtonText: {
    color: COLORS.Black,
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: COLORS.White,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  avatar: {
    height: scale(40),
    width: scale(40),
    borderRadius: moderateScale(50),
    marginRight: scale(10),
    alignSelf: 'center',
  },
  currentUserAvatar: {
    marginLeft: scale(10),
    marginRight: 0,
  },
});

export default CommentModal;
