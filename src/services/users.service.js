import { UsersRepository } from '../repositories/users.repository.js';

export class UserService {
  usersRepository = new UsersRepository();

  getMyInfo = async (userId) => {
    const myInFo = await this.usersRepository.findUserById(userId);

    return {
      userId: myInFo.postId,
      email: myInFo.nickname,
      name: myInFo.title,
      role: myInFo.content,
      createdAt: myInFo.createdAt,
      updatedAt: myInFo.updatedAt,
    };
  };
}
