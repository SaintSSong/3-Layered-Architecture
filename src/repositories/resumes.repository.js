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
        userId: +userId,
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

  //   ResumesByMyId = async (userId, sort) => {
  //     const resumes = await prisma.resumes.findMany({
  //       where: {
  //         userId: +userId,
  //       },
  //       orderBy: {
  //         createdAt: sort.toUpperCase() === 'asc' ? 'asc' : 'desc', // 삼항 연산자 공부하기.
  //       },
  //     });

  //     return resumes;
  //   };
}
