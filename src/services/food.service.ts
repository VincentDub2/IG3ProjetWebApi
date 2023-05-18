import prisma from '../prisma';



export const getFoodByName = (name : string) => prisma.food.findMany({ where: { name }});

export const getFoodByCategory = (foodCategory : string) => prisma.food.findMany({ where: { foodCategory }});

//export const getFoodByBrand = (brand : string) => prisma.food.findMany({ where: { brand }});

export const getFoodByBarcode = (barcode : string) => prisma.food.findMany({ where: {barcode }});

export const getFoodById = (id: string) => prisma.food.findUnique({ where: { id } });

export const getFoodByUserId = (userId: string) => prisma.food.findMany({ where: { userId } });

