/* eslint-disable no-console, no-path-concat */

const express = require('express');
const OpenTok = require('opentok');
const app = express();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const opentok = new OpenTok(apiKey, apiSecret);
const e2ee = !!process.env.OT_ENCRYPTED;

if (!apiKey || !apiSecret) {
  console.log('You must specify API_KEY and API_SECRET environment variables');
  process.exit(1);
}

const init = () => {
  app.listen(8083, function () {
    console.log('You\'re app is now ready at http://localhost:8083/');
  });
}

app.use(express.static(__dirname + '/public')); //

opentok.createSession({
  mediaMode: 'routed',
  e2ee,
}, (err, session) => {
  if (err) throw err;
  const { sessionId } = session; 
  console.log('session ID:', sessionId)
  console.log('e2ee:', e2ee);
  app.set('sessionId', sessionId);
  init();
});

app.get('/', (req, res) => {
  const sessionId = app.get('sessionId');
  const token = opentok.generateToken(
    sessionId,
    {
      role: "moderator",
      expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // one week
    }
  );
  console.log('token:', token);

  res.render('index.ejs', {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token
  });
});
