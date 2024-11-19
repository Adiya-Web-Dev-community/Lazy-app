import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import { scale } from '../../utils/Scaling';

const products = [
  {
    id: '1',
    name: 'Product 1',
    image: 'https://via.placeholder.com/150',
    price: '$50',
    discount: '10% Off',
  },
  {
    id: '2',
    name: 'Product 2',
    image: 'https://via.placeholder.com/150',
    price: '$80',
    discount: '15% Off',
  },
  {
    id: '3',
    name: 'Product 3',
    image: 'https://via.placeholder.com/150',
    price: '$30',
    discount: '5% Off',
  },
  {
    id: '4',
    name: 'Product 4',
    image: 'https://via.placeholder.com/150',
    price: '$100',
    discount: '20% Off',
  },
];

export default function DealPage() {
  const renderProduct = ({item}) => (
    <View style={styles.productCard}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDiscount}>{item.discount}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Deals</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  productList: {
    justifyContent: 'space-between',
    gap:scale(10)
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    // padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 200,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 14,
    color: '#ff6347',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});
