import express from 'express';
import requireAccessTokenMiddleware from '../middlewares/require-access-token.middleware.js';
import { ResumeController } from '../controllers/resumes.controller.js';

const router = express.Router();

const resumeController = new ResumeController();

// 이력서 생성
router.post('/resume', requireAccessTokenMiddleware, resumeController.createResume);

// 이력서 조회 (토큰 쓴 이유 : 로그인 한 사람 이력서만 봐야하니까)
router.get('/resume', requireAccessTokenMiddleware, resumeController.myResumes);

// 이력서 상세 조회 (토큰 쓴 이유 : 로그인 한 사람 이력서만 봐야하니까)
router.get('/resume/:resumeId', requireAccessTokenMiddleware, resumeController.myResume);

// 이력서 수정
router.patch('/resume/:resumeId', requireAccessTokenMiddleware, resumeController.changeResume);

// 이력서 삭제
router.delete();

// //이력서 생성 API (AccessToken 인증 필요)
// router.post('/resume', requireAccessTokenMiddleware, async (req, res, next) => {
//   //     1. 요청 정보
//   //     - 사용자의 정보는 인증 Middleware(`req.user`)를 통해서 전달 받습니다.
//   const user = req.user;

//   //     - 제목, 자기소개를 Request Body(`req.body`)로 전달 받습니다.
//   const { title, selfIntroduction } = req.body;

//   // 2. 유효성 검증 및 에러 처리
//   //     - 제목, 자기소개 중 하나라도 빠진 경우 - “OO을 입력해 주세요”
//   // if(! title) {
//   //     return res.status(401).json({ errorMessage: `${title}과 ${selfIntroduction}을 입력해주세요` });
//   // }

//   if (!title || !selfIntroduction) {
//     return res.status(400).json({ errorMessage: `빠진 정보를 입력해주세요` });
//   }

//   //     - 자기소개 글자 수가 150자 보다 짧은 경우 - “자기소개는 150자 이상 작성해야 합니다.”
//   if (selfIntroduction.length < 150) {
//     return res
//       .status(400)
//       .json({ errorMessage: '자기소개는 150자 이상 작성해야 합니다.' });
//   }

//   // 3. 비즈니스 로직(데이터 처리) 이력서 정보를 DB에 생성
//   //     - 작성자 ID는 인증 Middleware에서 전달 받은 정보를 활용합니다.
//   const { userId } = user;

//   //     - 이력서 ID, 지원 상태, 생성일시, 수정일시는 자동 생성됩니다.

//   //     - 지원 상태의 종류는 다음과 같으며, 기본 값은 `APPLY` 입니다.
//   //         - 서류 지원 완료 `APPLY`
//   //         - 서류 탈락 `DROP`
//   //         - 서류 합격 `PASS`
//   //         - 1차 면접 `INTERVIEW1`
//   //         - 2차 면접 `INTERVIEW2`
//   //         - 최종 합격 `FINAL_PASS`
//   const resume = await prisma.resumes.create({
//     data: {
//       userId,
//       title,
//       selfIntroduction,
//     },
//   });

//   // 4. 반환 정보
//   //     - 이력서 ID, 작성자 ID, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.
//   return res.status(201).json({ data: resume });
// });

// 이력서 목록 조회 API

// router.get('/resume', requireAccessTokenMiddleware, async (req, res, next) => {
//   // 목표. 1. resume 테이블의 모든 이력서 보여주기
//   // const resume = await prisma.resumes.findMany({});
//   // console.log(resume);
//   // return res.json({data: resume});

//   // 1. requireAccessTokenMiddleware의 역할이 무엇인지.
//   // 회원가입을 하였을때 쿠키, 토큰을 발급하여 발급 받은 자가 일치하는지 확인하기 위해서 아무나 막 오면 안되니까 // 특정 사용자게에만 특정한 정보를 전달하기 위해서

//   // 2. req.user.userId를 왜 가지고 오는지.
//   // req.user는 일치하는지 확인 받은 자의 정보 중에서 그 사람에게 부여된 유니크한 값 분별하기 위한 값을 뽑아내기 위해서 // 로그인한 사람의 정보를 가져오기 위해서

//   // 3. findMany에서 where를 왜 쓰는지..
//   // resume라는 프리즈마 테이블(데이터 시트)에서 여러 값들 중 내가 찾고자 하는 구역을 찾기 위해서 그리고 그 구역의 이름이 userId(세로 줄)고
//   // 그 속에서 토큰을 발급 받은자와 일치하는 유저를 찾기 위해서    //

//   //     1. 요청 정보
//   //     - 사용자 정보는 인증 Middleware(`req.user`)를 통해서 전달 받습니다.
//   const user = req.user;

//   //     - Query Parameters(`req.query`)으로 정렬 조건을 받습니다.
//   const { sort } = req.query;

//   //     - 생성일시 기준 정렬은 `과거순(ASC),` `최신순(DESC)`으로 전달 받습니다. 값이 없는 경우 `최신순(DESC)` 정렬을 기본으로 합니다. 대소문자 구분 없이 동작해야 합니다.
//   //     - 예) `sort=desc`

//   // www.localhost.com/resume?sort=desc

//   //     2. 비즈니스 로직(데이터 처리)
//   //     - 현재 로그인 한 사용자가 작성한 이력서 목록만 조회합니다.
//   //     - DB에서 이력서 조회 시 작성자 ID가 일치해야 합니다.
//   //     - 정렬 조건에 따라 다른 결과 값을 조회합니다.
//   //     - 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의 한 Relation을 활용해 조회합니다.
//   const resumes = await prisma.resumes.findMany({
//     where: {
//       userId: user.userId,
//     },
//     orderBy: {
//       createdAt: sort.toUpperCase() === 'asc' ? 'asc' : 'desc', // 삼항 연산자 공부하기.
//     }, //,                                                             // 대소문자 구분 없이 동작해야 합니다. [.toLowerCase()]
//     // include: {
//     //     user: true
//     // }
//   });

//   //     3. 유효성 검증 및 에러 처리
//   //     - 일치하는 값이 없는 경우 - 빈 배열(`[]`)을 반환합니다. (StatusCode: 200)
//   if (!resumes) {
//     return res.status(200).json({ data: [] });
//   }

//   //     4. 반환 정보
//   //     - 이력서 ID, 작성자 이름, 제목, 자기소개, 지원 상태, 생성일시, 수정일시의 목록을 반환합니다.

//   return res.status(200).json({
//     data: resumes.map((resume) => {
//       return {
//         resumeId: resume.resumeId,
//         name: user.name,
//         title: resume.title,
//         self: resume.selfIntroduction,
//         status: resume.status,
//         createdAt: resume.createdAt,
//         updatedAt: resume.updatedAt,
//       };
//     }),
//   });
// });

// // 이력서 상세조회
// router.get(
//   '/resume/:resumeId',
//   requireAccessTokenMiddleware,
//   async (req, res, next) => {
//     //    1. 요청 정보
//     //     - 사용자 정보는 인증 Middleware(`req.user`)를 통해서 전달 받습니다.
//     const user = req.user;

//     //     - 이력서 ID를 Path Parameters(`req.params`)로 전달 받습니다.
//     const { resumeId } = req.params; // <-이게 /resume/:resumeId 에서 쓰이니까 정답
//     // { resumeId: '1' } 에서
//     const resume = await prisma.resumes.findFirst({
//       where: {
//         resumeId: +resumeId, // Number(resumeId); = +resumeId랑 같은 말임.
//         userId: user.userid, // 이게 3. 비즈니스 로직(데이터 처리)에서 필요하니까 작성
//       },
//     });

//     //    2. 유효성 검증 및 에러 처리
//     //     - 이력서 정보가 없는 경우 - “이력서가 존재하지 않습니다.”
//     if (!resume)
//       return res.status(404).json({ message: '이력서가 존재하지 않습니다.' });

//     //    3. 비즈니스 로직(데이터 처리)
//     //     - 현재 로그인 한 사용자가 작성한 이력서만 조회합니다.    // 그래서 userId: user.userid를 작성하는 것이다.

//     //     - DB에서 이력서 조회 시 이력서 ID, 작성자 ID가 모두 일치해야 합니다.  // 그래서 userId: resume.userid까지 썼던 것.

//     //     - 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의 한 Relation을 활용해 조회합니다. //  ????

//     //    4. 반환 정보
//     //     - 이력서 ID, 작성자 이름, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.
//     return res.status(200).json({
//       data: {
//         resumeId: resume.resumeId,
//         name: user.name,
//         title: resume.title,
//         self: resume.selfIntroduction,
//         status: resume.status,
//         createdAt: resume.createdAt,
//         updatedAt: resume.updatedAt,
//       },
//     });
//   },
// );

// // 이력서 수정 API

// router.patch(
//   '/resume/:resumeId',
//   requireAccessTokenMiddleware,
//   async (req, res, next) => {
//     //    1. 요청 정보
//     //     - 사용자 정보는 인증 Middleware(`req.user`)를 통해서 전달 받습니다.
//     const user = req.user;
//     //     - 이력서 ID를 Path Parameters(`req.params`)로 전달 받습니다.
//     const { resumeId } = req.params;

//     const resume = await prisma.resumes.findFirst({
//       where: {
//         resumeId: +resumeId,
//         userId: user.userid,
//       },
//     });
//     // 무사히 다 나옴.

//     //     - 제목, 자기소개를 Request Body(`req.body`)로 전달 받습니다.
//     const { title, selfIntroduction } = req.body;

//     //    2. 유효성 검증 및 에러 처리
//     //     - 제목, 자기소개 둘 다 없는 경우 - “수정 할 정보를 입력해 주세요.”
//     if (!title && !selfIntroduction) {
//       return res.status(400).json({ message: '수정 할 정보를 입력해 주세요.' });
//     }

//     //     - 이력서 정보가 없는 경우 - “이력서가 존재하지 않습니다.”
//     if (!resume) {
//       return res.status(404).json({ message: '이력서가 존재하지 않습니다.' });
//     }

//     //    3. 비즈니스 로직(데이터 처리)
//     //     - 현재 로그인 한 사용자가 작성한 이력서만 수정합니다.
//     //     - DB에서 이력서 조회 시 이력서 ID, 작성자 ID가 모두 일치해야 합니다.
//     //     - DB에서 이력서 정보를 수정합니다.

//     //     - 제목, 자기소개는 개별 수정이 가능합니다.
//     const patchResume = await prisma.resumes.update({
//       where: {
//         resumeId: +resumeId,
//         userId: user.userid, // 위에서 검증이 완료되었기 때문에 없어도 되지만 만약을 대비해서 적어놓음.
//       },
//       data: {
//         title: req.body.title || resume.title, // 기존의 이력서에서 업데이트해야하니까
//         selfIntroduction: req.body.selfIntroduction || resume.selfIntroduction, // 마찬가지      + || 를 왜 쓰냐면 "개별 수정이 가능합니다".니까 title만 수정할 수 도 있고 그랬을 때 sel는 입력 안하면 기존의 데이터를 가지고 가야한다.
//       }, // 따라서 신규 작성 (좌측)이 아니면 기존의 데이터(우측) 그대로 가겠다는 말이다.
//     });
//     //    4. 반환 정보
//     //     - 수정 된 이력서 ID, 작성자 ID, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.
//     return res.status(200).json({
//       data: patchResume,
//     });
//   },
// );

// // 이력서 삭제 API

// router.delete(
//   '/resume/:resumeId',
//   requireAccessTokenMiddleware,
//   async (req, res, next) => {
//     //    1. 요청 정보
//     //     - 사용자 정보는 인증 Middleware(`req.user`)를 통해서 전달 받습니다.
//     const user = req.user;

//     //     - 이력서 ID를 Path Parameters(`req.params`)로 전달 받습니다.
//     const { resumeId } = req.params;

//     const resume = await prisma.resumes.findFirst({
//       where: {
//         resumeId: +resumeId,
//         userId: user.userid,
//       },
//     });

//     //    2. 유효성 검증 및 에러 처리
//     //     - 이력서 정보가 없는 경우 - “이력서가 존재하지 않습니다.”
//     if (!resume) {
//       return res.status(400).json({ message: '이력서가 존재하지 않습니다.' });
//     }
//     //    3. 비즈니스 로직(데이터 처리)
//     //     - 현재 로그인 한 사용자가 작성한 이력서만 삭제합니다.
//     //     - DB에서 이력서 조회 시 이력서 ID, 작성자 ID가 모두 일치해야 합니다.
//     //     - DB에서 이력서 정보를 삭제합니다.
//     const delresume = await prisma.resumes.delete({
//       where: {
//         resumeId: +resumeId,
//         userId: user.userId, // 위에서 검증이 완료되었기 때문에 없어도 되지만 만약을 대비해서 적어놓음.
//       }, // 여기서 왜  data가 없는지 생각해보자.      정답은 바로 위에 where에서 이미 resumeId를 찾았기 때문에 삭제 시에는 따로 찾을 필요가 없는 것이다.
//     }); // 삭제 외에 수정이나 작성을 생각해보자 이력서는 찾았어 (= 이력서id) 근데 그 이력서에서 뭘 수정할건데? title? content? 지정을 안했잖아? 그니까 지정하려고 data를 넣는 것이다.
//     //    4. 반환 정보
//     //     - 삭제 된 이력서 ID를 반환합니다.
//     return res
//       .status(201)
//       .json({ message: `이력서 ID가 ${resumeId}인 이력서를 삭제하였습니다.` });
//   },
// );

export default router;
