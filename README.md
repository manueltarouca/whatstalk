# WhatsApp contact monitor tool

This repository contains the code that monitors the online status changes in WhatsApp and generates a CSV report.

## How to
1. Open WhatsApp.
2. Click on the contact you want to monitor and do not interact with the page anymore
3. Paste the contents of `whatstalk.js` in the Developer Tools > Console.
4. Wait for results. Every 8 hours a CSV will be downloaded

*Note*: You can trigger the CSV download, by typing into the console `toCsv()`

## To-do

- Add telegram notifications
- Use an automation framework like *pupetteer* to automate tasks