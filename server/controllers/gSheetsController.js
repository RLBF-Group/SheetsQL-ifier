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
  const { email } = req.body;
  console.log('email is here', email)
  console.log('req body', req)
  try {
    // console.log('hello world');
    // console.log('request!!!!!!!!!!', request);
    //COMMENT BACK IN WHEN READY------
   const response = (await sheets.spreadsheets.create(request)).data;

    //spreadsheet id
    console.log(response);
    // const spreadsheetID = sheets.spreadsheets.data.spreadsheetId;
    const spreadID = response.spreadsheetId;
    res.locals.sheetId = spreadID;
    const sheetURL = response.spreadsheetUrl;
    res.locals.sheetURL = sheetURL;
    // console.log(spreadsheetID);
    //create object with role and type

    const permission = {
      type: 'user',
      role: 'writer',
      emailAddress: email, // Please set the email address you want to give the permission.
    };
    //COMMENT BACK IN WHEN READY-------
    const permissionResponse = await drive.permissions.create({
      auth: auth, //adding this and now we have a different error "insufficient permission"
      resource: permission,
      fileId: spreadID,
      fields: 'id',
    });

    /////I THINK ITS WORKING!!!! but im going to change it to my email .....
    ///// IT WORKS!!!!!!
    next();
    //console.log('THIS IS JUST RES, NO STRINGIFY', response);
    //console.log(JSON.stringify('THIS IS THE RESPONSE!!!!!', response, null, 2));
  } catch (err) {
    console.log(err, 'ERROR in createSheet');
    next(err);
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

//make a GET request from DB SQL
//populates sheet with DB data
//at this point i think we can get the new sheet URL and next() the URL to the router
gSheetsController.updateSheet = async (req, res, next) => {
  console.log('entered update sheet')
  const auth = res.locals.auth;
  const data = res.locals.value
  const sheetID = res.locals.sheetId 
// MOCK sheet ID:
mockSheetID = '180Ir80nuDycvrQSYKbVJKdhGxTtM9DQ8M2HbxiJg5Ps'
//console.log(columnTitle)


// sqlDatabaseUrl: formData.sqlDatabaseUrl,
// tableName: formData.tableName,
// email: formData.email, 


const columnTitle = Object.keys(data[0])
const row0 = Object.values(data[0])
//console.log(row0)

const restOftable = []
restOftable.push(columnTitle, row0)
for (let i = 1; i<data.length; i++ ){
  restOftable.push(Object.values(data[i]))
  // console.log('value of each row', Object.values(data[i]))
}
console.log('rt', restOftable)
const rangeLetter = String.fromCharCode(columnTitle.length + 64);
const rangeNumber = data.length+1;
//data.length is 6 +1
//data[0].length 
console.log('Sheet1!A1:'+rangeLetter+rangeNumber)
//String.fromCharCode(number + 64);

// column titles: peach	apple	orange	banana	kiwi

const request = {
    spreadsheetId: mockSheetID,
    resource: {
      valueInputOption: 'RAW',
      data: [
        {
          range: 'Sheet1!A1:'+rangeLetter+rangeNumber, //required
          majorDimension: 'ROWS',
          values: restOftable
        },
      ],
    },
    auth: auth,
  };

  try {
    const response = await sheets.spreadsheets.values.batchUpdate(request);
    console.log(JSON.stringify(response.data, null, 2));
    next()
  } catch (err) {
    console.error(err);
  }
};



// // The code below creates a new spreadsheet "Finances" with 50 rows and 5 columns and logs the
// // URL for it
// var ssNew = SpreadsheetApp.create("Finances", 50, 5);
// Logger.log(ssNew.getUrl());

// async function main () {
//   const authClient = await authorize();
//   const request = {
//     // The spreadsheet to apply the updates to.
//     spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.

//     resource: {
//       // A list of updates to apply to the spreadsheet.
//       // Requests will be applied in the order they are specified.
//       // If any request is not valid, no requests will be applied.
//       requests: [],  // TODO: Update placeholder value.

//       // TODO: Add desired properties to the request body.
//     },

//     auth: authClient,
//   };

//   try {
//     const response = (await sheets.spreadsheets.batchUpdate(request)).data;
//     // TODO: Change code below to process the `response` object:
//     console.log(JSON.stringify(response, null, 2));
//   } catch (err) {
//     console.error(err);
//   }
// }

  // {
  //   "spreadsheetId": "180Ir80nuDycvrQSYKbVJKdhGxTtM9DQ8M2HbxiJg5Ps",
  //   "updatedRange": "Sheet1!A4",
  //   "updatedRows": 1,
  //   "updatedColumns": 1,
  //   "updatedCells": 1,
  //   "updatedData": {
  //     "range": "Sheet1!A4:C4",
  //     "majorDimension": "ROWS",
  //     "values": [
  //       [
  //         "123423"
  //       ]
  //     ]
  //   }
  // }

  // async function main () {
  //
  //   const request = {
  //     // The ID of the spreadsheet to update.
  //     spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.

  //     // The A1 notation of the values to update.
  //     range: 'my-range',  // TODO: Update placeholder value.

  //     // How the input data should be interpreted.
  //     valueInputOption: '',  // TODO: Update placeholder value.

  //     resource: {
  //       // TODO: Add desired properties to the request body. All existing properties
  //       // will be replaced.
  //     },

  //     auth: authClient,
  //   };

  // };
module.exports = gSheetsController;

// Set range
//  var range = Sheets.newGridRange();
//  range.dimension = "COLUMNS";
//  range.startIndex = 1;
//  range.endIndex = 3;
//  range.sheetId = ss.getSheetId();

//  // Create request of addDimensionGroup
//  var p1 = Sheets.newAddDimensionGroupRequest();
//  p1.range = range;
//  var req1 = Sheets.newRequest();
//  req1.addDimensionGroup = p1;

//  // Create request of updateDimensionGroup
//  var p2 = Sheets.newUpdateDimensionGroupRequest();
//  p2.dimensionGroup = Sheets.newDimensionGroup();
//  p2.dimensionGroup.collapsed = true;
//  p2.dimensionGroup.depth = 1;
//  p2.dimensionGroup.range = range;
//  p2.fields = "*";
//  var req2 = Sheets.newRequest();
//  req2.updateDimensionGroup = p2;

//     let batchReq = Sheets.newBatchUpdateSpreadsheetRequest();
//     batchReq.requests = [req1, req2];

// const request = {
//   "spreadsheetId": "180Ir80nuDycvrQSYKbVJKdhGxTtM9DQ8M2HbxiJg5Ps",
//   "updatedRange": "Sheet1!A4",
//   "updatedRows": 1,
//   "updatedColumns": 1,
//   "updatedCells": 1,
//   "updatedData": {
//     "range": "Sheet1!A4:C4",
//     "majorDimension": "ROWS",
//     "values": [
//       [
//         "123423"
//       ]
//     ]
//   }
//   auth: authClient,
// }
