import { ResumeRepository } from '../repositories/resumes.repository.js';

export class ResumeService {
  resumeRepository = new ResumeRepository();

  // 나의 이력서 생성

  // 우선 createResume를 통해서 입력되는 값이 오류가 없는지 확인하고 통과 되면
  // createById에서 userId를 통해서 Repository에서 userId로 찾은 정보를 통해서 일치하는 아이디에
  // title, selfIntroduction를 DB에 입력하고 반환되는 값을 createdResume에 넣는다.
  createResume = async (userId, title, selfIntroduction) => {
    if (!title || !selfIntroduction) {
      throw new Error('빠진 정보를 입력해주세요.');
    }

    if (selfIntroduction.length < 150) {
      throw new Error('자기소개는 150자 이상 작성해야 합니다.');
    }

    const createdResume = await this.resumeRepository.createById(userId, title, selfIntroduction);

    // 입력된 값을 가져 나오면 그걸 createdResume에 넣고 각 return요소에 넣어서 반환한다.
    return {
      userId: createdResume.userId,
      title: createdResume.title,
      selfIntroduction: createdResume.selfIntroduction,
    };
  };

  // 나의 이력서 목록 조회
  ResumesByMyId = async (userId, sort) => {
    const foundMyResumes = await this.resumeRepository.ResumesByMyId(userId, sort);

    if (!foundMyResumes) {
      throw new Error({ data: [] });
    }

    const resumes = foundMyResumes.map((resume) => ({
      resumeId: resume.resumeId,
      name: resume.user.name,
      title: resume.title,
      self: resume.selfIntroduction,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    }));

    return resumes;
  };

  // 이력서 상세 조회
  myResume = async (userId, resumeId) => {
    const myResume = await this.resumeRepository.myResume(userId, resumeId);

    if (!myResume) {
      throw new Error('이력서가 존재하지 않습니다.');
    }

    const resume = {
      resumeId: myResume.resumeId,
      name: myResume.user.name,
      title: myResume.title,
      self: myResume.selfIntroduction,
      status: myResume.status,
      createdAt: myResume.createdAt,
      updatedAt: myResume.updatedAt,
    };

    return resume;
  };

  // 이력서 수정
  changeResume = async (userId, resumeId, title, selfIntroduction) => {
    // 수정 내용을 입력 안했을 때 나오는 오류
    if (!title && !selfIntroduction) {
      throw new Error('수정 할 정보를 입력해 주세요.');
    }

    const changedResume = await this.resumeRepository.changeResume(userId, resumeId, title, selfIntroduction);

    // 이력서 정보가 없는 경우 - “이력서가 존재하지 않습니다.”
    if (!changedResume) {
      throw new Error('이력서가 존재하지 않습니다.');
    }

    return changedResume;
  };
}
