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
  // userId에 일치하는 사용자의 resumes 테이블의 데이터를 다 가져온다.

  ResumesByMyId = async (userId, sort) => {
    const sortOption = sort && sort.toUpperCase() === 'ASC' ? 'asc' : 'desc';

    const resumes = await prisma.resumes.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: sortOption,
      },
      include: {
        user: true,
      },
    });

    return resumes;
  };

  // 이력서 상세 조회
  myResume = async (userId, resumeId) => {
    const resume = await prisma.resumes.findFirst({
      where: {
        userId: userId,
        resumeId: Number(resumeId),
      },
      include: {
        user: true,
      },
    });

    return resume;
  };

  // 이력서 수정
  changeResume = async (userId, resumeId, title, selfIntroduction) => {
    const changedResume = await prisma.resumes.update({
      where: {
        userId: userId,
        resumeId: Number(resumeId),
      },
      data: {
        title,
        selfIntroduction,
      },
    });
    return changedResume;
  };

  // 이력서 삭제
  deleteResume = async (userId, resumeId) => {
    const deletedResume = await prisma.resumes.delete({
      where: {
        userId,
        resumeId: Number(resumeId),
      },
    });
    return deletedResume;
  };
}
