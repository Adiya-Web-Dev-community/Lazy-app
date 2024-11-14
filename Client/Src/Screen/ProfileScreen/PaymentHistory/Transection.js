import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale} from '../../../utils/Scaling';
import {GetTransactionHistory} from '../../../api/api';

export default function Transaction() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetTransactionHistory();
        if (result.success) {
          setTransactionHistory(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch transaction history:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.green} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {transactionHistory.map(item => (
            <View style={styles.detailContainer} key={item._id}>
              <Text style={styles.label}>
                Type: <Text style={styles.value}>{item.type}</Text>
              </Text>
              <Text style={styles.label}>
                Amount: <Text style={styles.value}>₹{item.amount}</Text>
              </Text>
              <Text style={styles.label}>
                Status:{' '}
                <Text style={[styles.value, styles[item.status]]}>
                  {item.status}
                </Text>
              </Text>
              <Text style={styles.label}>
                Created At:{' '}
                <Text style={styles.value}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </Text>
              <Text style={styles.label}>
                Updated At:{' '}
                <Text style={styles.value}>
                  {new Date(item.updatedAt).toLocaleString()}
                </Text>
              </Text>

              {item.type === 'transaction' && (
                <>
                  <Text style={styles.subLabel}>
                    Payment Type:{' '}
                    <Text style={styles.value}>{item.paymenttype}</Text>
                  </Text>
                  <Text style={styles.subLabel}>
                    Payment Mode:{' '}
                    <Text style={styles.value}>{item.paymentMode}</Text>
                  </Text>
                  <Text style={styles.subLabel}>
                    Remarks: <Text style={styles.value}>{item.remarks}</Text>
                  </Text>
                </>
              )}

              {item.type === 'claim_history' && (
                <>
                  <Text style={styles.subLabel}>
                    Claim ID:{' '}
                    <Text style={styles.value}>{item.claimId._id}</Text>
                  </Text>
                  <Text style={styles.subLabel}>
                    Product Name:{' '}
                    <Text style={styles.value}>{item.claimId.productname}</Text>
                  </Text>
                  {item.action.map(action => (
                    <View key={action._id} style={styles.actionContainer}>
                      <Text style={styles.label}>
                        Action Status:{' '}
                        <Text style={styles.value}>{action.status}</Text>
                      </Text>
                      <Text style={styles.label}>
                        Updated By:{' '}
                        <Text style={styles.value}>{action.updateBy}</Text>
                      </Text>
                      <Text style={styles.label}>
                        Description:{' '}
                        <Text style={styles.value}>{action.description}</Text>
                      </Text>
                      <Text style={styles.label}>
                        Date:{' '}
                        <Text style={styles.value}>
                          {new Date(action.date).toLocaleString()}
                        </Text>
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  card: {
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(12),
    padding: scale(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: scale(5),
    color: COLORS.Black,
  },
  subLabel: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: scale(5),
    color: COLORS.Black,
  },
  value: {
    fontWeight: '700',
    color: COLORS.Black,
  },
  detailContainer: {
    marginBottom: scale(15),
    padding: scale(15),
    borderRadius: moderateScale(10),
    backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#d0e7ff',
  },
  actionContainer: {
    marginTop: scale(10),
    padding: scale(8),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  success: {
    color: '#28A745',
  },
});
