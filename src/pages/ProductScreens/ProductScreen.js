import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import carrinhoIcon from '../../../assets/carrinhoicon.png';
import chatIcon from '../../../assets/chaticon.png';
import { useCart } from '../Cart/CartContext';
import { useNavigation } from '@react-navigation/native';

const ProductScreen = () => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.15.175:3000/api/product');
      const data = await response.json();

      if (response.status === 200) {
        setProducts(data);
      } else {
        Alert.alert('Erro', 'Erro ao carregar produtos do servidor');
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Aconteceu um erro. Tente novamente mais tarde.');
    }
  };

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId,
    );

    if (selectedProduct) {
      addToCart(selectedProduct);
      console.log(`Produto ${productId} adicionado à cesta!`);
    }
  };

  const handleAddToFavorites = (productId) => {
    console.log(`Produto ${productId} adicionado aos favoritos!`);
  };

  const goToChatPage = () => {
    navigation.navigate('Chat');
  };

  const goToCartPage = () => {
    navigation.navigate('Cart');
  };

  const goToUserPage = () => {
    navigation.navigate('User');
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => handleAddToCart(item.id)}
      >
        <Text style={styles.buttonText}>Adicionar à Cesta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleAddToFavorites(item.id)}
      >
        <Text style={styles.favoriteButtonText}>Adicionar aos Favoritos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productsList}
      />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarButton} onPress={goToChatPage}>
          <Image source={chatIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton} onPress={goToCartPage}>
          <Image source={carrinhoIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton} onPress={goToUserPage}>
          <Ionicons name="man" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={handleAddToFavorites}
        >
          <Ionicons name="heart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EEE7',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2A9F85',
    paddingVertical: 10,
  },
  navBarButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#F4EEE7',
  },
  productsList: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A9F85',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#72AB86',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F4EEE7',
  },
  cartButton: {
    backgroundColor: '#72AB86', // Cor para adicionar à cesta
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 5,
  },
  favoriteButton: {
    backgroundColor: '#2A9F85', // Cor para adicionar aos favoritos
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F4EEE7',
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F4EEE7',
  },
});

export default ProductScreen;