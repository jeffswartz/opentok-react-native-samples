/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import type {
  OTPublisherEventHandlers,
  OTSessionEventHandlers,
  OTSubscriberEventHandlers,
  OTSubscriberProperties,
} from 'opentok-react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

const apiKey = '';
const sessionId = '';
const token = '';

class App extends Component {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  private subscriber = createRef<OTSubscriber>();
  audioNetworkStatsReceived = false;
  videoNetworkStatsReceived = false;

  sessionEventHandlers: OTSessionEventHandlers = {
    error: event => {
      console.log(333, event);
    },
    otrnError: event => {
      console.log(666, event);
    },
  };

  subscriberProperties: OTSubscriberProperties = {};

  publisherEventHandlers: OTPublisherEventHandlers = {
    // This was reported as broken in the 2.27.0 type defiinitions.
    // Although the following line resulted in no linting errors,
    // The OTSession, OTPublisher, and OTSubscriber components below
    // resulted in JSX linting errors.
    videoDisabled: event => {
      console.log('publisher videoDisabled', event.reason);
    },
  };

  subscriberEventHandlers: OTSubscriberEventHandlers = {
    connected: () => {
      console.log('subscriber connected');
      setInterval(() => this.subscriber.current?.getRtcStatsReport(), 2000);
    },
    videoDisabled: event => console.log(event.stream, event.reason),
    videoDisableWarning: event => console.log(event.stream),
    videoDisableWarningLifted: event => console.log(event),
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
          signal={{
            type: 'testType',
            data: 'testData',
          }}
          ref={this.session}
          eventHandlers={this.sessionEventHandlers}>
          <OTPublisher
            style={{width: 200, height: 200}}
            ref={this.publisher}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTSubscriber
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
