import Lambda from 'aws-sdk/clients/lambda';

export const notifyErrorOnSlack = (error) => {
    if (process.env.NODE_ENV === 'local') {
        console.log(error);
    } else {
        const event = {
            channel: 'eds-reporting',
            message: JSON.stringify(error),
            type: 'error',
            title: process.env.NODE_ENV + '-eds-reporting'
        }
        invokeLambda(event);
    }
}

export const notifyProcessOnSlack = async (message) => {
    if (process.env.NODE_ENV === 'local') {
        console.log(message);
    } else {
        const event = {
            channel: 'eds-reporting',
            'message': message,
            type: 'message',
            title: process.env.NODE_ENV + '-eds-reporting'
        };
        invokeLambda(event);
    }
}

function invokeLambda(event){
    const lambda = new Lambda({ region: 'us-east-1' });
    const lambdaParams = {
        FunctionName: 'slack-notification',
        InvokeArgs: JSON.stringify(event)
    }
    lambda.invokeAsync(lambdaParams, (error, data) => {
        if (error) {
            console.log('error while calling lambda');
            console.log(error);
        }
    });
}