import { sum } from "./sum";

import express from 'express';
import {
	paginateListUserPools,
	CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient();

async function test() {
    const paginator = paginateListUserPools({ client }, {MaxResults: 5});

    const userPoolNames = [];
    for await (const page of paginator) {
	userPoolNames.push(...page.UserPools.map(p=>p.Name))
    }
    console.log(userPoolNames);
}
test()
const app = express();
const port = 8080;

app.get<{name: string, password: string}>('/api/v1/login', (req, res) => {
    const { name, password } = req.params;
    if (name === 'admin' && password === 'admin') {
	return res.send({
	    key: 'testKey'
	});
    }

    return res.send({
	err: 'Unauthorised'
    })
});

app.get<{ text: string }>('/api/v1/test', (req, res) => {
	res.send({
	    message: 'Hello from chatGPT'
	})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
