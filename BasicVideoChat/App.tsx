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
  audioNetworkStatsReceived = false;
  videoNetworkStatsReceived = false;

  state = {
    publisherStreamId: '',
  };

  sessionEventHandlers: OTSessionEventHandlers = {
    error: event => {
      console.log(333, event);
    },
    otrnError: event => {
      console.log(666, event);
    },
    sessionConnected: async event => {
      console.log(
        'session connected -- connection ID:',
        event.connection.connectionId,
      );
      this.session.current?.getCapabilities().then(capabilities => {
        console.log('session capabilities:', capabilities);
      });
    },
    signal: async event => {
      console.log('signal received', event);
      // The SignalEvent.connectionId type was missing in 2.26:
      console.log('signal from connection', event.connectionId);
    },
  };

  subscriberProperties: OTSubscriberProperties = {
    subscribeToAudio: true,
    // These types were missing in 2.26:
    audioVolume: 1,
    preferredFrameRate: 1,
    preferredResolution: '352x288',
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async (event: StreamCreatedEvent) => {
      console.log('publisher streamCreated', event.streamId);
      setTimeout(
        () => this.setState({publisherStreamId: event.streamId}),
        2000,
      );
      if (this.session.current) {
        this.session.current.forceMuteAll([event.streamId]);
      }

      if (this.publisher.current) {
        const blurFilter = {
          name: 'BackgroundBlur',
          properties: JSON.stringify({
            radius: 'High',
          }),
        };
        const backgroundReplacement = {
          name: 'BackgroundImageReplacement',
          properties: JSON.stringify({
            image_file_path: '/details/background.jpg',
          }),
        };
        console.log('filters', blurFilter, backgroundReplacement);
        this.publisher.current.setVideoTransformers([blurFilter]);
        this.publisher.current.getRtcStatsReport();
      }
    },
    audioNetworkStats: async event => {
      if (this.audioNetworkStatsReceived) {
        return;
      }
      this.audioNetworkStatsReceived = true;
      console.log('publisher audioNetworkStats', event);
    },
    videoNetworkStats: async event => {
      if (this.videoNetworkStatsReceived) {
        return;
      }
      this.videoNetworkStatsReceived = true;
      console.log('publisher videoNetworkStats', event);
    },
    // This was missing in the 2.26 type defiinitions:
    rtcStatsReport: async () => {
      // console.log('publisher rtcStatsReport', event);
    },
  };

  subscriberEventHandlers: OTSubscriberEventHandlers = {
    connected: () => {
      console.log('subscriber connected');
      setInterval(() => this.subscriber.current?.getRtcStatsReport(), 2000);
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
