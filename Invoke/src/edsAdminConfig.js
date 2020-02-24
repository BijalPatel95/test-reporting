var AWS = require('aws-sdk');
var ssm = new AWS.SSM();


exports.getEDSAdminConfig = async function() {
    var edsAdminConfig = {
        options: {
        enableArithAbort:false}
    };

    var myPromise = new Promise((resolve, reject) => {
        var params = {
            Names: [
                '/dev/edsAdmin/username',
                '/dev/edsAdmin/password'
            ],
            WithDecryption: true
        };
        ssm.getParameters(params, function (err, data) {
            if (err) reject(err, err.stack);
            else {
                var parameters = data.Parameters;
                parameters.forEach(function (value) {
                    switch (value.Name) {
                        case "/dev/edsAdmin/username":
                            edsAdminConfig['user'] = value.Value;
                            break;
                        case '/dev/edsAdmin/password':
                            edsAdminConfig['password'] = value.Value;
                            break;
                    }
                });
                resolve(edsAdminConfig);
            }
        });
    });
    return myPromise;
}



















