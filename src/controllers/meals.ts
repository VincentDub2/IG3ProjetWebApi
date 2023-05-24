import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();



const  addFoodToMeal =  async (req: Request, res: Response) =>{
    const { userId, foodId, mealType, date, quantity } = req.body;
    try {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0); // beginning of the day

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // end of the day

      var user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if(!user){
        let account = await prisma.account.findUnique({
          where: { id: userId },
          include: {
            user: true
          }
        });
        if(!account){
          user = account.user;
        }
      }
      
      if (!user) {
        // Handle the case where the user does not exist
        console.log(`User with ID ${userId} does not exist`);
        return;
      }

      // Check if a meal of this type already exists for this date
      let meal = await prisma.meal.findFirst({
        where: {
          AND: [
            { user_id: userId },
            { meal_type: mealType },
            {
              createdAt: {
                gte: startDate,
                lt: endDate
              }
            }
          ]
        }
      });

      // If the meal does not exist, create it
      if (!meal) {
        console.log("meal does not exist");
        meal = await prisma.meal.create({
          data: {
            user: {
              connect: {
                id: userId
              }
            },
            meal_type: mealType,
            createdAt: date
          }
        });
      }

      // Add the food to the meal
      const mealFood = await prisma.mealFood.create({
        data: {
          quantity: quantity,
          foodId: foodId,
          mealId: meal.id
        }
      });

      return res.status(200).json(mealFood);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  export { addFoodToMeal };

  // Get all foods eaten by a user on a given day
  const getFoodsEatenOnDay = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const date = req.params.date;
  
    try {
      console.log("date", date);
  
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0); // beginning of the day
  
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // end of the day
  
      // Find all meals of this user for this date
      const meals = await prisma.meal.findMany({
        where: {
          AND: [
            { user_id: userId },
            {
              createdAt: {
                gte: startDate,
                lt: endDate
              }
            }
          ]
        },
        include: {
          mealFood: {
            include: {
              food: true,
              meal: true,
            },
          },
        },
      });
  
      // Extract all foods from the meals
      const foods = meals.flatMap(meal =>
        meal.mealFood.map(mealFood => ({
          ...mealFood.food,
          quantity: mealFood.quantity,
          mealType: meal.meal_type,
        }))
      );
  
      res.status(200).json(foods);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  
  

  export { getFoodsEatenOnDay };



