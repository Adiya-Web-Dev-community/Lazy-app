import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {scale, moderateScale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Input = ({
  title,
  placeholder,
  value,
  onChangeText,
  IsPassword,
  errorMessage,
  keyboardType = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(IsPassword);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
          keyboardType={keyboardType}
          placeholderTextColor={COLORS.grey}
        />
        {IsPassword && (
          <TouchableOpacity
            style={styles.icon}
            onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={moderateScale(20)}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(15),
  },
  title: {
    color: COLORS.primaryColor,
    fontSize: moderateScale(14),
    marginBottom: verticalScale(5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    borderRadius: moderateScale(5),
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(16),
    color:COLORS.Black
  },
  icon: {
    padding: scale(10),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
  },
});

export default Input;
