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
    this.sessionId = '2_MX5jNjk2YjEwZC1hOGVhLTRlYWUtOWNiZC05MDE3YzNlMDVlNzF-fjE3MTU4ODU1MDIyNjF-ZmxZWlRDN3NtVTNWVFhsMm5jcmdYZXBQfn5-';
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNlc3Npb24uY29ubmVjdCIsInNlc3Npb25faWQiOiIyX01YNWpOamsyWWpFd1pDMWhPR1ZoTFRSbFlXVXRPV05pWkMwNU1ERTNZek5sTURWbE56Ri1makUzTVRVNE9EVTFNREl5TmpGLVpteFpXbFJETjNOdFZUTldWRmhzTW01amNtZFlaWEJRZm41LSIsInJvbGUiOiJwdWJsaXNoZXIiLCJpbml0aWFsX2xheW91dF9jbGFzc19saXN0IjoiIiwic3ViIjoidmlkZW8iLCJhY2wiOnsicGF0aHMiOnsiL3Nlc3Npb24vKioiOnt9fX0sImV4cCI6MTcxNTk3MjUxNywianRpIjoiYzEwMWNhOWQtNDcwZC00NjE0LThhYzItNWQzNjg2ZTJhZGJkIiwiaWF0IjoxNzE1ODg2MTE3LCJhcHBsaWNhdGlvbl9pZCI6ImM2OTZiMTBkLWE4ZWEtNGVhZS05Y2JkLTkwMTdjM2UwNWU3MSJ9.ZRxAlda0FllZFEKh7J9ji7wdcZtdqoAasRfqvN9SiM2U9NRnkCGSfo4JACaqEC69kYzQFXRKf57kTgWKXSbC74X4t_jfTgp_lvbt01JhJFFmBFe9dwndunMeA7I5YtmZbjN5bhR_VnPkOd-yWFPNGMZ3Bs0UiZRACm9SHFGgTfpvC23pi_6t6h5su2Btd6pQv8WxJ9UCZXgiafDrFol98UusgS-DwA0AdjKhHQb7xC46rAK6hL8Z-rkrpWQEwTjOw7nj7edhtVyUOwegwkRmE9KtnUDaLj-n1t7pd0_oNm7h7ulNizE31Ebwh37Ywf9Z25l839VqXazaADhERntkwA';
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
