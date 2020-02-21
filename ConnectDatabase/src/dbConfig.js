var AWS = require('aws-sdk');
var ssm = new AWS.SSM();


exports.getDBConfig = async function() {
    var dbConfig = {};

    var myPromise = new Promise((resolve, reject) => {
        var params = {
            Names: [
                '/dev/db/username',
                '/dev/db/database',
                '/dev/db/host',
                '/dev/db/password'
            ],
            WithDecryption: true
        };
        ssm.getParameters(params, function (err, data) {
            if (err) reject(err, err.stack);
            else {
                var parameters = data.Parameters;
                parameters.forEach(function (value) {
                    switch (value.Name) {
                        case "/dev/db/username":
                            dbConfig['username'] = value.Value;
                            break;
                        case '/dev/db/database':
                            dbConfig['database'] = value.Value;
                            break;
                        case '/dev/db/host':
                            dbConfig['host'] = value.Value;
                            break;
                        case '/dev/db/password':
                            dbConfig['password'] = value.Value;
                            break;
                    }
                });
                resolve(dbConfig);
            }
        });
    });
}









