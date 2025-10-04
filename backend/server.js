const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
const memosRouter = require('./routes/memos');
const tagsRouter = require('./routes/tags');

app.use('/api/memos', memosRouter);
app.use('/api/tags', tagsRouter);

// 테스트 라우트
app.get('/', (req, res) => {
  res.json({ message: '태그 메모 API 서버 작동중!' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다.`);
});