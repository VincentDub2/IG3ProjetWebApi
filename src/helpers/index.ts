import crypto from 'crypto';
import { User } from '@prisma/client';

//Permet de créer un salt aléatoire
export const random = () => crypto.randomBytes(128).toString('base64');


//Permet de créer une clé de hachage a partir du salt et du mot de passe
export const authentification = (salt: string, password: string): string => {
    console.log("Une clef d'authentification a été créée");
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex');
  }


  export function filterSensitiveData(user : User) {
    const {
      hashedPassword,
      salt,
      sessionToken,
      ...filteredUser
    } = user;
  
    return filteredUser;
  }