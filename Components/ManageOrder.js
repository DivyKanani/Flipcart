import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GlobalContext } from '../App';

const ManageOrder = () => {

    const {orders} = useContext(GlobalContext)
  


  const renderItem = ({ item }) => (
    <View style={styles.orderItemContainer}>
      <View style={styles.orderHeaderContainer}>
        <Text style={styles.orderHeaderTitle}>Order Total</Text>
        <Text style={styles.orderHeaderValue}>${item.grandTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.orderInfoContainer}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Quantity:</Text>
          <Text style={styles.orderInfoValue}>{item.quantity}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Status:</Text>
          <Text style={styles.orderInfoValue}>{item.status}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Delivery Address:</Text>
          <Text style={styles.orderInfoValue}>{item.deliveryAddress}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Selected Card:</Text>
          <Text style={styles.orderInfoValue}>{item.selectedCard}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 16,
  },
  orderItemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 2,
  },
  orderHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  orderHeaderValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  orderInfoContainer: {
    marginLeft: 12,
  },
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888888',
    width: 120,
  },
  orderInfoValue: {
    fontSize: 14,
    color: '#111111',
  },
});

export default ManageOrder;

