import { UserService } from '../services/users.service.js';

export class UserController {
  userService = new UserService();

  getMyInfo = async (req, res, next) => {
    try {
      const data = req.user;
      // const userInfo = await this.userService.getMyInfo(userId);

      return res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
}

//여기서 토큰값에 대한 것은 작성하지 않지 않을까? 왜? 여기는 그냥 입력 받고 반환하는 공간이니까.
