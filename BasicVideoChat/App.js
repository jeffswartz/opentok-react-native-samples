/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId = '1_MX40NzIwMzJ-fjE3MTQxNjgyMjg3MTZ-ek5ZUE5CaG84YWxtUzdlL3pLUlErTTBwfn5-';
    this.token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTE1OWU5OTIyYmJlNDRhYjMwYTU4YTJmYmU4Y2JhZTJlZWEyMTQ1NTA6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNVFF4TmpneU1qZzNNVFotZWs1WlVFNUNhRzg0WVd4dFV6ZGxMM3BMVWxFclRUQndmbjUtJmNyZWF0ZV90aW1lPTE3MTQxNjgyMjkmbm9uY2U9MC41Njk0MDI1ODQyNzAzMTI1JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MTY3NjAyMjkmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
  }

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
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher style={{width: 200, height: 200}} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
