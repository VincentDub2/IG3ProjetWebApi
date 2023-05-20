import { Request, Response } from "express";
import prisma from "../prisma";
import { Food } from "@prisma/client";
import { get } from "lodash";

// Search foods by name with fuzzy matching
const searchFoods = async (req: Request, res: Response) => {
  try {
    const query = req.query.q?.toString() || "";
    const fuzzyQuery = `%${query.replace(/\s/g, "%")}%`;
    const foods = await prisma.$queryRaw<Food[]>`
      SELECT Food.*, Brand.name AS brand,Food._id as id FROM Food
      JOIN Brand ON Food.brandId = Brand._id
      WHERE Food.name LIKE ${fuzzyQuery}
        OR Brand.name LIKE ${fuzzyQuery}
        OR Food.foodCategory LIKE ${fuzzyQuery}
        OR Food.barcode = ${query}
    `;
  
    console.log("foods: ",foods);
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { searchFoods };

// Add a new food
const addFood = async (req: Request, res: Response) => {
  try {
    const {
      name,
      brandName,
      barcode,
      calories,
      protein,
      fat,
      carbs,
      fiber,
      salt,
      servingSize,
      vitamins,
      minerals,
      allergens,
      foodCategory,
    } = req.body;

    const userID = get(req, "identity.id");

    console.log("addFood: ", userID);
    // Check if the brand already exists
    let brand = await prisma.brand.findFirst({
      where: { name: brandName },
    });

    // If the brand does not exist, create it
    if (!brand) {
      brand = await prisma.brand.create({
        data: { name: brandName },
      });
    }

    // Create the new food object
    const newFood = await prisma.food.create({
      data: {
        name,
        brandId: brand.id,
        barcode,
        calories : calories,
        protein,
        fat,
        carbs,
        fiber: fiber ? fiber : undefined,
        salt: salt ? salt : undefined,
        servingSize,
        vitamins: vitamins ? vitamins : undefined,
        minerals: minerals ? minerals : undefined,
        allergens: allergens ? allergens : undefined,
        foodCategory: foodCategory ? foodCategory : undefined,
        userId: userID,
      },
    });

    res.status(200).json(newFood);

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { addFood };

const getUserFoods = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userFoods = await prisma.food.findMany({
      where: {
        userId: userId,
      },
    });

    if (!userFoods) {
      return res.status(404).json({ message: "No foods found for this user" });
    }

    return res.status(200).json(userFoods);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { getUserFoods };

// Update a food
const updateFood = async (req: Request, res: Response) => {
  try {
    const foodId = req.params.id;
    const {
      name,
      brandName,
      barcode,
      calories,
      protein,
      fat,
      carbs,
      fiber,
      salt,
      servingSize,
      vitamins,
      minerals,
      allergens,
      foodCategory,
    } = req.body;

    const userID = get(req, "identity.id");

    let brand = await prisma.brand.findFirst({
      where: { name: brandName },
    });

    if (!brand) {
      brand = await prisma.brand.create({
        data: { name: brandName },
      });
    }

    const updatedFood = await prisma.food.update({
      where: { id: foodId },
      data: {
        name,
        brandId: brand.id,
        barcode,
        calories : calories,
        protein,
        fat,
        carbs,
        fiber: fiber ? fiber : undefined,
        salt: salt ? salt : undefined,
        servingSize,
        vitamins: vitamins ? vitamins : undefined,
        minerals: minerals ? minerals : undefined,
        allergens: allergens ? allergens : undefined,
        foodCategory: foodCategory ? foodCategory : undefined,
        userId: userID,
      },
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(updatedFood);

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { updateFood };

// Delete a food
const deleteFood = async (req: Request, res: Response) => {
  try {
    const foodId = req.params.id;
    
    const deletedFood = await prisma.food.delete({
      where: { id: foodId },
    });

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { deleteFood };
