/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"
import {
  StyleSheet,
  View
} from "react-native"

import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

function App() {
  const apiKey = '472032';
  const sessionId = '2_MX40NzIwMzJ-fjE3MzExMDA4NzM4MjF-UVF2cHNmVDhvS2JVTWpsWGcxNDRDTlA1fn5-';
  const token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTJiMDZmMWI1YmEyZDMxMGMwOWQ0ZmMyNzVjNzE5NDY1MTg5MTNiNjE6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNekV4TURBNE56TTRNakYtVVZGMmNITm1WRGh2UzJKVlRXcHNXR2N4TkRSRFRsQTFmbjUtJmNyZWF0ZV90aW1lPTE3MzExMDA5NTcmbm9uY2U9MC44NDMxNjg1NTgxOTE1Mjc0JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MzM2OTI5NTY2MDQmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
  return (
    <View
    style={styles.view}>
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}>
      <OTPublisher style={styles.pubSub}/>
      <OTSubscriber style={styles.pubSub} />
    </OTSession>
  </View>
)
}

const styles = StyleSheet.create({
  pubSub: {
    width: 200, height: 200
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 100,
    paddingVertical: 50,
  }
})

export default App
