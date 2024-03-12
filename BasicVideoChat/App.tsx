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

const apiKey = 'c696b10d-a8ea-4eae-9cbd-9017c3e05e71';
const sessionId =
  '2_MX5jNjk2YjEwZC1hOGVhLTRlYWUtOWNiZC05MDE3YzNlMDVlNzF-fjE3MTAxODk2Mzg2OTN-cmFxWlpaNXN0MlZsRk41MFFhQVg2SGhUfn5-';
const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNlc3Npb24uY29ubmVjdCIsInNlc3Npb25faWQiOiIyX01YNWpOamsyWWpFd1pDMWhPR1ZoTFRSbFlXVXRPV05pWkMwNU1ERTNZek5sTURWbE56Ri1makUzTVRBeE9EazJNemcyT1ROLWNtRnhXbHBhTlhOME1sWnNSazQxTUZGaFFWZzJTR2hVZm41LSIsInJvbGUiOiJwdWJsaXNoZXIiLCJpbml0aWFsX2xheW91dF9jbGFzc19saXN0IjoiIiwic3ViIjoidmlkZW8iLCJhY2wiOnsicGF0aHMiOnsiL3Nlc3Npb24vKioiOnt9fX0sImV4cCI6MTcxMDI3NjAzOSwianRpIjoiMDdhYjEwNDEtYjkxMy00MDMzLWFkMmMtMTcwOWQzYzBkN2YzIiwiaWF0IjoxNzEwMTg5NjM4LCJhcHBsaWNhdGlvbl9pZCI6ImM2OTZiMTBkLWE4ZWEtNGVhZS05Y2JkLTkwMTdjM2UwNWU3MSJ9.Kf7iIQohqy0Wg3y9mwCrVtsBQGmMP8G2LlGbirH97KfSP5ci8AAwSJg14UkooB6bVhAyHkEUO7IVx_F8qcr7DH1dEmEZHSzzTUVkhPJX85Mc_ztxejWB4ht34UWr-Mjmiu6QJ37leL1yiyVictrGsOxrrrP02rijPDg3eoYXLVhBef6f9pVWONmYzWAGR7BYXPLvFeSjakeC1VnO8l14XKXcYuTnGhgRNi6vMgimTZifmgT6W3Q_LkxqtqjRij661bWnY42HaAYF9ZXWg7QmP8P4Gb3s62yJWDQbse67cvLD1xB4hryqoC0_ZbvKzLtssPv-pkTDr47V_mGdz4icVg';

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
    console.log(3, sessionId);
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
        this.setState({publishCaptions: !this.state.publishCaptions});
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
              subscribeToCaptions: true,
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
