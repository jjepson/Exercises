import React from 'react';
import {StyleSheet, Button, Image, View, Text, FlatList, ActivityIndicator} from 'react-native';
import { List, ListItem } from "react-native-elements";

export class MyPetsScreen extends React.Component {
  static navigationOptions = {
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <Text>PAWFINDER!</Text>;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List>
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) => (
          /*<ListItem
            roundAvatar={false}
            containerStyle= {styles.container}
            avatarStyle ={styles.avatar}
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
            keyExtractor={item => item.email}

          />*/
          <View style={{flex: 1, flexDirection: 'row', backgroundColor:'#EEE'}}>
          <View>
          <Image style={styles.avatar}
          source={{ uri: item.picture.large }}
          /></View>
          <View><Text style={styles.title}>{item.name.first} {item.name.last}</Text>
          <Text style={styles.subTitle}>{item.location.city},{item.location.state}</Text>
          <Text style={styles.info}>{item.login.username}</Text>
          </View></View>
        )}
      />
    </List>
    );
  }
}

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    avatar: {
        width: 150,
        height: 150,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    title: {
      fontSize: 24,
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