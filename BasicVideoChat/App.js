import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber, OT} from 'opentok-react-native';

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
        let capabilities = await this.session.getCapabilities();
        console.log('session capabilities 0', capabilities);
        const supportedCodecs = await OT.getSupportedCodecs();
        console.log('Supported codecs', supportedCodecs);

        setTimeout(
          async function () {
            capabilities = await this.session.getCapabilities();
            console.log('session capabilities after 1 sec', capabilities);
            issueId = await this.session.reportIssue();
            console.log('reportIssue ID', issueId);
            try {
              const forceMuteAllResult = await this.session.forceMuteAll();
              console.log(
                'session.forceMuteAll succeeded.',
                forceMuteAllResult,
              );
            } catch (error) {
              console.log('session.forceMuteAll error:', error);
            }
          }.bind(this),
          1000,
        );
        setTimeout(
          async function () {
            try {
              const disableForceMuteResult =
                await this.session.disableForceMute();
              console.log(
                'session.disableForceMute succeeded.',
                disableForceMuteResult,
              );
            } catch (error) {
              console.log('session.disableForceMute error:', error);
            }
          }.bind(this),
          5000,
        );
      },
      muteForced: async event => {
        console.log('Session muteForced event', event);
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
      muteForced: async event => {
        console.log('Publiser muteForced event', event);
      }
    };
    this.subscriberProperties = {
      subscribeToVideo: false,
      // subscribeToAudio: false,
      audioVolume: 100,
    };
    this.subscriberEventHandlers = {
      connected: event => {
        // Bug in OT RN SDK -- different implementation in iOS and Android
        const streamId = event.streamId || event.stream.streamId;
        console.log('subscriber connected:', streamId);
        setTimeout(
          async function () {
            this.subscriber.getRtcStatsReport(streamId);
            try {
              const forceMuteStreamResult = await this.session.forceMuteStream(streamId);
              console.log('session.forceMuteStream() succeeded.', forceMuteStreamResult);
            } catch (error) {
              console.log('session.forceMuteStream() error:', error);
            }
          }.bind(this),
          3000,
        );
      },
      rtcStatsReport: event => {
        console.log(
          'subscriber jsonArrayOfReports type',
          typeof event.jsonArrayOfReports,
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
              // publishAudio: false,
              resolution: 'HIGH_1080P',
            }}
          />
          <OTSubscriber style={{width: 200, height: 200}}
            eventHandlers={this.subscriberEventHandlers}
            ref={instance => {
              this.subscriber = instance;
            }}
            properties={this.subscriberProperties}
          />
        </OTSession>
      </View>
    );
  }
}

export default App;
