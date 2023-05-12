import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=100');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderProduct = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('ProductInfoScreen', {
        image: item.image,
        name: item.title,
        price: item.price,
        description: item.description,
      });
    };
  
    return (
      <View style={styles.productContainer}>
      <TouchableOpacity  onPress={handlePress}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Homepage</Text>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer} 
        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232F3E',
    paddingTop: 50
  },
  header: {
    backgroundColor: '#232F3E',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    alignItems: 'center', // Center the header content horizontally
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    
  },
  listContainer: {
    padding: 16,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    textAlign: 'center',
  },
  bottomSpace: {
    height: 100, // Adjust the height as needed
  },
});
