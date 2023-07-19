const express = require('express');
const fs = require('fs');
const { google } = require('googleapis');
const dotenv = require('dotenv').config();

const authRouter = express.Router();

const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	'http://localhost1111'
);

//access the scopes
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

//generate URL that asks permissions for google sheets scope
const authorizationUrl = oauth2Client.generateAuthUrl({
	//'online' is default, 'offline' gets refresh token
	access_type: 'offline',
	scope: scopes,
	include_granted_scopes: true,
	//you only get a refresh token in the response on the first authorization from the user.  subsequent authorizations will not return the refresh_token.  when testing, go to your google account permissions page, and under 'third-party apps' menu, remove access to your app and confirm.  then the next oauth2 request will include a refresh token
});

//configure googleapis to use authentication credentials
google.options({ auth: oauth2Client });

async function authenticate(scopes) {
	return new Promise((resolve, reject));
}

//hey tristan
//got a little sidetracked last night (as anticipated) reading the docs on google. the videos i found for auth.js were a little unclear and confusing, so I dove back into the developers.google page listed below.  attached are some oauth code examples provided by google that i mishmashed above before getting tired and calling it a day. i think that the git code examples are useful but i don't think they belong in this router file. would be helpful to pick your brain on the routing for this because i am feeling like it might replace the current authorization function in the server file, but obviously i'm hesitant to play around with that.  can't wait to talk about this in the morning!

//developers.google.com/identity/protocols/oauth2/web-server

//https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/oauth2.js
//https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization

//https://github.com/googleworkspace/node-samples/blob/main/sheets/quickstart/index.js

https: module.exports = authRouter;
