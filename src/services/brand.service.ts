import prisma from '../prisma';


export const getBrands = async () => {
    const brands = await prisma.brand.findMany();
    const brandData = brands.map((brand) => ({ id: brand.id, name: brand.name }));
    return brandData;
  };
  

