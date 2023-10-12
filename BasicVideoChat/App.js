/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '';
    this.sessionId = '';
    this.token = '';
    this.publisherOptions = {
      publishCaptions: true,
      publishVideo: true,
      publishAudio: false,
    };
    console.log('app started');
    this.subscriberOptions = {
      subscribeToCaptions: true,
      // subscribeToAudio: false,
      subscribeToSelf: true,
      subscribeToVideo: false,
      audioVolume: 0,
    };
    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('streamCreated event', event)
        setTimeout(
          function () {
            this.publisher.setVideoTransformers([
              {
                name: 'BackgroundBlur',
                properties: '{"radius":"High"}',
              },
            ]);
          }.bind(this),
          3000,
        );
      },
    };
    this.subscriberEventHandlers = {
      captionReceived: event => {
        console.log('captionReceived', event);
      },
      connected: event => {
        console.log('subscriber connected', event);
      },
    };
    this.sessionEventHandlers = {
      sessionConnected: event => {
        console.log('session connected', event);
      },
      error: event => {
        console.log('error', event);
      },
      otrnError: event => {
        console.log('otrnError', event);
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
          eventHandlers={this.sessionEventHandlers}>
          <OTPublisher
            style={{width: 200, height: 200}}
            eventHandlers={this.publisherEventHandlers}
            properties={this.publisherOptions}
            ref={instance => {
              this.publisher = instance;
            }}
          />
          <OTSubscriber
            style={{width: 200, height: 200}}
            eventHandlers={this.subscriberEventHandlers}
            properties={this.subscriberOptions}
            ref={instance => {
              this.subscriber = instance;
            }}
          />
        </OTSession>
      </View>
    );
  }
}

export default App;
