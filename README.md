# OpenTok React Native Samples

This branch of the sample repo is for testing the `fix-captions` branch of opentok-react-native. Use the BasicVideoChat sample for testing.

Note that the package.json file for the BasicVideoChat sample loads the `opentok-react-native` package from the `fix-captions` branch of the opentok-react-native (at the opentok fork of the repo).

To test this app:

1. In a browser, load the the vg-auth-test app: https://vg-auth-test.herokuapp.com/.

   The page will redirect to a page that loads a specific OpenTok session using a Vonage application ID. If prompted, grant access to the camera and microphone.

   We use this test app because it supports the live captions API. Live captions is not currently supported in the Playground app.

2. Click the `Enable Captions` button on the web page.

3. Open the developer console in the browser page and copy these values:

   * `appId` (It should be `'c696b10d-a8ea-4eae-9cbd-9017c3e05e71'`.)
   * `sessionId`
   * `token`

4. In the terminal, `cd` to the `BasicVideoChat` directory (of this project). Install the Node and Podfile dependencies (un `npm install` and then run `npx pod-install`).

5. In the BasicVideoChat/App.tsx file, set the `apiKey` property to the `appId` string from step 3. And set the `sessionId` and `token` values to the values from step 3.

6. Test the app in iOS. Open a simulator (or connect a device) and run `npx react-native run-ios`.

  You probably want to mute your computer speaker to prevent audio feedback.

7. Read some text from a book or something.

   Note that the captions appear in vg-auth-test web page (overlaid on the subscriber video for the stream published from the iOS client). And note that the caption text from the webpage appears in the terminal for the iOS client. The React Native BasicVideoClient test app turns captions on and off every five seconds.

8. Repeat for Android. (Open the Android emulator or connect a device, and then run `npx react-native run-android`.)
