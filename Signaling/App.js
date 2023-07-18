import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { OTSession } from 'opentok-react-native';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  mainText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47640471';
    this.sessionId = '1_MX40NzY0MDQ3MX5-MTY4MDExMDU2MDcxOH55Z1lhYWlNM0M0Y1NpNlZoRW1WNzFHRyt-fn4';
    this.token = 'T1==cGFydG5lcl9pZD00NzY0MDQ3MSZzaWc9Nzk2ODA4MzNjM2I0NDRiNjRlZDQwMmQxMWZlMDFjOTg2NTRiMjgyOTpzZXNzaW9uX2lkPTFfTVg0ME56WTBNRFEzTVg1LU1UWTRNREV4TURVMk1EY3hPSDU1WjFsaFlXbE5NME0wWTFOcE5sWm9SVzFXTnpGSFJ5dC1mbjQmY3JlYXRlX3RpbWU9MTY4MDk3OTE2OSZub25jZT0wLjcyNzY2MjQwODQ2NDE3MyZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNjgzNTcxMTY5JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
    this.state = {
      signal: {
        data: '',
        type: '',
      },
      text: '',
      messages: [],
    };
    this.sessionEventHandlers = {
      signal: (event) => {
        if (event.data) {
          const myConnectionId = this.session.getSessionInfo().connection.connectionId;
          const oldMessages = this.state.messages;
          const messages = event.connectionId === myConnectionId ? [...oldMessages, {data: `Me: ${event.data}`}] : [...oldMessages, {data: `Other: ${event.data}`}];
          this.setState({
            messages,
          });
        }
      },
    };
  }
  sendSignal() {
    if (this.state.text) {
      this.setState({
        signal: {
          type: '',
          data: this.state.text,
        },
        text: '',
      });
    }
  }
  _keyExtractor = (item, index) => index;
  _renderItem = ({item}) => (
    <Text style={styles.item}>{item.data}</Text>
  );
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.mainText}> OpenTok React Native Signaling Sample</Text>
        <OTSession 
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}
          signal={this.state.signal}
          eventHandlers={this.sessionEventHandlers}
          ref={(instance) => {
            this.session = instance;
          }}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => { this.setState({ text }); }}
          value={this.state.text}
        />
        <Button
          onPress={() => { this.sendSignal(); }}
          title="Send Signal"
        />
        <FlatList
          data={this.state.messages}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

export default App;