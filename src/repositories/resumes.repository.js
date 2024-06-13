import { prisma } from '../utils/prisma.util.js';

export class ResumeRepository {
  // 이력서 생성 API
  // (userId, title, selfIntroduction) 넣는 이유가 db에 입력해서 넣을 요소들이니까
  // 작성한다 맞나?
  createById = async (userId, title, selfIntroduction) => {
    const createdResume = await prisma.resumes.create({
      data: { userId, title, selfIntroduction },
    });

    return createdResume;
  };

  // 이력서 목록 조회
}
