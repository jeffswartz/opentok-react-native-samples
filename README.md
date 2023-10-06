# OpenTok React Native Samples

<img src="https://assets.tokbox.com/img/vonage/Vonage_VideoAPI_black.svg" height="48px" alt="Tokbox is now known as Vonage" />

_These samples demonstrate how to use opentok-react-native to do video-calling
in a React Native application._

## Contents

- [Pre-Requisites](#pre-requisites)
- [Installation](#installation)
- [Contributing](#contributing)

### In this repo, you'll find:

- [Basic Video Chat](https://github.com/opentok/opentok-react-native-samples/tree/master/BasicVideoChat):

  This sample application shows how to connect to an OpenTok session,
  publish a stream, and subscribe to multiple streams for both iOS and
  Android using the OpenTok React Native API.

  *Note:* For testing, this version of the Basic Video chat sample has been modified to load the opentok-react-native library from the add-native-2.26.0-support branch at the opentok fork (see the BasicVideoChat/package.json file). It also includes some code to test new features this version:

  * *Live captions API enhancements* -- The OTPublisher component has `publishCaptions` set to `true` in its `options`. The OTSubscriber component has `publishCaptions` set to `true` in its `options`. And the OTSubscriber is set up to listen for a `captionReceived` event. To test this, use the https://vg-auth-test.herokuapp.com/ test app. This app is used to test Vonage Video using the `@vonage/video` Node SDK and Vonaage applications. (The `opentok-node` SDK does not yet support live captions.) Load https://vg-auth-test.herokuapp.com/ in your browser. Open the developer console, and look for the following values: `appId`, `sessionId`, and `token`. Use these as the `this.apiKey`, `this.sessionId`, and `this.token` values in the App.js file for the sample app. (Note that the token expires after 24 hours. You can get a new one by reloading the web app.) In the web app, click the *Enable captions* button. Mute your computer's audio (to avoid audio feedback) and run the BasicVideoChat app in React Native (ios or android). Talk some, and you will see your transcribed text in the subscriber (to the React Native client's published video) in the web client. Currently, the OTSubscriber in the React Native client is not dispatching `captionReceived` events (and we are looking into this).

  * *Video transformers API enhancements* -- Some code sets a `BackgroundBlur` filter for the OTPublisher's strem a few seconds after it dispatches the `streamCreated` event. (I can see the stream when testing in the XCode iOS Simulator. I do not see anything when testing with the Android Studio Pixel 6 Pro API 33 device simulator. I have not tried testing with a real device.) 

- [Signaling](https://github.com/opentok/opentok-react-native-samples/tree/master/Signaling):
  This sample application shows how to connect to an OpenTok session and implement OpenTok Signaling to create a text chat for both iOS and Android using the OpenTok React Native API.

## Pre-Requisites

1. Install [node.js](https://nodejs.org/)

2. Install Watchman: `brew install watchman`

3. Install React Native CLI: `npm install -g react-native-cli`

4. Install and update [Xcode](https://developer.apple.com/xcode/) (you will need a Mac)

- React Native iOS installation [instructions](https://facebook.github.io/react-native/docs/getting-started.html)

5. Install and update [Android Studio](https://developer.android.com/studio/index.html)

- React Native Android installation [instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Setup

1. Clone this repo.

2. In your terminal, change your directory to the sample project you want:

- `cd BasicVideoChat/` or `cd Signaling/`

3. Install the required node modules: `npm install`

### For iOS

- Install the Podfile's dependencies: `cd ios/ && pod install`

## Development and Contributing

Interested in contributing? We :heart: pull requests! See the
[Contribution](CONTRIBUTING.md) guidelines.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

- Open an issue on this repository
- See <https://support.tokbox.com/> for support options
- Tweet at us! We're [@VonageDev](https://twitter.com/VonageDev) on Twitter
- Or [join the Vonage Developer Community Slack](https://developer.nexmo.com/community/slack)

## Further Reading

- Check out the Developer Documentation at <https://tokbox.com/developer/>
