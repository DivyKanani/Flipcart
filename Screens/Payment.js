import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../App';

const Payment = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const {creditCard, addToCreditCard} = useContext(GlobalContext);

  const handleAddCard = () => {
    setModalVisible(true);
  };

  const handleSaveCard = () => {
    const newCard = {
      cardNumber,
      expiration,
      cardHolderName,
    };

    addToCreditCard(newCard)
    setModalVisible(false);
  };

  const renderCard = ({item}) => {
    return(
        <View>
          <Text style={styles.cardNumber}>{item.cardNumber}</Text>
          <Text style={styles.cardDate}>EXP {item.expiration}</Text>
          <Text style={styles.cardName}> {item.cardHolderName}</Text>
        </View>
    )
  }

  return (
    <View style={styles.container}>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={32} color="red" />
            </TouchableOpacity>

            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Card Number"
              onChangeText={setCardNumber}
            />

            <Text style={styles.label}>Expiration (MM/YYYY)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Expiration"
              onChangeText={setExpiration}
              
            />

            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Card Holder Name"
              onChangeText={setCardHolderName}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
              <Text style={styles.buttonText}>Save Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      { (creditCard.length === 0) ? <View></View>:(
        creditCard.map((item) => {
          return(
            <View style={styles.cardView}>
          <Text style={styles.cardNumber}>{item.cardNumber}</Text>
          <Text style={styles.cardDate}>EXP {item.expiration}</Text>
          <Text style={styles.cardName}> {item.cardHolderName}</Text>
        </View>
          )
        }))
      }
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#232F3E',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: 300,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 55
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#232F3E',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  cardView: {
    marginTop: 30,
    backgroundColor: '#000000',
    padding: 20,
    borderRadius: 16,
    width: '85%',
    height: 200,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  cardNumber: {
    color: 'white',
    position: 'relative',
    top: 20,
    fontSize: 26,
    left: 25,
    fontWeight: 600,
  },
  cardDate: {
    position: 'relative',
    top: 20,
    color: 'white',
    left: 20,
    fontWeight: 600
  },
  cardName: {
    position: 'relative',
    top: 0,
    color: 'white',
    left: 15,
    fontWeight: 600,
    fontSize: 18
  }  
});

export default Payment;

   
