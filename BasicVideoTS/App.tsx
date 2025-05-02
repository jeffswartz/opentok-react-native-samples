import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import {
  OTSession,
  OTSubscriber,
  OTSubscriberView,
  OTPublisher,
} from 'opentok-react-native';

function App(): React.JSX.Element {
  const apiKey = '';
  const sessionId = '';
  const token = '';

  return (
    <SafeAreaView style={styles.flex1}>
      <OTSession
        apiKey={apiKey}
        token={token}
        sessionId={sessionId}
        options={{
          iceConfig: {
            filterOutLanCandidates: true,
          },
          sessionMigration: true
        }}
        eventHandlers={{
          sessionConnected: (event: any) => {
            console.log('sessionConnected', event);
          },
          error: (event: any) => console.log('error event', event),
        }}
        style={styles.session}
      >
        <OTPublisher
          key="publisher"
          properties={{
            cameraTorch: true,
            cameraZoomFactor: 2,
          }}
          eventHandlers={{
            error: (event: any) => console.log('pub error', event),
            streamCreated: (event: any) =>
              console.log('pub streamCreated', event),
          }}
          style={styles.videoview}
        />

        <OTSubscriber
          key="subscriber"
          style={styles.videoview}
        />
      </OTSession>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  text: {
    margin: 10,
    fontSize: 20,
  },
  videoview: {
    width: 320,
    height: 240,
  },
  session: {
    display: 'flex',
  },
});

export default App;
