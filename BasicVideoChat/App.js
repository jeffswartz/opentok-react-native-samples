import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '';
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
        console.log('publisher streamCreated:', event);
        setTimeout(
          function () {
            // this.publisher.getRtcStatsReport();
          }.bind(this),
          5000,
        );
      },
      rtcStatsReport: event => {
        console.log('publisher rtcStatsReport.length', event.length);
        console.log(
          'publisher rtcStatsReport 0 connectionId',
          event[0].connectionId,
        );
        console.log(typeof event[0].jsonArrayOfReports);
        console.log(
          'publisher rtcStatsReport 0 jsonArrayOfReports 0:',
          JSON.parse(event[0].jsonArrayOfReports)[0],
        );
        // console.log('publisher rtcStatsReport', event);
      }
    };
    this.subscriberEventHandlers = {
      connected: event => {
        // Bug in OT RN SDK -- different implementation in iOS and Android
        const streamId = event.streamId || event.stream.streamId;
        console.log('subscriber connected:', streamId);
        setTimeout(
          function () {
            console.log('this.subscriber.subscribeToAudio:', this.subscriber.subscribeToAudio);
            console.log('this.subscriber.subscribeToVideo:', this.subscriber.subscribeToVideo);
            this.subscriber.subscribeToAudio =
              !this.subscriber.subscribeToAudio;
            this.subscriber.subscribeToVideo =
              !this.subscriber.subscribeToVideo;
            this.subscriber.getRtcStatsReport(event.streamId);
          }.bind(this),
          5000,
        );
      },
      rtcStatsReport: event => {
        console.log('subscriber rtcStatsReport.type', event.type);
        console.log(
          'subscriber jsonArrayOfReports.type',
          typeof event.jsonArrayOfReports
        );
        console.log(
          'subscriber rtcStatsReport 0 jsonArrayOfReports 0:',
          JSON.parse(event.jsonArrayOfReports)[0],
        );
        // console.log('subscriber rtcStatsReport', event);
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
          <OTSubscriber style={{width: 200, height: 200}}
            eventHandlers={this.subscriberEventHandlers}
            ref={instance => {
              this.subscriber = instance;
            }}
            subscribeToVideo={false}
          />
        </OTSession>
      </View>
    );
  }
}

export default App;
