import { ResumeService } from '../services/resumes.service.js';

export class ResumeController {
  resumeService = new ResumeService();

  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, selfIntroduction } = req.body;

      const createResume = await this.resumeService.createResume(
        userId,
        title,
        selfIntroduction,
      );

      return res.status(201).json({ data: createResume });
    } catch (err) {
      next(err);
    }
  };
}
