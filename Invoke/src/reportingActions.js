require('dotenv').config();
const fs = require('fs');
const s3 = require("./s3Actions");
const slack = require("./slackNotifier");

exports.uploadReport = async function (event) {
    const fileName = `${event.fileName}.pdf`;
    const fullPath = `/tmp/downloads/${fileName}`;
    console.log(fullPath);
    try {
        if (fs.existsSync(fullPath)) {

            const src = `/tmp/downloads/${fileName}`;
            const dest = `${event.fund}/${fileName}`;
            const tags = `reportName=${event.reportName}&username=${event.scheduledBy}`.replace('(', '').replace(')', '');
            await s3.uploadFile(src, dest, tags);
            return true;
        } else {
            console.log(`Report Not Found On Local: ${fileName}`);
            slack.notifyError(`${category} Report Not Found Local: ${fileName}`);
            return false;
        }
    } catch (e) {
        return false;
    }
};