/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId =
      '2_MX40NzIwMzJ-fjE3MTU3Mjg1OTQ5NTF-M0JRSCt3K1VpbjRhMm9rN0V4Y0hzOUZxfn5-';
    this.token =
      'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPWI4MjI2ZDM1ODkyZjk2OTZhM2M3ZDE4M2IzODlkMDkyODFiZWM4OGU6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNVFUzTWpnMU9UUTVOVEYtTTBKUlNDdDNLMVZwYmpSaE1tOXJOMFY0WTBoek9VWnhmbjUtJmNyZWF0ZV90aW1lPTE3MTU3Mjg1OTUmbm9uY2U9MC40NzQ0MDc4MjI1NzY3NTQ1JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MTgzMjA1OTUmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
    this.publisher = createRef();
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
          eventHandlers={{
            sessionConnected: console.log,
            sessionDisconnected: console.log,
          }}
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher
            ref={this.publisher}
            style={{width: 200, height: 200}}
            eventHandlers={{
              rtcStatsReport: event => console.log('rtcStatsReport', event),
              streamCreated: () => {
                console.log(
                  'STREAM CREATED',
                  this.publisher.current.setVideoTransformers,
                );
                this.publisher.current.setVideoTransformers([
                  {
                    name: 'BackgroundBlur',
                    properties: JSON.stringify({
                      radius: 'High',
                    }),
                  },
                ]);
                /*
                this.publisher.current.getRtcStatsReport();
                */
              },
            }}
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
