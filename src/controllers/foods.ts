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
      SELECT Food.*, Brand.name AS brand FROM Food
      JOIN Brand ON Food.brandId = Brand._id
      WHERE Food.name LIKE ${fuzzyQuery}
        OR Brand.name LIKE ${fuzzyQuery}
        OR Food.foodCategory LIKE ${fuzzyQuery}
        OR Food.barcode = ${query}
    `;
  

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
