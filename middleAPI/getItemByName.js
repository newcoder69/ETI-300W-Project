const {DynamoDBClient} = require("@aws-sdk/client-dynamodb")
const {DynamoDBDocumentClient, GetCommand} = require("@aws-sdk/lib-dynamodb");


const dbclient = new DynamoDBClient({});
const docClient = new DynamoDBDocumentClient.from(dbclient);


async function getProduct() {
    params = {
        TableName: "metricJSON",
        Key:{
          name: `${requestVariable}`
        },
    };

    try{
    
    const data =  await docClient.send(new GetCommand(params));
    console.log('result: ' + JSON.stringify(data));

    return data

    }catch(error){
        console.log('Error:',error);
    }

}

module.exports = {getProduct};