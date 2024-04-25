/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {
  OTSession,
  OTPublisher,
  OTSubscriber,
} from '@vonage/client-sdk-video-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    // Vonage application ID
    this.apiKey = 'c696b10d-a8ea-4eae-9cbd-9017c3e05e71';
    this.sessionId = '1_MX5jNjk2YjEwZC1hOGVhLTRlYWUtOWNiZC05MDE3YzNlMDVlNzF-fjE3MTMyMTg1Njk2MDJ-VStqc3BPemh2Z0lnMDZkU0d6WVNiMi9afn5-';
    this.token = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYW51YmlzLWNlcnRzLWMxLXVzdzIucHJvZC52MS52b25hZ2VuZXR3b3Jrcy5uZXQvandrcyIsImtpZCI6IkNOPVZvbmFnZSAxdmFwaWd3IEludGVybmFsIENBOjoxODE0ODUxMDIyMTUzMzA2MDkxMzM0MTg3MzQ4NjMwODEwNTg1MTAiLCJ0eXAiOiJKV1QiLCJ4NXUiOiJodHRwczovL2FudWJpcy1jZXJ0cy1jMS11c3cyLnByb2QudjEudm9uYWdlbmV0d29ya3MubmV0L3YxL2NlcnRzL2ZiM2VlMDJiOWE5YzdhZTAyY2MxZTIzMWFmNWExMmYyIn0.eyJwcmluY2lwYWwiOnsiYWNsIjp7InBhdGhzIjp7Ii8qKiI6e319fSwidmlhbUlkIjp7ImVtYWlsIjoiamVmZi5zd2FydHpAdm9uYWdlLmNvbSIsImdpdmVuX25hbWUiOiJKZWZmIiwiZmFtaWx5X25hbWUiOiJTd2FydHoiLCJwaG9uZV9udW1iZXIiOiIxNDE1Mzc4NDI0OCIsInBob25lX251bWJlcl9jb3VudHJ5IjoiVVMiLCJvcmdhbml6YXRpb25faWQiOiI5ODE0MTRhOS0yZmQ0LTRkMTgtYjM3Yi00OGUxZDljYTAwN2IiLCJhdXRoZW50aWNhdGlvbk1ldGhvZHMiOlt7ImNvbXBsZXRlZF9hdCI6IjIwMjQtMDQtMTVUMjI6MDE6MjMuOTY4OTg0NDc1WiIsIm1ldGhvZCI6ImludGVybmFsIn1dLCJhdWQiOiJwb3J0dW51cy5pZHAudm9uYWdlLmNvbSIsImV4cCI6MTcxMzIxODg2OCwianRpIjoiYWFjNmM2ZDItZmM3Ny00NjcyLWFlNTgtZmUzZDA4OGZiNTdlIiwiaWF0IjoxNzEzMjE4NTY4LCJpc3MiOiJWSUFNLUlBUCIsIm5iZiI6MTcxMzIxODU1Mywic3ViIjoiYjFiNWVhYjUtZGRkNS00YjgwLTg2MDgtNzNkNTc2N2U5ZGVjIn19LCJmZWRlcmF0ZWRBc3NlcnRpb25zIjp7InZpZGVvLWFwaSI6W3siYXBpS2V5IjoiMDY5YzM2ODciLCJhcHBsaWNhdGlvbklkIjoiYzY5NmIxMGQtYThlYS00ZWFlLTljYmQtOTAxN2MzZTA1ZTcxIiwiZXh0cmFDb25maWciOnsidmlkZW8tYXBpIjp7ImluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3QiOiIiLCJyb2xlIjoibW9kZXJhdG9yIiwic2NvcGUiOiJzZXNzaW9uLmNvbm5lY3QiLCJzZXNzaW9uX2lkIjoiMV9NWDVqTmprMllqRXdaQzFoT0dWaExUUmxZV1V0T1dOaVpDMDVNREUzWXpObE1EVmxOekYtZmpFM01UTXlNVGcxTmprMk1ESi1WU3RxYzNCUGVtaDJaMGxuTURaa1UwZDZXVk5pTWk5YWZuNS0ifX19XX0sImF1ZCI6InBvcnR1bnVzLmlkcC52b25hZ2UuY29tIiwiZXhwIjoxNzE1ODEwNTY5LCJqdGkiOiJiZTBlNzg3NC1hZDdjLTRlMzctODA0Zi0zZjAyZmUyYWMxYTMiLCJpYXQiOjE3MTMyMTg1NjksImlzcyI6IlZJQU0tSUFQIiwibmJmIjoxNzEzMjE4NTU0LCJzdWIiOiJiMWI1ZWFiNS1kZGQ1LTRiODAtODYwOC03M2Q1NzY3ZTlkZWMifQ.LWc5yDHHRIWmtHFmTty5HpaihE9sXfPomcszakPaI4oIM04NuGYJcuLfLXqPSy8QjVKbU0fuwsGV28C2azPLz3WeaM4KeRfhlvwE-d8KFGK_pAhGV2zicvBphBug3QV6yw8GHkEMAvh1qvDdIm7JfwMaE6rGxbna3oJmihb7hx8khVP8iGAjtT10suntLSDyr97HYKxkDno50ZT-kZr0ZCGChueROTJ8oItplCbjJKjpzPjo65K7F9Xk2h88Y6aoYwU4d2KUql7AquBkC_yXaolrjXt-jaGBBUptRCUTWfnvWq3ChOU49h6OX_JjzzJDhvcVfhRnL4e_1t508z6uLg';
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
          token={this.token}>
          <OTPublisher style={{width: 200, height: 200}} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
