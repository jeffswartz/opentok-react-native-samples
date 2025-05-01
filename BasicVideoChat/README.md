# Basic Video Chat sample

This sample application shows how to connect to an OpenTok session, publish a stream, and subscribe to multiple streams for both iOS and Android using the OpenTok React Native SDK.

## Important notes

This version of the app is used to test the 2.30.0 version of opentok-react-native. It loads the SDK from the GitHub development branch.

There is also a TypeScript-based sample in the BasicVideoTS directory of the project.

In order to work in the latest version of XCode, this app uses react-native version 0.76.9. Older versions are not supported in XCode 16.3.

*See the setup instructions below.* Step 4 shows how to replace the installed OpenTok native SDKs with the nightly builds.

## Setup

1. Install the required node modules: `npm install`.

2. Run `bundle install`.

3. For iOS, install the Podfile's dependencies: `npx pod-install`.

4. Overwrite the installed OpenTok native SDK bundles:

  * Open the ~/.gradle/caches/modules-2/files-2.1/com.opentok.android/opentok-android-sdk/2.29.1 directory. Find the subdirectory that contains the `opentok-android-sdk-2.29.1.aar` file and replace it with the `opentok-android-sdk-2.30.0.aar` file from the Nightly build (rename it `opentok-android-sdk-2.29.1.aar` -- change 2.30.0 to 2.29.1). If there is another subdirectory of ~/.gradle/caches/modules-2/files-2.1/com.opentok.android/opentok-android-sdk/2.29.1 that contains a `opentok-android-sdk-2.29.1.pom` file, delete that subdirectory (although I don't know if this is necessary).

 * Open the ./ios/Pods/OTXCFramework directory in this BasicVideoChat sample. Replace the OpenTok.xcframework subdirectory with the OpenTok.xcframework directory from the 

5. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, publish streams from a web client, and subscribe to streams published from the client using the OpenTok React Native SDK.

## Understanding the code

The App.js file includes all of the code that uses the OpenTok React Native SDK.

The app imports `OTSession`, `OTPublisher`, and `OTSubscriber` from the SDK.

```js
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
```

Documentation for these components are at <https://github.com/opentok/opentok-react-native/blob/develop/docs/index.md>.

This application shows the simplest way to publish and subscribe to audio-video streams in an OpenTok session. Simply add the  `apiKey`, `sessionId`, and `token` attributes to an `OTSession` component and add `OTPublisher` and `OTSubscriber` components as children of the  `OTSession` component:

```jsx
<OTSession
   apiKey={apiKey}
   sessionId={sessionId}
   token={token}>
   <OTPublisher style={styles.pubSub}/>
   <OTSubscriber style={styles.pubSub} />
</OTSession>
```

The `OTSession` component connects to the specified OpenTok session. Upon connecting to the session, it publishes a stream to the session and subscribes to streams published by other clients connected to the session. The `OTSession` component includes a React Native `View` that automatically lays out the publisher and subscriber views in a grid.

Check out the OpenTok documentation at <https://tokbox.com/developer/>
