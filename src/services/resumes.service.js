import { ResumeRepository } from '../repositories/resumes.repository.js';

export class ResumeService {
  resumeRepository = new ResumeRepository();

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

    const createdResume = await this.resumeRepository.createById(
      userId,
      title,
      selfIntroduction,
    );

    // 입력된 값을 가져 나오면 그걸 createdResume에 넣고 각 return요소에 넣어서 반환한다.
    return {
      userId: createdResume.userId,
      title: createdResume.title,
      selfIntroduction: createdResume.selfIntroduction,
    };
  };
}
