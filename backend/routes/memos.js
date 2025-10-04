const express = require('express');
const router = express.Router();
const pool = require('../db');

// 모든 메모 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, 
             array_agg(mt.tag_name) FILTER (WHERE mt.tag_name IS NOT NULL) as tags
      FROM memos m
      LEFT JOIN memo_tags mt ON m.id = mt.memo_id
      GROUP BY m.id
      ORDER BY m.date DESC, m.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '메모 조회 실패' });
  }
});

// 메모 생성
router.post('/', async (req, res) => {
  const { title, content, tags, primaryTag, date } = req.body;
  
  try {
    // 메모 삽입
    const memoResult = await pool.query(
      'INSERT INTO memos (title, content, date, primary_tag) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, date, primaryTag]
    );
    
    const memoId = memoResult.rows[0].id;
    
    // 태그 연결
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO memo_tags (memo_id, tag_name) VALUES ($1, $2)',
          [memoId, tag]
        );
      }
    }
    
    // 전체 메모 정보 반환
    const result = await pool.query(`
      SELECT m.*, 
             array_agg(mt.tag_name) FILTER (WHERE mt.tag_name IS NOT NULL) as tags
      FROM memos m
      LEFT JOIN memo_tags mt ON m.id = mt.memo_id
      WHERE m.id = $1
      GROUP BY m.id
    `, [memoId]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '메모 생성 실패' });
  }
});

// 메모 수정
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, primaryTag, date } = req.body;
  
  try {
    // 메모 업데이트
    await pool.query(
      'UPDATE memos SET title = $1, content = $2, date = $3, primary_tag = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5',
      [title, content, date, primaryTag, id]
    );
    
    // 기존 태그 삭제
    await pool.query('DELETE FROM memo_tags WHERE memo_id = $1', [id]);
    
    // 새 태그 추가
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await pool.query(
          'INSERT INTO memo_tags (memo_id, tag_name) VALUES ($1, $2)',
          [id, tag]
        );
      }
    }
    
    // 전체 메모 정보 반환
    const result = await pool.query(`
      SELECT m.*, 
             array_agg(mt.tag_name) FILTER (WHERE mt.tag_name IS NOT NULL) as tags
      FROM memos m
      LEFT JOIN memo_tags mt ON m.id = mt.memo_id
      WHERE m.id = $1
      GROUP BY m.id
    `, [id]);
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '메모 수정 실패' });
  }
});

// 메모 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('DELETE FROM memos WHERE id = $1', [id]);
    res.json({ message: '메모가 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '메모 삭제 실패' });
  }
});

module.exports = router;