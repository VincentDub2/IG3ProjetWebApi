import express from 'express';
import { merge, get } from 'lodash';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { getUserBySessionToken } from '../services/user.service';

export const isAuthentificated =  async (req: express.Request, res: express.Response,next: express.NextFunction) => {
    try{
        var sessionToken = req.cookies['Eattrack-Auth'];
    
        // Check for Authorization header if no cookie was found
        if (!sessionToken) {   
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.replace('Eattrack-Auth-', '').trim();
                if (token) {
                     sessionToken = token;
                     console.log("token: ",sessionToken);
                }
            }
        }

        if (!sessionToken ) {
            console.log("No token found");
            //console.log("verifcation: ",req);
                
            return res.sendStatus(403);
        }

        var existingUser = await getUserBySessionToken(sessionToken);     

        if (!existingUser ) {
            console.log("utilsateur non trouvé")
            return res.sendStatus(402);
        }

        console.log(existingUser.id);

        merge(req, { identity: existingUser });

        console.log("verifcation: ",get(req,'identity.id'));
        
        return next();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const isOwner = async (req: express.Request, res: express.Response,next: express.NextFunction) => {
    try{
        const { id } = req.params;

        console.log(id.toString())

        const currentUserId = get(req, 'identity.id') as string;
        

        console.log("verifcation: ",get(req,'identity.id'));

        if (!currentUserId) {
            console.log("utilsateur non trouvé")
            return res.sendStatus(403);
        }

        if (id !== currentUserId) {
            res.sendStatus(403);
        }

        return next();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}