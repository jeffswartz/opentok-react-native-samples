# Basic Video Chat sample

Use this branch to test the `OTSubscriber.getRtcStatsReport()` method, fixed in the `fix-OTSubscriber-getRtcStatsReport` branch of `opentok-react-native`.

Run the sample and see the console logs.

## Setup
1. Install the required node modules: `npm install`
2. For iOS, install the Podfile's dependencies: `cd ios/ && pod install`
3. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.
For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, publish streams from a web client, and subscribe to streams published from the client using the OpenTok React Native SDK.
