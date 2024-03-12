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
  '2_MX5jNjk2YjEwZC1hOGVhLTRlYWUtOWNiZC05MDE3YzNlMDVlNzF-fjE3MTAyNzExMDE5NDh-K1lFbWlCTHBBTi92Z05hckhKY3BSaFFofn5-';
const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNlc3Npb24uY29ubmVjdCIsInNlc3Npb25faWQiOiIyX01YNWpOamsyWWpFd1pDMWhPR1ZoTFRSbFlXVXRPV05pWkMwNU1ERTNZek5sTURWbE56Ri1makUzTVRBeU56RXhNREU1TkRoLUsxbEZiV2xDVEhCQlRpOTJaMDVoY2toS1kzQlNhRkZvZm41LSIsInJvbGUiOiJwdWJsaXNoZXIiLCJpbml0aWFsX2xheW91dF9jbGFzc19saXN0IjoiIiwic3ViIjoidmlkZW8iLCJhY2wiOnsicGF0aHMiOnsiL3Nlc3Npb24vKioiOnt9fX0sImV4cCI6MTcxMDM1NzUwMiwianRpIjoiYTBjMWI3NTQtYWRlOS00YzcyLTk3YTEtY2IzYTc1NTY2Zjc1IiwiaWF0IjoxNzEwMjcxMTAyLCJhcHBsaWNhdGlvbl9pZCI6ImM2OTZiMTBkLWE4ZWEtNGVhZS05Y2JkLTkwMTdjM2UwNWU3MSJ9.iMAtbir-Pzo1YJQhD6cKo8dvRePVD4ieDEDTHZhbp2WLQdGyLdr73chcwpjQ83mvpaAUst44TYYWdzfCwE1bYtVq6oP5bgWIGJHkv3ccKCmUvGVuK6RnM3Hj5HfQf8utPEccvvuDdOnMX9qU3uM1WqfOLpvWvR-2cmrhq095k7dynQk1ELuSNNUZUiwlRXsHxsnvtOaAH3BAjFyQqRcVysPPRMmIE-vGi7lWKK5Y5ye69lJbjjvD5daeAP0kE5F5E8A0OJ5ewK5DvSPPCr_1LQswk7sQL7AAVRhjg_lq2yXl_VoqZRtKHDd-r0UTaEd_AFqkWjydNMnYYtRJ0-A_CQ';

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
          subscribeToCaptions: true // !this.state.subscribeToCaptions,
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
