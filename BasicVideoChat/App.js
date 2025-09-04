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
    this.sessionId2 = '';
    this.token2 = '';

    this.state = {
      twoSimultaneous: true,
      connected: true,
      sessionId: this.sessionId,
      token: this.token,
    };

    this.rotateSession = () => {
      if (this.state.twoSimultaneous) {
        return;
      }
      this.setState({
        connected: false,
      });
      setTimeout(() => {
        if (this.state.sessionId == this.sessionId) {
          return this.setState({
            connected: true,
            sessionId: this.sessionId2,
            token: this.token2,
          });
        }
        return this.setState({
          connected: true,
          sessionId: this.sessionId,
          token: this.token,
        });
        
      }, 3000);
    }
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
        {this.state.connected ?
        <OTSession
          apiKey={this.apiKey}
          sessionId={this.state.sessionId}
          token={this.state.token}
          eventHandlers={{
            sessionConnected: (e) => {
              console.log(e.sessionId);
              setTimeout(() => this.rotateSession(), 5000);
            },
          }}
        >
          <OTPublisher style={{width: 200, height: 200}} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
        : null }
        {this.state.twoSimultaneous ? 
        <OTSession
          apiKey={this.apiKey}
          sessionId={this.sessionId2}
          token={this.token2}
          eventHandlers={{
            sessionConnected: (e) => {
              console.log(e.sessionId);
            },
          }}
        >
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
        : null}
      </View>
    );
  }
}

export default App;
