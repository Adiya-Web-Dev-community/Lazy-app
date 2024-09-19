import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale, scale} from '../../../utils/Scaling';

export default function Reports() {
  const [showBreakup, setShowBreakup] = useState(false);

  const toggleBreakup = () => {
    setShowBreakup(prev => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <AntDesign name="arrowleft" size={25} color={COLORS.Black} />
          <Text style={styles.title}>Reports</Text>
        </View>
        <Text style={styles.seeAll}>See all reports</Text>
      </View>
      <View style={styles.profitContainer}>
        <Text style={styles.profitTitle}>All Time Total Profit</Text>
        <AntDesign
          name="questioncircleo"
          size={15}
          color={COLORS.Black}
          style={styles.questionIcon}
        />
      </View>
      <Text style={styles.totalProfit}>$20.00</Text>
      <View>
        <TouchableOpacity onPress={toggleBreakup} style={styles.breakupToggle}>
          <Text style={styles.breakupText}>
            {showBreakup ? 'Hide breakup' : 'View breakup'}
          </Text>
          <AntDesign
            name={showBreakup ? 'up' : 'down'}
            size={18}
            color={COLORS.green}
            style={styles.breakupIcon}
          />
        </TouchableOpacity>
        {showBreakup && (
          <View style={styles.breakupContainer}>
            <Text style={styles.breakupText}>Breakdown of profits:</Text>
            <Text>Item 1: $10.00</Text>
            <Text>Item 2: $5.00</Text>
            <Text>Item 3: $5.00</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(10),
    borderBottomWidth: 0.5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  seeAll: {
    color: COLORS.green,
  },
  profitContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(15),
    marginTop: scale(30),
  },
  profitTitle: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(13),
  },
  questionIcon: {
    marginLeft: scale(5),
    alignSelf: 'center',
  },
  totalProfit: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(26),
    marginHorizontal: scale(15),
    marginTop: scale(5),
  },
  breakupToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  breakupText: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.green,
    textDecorationLine: 'underline', // Underline the text
  },
  breakupIcon: {
    marginTop: scale(5),
  },
  breakupContainer: {
    marginTop: scale(10),
    marginHorizontal: scale(15),
  },
});
