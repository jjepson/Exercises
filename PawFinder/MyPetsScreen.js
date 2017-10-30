import React from 'react';
import {Dimensions, StyleSheet, Button, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight} from 'react-native';
import { List, ListItem } from "react-native-elements";


export class MyPetsScreen extends React.Component {
  static navigationOptions = {
    title: "Available Pets",
    tabBarLabel: 'Pets',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./chats-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  /* loadPetDetails = (petId) => {
    this.props.navigation.navigate('Profile', { petId: petId })
  } */

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#7f8c8d"
        }}
      />
    );
  };

  renderHeader = () => {
    return <View style={{backgroundColor: '#7f8c8d'}}>
      <Text style={{color: "#ecf0f1", fontFamily: 'Thonburi',fontSize: 30,padding: 20, paddingLeft: 5, textAlign: "center"}}>PawFinder</Text>
      </View>;

  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#34495e"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <FlatList 
        data={this.state.data}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        /*ListHeaderComponent={this.renderHeader}*/
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) => (
         /*  <ListItem
            roundAvatar={false}
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
            keyExtractor={item => item.email}
            onPress = {() => {this.props.navigation.navigate('Profile', { petId: item.id })}}
          />*/
          <TouchableHighlight
          onPress = {() => {this.props.navigation.navigate('Profile', { petId: item.email })}}
          >
         <View
          style={styles.canvas}>
          <View>
          <Image style={styles.avatar}
          source={{ uri: item.picture.large }}
          resizeMode = "cover"
          />
          </View>
          <View>
          <Text style={styles.title}>{item.name.first} {item.name.last}</Text>
          <Text style={styles.subTitle}>{item.location.city},{item.location.state}</Text>
          <Text style={styles.info}>Austrailian Cattle Dog / Blue Heeler</Text>
          <Text style={styles.info}>Male, Baby, Small</Text>
          </View>
          </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

const dimensions = Dimensions.get('window');
const imageWidth = Math.round(dimensions.width * .33);
const imageHeight = Math.round(imageWidth * 3 / 4);


const styles = StyleSheet.create({
    canvas: {
      padding: 5,
      flex: 1, 
      flexDirection: 'row', 
      backgroundColor:'#ecf0f1'
    },
    icon: {
      width: 24,
      height: 24,
    },
    avatar: {
        width: imageWidth,
        height: imageHeight,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        borderRadius: 2,
        marginRight: 10
    },
    title: {
      fontFamily: "HelveticaNeue-Light",
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
    },
    subTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    info: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  });