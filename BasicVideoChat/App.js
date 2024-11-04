/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Button} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId =
      '2_MX40NzIwMzJ-fjE3Mjg2OTI3MDYyMDh-UjNhQno2clNXdGhOZksrMjVmeVlROUtJfn5-';
    this.token =
      'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPWE1ZDMxYzVlNjkxOTY0NDQyN2UxZGJkYTg4OWQwMWM3OWYyYTg0MTE6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNamcyT1RJM01EWXlNRGgtVWpOaFFubzJjbE5YZEdoT1prc3JNalZtZVZsUk9VdEpmbjUtJmNyZWF0ZV90aW1lPTE3Mjg2OTI3NjEmbm9uY2U9MC41OTY2Nzk5MDE1NDY0NjYxJnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MzEyODQ3NTk1MzMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
    this.state = {connect: true};
    this.toggleState = () => {
      console.log(24, this.state.connect);
      this.setState(prevState => ({connect: !prevState.connect}));
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
        <Button onPress={this.toggleState} title="Toggle connect" />
      </View>
    );
  }
}

export default App;
