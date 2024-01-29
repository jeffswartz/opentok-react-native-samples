/* global OT, apiKey, sessionId, token */

// Initialize an OpenTok Session object
const session = OT.initSession(apiKey, sessionId,   {
  encryptionSecret: 'testSecret',
});

const publisher = OT.initPublisher('publisher', {
  publishAudio: false,
});

session.on({
  sessionConnected: () =>  {
    session.publish(publisher);
  },

  streamCreated: (event) => {
    const subscriber = session.subscribe(
      event.stream,
      'subscribers', { insertMode: 'append' }
    );
    subscriber.on('error', error => console.log('subscriber error', error))
  },

  error: (event) => {
    console.log('session error event:', event);
  }
});

session.connect(token);
