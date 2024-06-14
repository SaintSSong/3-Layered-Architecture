import express from 'express';
import AuthRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import ResumesRouter from './routers/resumes.router.js';
import UserRouer from './routers/users.router.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  return res.status(200).json({ message: '서버가 연결되었습니다.' });
});
app.use('/api', [AuthRouter, ResumesRouter, UserRouer]);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸습니다.');
});
