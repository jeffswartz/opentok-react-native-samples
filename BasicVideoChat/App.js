import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

function App() {
  const apiKey = '472032';
  const sessionId = '1_MX40NzIwMzJ-fjE3MzM0NTAzOTcyNjh-L0FQMkR0K2tVc214ajJOVzZiYWtYclg1fn5-';
  const token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTY1OTFlMTFhMTA3NjM5MDYwN2YzMTU2ODgyZjEwMDJjZDQwMjQxNDM6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNek0wTlRBek9UY3lOamgtTDBGUU1rUjBLMnRWYzIxNGFqSk9WelppWVd0WWNsZzFmbjUtJmNyZWF0ZV90aW1lPTE3NDU4NTkyMDUmbm9uY2U9MC43NzM5NjIwMzkzNjYwMzQ3JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3NDg0NTEyMDQwOTgmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
  const [isFabric, setIsFabric] = useState(!!global?.nativeFabricUIManager);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
      setIsFabric(!!global?.nativeFabricUIManager);
    }, 1000);
  });

  return (
    <View
    style={styles.view}>
    <Text>New architecture: {isFabric.toString()} {count.toString()}</Text>
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}>
      <OTPublisher style={styles.pubSub}/>
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
