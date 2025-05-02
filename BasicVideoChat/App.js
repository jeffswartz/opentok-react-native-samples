import React from 'react';
import {StyleSheet, View} from 'react-native';

import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

function App() {
  const apiKey = '';
  const sessionId = '';
  const token = '';

  return (
    <View
    style={styles.view}>
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}
      options={{
        iceConfig: {
          filterOutLanCandidates: true,
        },
        sessionMigration: true
      }}>
      <OTPublisher
        style={styles.pubSub}
        properties={{
          cameraTorch: true,
          cameraZoomFactor: 2,
        }}
      />
      <OTSubscriber style={styles.pubSub} />
    </OTSession>
  </View>
  );
}

const styles = StyleSheet.create({
  pubSub: {
    width: 200, height: 200,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 100,
    paddingVertical: 50,
  },
});

export default App;
