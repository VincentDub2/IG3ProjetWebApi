"use strict";
// src/services/user.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByProviderAccountId = exports.updateUserById = exports.deleteUserById = exports.updateAllUserById = exports.createOAuthUser = exports.createUser = exports.getUserById = exports.findUserByAccessToken = exports.getUserBySessionTokenAndProvider = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// User Actions
const getUsers = () => prisma_1.default.user.findMany();
exports.getUsers = getUsers;
const getUserByEmail = (email) => prisma_1.default.user.findUnique({ where: { email } });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => prisma_1.default.user.findUnique({ where: { sessionToken: sessionToken } });
exports.getUserBySessionToken = getUserBySessionToken;
const getUserBySessionTokenAndProvider = (sessionToken) => prisma_1.default.user.findUnique({ where: { sessionToken: sessionToken } });
exports.getUserBySessionTokenAndProvider = getUserBySessionTokenAndProvider;
async function findUserByAccessToken(access_token) {
    const account = await prisma_1.default.account.findUnique({
        where: { id: access_token },
        include: { user: true },
    });
    console.log("Account find look account: ", account);
    return account;
}
exports.findUserByAccessToken = findUserByAccessToken;
const getUserById = (id) => prisma_1.default.user.findUnique({ where: { id } });
exports.getUserById = getUserById;
const createUser = (values) => prisma_1.default.user.create({ data: values });
exports.createUser = createUser;
const createOAuthUser = async (values) => {
    const createdUser = await prisma_1.default.user.create({
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
    return createdUser;
};
exports.createOAuthUser = createOAuthUser;
async function updateAllUserById(id, updates) {
    // fetch the user from the database
    let user = await prisma_1.default.user.findUnique({
        where: { id },
    });
    // update the user
    user = await prisma_1.default.user.update({
        where: { id },
        data: updates,
    });
    return user;
}
exports.updateAllUserById = updateAllUserById;
const deleteUserById = async (id) => {
    // disconnect or delete associated records here
    // for example, to delete all associated accounts:
    await prisma_1.default.account.deleteMany({ where: { userId: id } });
    // now delete the user
    return prisma_1.default.user.delete({ where: { id } });
};
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => prisma_1.default.user.update({ where: { id }, data: values });
exports.updateUserById = updateUserById;
const getUserByProviderAccountId = (provider, providerAccountId) => prisma_1.default.user.findFirst({
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
exports.getUserByProviderAccountId = getUserByProviderAccountId;
//# sourceMappingURL=user.service.js.map