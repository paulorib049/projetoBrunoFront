import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import chatIcon from '../../../assets/chaticon.png';
import { useCart } from '../Cart/CartContext';

const Favorites = ({ navigation }) => {
  const { cartState, removeFromFavorites } = useCart();

  const handleRemoveFromFavorites = (productId) => {
    const selectedFavorite = cartState.favorites.find((item) => item.id === productId);

    if (selectedFavorite) {
      removeFromFavorites(selectedFavorite);
      console.log(`Produto ${productId} removido dos favoritos!`);
    }
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

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.item}>
      {/* Renderize os detalhes do produto aqui, como feito na ProductScreen */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      {/* Restante do código... */}
      <TouchableOpacity onPress={() => handleRemoveFromFavorites(item.id)}>
        <Text style={styles.removeItem}>Remover dos Favoritos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartState.favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.favoritesList}
      />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarButton} onPress={goToChatPage}>
          <Image source={chatIcon} style={styles.icon} />
        </TouchableOpacity>
        {/* Restante do código... */}
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

  favoritesList: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  removeItem: {
    backgroundColor: '#2A9F85',
    borderRadius: 8,
    color: 'white',
    fontSize: 20,
    margin: 10,
    paddingLeft: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center'
  },
});

export default Favorites;
