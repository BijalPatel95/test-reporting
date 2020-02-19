'use strict'; 
require('dotenv').config();
const reportingActions = require('./src/reportingActions');
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();
const ssm = new AWS.SSM();

const getCredentials = async (name, input) => {
        return new Promise((resolve, reject) => {
            var params = {   
                Name: '/dev/db/username',
                WithDecryption: true
            };
            ssm.getParameters(params, function(err, data) {
                if (err) reject(err, err.stack); // an error occurred
                else     resolve(data);           // successful response
              });
        });
}

exports.handler = async (event, context, callback) => {
    const asyncFunctions = [];
    const reportList = await reportingActions.getReportsList('Daily', '8AM', undefined);

    for (let report of reportList){
        asyncFunctions.push(
            startExecution(`Report${i + 1}_${(new Date().toISOString().split('T')[0])}`, report)
        )
    }

    try {
        const results = await Promise.all(asyncFunctions);
        return results;    
    } catch (e) {
        throw new Error(e);
    }
};


const startExecution = async (name, input) => {
    return new Promise((resolve, reject) => {
        var params = {
            stateMachineArn: process.env.stepFunction,
            input: JSON.stringify(input),
            name: name
        };
        stepfunctions.startExecution(params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data)
        });
    });
}

