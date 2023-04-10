import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47640471';
    this.sessionId =
      '';
    this.token =
      '';

    this.sessionEventHandlers = {
      sessionConnected: event => {
        console.log('connected!', event);
      },
    };
    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('streamCreated!', event);
        setTimeout(
          function () {
            this.publisher.getRtcStatsReport();
          }.bind(this),
          5000,
        );
      },
      rtcStatsReport: event => {
        console.log('rtcStatsReport.length', event.length);
        console.log('rtcStatsReport 0 connectionId', event[0].connectionId);
        console.log(typeof event[0].jsonArrayOfReports);
        console.log(
          'rtcStatsReport 0 jsonArrayOfReports 0:',
          JSON.parse(event[0].jsonArrayOfReports)[0],
        );
        console.log('rtcStatsReport', event);
      }
    };
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
          token={this.token}
          ref={instance => {
            this.session = instance;
          }}
          eventHandlers={this.sessionEventHandlers}>
          <OTPublisher
            style={{width: 200, height: 200}}
            eventHandlers={this.publisherEventHandlers}
            ref={instance => {
              this.publisher = instance;
            }}
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
