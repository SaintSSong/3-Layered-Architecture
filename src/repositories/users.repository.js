import { prisma } from '../utils/prisma.util.js';

export class UsersRepository {
  //회원가입 API
  createUser = async (email, password, name) => {
    const createdUser = await prisma.users.create({
      data: {
        email,
        password,
        name,
      },
    });

    return createdUser;
  };

  //로그인 API
  findUserByEmail = async (email) => {
    const foundUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return foundUser;
  };

  //내정보 조회API
  findUserById = async (userId) => {
    const foundInFo = await prisma.users.findFirst({
      where: {
        userId: Number(userId),
      },
    });
    return foundInFo;
  };
}
