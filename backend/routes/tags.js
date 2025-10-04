const express = require('express');
const router = express.Router();
const pool = require('../db');

// 태그 계층 조회
router.get('/hierarchy', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tag_hierarchy ORDER BY position');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '태그 계층 조회 실패' });
  }
});

// 태그 계층 저장 (전체 교체)
router.post('/hierarchy', async (req, res) => {
  const { hierarchy } = req.body;
  
  try {
    // 기존 데이터 삭제
    await pool.query('DELETE FROM tag_hierarchy');
    
    // 새 데이터 삽입
    const insertTag = async (tag, parentId = null, position = 0) => {
      await pool.query(
        'INSERT INTO tag_hierarchy (tag_id, name, parent_id, color, position) VALUES ($1, $2, $3, $4, $5)',
        [tag.id, tag.name, parentId, tag.color, position]
      );
      
      if (tag.children && tag.children.length > 0) {
        for (let i = 0; i < tag.children.length; i++) {
          await insertTag(tag.children[i], tag.id, i);
        }
      }
    };
    
    for (let i = 0; i < hierarchy.length; i++) {
      await insertTag(hierarchy[i], null, i);
    }
    
    res.json({ message: '태그 계층 저장 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '태그 계층 저장 실패' });
  }
});

// 미분류 태그 조회
router.get('/uncategorized', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM uncategorized_tags ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '미분류 태그 조회 실패' });
  }
});

// 미분류 태그 저장
router.post('/uncategorized', async (req, res) => {
  const { tags } = req.body;
  
  try {
    // 기존 데이터 삭제
    await pool.query('DELETE FROM uncategorized_tags');
    
    // 새 데이터 삽입
    for (const tag of tags) {
      await pool.query(
        'INSERT INTO uncategorized_tags (name, color) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING',
        [tag.name || tag, tag.color]
      );
    }
    
    res.json({ message: '미분류 태그 저장 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '미분류 태그 저장 실패' });
  }
});

module.exports = router;