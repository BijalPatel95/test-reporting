var AWS = require('aws-sdk');
var ssm = new AWS.SSM();


exports.getDBConfig = async function() {
    var dbConfig = {};

    var myPromise = new Promise((resolve, reject) => {
        var params = {
            Names: [
                '/dev/mssql/username',
                '/dev/mssql/databaseName',
                '/dev/mssql/host',
                '/dev/mssql/password',
                '/dev/mssql/port'
            ],
            WithDecryption: true
        };
        ssm.getParameters(params, function (err, data) {
            if (err) reject(err, err.stack);
            else {
                var parameters = data.Parameters;
                parameters.forEach(function (value) {
                    switch (value.Name) {
                        case "/dev/mssql/username":
                            dbConfig['username'] = value.Value;
                            break;
                        case '/dev/mssql/databaseName':
                            dbConfig['database'] = value.Value;
                            break;
                        case '/dev/mssql/host':
                            dbConfig['server'] = value.Value;
                            break;
                        case '/dev/mssql/password':
                            dbConfig['password'] = value.Value;
                            break;
                        case '/dev/mssql/port':
                            dbConfig['port'] = value.Value;
                            break;
                    }
                });
                resolve(dbConfig);
            }
        });
    });
    return myPromise;
}









