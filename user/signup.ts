import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const { user_pool_id: userPoolId } = process.env;

export const handler = async (event) => {
  console.log(event);
  const { email, password } = JSON.parse(event.body);
  const cognito = new CognitoIdentityProviderClient();
  const params = {
    UserPoolId: userPoolId,
    Username: email as string,
    UserAttributes: [
      {
        Name: "email",
        Value: email as string,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
    MessageAction: "SUPPRESS",
  };

  const response = await cognito.send(
    new AdminCreateUserCommand(params as any),
  );

  await cognito.send(
    new AdminSetUserPasswordCommand({
      Password: password,
      UserPoolId: userPoolId,
      Username: email,
      Permanent: true,
    }),
  );
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(response),
  };
};
