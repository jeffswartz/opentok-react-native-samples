/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId =
      '1_MX40NzIwMzJ-fjE3MjU5MjQyNDcwNTR-cTRoY0ptSzdwUmJQbGlTeHAyZ2twUjJpfn5-';
    this.token =
      'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTFlZTJmMTQ3N2MzZGI0ZDM1NWE4NTk2NjI0Y2M4YThkZGZlZDQ0NDY6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNalU1TWpReU5EY3dOVFItY1RSb1kwcHRTemR3VW1KUWJHbFRlSEF5WjJ0d1VqSnBmbjUtJmNyZWF0ZV90aW1lPTE3MjU5MjQ0OTQmbm9uY2U9MC4xOTY0OTE1ODY5MTcxODkwNCZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNzI4NTE2NDkzMDU3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
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
            sessionConnected: () => {
              console.log('connected');
            },
          }}
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher
            style={{width: 200, height: 200}}
            ref={this.publisher}
            eventHandlers={{
              streamCreated: async () => {
                console.log(
                  'streamCreated',
                  this.publisher.current?.setAudioTransformers,
                );
                this.publisher.current?.setAudioTransformers([
                  {
                    name: 'NoiseSuppression',
                    properties: '',
                  },
                ]);
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
