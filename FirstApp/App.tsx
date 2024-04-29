/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

const apiKey = '472032';
const sessionId = '2_MX40NzIwMzJ-fjE3MTQzNjg4MTUxMDZ-cUJrUlFxbHovWmNDRTFYaDJxeTBWalIxfn5-';
const token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTA2ZGU5MmNhYzVkMzliZTNkMDRiOGYzMzFjOTdhYzAwNThmZTc2OTI6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNVFF6TmpnNE1UVXhNRFotY1VKclVsRnhiSG92V21ORFJURllhREp4ZVRCV2FsSXhmbjUtJmNyZWF0ZV90aW1lPTE3MTQzNjg4MTUmbm9uY2U9MC4xNTE2NTg4MzQ0OTkyMTA5MSZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNzE2OTYwODE1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

function App(): React.JSX.Element {
  return (
    <View style={styles.View}>
      <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
        <OTPublisher style={styles.OTPublisher} />
        <OTSubscriber style={styles.OTSubscriber} />
      </OTSession>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 100,
    paddingVertical: 50,
  },
  OTPublisher: {
    width: 200,
    height: 200,
  },
  OTSubscriber: {
    width: 200,
    height: 200,
  },
});

export default App;
