const express = require('express');

const fs = require('fs');
const { google } = require('googleapis');

const authController = require('../controllers/authController.js');

const authRouter = express.Router();

authRouter.post('/callback', authController.getOAuthClient, authController.handleCallback, authController.apiCall, (req, res) => {
	console.log('reached authRouter.get to handleCallback ');
	return res.status(200);
});

//this request generates the authorization URL, which is returned out on the response body and provided to the front end where the user is redirected to the URL.
authRouter.get(
	'/',
	authController.getOAuthClient,
	authController.generateAuthUrl,
	(req, res) => {
		console.log('reached authRouter.get to initialize authentication');
		return res.status(200).json(res.locals.authUrl);
	}
);

//step 1 the initial get request from client to server
// router.get('/', authController.initializeAuth, (req, res) => {
// 	console.log('reached authentication router.get redirect');
// 	//returns the link to the front end with the client id , scope, redirect uri, and state
// 	return res.status(200).json(res.locals.reqAuthentication);
// });

// router.get(
// 	'/callback',
// 	authController.checkState,
// 	//callback route which will verify that that state is not null and the continues,
// 	authController.getTokens,
// 	//callback route which will verify that that state is not null and the continues,
// 	(req, res) => {
// 	  console.log('acces token: ', res.locals.accessToken);
// 	  console.log('refresh token: ', res.locals.refreshToken);
// 	  console.log(
// 		'options to pass into spotify api requests: ',
// 		res.locals.options
// 	  );
// 	  return res.status(200).json(res.locals.accessToken);
// 	}
//   );

//configure googleapis to use authentication credentials
// google.options({ auth: oauth2Client });

// async function authenticate(scopes) {
// 	return new Promise((resolve, reject));
// }

//developers.google.com/identity/protocols/oauth2/web-server

//https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/oauth2.js
//https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization

//https://github.com/googleworkspace/node-samples/blob/main/sheets/quickstart/index.js

module.exports = authRouter;
