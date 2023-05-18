import { Request, Response } from "express";
import prisma from "../prisma";
import { Brand } from "@prisma/client";
import { get } from "lodash";
import { getBrands } from "../services/brand.service";

// Récupérer toutes les marques
const allBrand = async (req: Request, res: Response) => {
  try {
    const brands = await getBrands();

    res.json(brands);

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { allBrand };

// Ajouter une nouvelle marque
const addBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Créer le nouvel objet marque
    const newBrand = await prisma.brand.create({
      data: {
        name,
      },
    });

    res.json(newBrand);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { addBrand};
