// src/services/user.service.ts

import prisma from '../prisma';

import { UserInput, OAuthUserInput,UserWithAccounts } from '../types';

// User Actions
export const getUsers = () => prisma.user.findMany();

export const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

export const getUserBySessionToken = (sessionToken: string) => prisma.user.findUnique({ where: { sessionToken : sessionToken } });

export const getUserBySessionTokenAndProvider = (sessionToken: string) => prisma.user.findUnique({ where: { sessionToken : sessionToken} });

export async function findUserByAccessToken(access_token: string) {
  const account = await prisma.account.findUnique({
      where: { access_token : access_token },
      include: { user: true },
  });
  return account?.user;
}

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
  
    
  export async function updateAllUserById(id : string, updates : Record<string, any>) {
    // fetch the user from the database
    let user = await prisma.user.findUnique({
      where: { id },
    });
    
    // update the user
    user = await prisma.user.update({
      where: { id },
      data: updates,
    });
    
    return user;
  }
  

  export const deleteUserById = async (id: string) => {
    // disconnect or delete associated records here
    // for example, to delete all associated accounts:
    await prisma.account.deleteMany({ where: { userId: id } });

    // now delete the user
    return prisma.user.delete({ where: { id } });
};

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


 