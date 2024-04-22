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
import {boolean} from 'yargs';

const apiKey = '';
const sessionId = '';
const token = '';

class App extends Component<
  {},
  {publishCaptions: boolean; subscribeToCaptions: boolean}
> {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  private subscriber = createRef<OTSubscriber>();

  constructor(props) {
    super(props);
    this.state = {
      publishCaptions: true,
      subscribeToCaptions: true,
    };
  }

  sessionEventHandlers: OTSessionEventHandlers = {
    sessionConnected: async event => {
      if (this.session.current) {
        this.session.current.getCapabilities();
      }
      console.log(
        'session connected -- connection ID:',
        event.connection.connectionId,
      );
    },
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async () => {
      setInterval(() => {
        this.setState({
          publishCaptions: !this.state.publishCaptions,
          subscribeToCaptions: !this.state.subscribeToCaptions,
        });
        console.log(this.state.subscribeToCaptions);
      }, 5000);
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
          eventHandlers={this.sessionEventHandlers}>
          <OTPublisher
            style={{width: 200, height: 200}}
            ref={this.publisher}
            eventHandlers={this.publisherEventHandlers}
            properties={{
              publishCaptions: this.state.publishCaptions,
            }}
          />
          <OTSubscriber
            style={{width: 200, height: 200}}
            properties={{
              subscribeToCaptions: this.state.subscribeToCaptions,
            }}
            ref={this.subscriber}
            eventHandlers={{
              connected: () => {
                console.log('connected');
              },
              captionReceived: event => {
                console.log('Caption received:', event.text);
                console.log('Caption final:', event.isFinal);
              },
            }}
          />
        </OTSession>
      </View>
    );
  }
}

export default App;
