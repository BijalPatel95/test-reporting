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
                            dbConfig['DATABASE_USER'] = value.Value;
                            break;
                        case '/dev/db/database':
                            dbConfig['DATABASE_NAME'] = value.Value;
                            break;
                        case '/dev/db/host':
                            dbConfig['DATABASE_SERVER'] = value.Value;
                            break;
                        case '/dev/db/password':
                            dbConfig['DATABASE_PASSWORD'] = value.Value;
                            break;
                    }
                });
                resolve(dbConfig);
            }
        });
    });
    return myPromise;
}









