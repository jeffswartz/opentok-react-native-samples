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
  '2_MX40NzIwMzJ-fjE3MjM3NzExODA1ODJ-UE55c3gvQm5Wc2FSTnRTV1ZpQnNNWEZGfn5-';
const token =
  'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTdmYzEzZjJiYzgxODVmZGFlZDhlMDVjMGU2ODRkY2UzNjg3ZTg5MzY6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNak0zTnpFeE9EQTFPREotVUU1NWMzZ3ZRbTVXYzJGU1RuUlRWMVpwUW5OTldFWkdmbjUtJmNyZWF0ZV90aW1lPTE3MjczNzUwMTUmbm9uY2U9MC42MDU3MjY3NjA0MjQyOTUzJnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3Mjk5NjcwMTM5NzMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

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
