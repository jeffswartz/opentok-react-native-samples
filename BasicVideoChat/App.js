/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId = '1_MX40NzIwMzJ-fjE3MTkyMjU4NjQ2MzJ-VTgvd3ZZUlRNa1licGRPbUZnSnEyeEp2fn5-';
    this.token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTBlMDE2Y2NlYTNiMDYzODYwNTY4ZmY4MGI4NzA5YmEyNjM2MWJiNDE6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNVGt5TWpVNE5qUTJNekotVlRndmQzWlpVbFJOYTFsaWNHUlBiVVpuU25FeWVFcDJmbjUtJmNyZWF0ZV90aW1lPTE3MTkyMjU4NjUmbm9uY2U9MC4yOTg2NjU5NTQ4NTg4NDAyJnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MjE4MTc4NjUmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
