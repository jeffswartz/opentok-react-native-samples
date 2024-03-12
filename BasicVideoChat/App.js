/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId = '1_MX40NzIwMzJ-fjE3MTAyNzgxNjg0NDV-V2hwbnlwZEdUSWlxZFRrbThPL2hvZGZ2fn5-';
    this.token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTFkMzNmNGRhMGYyZDU0NmViOTVkNjA1NTg1NWNiNmIwYjRhMDY1Yzc6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNVEF5TnpneE5qZzBORFYtVjJod2JubHdaRWRVU1dseFpGUnJiVGhQTDJodlpHWjJmbjUtJmNyZWF0ZV90aW1lPTE3MTAyNzgxNjgmbm9uY2U9MC4zMzkzNTUzMjM5NzEzMDEyJnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MTI4NzAxNjgmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
          token={this.token}
          eventHandlers={{
            error: error => console.log('OTSession error:', error),
            sessionConnected: event => console.log('connected:', event),
          }}>
          <OTPublisher
            style={{width: 200, height: 200}}
            properties={{videoTrack: false}}
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
