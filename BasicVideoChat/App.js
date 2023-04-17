import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '';
    this.sessionId = '';
    this.token = '';

    this.eventsAlreadyRecieved = {};
    this.sessionEventHandlers = {
      sessionConnected: async event => {
        console.log('session connected:', event);
        let issueId = await this.session.reportIssue();
        console.log('reportIssue ID', issueId);
        this.session.reportIssue();
        setTimeout(
          function () {
            const cap = this.session.getCapabilities();
            console.log('session capabilities after 1 sec', cap);
          }.bind(this),
          1000,
        );
      },
    };

    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('publisher streamCreated:', event);
        setTimeout(
          function () {
            this.publisher.getRtcStatsReport();
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
      },
      audioNetworkStats: event => {
        if (this.eventsAlreadyRecieved.publisherAudioNetworkStats) {
          return;
        };
        console.log('publisher audioNetworkStats', event);
        this.eventsAlreadyRecieved.publisherAudioNetworkStats = true;
      },
      videoNetworkStats: event => {
        if (this.eventsAlreadyRecieved.publisherVideoNetworkStats) {
          return;
        };
        console.log('publisher videoNetworkStats', event);
        this.eventsAlreadyRecieved.publisherVideoNetworkStats = true;
      },
    };
    this.subscriberEventHandlers = {
      connected: event => {
        // Bug in OT RN SDK -- different implementation in iOS and Android
        const streamId = event.streamId || event.stream.streamId;
        console.log('subscriber connected:', streamId);
        setTimeout(
          function () {
            // This is broken in Android
            if (Platform.OS === 'ios') {
              this.subscriber.getRtcStatsReport(event.streamId);
            }
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
      },
      audioNetworkStats: event => {
        if (this.eventsAlreadyRecieved.subscriberAudioNetworkStats) {
          return;
        }
        console.log('subscriber audioNetworkStats', event);
        this.eventsAlreadyRecieved.subscriberAudioNetworkStats = true;
      },
      videoNetworkStats: event => {
        if (this.eventsAlreadyRecieved.subscriberVideoNetworkStats) {
          return;
        }
        console.log('subscriber videoNetworkStats', event);
        this.eventsAlreadyRecieved.subscriberVideoNetworkStats = true;
      },
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
            properties={{
              scalableScreenshare: true,
              publishAudio: false,
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
