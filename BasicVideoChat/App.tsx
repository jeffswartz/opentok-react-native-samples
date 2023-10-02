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

const apiKey = '';
const sessionId = '';
const token = '';

class App extends Component {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  sessionEventHandlers: OTSessionEventHandlers = {
    sessionConnected: async event => {
      if (this.session.current) {
        this.session.current.getCapabilities();
      }
      console.log(
        'session connected -- connection ID:',
        event.connection.connectionId,
      );
      const capabilities = this.session.current?.getCapabilities().then(() => {
        console.log('session capabilities:', capabilities);
      });
    },
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async (event: StreamCreatedEvent) => {
      if (this.session.current) {
        this.session.current.forceMuteAll([event.streamId]);
      }
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
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
