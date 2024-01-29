# Basic Video Chat sample

This sample application shows how to connect to an OpenTok session, publish a stream, and subscribe to multiple streams for both iOS and Android using the OpenTok React Native SDK.

*Note:* This version of the sample is used to test end-to-end encryption API enhancement. It loads opentok-react-native from the e2ee branch. 

## Setup

1. Install the required node modules: `npm install`

2. For iOS, install the Podfile's dependencies: `cd ios/ && pod install`

3. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

4. Set the `sessionProps.encryptionSecret` property. Or comment out the line.

For testing, you can use the [Test web app](../Test web app/) to create sessions, publish streams from a web client, and subscribe to streams published from the client using the OpenTok React Native SDK.
