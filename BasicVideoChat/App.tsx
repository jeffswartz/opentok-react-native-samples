/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import type {
  OTPublisherEventHandlers,
  OTPublisherProperties,
  OTSessionEventHandlers,
  OTSubscriberProperties,
  StreamCreatedEvent,
  StreamDestroyedEvent,
} from 'opentok-react-native';
import {
  OTSession,
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';

const apiKey = '472032';
const sessionId =
  '2_MX40NzIwMzJ-fjE3MDU1Mzc4NTk1Mjd-Q2RnczNweHJYcGcvVWo0UDltc3ErYWZ1fn5-';
const token =
  'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTMzNzY3OGY3NGNmZmY4NzM5NGRjNzBiZmI1OTIwOGU5NDE4MjhlOTE6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNRFUxTXpjNE5UazFNamQtUTJSbmN6TndlSEpZY0djdlZXbzBVRGx0YzNFcllXWjFmbjUtJmNyZWF0ZV90aW1lPTE3MDU1Mzc4NjAmbm9uY2U9MC4xODM3MDkxODUyNDA0OTQ0JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MDgxMjk4NjAmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

class App extends Component {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  private subscriber = createRef<OTSubscriber>();
  hideSelfSubscriber = false;

  state = {
    publisherStreamId: '',
    publish: true,
  };

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
    streamCreated: async event => {
      console.log('session streamCreated', event);
      this.streamProperties[event.streamId] = this.subscriberProperties;
    },
    streamDestroyed: async event => {
      console.log('session streamDestroyed', event);
      delete this.streamProperties[event.streamId];
    },
  };

  streamProperties = {};

  subscriberProperties: OTSubscriberProperties = {
    subscribeToAudio: false,
  };

  publisherProperties: OTPublisherProperties = {
    publishAudio: false,
  };

  selfSubscriberProperties: OTSubscriberProperties = {
    subscribeToAudio: false,
    subscribeToVideo: false,
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async (event: StreamCreatedEvent) => {
      console.log('publisher streamCreated', event.streamId);
      this.streamProperties[event.streamId] = this.selfSubscriberProperties;
      this.setState({publisherStreamId: event.streamId});
      setTimeout(() => {
        console.log('10 seconds');
        // this.setState({publish: false});
      }, 10000);
    },
    streamDestroyed: async (event: StreamDestroyedEvent) => {
      console.log('publisher streamDestroyed', event.streamId);
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
          {this.state.publish ? (
            <OTPublisher
              style={{width: 200, height: 200}}
              ref={this.publisher}
              properties={this.publisherProperties}
              eventHandlers={this.publisherEventHandlers}
            />
          ) : null}
          <OTSubscriber
            subscribeToSelf={true}
            streamProperties={this.streamProperties}
            ref={this.subscriber}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (streamIds: any[]) => {
                if (streamIds.length === 0) {
                  return null;
                }
                return streamIds.map((streamId: string | undefined) => {
                  console.log(`OTSubscriberView streamId: ${streamId}`);
                  const isSelfSubscriber =
                    streamId === this.state.publisherStreamId;
                  console.log(`subscriber for self: ${isSelfSubscriber}`);
                  return (
                    <OTSubscriberView
                      streamId={streamId}
                      key={streamId}
                      style={
                        isSelfSubscriber && this.hideSelfSubscriber
                          ? {}
                          : {width: 100, height: 100}
                      }
                    />
                  );
                });
              }
            }
          </OTSubscriber>
        </OTSession>
      </View>
    );
  }
}

export default App;
