/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId = '1_MX40NzIwMzJ-fjE3MjU5MjQyNDcwNTR-cTRoY0ptSzdwUmJQbGlTeHAyZ2twUjJpfn5-';
    this.token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTU3NWI2MmUxYmM1MjkyZGVjMTRlOTA4NWM2NjMwMzVmYjQ0NzU1NWY6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNalU1TWpReU5EY3dOVFItY1RSb1kwcHRTemR3VW1KUWJHbFRlSEF5WjJ0d1VqSnBmbjUtJmNyZWF0ZV90aW1lPTE3MjYxODc1NzEmbm9uY2U9MC4zODEzOTUzNDYzMTQzMDc4JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3Mjg3Nzk1NzAxODYmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
