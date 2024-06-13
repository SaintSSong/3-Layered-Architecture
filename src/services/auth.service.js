import { UsersRepository } from '../repositories/users.repository.js';
import { createAccessToken } from '../utils/auth.util.js';

export class AuthService {
  usersRepository = new UsersRepository();
  //회원가입
  signUp = async (email, password, passwordCheck, name) => {
    if (!email || !password || !passwordCheck || !name) {
      throw new Error('입력값을 확인해주세요.');
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    if (password !== passwordCheck) {
      throw new Error('입력한 두 비밀번호가 일치하지 않습니다.');
    }

    const user = await this.usersRepository.createUser(email, password, name);

    return { email: user.email, password: user.password, name: user.name };
  };

  //로그인
  logIn = async (email, password) => {
    const foundUser = await this.usersRepository.findUserByEmail(email);

    // 입력 안한게 있는지 확인
    if (!email || !password) {
      throw new Error('이메일과 비밀번호를 확인해주세요.');
    }

    // 이메일이 정규식인지 확인
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; /** 정규 표현식**/
    if (!emailRegex.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    // 이메일이 존재하는지 확인
    if (!email) {
      throw new Error('존재하지 않는 이메일 입니다.');
    }

    // 비밀번호가 맞는지 확인
    if (password !== foundUser.password) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // accessToken 발급
    const accessToken = createAccessToken(foundUser.userId);

    const { password: _, ...restfoundUser } = foundUser;
    return { ...restfoundUser, accessToken: `Bearer ${accessToken}` };
  };
}
