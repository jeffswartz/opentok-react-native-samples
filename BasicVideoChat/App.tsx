/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import type {
  OTPublisherEventHandlers,
  OTPublisherProperties,
  OTSessionEventHandlers,
  OTSubscriberEventHandlers,
  OTSubscriberProperties,
  StreamCreatedEvent,
} from 'opentok-react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

const apiKey = '';
const sessionId = '';
const token = '';

class App extends Component {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  private subscriber = createRef<OTSubscriber>();

  sessionEventHandlers: OTSessionEventHandlers = {
    error: event => {
      console.log('error', event);
    },
    otrnError: event => {
      console.log('otrnError:', event);
    },
    sessionConnected: async event => {
      console.log(
        'session connected -- connection ID:',
        event.connection.connectionId,
      );
    },
  };

  subscriberProperties: OTSubscriberProperties = {
    subscribeToAudio: false,
    subscribeToVideo: true,
  };

  publisherProperties: OTPublisherProperties = {
    audioFallbackEnabled: true,
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async (event: StreamCreatedEvent) => {
      console.log('publisher streamCreated', event.streamId);
    },
    videoDisabled: async event => {
      console.log('publisher videoDisabled', event.reason);
    },
    videoDisableWarning: async () => {
      console.log('publisher videoDisableWarning');
    },
    videoDisableWarningLifted: async () => {
      console.log('publisher videoDisableWarningLifted');
    },
    videoEnabled: async event => {
      console.log('publisher videoEnabled', event.reason);
    },
  };

  subscriberEventHandlers: OTSubscriberEventHandlers = {
    videoDisabled: async event => {
      console.log('subscriber videoDisabled', event.reason);
    },
    videoDisableWarning: async event => {
      console.log('subscriber videoDisableWarning', event.reson);
    },
    videoDisableWarningLifted: async () => {
      console.log('subscriber videoDisableWarningLifted');
    },
    videoEnabled: async event => {
      console.log('subscriber videoEnabled', event);
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
            properties={{
              audioFallback: {
                publisher: true,
                subscriber: true,
              },
              audioFallbackEnabled: false, // This is overrulled by the audioFallbackEnabled.subscriber setting
            }}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTSubscriber
            properties={this.subscriberProperties}
            eventHandlers={this.subscriberEventHandlers}
            ref={this.subscriber}
            style={{width: 200, height: 200}}
          />
        </OTSession>
      </View>
    );
  }
}

export default App;
