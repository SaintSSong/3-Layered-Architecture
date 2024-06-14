import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class AuthController {
  authService = new AuthService();

  // 회원가입 API
  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordCheck, name } = req.body;

      const createdUser = await this.authService.signUp(email, password, passwordCheck, name);

      return res.status(HTTP_STATUS.OK).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };

  // 로그인 API
  logIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const logInAuth = await this.authService.logIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        data: logInAuth,
      });
    } catch (err) {
      next(err);
    }
  };
}
