/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View, Button} from 'react-native';
import {
  OTSession,
  OTPublisherEventHandlers,
  OTPublisher,
  OTSubscriber,
  OTSessionEventHandlers,
  MuteForcedEvent,
  StreamCreatedEvent,
} from 'opentok-react-native';

const apiKey = '';
const sessionId = '';
const token = '';

class App extends Component<{}, {publisherStreamId: string}> {
  private session = createRef<OTSession>();
  private publisher = createRef<OTPublisher>();
  sessionEventHandlers: OTSessionEventHandlers = {
    sessionConnected: async () => {
      console.log('session connected:', sessionId);
    },
    muteForced: async (event: MuteForcedEvent) => {
      console.log('session muteForced event -- active:', event.active);
    },
  };

  publisherEventHandlers: OTPublisherEventHandlers = {
    streamCreated: async (event: StreamCreatedEvent) => {
      this.setState({publisherStreamId: event.streamId});
    },
    muteForced: async () => {
      console.log('publisher muteForced event');
    },
  };

  forceMuteAll = () => {
    console.log('forceMuteAll');
    this.session.current?.forceMuteAll([this.state.publisherStreamId]);
  };

  disableForceMute = () => {
    console.log('disableForceMute');
    this.session.current?.disableForceMute();
  };

  forceMuteSelf = () => {
    console.log('forceMute self');
    this.session.current?.forceMuteStream(this.state.publisherStreamId);
  };

  constructor(props) {
    super(props);
    this.state = {publisherStreamId: ''};
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
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          ref={this.session}
          eventHandlers={this.sessionEventHandlers}>
          <OTPublisher
            style={{width: 200, height: 150}}
            ref={this.publisher}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTSubscriber style={{width: 200, height: 150}} />
        </OTSession>
        <Button
          onPress={this.forceMuteSelf}
          disabled={!this.state.publisherStreamId}
          title="Force mute self"
        />
        <Button
          onPress={this.forceMuteAll}
          disabled={!this.state.publisherStreamId}
          title="Force mute all but self"
        />
        <Button
          onPress={this.disableForceMute}
          disabled={!this.state.publisherStreamId}
          title="Disable force mute"
        />
      </View>
    );
  }
}

export default App;
