# OpenTok Hello World Node

This is a Node-based web app that you can use to test alongside a client app using the OpenTok React Native SDK.

## Running the App

First, download the dependencies using [npm](https://www.npmjs.org) in this directory.

```
$ npm install
```

Next, add your own API Key and API Secret to the environment variables. There are a few ways to do
this but the simplest would be to do it right in your shell.

```
$ export API_KEY=0000000
$ export API_SECRET=abcdef1234567890abcdef01234567890abcdef
```

Finally, start the app using node

```
$ node index.js
```

Visit <http://localhost:8083> in your browser. Open it again in a second window. Smile! You've just
set up a group chat.

## Configuration for testing

To have the app use encrypted sessions, set the OT_ENCRYPTED environment variable:

```
$ export OT_ENCRYPTED=true
```
