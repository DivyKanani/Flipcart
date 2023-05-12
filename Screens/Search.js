import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Text, FlatList } from 'react-native';

const cols = 2;
const width = Dimensions.get('window').width;

const GridItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text> 
              <Text style={styles.text} >{item.price}</Text>
    </View>
  );
};

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const renderItem = ({ item }) => <GridItem item={item} />;
  

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=25`
      );
      const result = response.data;
      const products = result.map((product) => ({
        image: product.image,
        title: product.title,
        price: product.price,
        description: product.description
    }));
      if (response.data) {
        setSearchResults(products);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchPress = () => {
    handleSearch(query);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.search}>
      <TouchableOpacity style={styles.button} onPress={handleSearchPress}>
        <AntDesign name="search1" size={28} color="black" style={{  marginRight: 10}} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search for a product..."
        value={query}
        selectionColor={"#32CD32"}
        underlineColorAndroid="transparent"
        onChangeText={setQuery}
        onSubmitEditing={() => handleSearch(query)}
      />
      
      </View>
      { searchResults && <FlatList
      data={searchResults}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      columnWrapperStyle={styles.columnWrapper}
    />
      }
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 1,
      borderColor: 'gray',
      width: "88%",
    },
    outer: {
      flexDirection: 'row',
      height: 300
    },
    search: {
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: 20
    },
    container: {
      flex: 1,
      marginTop: 60,
      marginBottom: 20,
      borderRadius: 10,
      marginHorizontal: 20,
      justifyContent: 'flex-end',
      backgroundColor: '#f0f0f0',
    },
    results: {
      marginTop: 10,
      marginBottom: 10,
      flexDirection: "column",
    },
    product_spacing: {
      backgroundColor: "#FAF9F6",
      flexDirection: "column",
      fontSize: 16,
      margin: 10,
      width: 180,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginBottom: 10,
      flexDirection: 'column',
      alignItems: 'center',
      width: 180
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 30
    },
    columnWrapper: {
      justifyContent: 'space-between',
      width: width - 50,
      marginHorizontal: 10,
    },
  });
