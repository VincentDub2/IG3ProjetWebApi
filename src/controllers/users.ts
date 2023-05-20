import express from 'express';
import { getUserBySessionToken} from '../services/user.service';
import { deleteUserById,getUsers ,updateAllUserById} from '../services/user.service';
import { filterSensitiveData } from '../helpers';

//Cette route nous permet de récupérer l'utilisateur actuel

  export const getActualUser = async (req: express.Request, res: express.Response) => {
    try {

        // On récupère le token de la requête
        let sessionToken = req.cookies['Eattrack-Auth'];

        if (!sessionToken) {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.replace('Eattrack-Auth-', '').trim();
                if (token) {
                      sessionToken = token; 
                }
            } 
        }

        // Si le token n'existe pas, on renvoie une erreur
        if (!sessionToken) {
            return res.sendStatus(403);
        }
      
        //On récupère l'utilisateur lié a ce token
      const user = await getUserBySessionToken(sessionToken);
  
      if (!user) {
        return res.sendStatus(404); // Not Found
      }

      console.log("User retourner",user);

      // On filtre les données sensibles (mot de passe, token,salt)
      const filteredUser = filterSensitiveData(user);
  
      return res.status(200).json(filteredUser).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400); // Bad Request
    }
  };


  export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { 
          email, 
          name,
          weight, 
          size, 
          age, 
          gender, 
          goalType, 
          activityLevel, 
          targetWeight, 
          dailyCalories, 
          dailyProtein, 
          dailyFat, 
          dailyCarbs, 
          percentageProtein, 
          percentageFat, 
          percentageCarbs 
        } = req.body;

        console.log("voici le body",req.body);

        const user = await updateAllUserById(id, { 
          email, 
          name, 
          weight, 
          size, 
          age, 
          gender, 
          goalType, 
          activityLevel, 
          targetWeight, 
          dailyCalories, 
          dailyProtein, 
          dailyFat, 
          dailyCarbs, 
          percentageProtein, 
          percentageFat, 
          percentageCarbs 
        });

        return res.status(200).json(user).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

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