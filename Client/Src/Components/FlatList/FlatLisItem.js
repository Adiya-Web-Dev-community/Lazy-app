import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

export default function FlatLisItem({
  data,
  renderItem,
  horizontal,
  showsHorizontalScrollIndicator,
  style,
  numColumns,
  columnWrapperStyle
}) {
  return (
    <View style={styles.container}>
      <FlatList
        style={style}
        data={data}
        renderItem={renderItem}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapperStyle}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
