const pool = require('./db');

const createTables = async () => {
  console.log('데이터베이스 테이블 생성을 시작합니다...');
  
  try {
    // 메모 테이블
    console.log('1. memos 테이블 생성 중...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS memos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        date DATE NOT NULL,
        primary_tag VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ memos 테이블 생성 완료');

    // 태그 계층 테이블
    console.log('2. tag_hierarchy 테이블 생성 중...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tag_hierarchy (
        id SERIAL PRIMARY KEY,
        tag_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        parent_id INTEGER,
        color VARCHAR(100),
        position INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ tag_hierarchy 테이블 생성 완료');

    // 미분류 태그 테이블
    console.log('3. uncategorized_tags 테이블 생성 중...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS uncategorized_tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        color VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ uncategorized_tags 테이블 생성 완료');

    // 메모-태그 연결 테이블
    console.log('4. memo_tags 테이블 생성 중...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS memo_tags (
        id SERIAL PRIMARY KEY,
        memo_id INTEGER REFERENCES memos(id) ON DELETE CASCADE,
        tag_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ memo_tags 테이블 생성 완료');

    console.log('\n모든 테이블 생성 완료!');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ 테이블 생성 실패:', err.message);
    console.error('상세 에러:', err);
    await pool.end();
    process.exit(1);
  }
};

createTables();