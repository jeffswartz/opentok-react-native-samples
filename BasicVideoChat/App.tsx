/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import type {
  OTPublisherEventHandlers,
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
      console.log('error', event);
    },
    sessionConnected: async event => {
      console.log(
        'session connected -- connection ID:',
        event.connection.connectionId,
      );
    },
  };

  subscriberProperties: OTSubscriberProperties = {
    // The fact that this is a required property is a bug in otrn v2.27.0:
    audioVolume: 0,
  };

  publisherEventHandlers: OTPublisherEventHandlers = {};

  subscriberEventHandlers: OTSubscriberEventHandlers = {
    connected: event => {
      console.log('subscriber connected stream ID', event.streamId);
      setInterval(() => this.subscriber.current?.getRtcStatsReport(), 2000);
    },
    rtcStatsReport: stats =>
      console.log(
        `subscriber rtcStatsReport stream ID ${
          stats.stream.streamId
        }: ${Object.keys(stats)}`,
      ),
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          ref={this.session}
          eventHandlers={this.sessionEventHandlers}>
          <OTPublisher
            style={{width: 200, height: 150}}
            ref={this.publisher}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTSubscriber
            eventHandlers={this.subscriberEventHandlers}
            ref={this.subscriber}
            style={{width: 200, height: 150}}
          />
        </OTSession>
      </View>
    );
  }
}

export default App;
