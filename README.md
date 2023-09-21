# SheetsQL-ifier!

Welcome to the Google Sheets to SQL app.

The purpose of this app is to take a spread sheet from google sheets and import
them to a SQL database.This idealy will make it easier for anyone who has this
app to quickly add changes to the database without having write alot of code.
Currently only adding a new table works.However hopefully your team can add new
features that makes this an even better project.

In order to use this app there are few steps need for your intial set - up.

Follow these steps on Google Workspace:

https://developers.google.com/workspace/guides/get-started

5 steps to get started

    []1. Create a Google Cloud project for your Google Workspace app, extension, or integration.
            - When creating organization make sure to invite all people you want to have access
                to the project and organization or they denied permission.

    []2. Enable the Google Sheets APIs you want to use in your Google Cloud project.

    []3.Learn how authentication and authorization works when developing for Google Workspace.

    []4.Configure OAuth consent to ensure users can understand and approve what access your app has to their data.

    []5.Create access credentials to authenticate your app's end users or service accounts.
        - all developers will need to do this for or they will be unable to see data.

After completing the steps above you will also need to set up. You will also
need to set up gcloud CLI. The Instruction for which can be found here:
https://cloud.google.com/sdk/docs/install#mac

    Make sure any spread sheet you use is enable so that anyone with a link can edit.

You will also need a sql database to send the data to.
