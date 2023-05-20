import express from 'express';
import { merge, get } from 'lodash';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import  prisma  from '../prisma';

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

        merge(req, { identity: existingUser });
        
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


export const isOwnerOfFood = async (req: express.Request, res: express.Response,next: express.NextFunction) => {
    try {
        const { id } = req.params; // This should be the foodId in your route

        const currentUserId = get(req, 'identity.id') as string;

        // If no currentUserId found, send an unauthorized response
        if (!currentUserId) {
            console.log("No user found")
            return res.sendStatus(403);
        }

        // Fetch the food from database
        const food = await prisma.food.findUnique({
            where: {
                id: id
            }
        });

        // If no food found, send a not found response
        if (!food) {
            return res.sendStatus(404);
        }

        // If the userId of the food does not match the currentUserId, send an unauthorized response
        if (food.userId !== currentUserId) {
            return res.sendStatus(403);
        }

        // If everything checks out, call the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
