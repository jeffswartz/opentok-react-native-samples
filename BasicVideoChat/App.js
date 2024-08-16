/* eslint-disable react-native/no-inline-styles */
import React, {Component, Text} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId =
      '2_MX40NzIwMzJ-fjE3MjM2OTkxNTcyNzl-SDAxNjRyZFhuY2hpaFhsMkY1a3pxcjNMfn5-';
    this.token =
      'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTk3Yjg3MDYwNjdmMGYwZTRiN2YyZWZiNTQwMjgxZmJjMTgwYTM5ZjY6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNak0yT1RreE5UY3lOemwtU0RBeE5qUnlaRmh1WTJocGFGaHNNa1kxYTNweGNqTk1mbjUtJmNyZWF0ZV90aW1lPTE3MjM2OTkxNTcmbm9uY2U9MC43ODU1NDE0Mjc5NDAwMjI0JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MjYyOTExNTcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
          sessionId={this.apiKey}
          token={this.token}
          options={{
            androidOnTop: 'publisher',
          }}
          style={{flex: 1, position: 'relative', width: '300px', height: '300px'}}>
          <OTSubscriber
            properties={{
              subscribeToAudio: false,
              subscribeToVideo: true,
            }}
            style={[
              {
                // display: subVideo ? "flex" : "none"
              },
              {
                height: 600,
                width: 600,
              },
            ]}
          />
          <OTPublisher
            properties={{
              publishAudio: true,
              publishVideo: true,
            }}
          />
        </OTSession>
      </View>
    );
  }
}

const otVideo = true;
const $publisherStyle = {
  width: 116,
  height: 155,
  borderRadius: 50,
  borderStyle: 'solid',
  borderColor: 'red',
  borderWidth: 10,
  zIndex: 3,
};

export default App;
