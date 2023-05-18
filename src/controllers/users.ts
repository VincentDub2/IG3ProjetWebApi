import express from 'express';
import { getUserBySessionToken} from '../services/user.service';
import { deleteUserById,getUsers } from '../services/user.service';
import { filterSensitiveData } from '../helpers';

//Cette route nous permet de récupérer l'utilisateur actuel

  export const getActualUser = async (req: express.Request, res: express.Response) => {

    try {

        // On récupère le token de la requête
        const sessionToken = req.cookies['Eattrack-Auth'];

        // Si le token n'existe pas, on renvoie une erreur
        if (!sessionToken) {
            return res.sendStatus(403);
        }
      
        //On récupère l'utilisateur lié a ce token
      const user = await getUserBySessionToken(sessionToken);
  
      if (!user) {
        return res.sendStatus(404); // Not Found
      }

      // On filtre les données sensibles (mot de passe, token,salt)
      const filteredUser = filterSensitiveData(user);
  
      return res.status(200).json(filteredUser).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400); // Bad Request
    }
  };



export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);

        return res.status(200).json(deleteUser).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}
export const getALLUsers = async (req: express.Request, res: express.Response) => {
  try{
      const users = await getUsers();

      return res.status(200).json(users).end();
  }catch(error){
      console.log(error);
      return res.sendStatus(400);
  }
}