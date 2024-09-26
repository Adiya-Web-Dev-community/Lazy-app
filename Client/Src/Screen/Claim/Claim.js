import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {createClaim} from '../../api/api';

const {width, height} = Dimensions.get('window');

export default function Claim({navigation}) {
  const [buyersName, setBuyersName] = useState('');
  const [productName, setProductName] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [orderDateTime, setOrderDateTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || orderDateTime;
      setOrderDateTime(prev => {
        if (prev) {
          return new Date(
            currentDate.setHours(prev.getHours(), prev.getMinutes()),
          );
        }
        return currentDate;
      });
      setShowDatePicker(false);
      setShowTimePicker(true);
      setErrors(prevErrors => ({...prevErrors, orderDateTime: null}));
    } else {
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'set') {
      const currentTime = selectedTime || orderDateTime;
      setOrderDateTime(prev => {
        if (prev) {
          return new Date(
            prev.getFullYear(),
            prev.getMonth(),
            prev.getDate(),
            currentTime.getHours(),
            currentTime.getMinutes(),
          );
        }
        return currentTime;
      });
      setShowTimePicker(false);
      setErrors(prevErrors => ({...prevErrors, orderDateTime: null}));
    } else {
      setShowTimePicker(false);
    }
  };

  const pickInvoice = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('Invoice selected:', res);
      setInvoice(res[0]);
      setErrors(prevErrors => ({...prevErrors, invoice: null}));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error(err);
      }
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!buyersName) newErrors.buyersName = 'Buyers Name is required';
    if (!productName) newErrors.productName = 'Product Name is required';
    if (!orderId) newErrors.orderId = 'Order ID is required';
    if (!orderAmount) newErrors.orderAmount = 'Order Amount is required';
    if (!invoice) newErrors.invoice = 'Invoice is required';
    if (!orderDateTime)
      newErrors.orderDateTime = 'Date and Time of Order are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      setLoading(true);
      const utcDateTime = orderDateTime.toUTCString();

      const claimData = {
        orderamount: Number(orderAmount),
        invoice: invoice.uri,
        name: buyersName,
        userId: '66f538c28c52c30b89bd8928',
        productname: productName,
        dateOfOrder: utcDateTime,
        orderid: orderId,
      };
      console.log('Order Amount:', claimData.orderamount);
      try {
        const result = await createClaim(claimData);
        console.log('Claim submitted successfully:', result);
        Alert.alert('Success', 'Claim submitted successfully!');
        setBuyersName('');
        setProductName('');
        setOrderId('');
        setOrderAmount('');
        setInvoice(null);
        setOrderDateTime(null);
        setErrors({});
      } catch (error) {
        console.error('Failed to submit claim:', error);
        Alert.alert('Error', 'Failed to submit claim. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#42a1f5', '#03bafc', '#42c5f5']}>
        <StatusBar />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Second_Container}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Buyer's Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Buyer's Name"
              value={buyersName}
              onChangeText={text => {
                setBuyersName(text);
                if (text) {
                  setErrors(prevErrors => ({...prevErrors, buyersName: null}));
                }
              }}
              placeholderTextColor="grey"
            />
            {errors.buyersName && (
              <Text style={styles.errorText}>{errors.buyersName}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Product Name"
              value={productName}
              onChangeText={text => {
                setProductName(text);
                if (text) {
                  setErrors(prevErrors => ({...prevErrors, productName: null}));
                }
              }}
              placeholderTextColor="grey"
            />
            {errors.productName && (
              <Text style={styles.errorText}>{errors.productName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Date and Time Order</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.DATE_TXT}>
                {orderDateTime
                  ? orderDateTime.toLocaleString()
                  : 'Select Order Date'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={orderDateTime || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={orderDateTime || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
            {errors.orderDateTime && (
              <Text style={styles.errorText}>{errors.orderDateTime}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Order ID/Booking ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Order ID"
              value={orderId}
              onChangeText={text => {
                setOrderId(text);
                if (text) {
                  setErrors(prevErrors => ({...prevErrors, orderId: null}));
                }
              }}
              placeholderTextColor="grey"
            />
            {errors.orderId && (
              <Text style={styles.errorText}>{errors.orderId}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Order Amount (Excluding GST)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Order Amount"
              keyboardType="numeric"
              value={orderAmount}
              onChangeText={text => {
                setOrderAmount(text);
                if (text) {
                  setErrors(prevErrors => ({...prevErrors, orderAmount: null}));
                }
              }}
              placeholderTextColor="grey"
            />

            {errors.orderAmount && (
              <Text style={styles.errorText}>{errors.orderAmount}</Text>
            )}
          </View>
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceTitle}>Uploaded Invoice</Text>
            <TouchableOpacity style={styles.invoiceCard} onPress={pickInvoice}>
              <Text style={styles.invoiceText}>Upload Invoice</Text>
            </TouchableOpacity>
            {invoice && (
              <View style={styles.pdfContainer}>
                <FontAwesome5 name="file-pdf" size={25} color={COLORS.red} />
                <Text style={styles.pdfText}>{invoice.name}</Text>
              </View>
            )}
            {errors.invoice && (
              <Text style={styles.errorText}>{errors.invoice}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleSubmit} disabled={loading}>
            <LinearGradient
              colors={['#42a1f5', '#03bafc', '#42c5f5']}
              style={styles.BTNCONATINER}>
              {loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="small" color={COLORS.White} />
                  <Text style={styles.Btntxt}>Submitting...</Text>
                </View>
              ) : (
                <Text style={styles.Btntxt}>SUBMIT</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Second_Container: {
    elevation: 10,
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(10),
    margin: scale(10),
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(15),
  },
  inputContainer: {
    marginBottom: scale(15),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(16),
    color: COLORS.Black,
  },
  title: {
    color: COLORS.blue,
    fontSize: moderateScale(13),
    marginBottom: scale(5),
  },
  DATE_TXT: {
    paddingVertical: verticalScale(3),
    color: COLORS.grey,
    fontSize: moderateScale(16),
  },
  errorText: {
    color: COLORS.red,
    fontSize: moderateScale(12),
    marginTop: scale(5),
  },
  invoiceContainer: {},
  invoiceTitle: {
    color: COLORS.blue,
    fontSize: moderateScale(13),
    marginBottom: scale(5),
  },
  invoiceCard: {
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(8),
    justifyContent: 'center',
  },
  invoiceText: {
    color: COLORS.grey,
    fontSize: moderateScale(16),
    marginLeft: scale(10),
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
  },
  pdfText: {
    marginLeft: scale(10),
    color: COLORS.Black,
    fontSize: moderateScale(16),
  },
  BTNCONATINER: {
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(7),
    alignItems: 'center',
    marginTop: scale(20),
    width: scale(100),
    alignSelf: 'center',
    marginTop: scale(78),
  },
  Btntxt: {
    color: COLORS.White,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
});
