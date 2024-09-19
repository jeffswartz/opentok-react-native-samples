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
} from '@vonage/client-sdk-video-react-native';

const applicationId = '472032';
const sessionId =
  '2_MX40NzIwMzJ-fjE3MjY1OTU2NjIwMDR-TUMzdk9Dd0hPdXdnMnppdjRyRjcxYStafn5-';
const token =
  'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPWI5MTZjODRhMzFkMTA4OTFmM2UwNmJjOTc1Mjk0ZjcxNjQ0NDIzNjA6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNalkxT1RVMk5qSXdNRFItVFVNemRrOURkMGhQZFhkbk1ucHBkalJ5UmpjeFlTdGFmbjUtJmNyZWF0ZV90aW1lPTE3MjY1OTU2OTAmbm9uY2U9MC42NTY0NTg5ODAyNTM5OTQyJnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MjkxODc2ODk5NjUmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

class App extends Component {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
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
          options={{
            enableSinglePeerConnection: true,
          }}
          applicationId={applicationId}
          sessionId={sessionId}
          token={token}
          ref={this.session}>
          <OTPublisher style={{width: 200, height: 200}} ref={this.publisher} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
