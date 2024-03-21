import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import chatIcon from '../../../assets/chaticon.png';
import { useCart } from './CartContext';

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handleRemoveFromCart = (productId) => {
    const selectedProduct = cartItems.find(
      (product) => product.id === productId,
    );

    if (selectedProduct) {
      removeFromCart(selectedProduct);
      console.log(`Produto ${productId} removido da cesta!`);
    }
  };

  const handleCheckout = () => {
    setPurchasedItems([...cartItems]);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setPurchasedItems([]);
  };

  const renderPurchasedItems = () => {
    return purchasedItems.map((item) => (
      <View style={styles.purchasedItem} key={item.id}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    ));
  };

  const goToChatPage = () => {
    navigation.navigate('Chat');
  };

  const goToUserPage = () => {
    navigation.navigate('User');
  };

  const goToHomePage = () => {
    navigation.navigate('ProductScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartItemsContainer}>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                <Text style={styles.removeItem}>Remover do carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartItemsList}
        />

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarButton}>
          <Entypo name="home" size={30} color="white" onPress={goToHomePage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton} onPress={goToChatPage}>
          <Image
            source={chatIcon}
            style={[styles.icon, { tintColor: 'white' }]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton}>
          <Ionicons name="man" size={30} color="white" onPress={goToUserPage} />
        </TouchableOpacity>
      </View>

      {}
      {showConfirmation && (
        <View style={styles.overlay}>
          <View style={styles.alert}>
            <Text style={styles.alertTitle}>Compra realizada com sucesso!</Text>
            <Text style={styles.alertSubtitle}>Produtos comprados:</Text>
            <View style={styles.purchasedItemsContainer}>
              {renderPurchasedItems()}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseConfirmation}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    paddingHorizontal: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navBarButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  cartItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 60,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#2A9F85',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  checkoutButton: {
    backgroundColor: '#72AB86',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    margin: 20,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4EEE7',
  },
  removeItem: {
    backgroundColor: '#72AB86',
    borderRadius: 8,
    color: 'white',
    fontSize: 20,
    margin: 10,
    paddingLeft: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertSubtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  purchasedItemsContainer: {
    marginTop: 10,
  },
  purchasedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#72AB86',
    borderRadius: 8,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;