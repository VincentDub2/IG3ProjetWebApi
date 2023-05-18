// src/services/user.service.ts

import prisma from '../prisma';

import { UserInput, OAuthUserInput,UserWithAccounts } from '../types';

// User Actions
export const getUsers = () => prisma.user.findMany();

export const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

export const getUserBySessionToken = (sessionToken: string) => prisma.user.findUnique({ where: { sessionToken : sessionToken } });

export const getUserById = (id: string) => prisma.user.findUnique({ where: { id } });


export const createUser = (values: UserInput) => prisma.user.create({ data: values });


  
export const createOAuthUser = async (values: OAuthUserInput): Promise<UserWithAccounts> => {
    const createdUser = await prisma.user.create({
      data: {
        email: values.email,
        name: values.name,
        hashedPassword: null,
        accounts: {
          create: {
            provider: values.provider,
            providerAccountId: values.providerAccountId,
            type: values.provider,
          },
        },
      },
      include: {
        accounts: true,
      },
    });
  
    return createdUser as UserWithAccounts;
  };
  
    


export const deleteUserById = (id: string) => prisma.user.delete({ where: { id } });


export const updateUserById = (id: string, values: Record<string, any>) => prisma.user.update({ where: { id }, data: values });

export const getUserByProviderAccountId = (provider: string, providerAccountId: string) =>
  prisma.user.findFirst({
    where: {
      accounts: {
        some: {
          provider,
          providerAccountId,
        },
      },
    },
    include: {
      accounts: true,
    },
  });


 