const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const sheets = google.sheets('v4');
const drive = google.drive('v3');
const gSheetsController = {};

// used when range not provided in request body
const fieldMask =
  'properties(title),sheets.properties(title),sheets.data(rowData(values.formattedValue))';

// regexp that pulls spreadsheetId from a google sheets url
const getIdFromUrl = (url) => {
  const reg = /\/d\/(.*?)\//;
  return url.match(reg)[1];
};

gSheetsController.getData = async (req, res, next) => {
  // pull needed content from request body
  const { dataRange: range, googleSheetsUrl } = req.body;

  // need the spreadsheetId, not the full URL
  const spreadsheetId = getIdFromUrl(googleSheetsUrl);

  // see authorize function in server.js for details on authorization
  const auth = res.locals.auth;

  try {
    let data;

    if (range) {
      // range provided in request body
      const request = {
        spreadsheetId,
        range,
        auth,
      };

      // this object contains a data property.
      // See details in google sheets API documentation
      data = await sheets.spreadsheets.values.get(request);

      // separate request for spreadsheet titles
      // this request has messier data in it. fields is a fieldMask that
      // at least filters out what we need from the data
      const titles = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
        fields: 'properties(title),sheets.properties(title)',
      });

      // slap the titles in with the data
      data.data.titles = titles.data;
    } else {
      // rangeless query
      const request = {
        spreadsheetId,
        fields: fieldMask,
        auth,
      };
      // this data is real ugly. I hope nobody ever has to use it.
      data = await sheets.spreadsheets.get(request);
    }
    res.locals.data = data.data;
    return next();
  } catch (err) {
    err.message =
      'Could not fetch google spreadsheet data. Check URL and sheet permissions';
    err.log =
      'Error in gSheetsController.getData | possible inaccessible sheet or bad query';
    return next(err);
  }
};

//creates new sheet from API
//grabs the SHEET ID from new sheet //from re body???
//EX: "spreadsheetId": "1rmlGP1YOFBvYpok8ltIErBOpdchs29KfJahY-Dv5IcY",
gSheetsController.createSheet = async (req, res, next) => {
  // get authorization
  const auth = res.locals.auth;
  const request = {
    auth: auth,
  };
  try {
    console.log('hello world');
    console.log('request!!!!!!!!!!', request);
    const response = (await sheets.spreadsheets.create(request)).data;

    //spreadsheet id
    console.log(response);
    // const spreadsheetID = sheets.spreadsheets.data.spreadsheetId;
    const spreadID = response.spreadsheetId;
    // console.log(spreadsheetID);
    //create object with role and type

    const permission = {
      type: 'user',
      role: 'writer',
      emailAddress: 'ann.j.ni@gmail.com', // Please set the email address you want to give the permission.
    };
    const permissionResponse = await drive.permissions.create({
      auth: auth, //adding this and now we have a different error "insufficient permission"
      resource: permission,
      fileId: spreadID,
      fields: 'id',
    });

    /////I THINK ITS WORKING!!!! but im going to change it to my email .....
    ///// IT WORKS!!!!!!

    console.log('THIS IS JUST RES, NO STRINGIFY', response);
    //console.log(JSON.stringify('THIS IS THE RESPONSE!!!!!', response, null, 2));
  } catch (err) {
    console.log(err, 'ERROR in createSheet');
  }
};

// const response = await gsapi.spreadsheets.create(request_);
// To:
// const response = await gsapi.spreadsheets.create(request_);

// // I added below script.
// const fileId = response.data.spreadsheetId;
// drive = google.drive({ version: "v3", auth: client });
// const res = await drive.permissions.create({
//   resource: {
//     type: "user",
//     role: "writer",
//     emailAddress: "###",  // Please set the email address you want to give the permission.
//   },
//   fileId: fileId,
//   fields: "id",
// });

//populates sheet with DB data
//make a GET request from DB
//at this point i think we can get the new sheet URL and next() the URL to the router
gSheetsController.updateSheet = async (req, res, next) => {};

module.exports = gSheetsController;
