import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { GlobalContext } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
//import DropDownPicker from "react-native-dropdown-picker";

const Cart = () => {
  const { cart, setCart, addToCart, creditCard, orders, addToOrder } = useContext(GlobalContext);
  const [showPopup, setShowPopup] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
 

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>Price: ${item.price}</Text>
          <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelectedCard(item.cardNumber);
        setDropdownOpen(false);
      }}
    >
      <Text>{item.cardNumber}</Text>
    </TouchableOpacity>
  );

  const handleCheckout = () => {
    togglePopup();
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const calculateTotal = () => {
    let total = 0;
    let quantity = 0;

    for (let item of cart) {
      total += item.price * item.quantity;
      quantity += item.quantity;
    }

    const tax = total * 0.08;
    const grandTotal = total + tax;

    return { total, quantity, tax, grandTotal };
  };

  const { total, quantity, tax, grandTotal } = calculateTotal();
  const submitOrder = () => {
    addToOrder({deliveryAddress: deliveryAddress, selectedCard: selectedCard, status: "Processing", grandTotal, quantity})
    setCart([])
    setSelectedCard(null)
    setDeliveryAddress('')
    togglePopup();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.billContainer}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Total Quantity:</Text>
            <Text style={styles.billValue}>{quantity}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Total:</Text>
            <Text style={styles.billValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Tax (8%):</Text>
            <Text style={styles.billValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.grandTotalLabel}>Grand Total:</Text>
            <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
        <Modal visible={showPopup} animationType="slide" transparent={true}>
          <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
              <Icon name="close" size={32} color="red" />
            </TouchableOpacity>
            <View style={styles.popupContent}>
              <Text style={styles.popupTitle}>Delivery Address</Text>
              <TextInput
                style={styles.addressInput}
                placeholder="Enter your address"
                value={deliveryAddress}
                onChangeText={(text) =>
                  setDeliveryAddress(text)}
                  />
              <Text style={styles.popupTitle}>Select Payment Card</Text>
              <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text style={styles.dropdownSelectedValue}>{selectedCard || 'Select Credit Card'}</Text>
              <Icon name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#555" />
            </TouchableOpacity>
            {dropdownOpen && (
              <View style={styles.dropdownListContainer}>
                <FlatList
                  data={creditCard}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.value}
                  ItemSeparatorComponent={() => <View style={styles.dropdownSeparator} />}
                />
              </View>
            )}

                  <TouchableOpacity style={styles.popupButton} onPress={()=>{submitOrder();}}>
                    <Text style={styles.popupButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#232F3E',
        paddingTop: 50,
      },
      header: {
        backgroundColor: '#232F3E',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      contentContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 20,
      },
      listContainer: {
        paddingBottom: 16,
      },
      closeButton: {
        position: 'relative',
        top: 40,
        right: -150,
        zIndex: 1,
      },
      cartItemContainer: {
        marginBottom: 20,
      },
      cardContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        resizeMode: 'contain',
      },
      productInfoContainer: {
        flex: 1,
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#111',
      },
      productPrice: {
        fontSize: 14,
        marginBottom: 4,
        color: '#555',
      },
      productQuantity: {
        fontSize: 14,
        color: '#777',
      },
      billContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
      },
      billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      billLabel: {
        fontSize: 16,
        color: '#111',
      },
      billValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
      },
      grandTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
      },
      grandTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF9900',
      },
      checkoutButton: {
        backgroundColor: '#FF9900',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
      },
      checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
      },
    
      popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      popupContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 8,
        width: '80%',
      },
      popupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      addressInput: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      popupButton: {
        backgroundColor: '#FF9900',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      popupButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
      },
      dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      dropdownSelectedValue: {
        flex: 1,
        fontSize: 16,
        color: '#111',
      },
      dropdownArrow: {
        marginLeft: 10,
      },
      dropdownListContainer: {
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 4,
        borderColor: '#CCC',
        borderWidth: 1,
        
      },
      dropdownItem: {
        padding: 10,
      },
      dropdownSeparator: {
        height: 1,
        backgroundColor: '#CCC',
      },
    });
    
    export default Cart;
    
                  
