/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import {
  OTSession,
  OTPublisherEventHandlers,
  OTPublisher,
  OTSubscriber,
  OTSessionEventHandlers,
  StreamCreatedEvent,
} from 'opentok-react-native';

const apiKey = '472032';
const sessionId = '2_MX40NzIwMzJ-fjE3MjI1NDAwMzMzOTh-UU9yZHIzSjdZMVdCelVac0ZGdytoTFg2fn5-';
const token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTNmNzU4MzU3NDU0Yzc2MTIxODkzY2ZlZTgwMzE1M2Q0NjU1NTdhYzc6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNakkxTkRBd016TXpPVGgtVVU5eVpISXpTamRaTVZkQ2VsVmFjMFpHZHl0b1RGZzJmbjUtJmNyZWF0ZV90aW1lPTE3MjI1NDAwMzMmbm9uY2U9MC42MzEzODE4MDkxNjk5MDA2JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MjUxMzIwMzMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

class App extends Component {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async () => {
      this.publisher.current?.setAudioTransformers([
        {
          name: 'NoiseSuppression',
          properties: '',
        },
      ]);
    },
  };

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
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          ref={this.session}
          options={{
            enableSinglePeerConnection: true,
          }}>
          <OTPublisher
            style={{width: 200, height: 200}}
            ref={this.publisher}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
