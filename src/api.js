const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // 메모 API
  getMemos: async () => {
    const res = await fetch(`${API_URL}/memos`);
    return res.json();
  },
  
  createMemo: async (memo) => {
    const res = await fetch(`${API_URL}/memos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memo)
    });
    return res.json();
  },
  
  updateMemo: async (id, memo) => {
    const res = await fetch(`${API_URL}/memos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memo)
    });
    return res.json();
  },
  
  deleteMemo: async (id) => {
    const res = await fetch(`${API_URL}/memos/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },
  
  // 태그 API
  getTagHierarchy: async () => {
    const res = await fetch(`${API_URL}/tags/hierarchy`);
    return res.json();
  },
  
  saveTagHierarchy: async (hierarchy) => {
    const res = await fetch(`${API_URL}/tags/hierarchy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hierarchy })
    });
    return res.json();
  },
  
  getUncategorizedTags: async () => {
    const res = await fetch(`${API_URL}/tags/uncategorized`);
    return res.json();
  },
  
  saveUncategorizedTags: async (tags) => {
    const res = await fetch(`${API_URL}/tags/uncategorized`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags })
    });
    return res.json();
  }
};