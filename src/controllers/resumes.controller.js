import { ResumeService } from '../services/resumes.service.js';

export class ResumeController {
  resumeService = new ResumeService();

  // 이력서 생성
  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, selfIntroduction } = req.body;

      const createResume = await this.resumeService.createResume(userId, title, selfIntroduction);

      return res.status(201).json({ data: createResume });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 목록 조회
  myResumes = async (req, res, next) => {
    try {
      const { userId } = req.user;

      // sort를 service에다가 넣나? 아마 찾을 때부터 니까 repository?
      const { sort } = req.query;

      const readMyResumes = await this.resumeService.ResumesByMyId(userId, sort);

      return res.status(200).json({ data: readMyResumes });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 상세 조회
  myResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;

      const myResume = await this.resumeService.myResume(userId, resumeId);

      return res.status(200).json({ myResume });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 수정
  changeResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const { title, selfIntroduction } = req.body;

      const changeResume = await this.resumeService.changeResume(userId, resumeId, title, selfIntroduction);

      return res.status(200).json({ changeResume });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;

      const deletedResume = await this.resumeService.deleteResume(userId, resumeId);

      return res.status(200).json({ message: '이력서 ID가 ' + deletedResume.resumeId + '인 이력서를 삭제했습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
