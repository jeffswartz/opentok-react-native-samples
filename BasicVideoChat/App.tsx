/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View, Button, Text} from 'react-native';
import type {
  OTPublisherEventHandlers,
  OTSessionEventHandlers,
  OTSubscriberEventHandlers,
  OTSubscriberProperties,
  OTSessionProps,
  StreamCreatedEvent,
} from 'opentok-react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

const apiKey = '';
const sessionId = '';
const token = '';

class App extends Component<object, {encryptionSecret: string}> {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  private subscriber = createRef<OTSubscriber>();
  private invalidSecret = '1'; // too short
  private nonMatchingSecret = 'test' + Math.random().toString();
  private goodSecret = 'testSecret';

  sessionEventHandlers: OTSessionEventHandlers = {
    error: event => {
      console.log('error', event);
    },
    otrnError: event => {
      console.log('otrnError:', event);
    },
    sessionConnected: async event => {
      console.log(
        'session connected -- connection ID:',
        event.connection.connectionId,
      );
    },
    streamCreated: async event => console.log(event),
  };

  sessionProps: OTSessionProps = {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token,
    eventHandlers: this.sessionEventHandlers,
  };

  subscriberProperties: OTSubscriberProperties = {
    subscribeToAudio: false,
    subscribeToVideo: true,
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async (event: StreamCreatedEvent) => {
      console.log('publisher streamCreated', event);
    },
    error: async event => {
      console.log('publisher error', event);
    },
  };

  subscriberEventHandlers: OTSubscriberEventHandlers = {
    error: async event => {
      console.log('subscriber error message:', event.error.message);
    },
  };

  constructor(props) {
    super(props);
    this.state = {encryptionSecret: this.goodSecret};
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
          {...this.sessionProps}
          encryptionSecret={this.state.encryptionSecret}>
          <OTPublisher
            style={{width: 200, height: 200}}
            ref={this.publisher}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTSubscriber
            properties={this.subscriberProperties}
            eventHandlers={this.subscriberEventHandlers}
            ref={this.subscriber}
            style={{width: 200, height: 200}}
          />
        </OTSession>
        <Text>{this.state.encryptionSecret}</Text>
        <Button
          onPress={() => this.setState({encryptionSecret: this.goodSecret})}
          title="Set valid secret"
        />
        <Button
          onPress={() => this.setState({encryptionSecret: this.invalidSecret})}
          title="Set invalid secret"
        />
        <Button
          onPress={() =>
            this.setState({encryptionSecret: this.nonMatchingSecret})
          }
          title="Set non-matching"
        />
      </View>
    );
  }
}

export default App;
