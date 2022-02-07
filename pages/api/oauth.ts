import { User } from 'discord.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query.code as string;

    if (query) {
        try {
            const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: process.env.CLIENT_ID as string,
                    client_secret: process.env.CLIENT_SECRET as string,
                    code: query,
                    grant_type: 'authorization_code',
                    redirect_uri: "https://raven.xayania.com/api/oauth",
                    scope: 'identify',
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const token = await oauthResult.json() as OauthResponse;

            console.log(token);

            const userResult = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${token.token_type} ${token.access_token}`,
                },
            });

            const user = await userResult.json() as User;

            console.log(user);

            await prisma.sessions.create({ data: { access_token: token.access_token, refresh_token: token.refresh_token, user_id: user.id, expire: new Date(Date.now() + token.expires_in) } })

            res.redirect("/guilds")
        } catch (error) {
            // NOTE: An unauthorized token will not throw an error;
            // it will return a 401 Unauthorized response in the try block above
            console.error(error);
        }
    }

    return res.send("gaming");
}

interface OauthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}