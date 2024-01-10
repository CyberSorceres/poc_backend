import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";



/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

export const lambdaHandler = async (event, context) => {
    const client = new BedrockRuntimeClient({
	region: "eu-central-1",
	credentials: {
	    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
	    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
	    sessionToken: process.env.AWS_SESSION_TOKEN ?? "",
	},
    });

    const req =  {
	"inputText": "User: Genera un esempio di user story.\nAssistant: ",
	"textGenerationConfig": {
	    "maxTokenCount": 1024,
	    "stopSequences": [],
	    "temperature":0,
	    "topP":1
	}
    }
    const input = {
	body: JSON.stringify(req),
	//JSON.stringify(request),
      contentType: "application/json",
      accept: "application/json",
      modelId: "amazon.titan-text-express-v1",
    };

    const command = new InvokeModelCommand(input);
    const data = await client.send(command)
    let decoder = new TextDecoder();
    let text = decoder.decode(data.body);

    const response = {
      statusCode: 200,
      body: JSON.stringify(text),
    };

    return response;
  };
  
