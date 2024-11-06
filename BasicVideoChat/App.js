/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId = '1_MX40NzIwMzJ-fjE3MzA4NjIzNTgxMjh-aERHay9jWE9kWEJuY0dKT0pjbmwzaUxsfn5-';
    this.token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPWQyMzZjYWNjYTliZWUxMzQwNDhkOTM5ZmExZTBiMmFjYmFlNzQ5MjE6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNekE0TmpJek5UZ3hNamgtYUVSSGF5OWpXRTlrV0VKdVkwZEtUMHBqYm13emFVeHNmbjUtJmNyZWF0ZV90aW1lPTE3MzA4NjI0MjUmbm9uY2U9MC44MzQ3MzM1MTI1MjE1ODM4JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MzM0NTQ0MjUwNjMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 100,
          paddingVertical: 50,
        }}>
        <OTSession
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher style={{width: 200, height: 200}} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
