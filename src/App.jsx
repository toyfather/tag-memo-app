import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';
import { X, Plus, Tag, Star, Search, Calendar, Home, Settings, ChevronRight, ChevronDown, Grip } from 'lucide-react';
import { api } from './api';
//여기까지가 데이터 저장/불러오기 유틸리티


// 기본 데이터셋 정의
const DEFAULT_TAG_HIERARCHY = [
  { 
    id: 1, 
    name: '물리적특징', 
    children: [
      { 
        id: 11, 
        name: '체형', 
        children: [
          { id: 111, name: '매우큰', children: [], color: undefined },
          { id: 112, name: '큰', children: [], color: undefined },
          { id: 113, name: '보통키', children: [], color: undefined },
          { id: 114, name: '작은', children: [], color: undefined },
          { id: 115, name: '마른', children: [], color: undefined },
          { id: 116, name: '보통체격', children: [], color: undefined },
          { id: 117, name: '건장한', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 12, 
        name: '헤어스타일', 
        children: [
          { id: 121, name: '긴머리', children: [], color: undefined },
          { id: 122, name: '중간머리', children: [], color: undefined },
          { id: 123, name: '짧은머리', children: [], color: undefined },
          { id: 124, name: '삭발', children: [], color: undefined },
          { id: 125, name: '검은색머리', children: [], color: undefined },
          { id: 126, name: '갈색머리', children: [], color: undefined },
          { id: 127, name: '금발', children: [], color: undefined },
          { id: 128, name: '염색머리', children: [], color: undefined },
          { id: 129, name: '곱슬머리', children: [], color: undefined },
          { id: 1210, name: '직모', children: [], color: undefined },
          { id: 1211, name: '웨이브', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 13, 
        name: '목소리', 
        children: [
          { id: 131, name: '높은목소리', children: [], color: undefined },
          { id: 132, name: '중간목소리', children: [], color: undefined },
          { id: 133, name: '낮은목소리', children: [], color: undefined },
          { id: 134, name: '허스키', children: [], color: undefined },
          { id: 135, name: '맑은목소리', children: [], color: undefined },
          { id: 136, name: '독특한억양', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 14, 
        name: '걸음걸이', 
        children: [
          { id: 141, name: '빠른걸음', children: [], color: undefined },
          { id: 142, name: '보통걸음', children: [], color: undefined },
          { id: 143, name: '느린걸음', children: [], color: undefined },
          { id: 144, name: '당당한자세', children: [], color: undefined },
          { id: 145, name: '구부정한', children: [], color: undefined },
          { id: 146, name: '독특한걸음', children: [], color: undefined }
        ], 
        color: undefined 
      }
    ], 
    color: 'bg-blue-200 text-blue-800' 
  },
  { 
    id: 2, 
    name: '패션', 
    children: [
      { 
        id: 21, 
        name: '의상스타일', 
        children: [
          { id: 211, name: '캐주얼', children: [], color: undefined },
          { id: 212, name: '포멀', children: [], color: undefined },
          { id: 213, name: '스포티', children: [], color: undefined },
          { id: 214, name: '빈티지', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 22, 
        name: '시그니처아이템', 
        children: [
          { id: 221, name: '뿔테안경', children: [], color: undefined },
          { id: 222, name: '금테안경', children: [], color: undefined },
          { id: 223, name: '선글라스', children: [], color: undefined },
          { id: 224, name: '야구모자', children: [], color: undefined },
          { id: 225, name: '비니', children: [], color: undefined },
          { id: 226, name: '시계', children: [], color: undefined },
          { id: 227, name: '목걸이', children: [], color: undefined },
          { id: 228, name: '반지', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 23, 
        name: '색상선호', 
        children: [
          { id: 231, name: '검정옷', children: [], color: undefined },
          { id: 232, name: '흰색옷', children: [], color: undefined },
          { id: 233, name: '밝은색옷', children: [], color: undefined }
        ], 
        color: undefined 
      }
    ], 
    color: 'bg-green-200 text-green-800' 
  },
  { 
    id: 3, 
    name: '행동패턴', 
    children: [
      { 
        id: 31, 
        name: '말투습관', 
        children: [
          { id: 311, name: '특정말버릇', children: [], color: undefined },
          { id: 312, name: '특징적웃음', children: [], color: undefined },
          { id: 313, name: '특징적제스처', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 32, 
        name: '일상루틴', 
        children: [
          { id: 321, name: '자주가는장소', children: [], color: undefined },
          { id: 322, name: '활동시간대', children: [], color: undefined }
        ], 
        color: undefined 
      }
    ], 
    color: 'bg-purple-200 text-purple-800' 
  },
  { 
    id: 4, 
    name: '관계맥락', 
    children: [
      { 
        id: 41, 
        name: '관계유형', 
        children: [
          { id: 411, name: '가족', children: [], color: undefined },
          { id: 412, name: '친구', children: [], color: undefined },
          { id: 413, name: '동료', children: [], color: undefined },
          { id: 414, name: '지인', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 42, 
        name: '만나는장소', 
        children: [
          { id: 421, name: '직장', children: [], color: undefined },
          { id: 422, name: '학교', children: [], color: undefined },
          { id: 423, name: '동호회', children: [], color: undefined },
          { id: 424, name: '동네', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 43, 
        name: '공통활동', 
        children: [], 
        color: undefined 
      }
    ], 
    color: 'bg-pink-200 text-pink-800' 
  },
  { 
    id: 5, 
    name: '보조식별정보', 
    children: [
      { 
        id: 51, 
        name: '향수냄새', 
        children: [
          { id: 511, name: '특정향수', children: [], color: undefined },
          { id: 512, name: '담배냄새', children: [], color: undefined }
        ], 
        color: undefined 
      },
      { 
        id: 52, 
        name: '소지품', 
        children: [
          { id: 521, name: '특정가방', children: [], color: undefined },
          { id: 522, name: '노트북스티커', children: [], color: undefined },
          { id: 523, name: '열쇠고리', children: [], color: undefined }
        ], 
        color: undefined 
      }
    ], 
    color: 'bg-orange-200 text-orange-800' 
  }
];

const DEFAULT_UNCATEGORIZED_TAGS = [];
const DEFAULT_TAG_COLORS = {};


export default function TagMemoApp() {

const [memos, setMemos] = useState([]);
const [tagHierarchy, setTagHierarchy] = useState(DEFAULT_TAG_HIERARCHY);
const [uncategorizedTags, setUncategorizedTags] = useState(DEFAULT_UNCATEGORIZED_TAGS);
const [tagColors, setTagColors] = useState(DEFAULT_TAG_COLORS);
const [loading, setLoading] = useState(true);

//테그색상구분
  const colorOptions = [
    { name: '빨강', value: 'bg-red-200 text-red-800' },
    { name: '주황', value: 'bg-orange-200 text-orange-800' },
    { name: '노랑', value: 'bg-yellow-200 text-yellow-800' },
    { name: '초록', value: 'bg-green-200 text-green-800' },
    { name: '청록', value: 'bg-teal-200 text-teal-800' },
    { name: '파랑', value: 'bg-blue-200 text-blue-800' },
    { name: '남색', value: 'bg-indigo-200 text-indigo-800' },
    { name: '보라', value: 'bg-purple-200 text-purple-800' },
    { name: '분홍', value: 'bg-pink-200 text-pink-800' },
    { name: '회색', value: 'bg-gray-200 text-gray-800' }
  ];
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [expandedTags, setExpandedTags] = useState({});
  const [isAddingMemo, setIsAddingMemo] = useState(false);
  const [editingMemo, setEditingMemo] = useState(null);
  const [newMemo, setNewMemo] = useState({ 
    title: '', 
    content: '', 
    tags: [], 
    primaryTag: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isManagingTags, setIsManagingTags] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedParentTag, setSelectedParentTag] = useState(null);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editingTagName, setEditingTagName] = useState('');
  const [draggedTag, setDraggedTag] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [editingTagColor, setEditingTagColor] = useState(null); 

//데이터로드
useEffect(() => {
  const loadData = async () => {
    try {
      const [memosData, hierarchyData, uncategorizedData] = await Promise.all([
        api.getMemos(),
        api.getTagHierarchy(),
        api.getUncategorizedTags()
      ]);
      
      setMemos(memosData);
      if (hierarchyData.length > 0) {
        // DB 데이터를 프론트엔드 형식으로 변환
        const convertToHierarchy = (data) => {
          // 변환 로직은 나중에 구현
          return DEFAULT_TAG_HIERARCHY;
        };
        setTagHierarchy(convertToHierarchy(hierarchyData));
      }
      if (uncategorizedData.length > 0) {
        setUncategorizedTags(uncategorizedData.map(t => t.name));
      }
      setLoading(false);
    } catch (err) {
      console.error('데이터 로드 실패:', err);
      setLoading(false);
    }
  };
  
  loadData();
}, []);

//데이터로드끝
  const getAllTags = () => {
    const tags = [];
    const collectTags = (tagList) => {
      tagList.forEach(tag => {
        tags.push(tag.name);
        if (tag.children && tag.children.length > 0) {
          collectTags(tag.children);
        }
      });
    };
    collectTags(tagHierarchy);
    return [...tags, ...uncategorizedTags];
  };

  const getAllTagsUsedInMemos = () => {
    const tagSet = new Set();
    memos.forEach(memo => {
      memo.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const findTagById = (id, tagList = tagHierarchy) => {
    for (const tag of tagList) {
      if (tag.id === id) return tag;
      if (tag.children) {
        const found = findTagById(id, tag.children);
        if (found) return found;
      }
    }
    return null;
  };

  const getFilteredMemos = () => {
    let filtered = memos;
  
  if (currentPage === 'tags') {
    if (selectedTags.length > 0) {
      // 선택된 모든 태그를 포함하는 메모만 표시
      filtered = filtered.filter(memo => 
        selectedTags.every(tag => memo.tags.includes(tag))
      );
    } else if (selectedTag !== 'all') {
      filtered = filtered.filter(memo => memo.tags.includes(selectedTag));
    }
  }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(memo => {
        const titleMatch = memo.title.toLowerCase().includes(query);
        const tagMatch = memo.tags.some(tag => tag.toLowerCase().includes(query));
        return titleMatch || tagMatch;
      });
    }
    
    return filtered;
  };

  const toggleTagSelection = (tagName) => {
  if (selectedTags.includes(tagName)) {
    setSelectedTags(selectedTags.filter(t => t !== tagName));
  } else {
    setSelectedTags([...selectedTags, tagName]);
  }
};

const clearTagSelection = () => {
  setSelectedTags([]);
};

  const toggleTag = (tagId) => {
    setExpandedTags(prev => ({
      ...prev,
      [tagId]: !prev[tagId]
    }));
  };

  const addTopLevelTag = () => {
    if (!newTagName.trim()) return;
    const newTag = {
      id: Date.now() + Math.random(),
      name: newTagName.trim(),
      children: [],
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)].value
    };
    setTagHierarchy([...tagHierarchy, newTag]);
    setNewTagName('');
    setSelectedParentTag(null);
  };

  const addChildTag = (parentId) => {
    if (!newTagName.trim()) return;
    
    const addToParent = (tagList) => {
      return tagList.map(tag => {
        if (tag.id === parentId) {
          return {
            ...tag,
            children: [...(tag.children || []), {
              id: Date.now() + Math.random(),
              name: newTagName.trim(),
              children: [],
              color: undefined // 상위 태그 색상을 상속받도록 undefined로 설정
            }]
          };
        }
        if (tag.children && tag.children.length > 0) {
          return { ...tag, children: addToParent(tag.children) };
        }
        return tag;
      });
    };
    
    setTagHierarchy(addToParent(tagHierarchy));
    setNewTagName('');
    setSelectedParentTag(null);
  };

  const deleteTagRecursive = (tagId) => {
    const tag = findTagById(tagId);
    if (!tag) return;
    
    const tagsToDelete = [];
    const collectAllTags = (t) => {
      tagsToDelete.push(t.name);
      if (t.children) {
        t.children.forEach(child => collectAllTags(child));
      }
    };
    collectAllTags(tag);
    
    setMemos(memos.map(memo => ({
      ...memo,
      tags: memo.tags.filter(t => !tagsToDelete.includes(t)),
      primaryTag: tagsToDelete.includes(memo.primaryTag) 
        ? (memo.tags.filter(t => !tagsToDelete.includes(t))[0] || '')
        : memo.primaryTag
    })));
    
    const removeFromHierarchy = (tagList) => {
      return tagList.filter(t => {
        if (t.id === tagId) return false;
        if (t.children) {
          t.children = removeFromHierarchy(t.children);
        }
        return true;
      });
    };
    
    setTagHierarchy(removeFromHierarchy(tagHierarchy));
  };

  const deleteUncategorizedTag = (tagName) => {
    setUncategorizedTags(uncategorizedTags.filter(t => t !== tagName));
    setMemos(memos.map(memo => ({
      ...memo,
      tags: memo.tags.filter(t => t !== tagName),
      primaryTag: memo.primaryTag === tagName 
        ? (memo.tags.filter(t => t !== tagName)[0] || '')
        : memo.primaryTag
    })));
  };

  const updateTagName = (tagId, newName) => {
    if (!newName.trim()) return;
    
    const tag = findTagById(tagId);
    if (!tag) return;
    
    const oldName = tag.name;
    
    setMemos(memos.map(memo => ({
      ...memo,
      tags: memo.tags.map(t => t === oldName ? newName.trim() : t),
      primaryTag: memo.primaryTag === oldName ? newName.trim() : memo.primaryTag
    })));
    
    const updateInHierarchy = (tagList) => {
      return tagList.map(t => {
        if (t.id === tagId) {
          return { ...t, name: newName.trim() };
        }
        if (t.children) {
          return { ...t, children: updateInHierarchy(t.children) };
        }
        return t;
      });
    };
    
    setTagHierarchy(updateInHierarchy(tagHierarchy));
    setEditingTagId(null);
    setEditingTagName('');
  };

  const handleDragStart = (tag, from) => {
    setDraggedTag(tag);
    setDraggedFrom(from);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnTag = (targetId) => {
    if (!draggedTag) return;
    
    if (draggedFrom === 'uncategorized') {
      // 미분류에서 계층으로 이동
      const newChild = {
        id: Date.now() + Math.random(),
        name: draggedTag,
        children: []
      };
      
      const addToTarget = (tagList) => {
        return tagList.map(tag => {
          if (tag.id === targetId) {
            return {
              ...tag,
              children: [...(tag.children || []), newChild]
            };
          }
          if (tag.children) {
            return { ...tag, children: addToTarget(tag.children) };
          }
          return tag;
        });
      };
      
      setTagHierarchy(addToTarget(tagHierarchy));
      setUncategorizedTags(uncategorizedTags.filter(t => t !== draggedTag));
    } else {
      // 계층 내에서 이동
      const draggedTagObj = findTagById(draggedFrom);
      if (!draggedTagObj) return;
      
      // 자기 자신이나 자식에게 드롭 방지
      let isDescendant = false;
      const checkDescendant = (tag) => {
        if (tag.id === targetId) {
          isDescendant = true;
          return;
        }
        if (tag.children) {
          tag.children.forEach(child => checkDescendant(child));
        }
      };
      checkDescendant(draggedTagObj);
      
      if (isDescendant || draggedFrom === targetId) return;
      
      // 기존 위치에서 제거
      const removeFromHierarchy = (tagList) => {
        return tagList.filter(t => {
          if (t.id === draggedFrom) return false;
          if (t.children) {
            t.children = removeFromHierarchy(t.children);
          }
          return true;
        });
      };
      
      let tempHierarchy = removeFromHierarchy(tagHierarchy);
      
      // 새 위치에 추가
      const addToTarget = (tagList) => {
        return tagList.map(tag => {
          if (tag.id === targetId) {
            return {
              ...tag,
              children: [...(tag.children || []), draggedTagObj]
            };
          }
          if (tag.children) {
            return { ...tag, children: addToTarget(tag.children) };
          }
          return tag;
        });
      };
      
      setTagHierarchy(addToTarget(tempHierarchy));
    }
    
    setDraggedTag(null);
    setDraggedFrom(null);
  };

  const handleDropOnUncategorized = () => {
    if (!draggedTag || draggedFrom === 'uncategorized') return;
    
    const draggedTagObj = findTagById(draggedFrom);
    if (!draggedTagObj) return;
    
    // 하위 태그가 있으면 이동 불가
    if (draggedTagObj.children && draggedTagObj.children.length > 0) {
      alert('하위 태그가 있는 태그는 미분류로 이동할 수 없습니다.');
      setDraggedTag(null);
      setDraggedFrom(null);
      return;
    }
    
    // 계층에서 제거
    const removeFromHierarchy = (tagList) => {
      return tagList.filter(t => {
        if (t.id === draggedFrom) return false;
        if (t.children) {
          t.children = removeFromHierarchy(t.children);
        }
        return true;
      });
    };
    
    setTagHierarchy(removeFromHierarchy(tagHierarchy));
    setUncategorizedTags([...uncategorizedTags, draggedTagObj.name]);
    setDraggedTag(null);
    setDraggedFrom(null);
  };

const handleSaveMemo = async () => {
  if (!newMemo.title.trim()) return;

  try {
    if (editingMemo !== null) {
      // 메모 수정
      const memo = memos[editingMemo];
      const updatedMemo = await api.updateMemo(memo.id, {
        title: newMemo.title,
        content: newMemo.content,
        tags: newMemo.tags,
        primaryTag: newMemo.primaryTag,
        date: newMemo.date
      });
      
      setMemos(memos.map((m, idx) => 
        idx === editingMemo ? { ...updatedMemo, tags: newMemo.tags } : m
      ));
      setEditingMemo(null);
    } else {
      // 메모 생성
      const createdMemo = await api.createMemo({
        title: newMemo.title,
        content: newMemo.content,
        tags: newMemo.tags,
        primaryTag: newMemo.primaryTag,
        date: newMemo.date
      });
      
      setMemos([...memos, { ...createdMemo, tags: newMemo.tags }]);
    }

    setNewMemo({ 
      title: '', 
      content: '', 
      tags: [], 
      primaryTag: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsAddingMemo(false);
  } catch (err) {
    console.error('메모 저장 실패:', err);
    alert('메모 저장에 실패했습니다.');
  }
};const handleSaveMemo = async () => {
  if (!newMemo.title.trim()) return;

  try {
    if (editingMemo !== null) {
      // 메모 수정
      const memo = memos[editingMemo];
      const updatedMemo = await api.updateMemo(memo.id, {
        title: newMemo.title,
        content: newMemo.content,
        tags: newMemo.tags,
        primaryTag: newMemo.primaryTag,
        date: newMemo.date
      });
      
      setMemos(memos.map((m, idx) => 
        idx === editingMemo ? { ...updatedMemo, tags: newMemo.tags } : m
      ));
      setEditingMemo(null);
    } else {
      // 메모 생성
      const createdMemo = await api.createMemo({
        title: newMemo.title,
        content: newMemo.content,
        tags: newMemo.tags,
        primaryTag: newMemo.primaryTag,
        date: newMemo.date
      });
      
      setMemos([...memos, { ...createdMemo, tags: newMemo.tags }]);
    }

    setNewMemo({ 
      title: '', 
      content: '', 
      tags: [], 
      primaryTag: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsAddingMemo(false);
  } catch (err) {
    console.error('메모 저장 실패:', err);
    alert('메모 저장에 실패했습니다.');
  }
};

  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !newMemo.tags.includes(trimmedTag)) {
      const updatedTags = [...newMemo.tags, trimmedTag];
      setNewMemo({ 
        ...newMemo, 
        tags: updatedTags,
        primaryTag: newMemo.primaryTag || trimmedTag
      });
      
      // 새 태그를 미분류 태그에 추가
      const allTags = getAllTags();
      if (!allTags.includes(trimmedTag)) {
        setUncategorizedTags([...uncategorizedTags, trimmedTag]);
        // 랜덤 색상 할당
        if (!tagColors[trimmedTag]) {
          setTagColors({
            ...tagColors,
            [trimmedTag]: colorOptions[Math.floor(Math.random() * colorOptions.length)].value
          });
        }
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = newMemo.tags.filter(tag => tag !== tagToRemove);
    setNewMemo({ 
      ...newMemo, 
      tags: updatedTags,
      primaryTag: newMemo.primaryTag === tagToRemove ? (updatedTags[0] || '') : newMemo.primaryTag
    });
  };

const handleDeleteMemo = async (index) => {
  const memo = memos[index];
  
  try {
    await api.deleteMemo(memo.id);
    setMemos(memos.filter((_, idx) => idx !== index));
  } catch (err) {
    console.error('메모 삭제 실패:', err);
    alert('메모 삭제에 실패했습니다.');
  }
};

  const handleEditMemo = (index) => {
    setNewMemo(memos[index]);
    setEditingMemo(index);
    setIsAddingMemo(true);
  };

  const getTagColor = (tagName) => {
    // 태그 계층에서 색상 찾기 (상위 태그 색상 상속)
    const findColorWithInheritance = (tagList, parentColor = null) => {
      for (const tag of tagList) {
        if (tag.name === tagName) {
          return tag.color || parentColor;
        }
        if (tag.children) {
          const found = findColorWithInheritance(tag.children, tag.color || parentColor);
          if (found) return found;
        }
      }
      return null;
    };
    
    const hierarchyColor = findColorWithInheritance(tagHierarchy);
    if (hierarchyColor) return hierarchyColor;
    
    // 미분류 태그 색상
    if (tagColors[tagName]) return tagColors[tagName];
    
    // 기본 색상 (해시 기반)
    const colors = [
      'bg-red-200 text-red-800',
      'bg-blue-200 text-blue-800',
      'bg-green-200 text-green-800',
      'bg-purple-200 text-purple-800',
      'bg-pink-200 text-pink-800',
      'bg-indigo-200 text-indigo-800',
      'bg-orange-200 text-orange-800',
      'bg-teal-200 text-teal-800'
    ];
    const hash = tagName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const updateTagColor = (tagId, newColor) => {
    const updateInHierarchy = (tagList) => {
      return tagList.map(t => {
        if (t.id === tagId) {
          // 색상을 업데이트하고, 모든 하위 태그의 색상 제거 (상속받도록)
          const clearChildColors = (children) => {
            return children.map(child => ({
              ...child,
              color: undefined,
              children: child.children ? clearChildColors(child.children) : []
            }));
          };
          
          return { 
            ...t, 
            color: newColor,
            children: t.children ? clearChildColors(t.children) : []
          };
        }
        if (t.children) {
          return { ...t, children: updateInHierarchy(t.children) };
        }
        return t;
      });
    };
    
    setTagHierarchy(updateInHierarchy(tagHierarchy));
    setEditingTagColor(null);
  };

  const updateUncategorizedTagColor = (tagName, newColor) => {
    setTagColors({ ...tagColors, [tagName]: newColor });
    setEditingTagColor(null);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startDayOfWeek, year, month };
  };

  const getMemosForDate = (dateString) => {
    return memos.filter(memo => memo.date === dateString);
  };

  const filteredMemos = getFilteredMemos();
  const allTags = getAllTags();
  const allTagsUsed = getAllTagsUsedInMemos();

  // 메모 작성/수정 화면
  if (isAddingMemo) {
    const renderTagSelector = (tagList, level = 0) => {
      return tagList.map(tag => {
        const isSelected = newMemo.tags.includes(tag.name);
        const hasChildren = tag.children && tag.children.length > 0;
        const isExpanded = expandedTags[tag.id];
        
        return (
          <div key={tag.id} style={{ marginLeft: `${level * 20}px` }}>
            <div className="flex items-center gap-2 mb-1">
              {hasChildren && (
                <button
                  onClick={() => toggleTag(tag.id)}
                  className="p-1"
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
              {!hasChildren && <span className="w-6" />}
              
              <button
                onClick={() => {
                  if (isSelected) {
                    handleRemoveTag(tag.name);
                  } else {
                    handleAddTag(tag.name);
                  }
                }}
                className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag.name}
              </button>
            </div>
            
            {hasChildren && isExpanded && (
              <div className="mt-1">
                {renderTagSelector(tag.children, level + 1)}
              </div>
            )}
          </div>
        );
      });
    };

    return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="max-w-3xl mx-auto p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          {editingMemo !== null ? '메모 수정' : '새 메모'}
        </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
              <input
                type="date"
                value={newMemo.date}
                onChange={(e) => setNewMemo({ ...newMemo, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={newMemo.title}
                onChange={(e) => setNewMemo({ ...newMemo, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                placeholder="내용을 입력하세요"
                value={newMemo.content}
                onChange={(e) => setNewMemo({ ...newMemo, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-48 resize-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
              
              <div className="mb-3 p-3 bg-gray-50 rounded-lg min-h-[60px]">
                <div className="text-xs text-gray-500 mb-2">선택된 태그</div>
                <div className="flex gap-2 flex-wrap">
                  {newMemo.tags.length === 0 ? (
                    <span className="text-sm text-gray-400">선택된 태그가 없습니다</span>
                  ) : (
                    newMemo.tags.map(tag => (
                      <div
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                          newMemo.primaryTag === tag
                            ? 'bg-yellow-400 text-gray-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {newMemo.primaryTag === tag && <Star size={14} fill="currentColor" />}
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-white hover:bg-opacity-30 rounded-full p-0.5"
                        >
                          <X size={14} />
                        </button>
                        {newMemo.primaryTag !== tag && newMemo.tags.length > 1 && (
                          <button
                            onClick={() => setNewMemo({ ...newMemo, primaryTag: tag })}
                            className="hover:bg-white hover:bg-opacity-30 rounded-full p-0.5"
                            title="대표 태그로 설정"
                          >
                            <Star size={14} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mb-3 p-3 border-2 border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                <div className="text-xs text-gray-500 mb-2">기존 태그에서 선택</div>
                {tagHierarchy.length === 0 && uncategorizedTags.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-4">
                    등록된 태그가 없습니다
                  </div>
                ) : (
                  <>
                    {renderTagSelector(tagHierarchy)}
                    {uncategorizedTags.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500 mb-2">미분류 태그</div>
                        <div className="space-y-1">
                          {uncategorizedTags.map(tag => {
                            const isSelected = newMemo.tags.includes(tag);
                            return (
                              <button
                                key={tag}
                                onClick={() => {
                                  if (isSelected) {
                                    handleRemoveTag(tag);
                                  } else {
                                    handleAddTag(tag);
                                  }
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-2">또는 새 태그 직접 입력</div>
                <input
                  type="text"
                  placeholder="태그 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveMemo}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                {editingMemo !== null ? '수정 완료' : '저장하기'}
              </button>
              <button
                onClick={() => {
                  setIsAddingMemo(false);
                  setEditingMemo(null);
                  setNewMemo({ 
                    title: '', 
                    content: '', 
                    tags: [], 
                    primaryTag: '',
                    date: new Date().toISOString().split('T')[0]
                  });
                  setExpandedTags({});
                }}
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 홈 페이지
  const renderHomePage = () => (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-6 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="제목이나 태그로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {filteredMemos.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          {searchQuery ? '검색 결과가 없습니다.' : '메모가 없습니다. 아래 + 버튼을 눌러 메모를 추가해보세요!'}
        </div>
      ) : (
        filteredMemos.map((memo, index) => (
          <div
            key={memo.id || index}
            onClick={() => handleEditMemo(memos.indexOf(memo))}
            className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800">{memo.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMemo(memos.indexOf(memo));
                }}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar size={14} />
              <span>{memo.date}</span>
            </div>

            {memo.content && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {memo.content}
              </p>
            )}

            <div className="flex gap-2 flex-wrap">
              {memo.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    memo.primaryTag === tag
                      ? 'bg-yellow-400 text-gray-800 font-medium'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {memo.primaryTag === tag && <Star size={12} fill="currentColor" />}
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );

// 태그 트리 렌더링
const renderTagTree = (tagList, level = 0) => {
  return tagList.map(tag => {
    const isExpanded = expandedTags[tag.id];
    const hasChildren = tag.children && tag.children.length > 0;
    const tagMemoCount = memos.filter(m => m.tags.includes(tag.name)).length;
    const isSelected = selectedTags.includes(tag.name);
    
    return (
      <div key={tag.id} style={{ marginLeft: `${level * 24}px` }}>
        <div
          onClick={() => toggleTagSelection(tag.name)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
            isSelected
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTag(tag.id);
                }}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            {!hasChildren && <span className="w-6" />}
            <Tag size={16} />
            <span>{tag.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>({tagMemoCount})</span>
            {isSelected && (
              <span className="text-xs bg-white bg-opacity-30 px-2 py-0.5 rounded">✓</span>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {renderTagTree(tag.children, level + 1)}
          </div>
        )}
      </div>
    );
  });
};

  // 태그 페이지
// 태그 페이지
const renderTagsPage = () => (
  <div>
    <div className="bg-white rounded-xl p-4 sm:p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">태그 계층</h2>
        {selectedTags.length > 0 && (
          <button
            onClick={clearTagSelection}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition flex items-center gap-1"
          >
            <X size={14} />
            초기화 ({selectedTags.length})
          </button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
          <div className="text-xs text-indigo-700 mb-2 font-medium">선택된 태그 (AND 조건)</div>
          <div className="flex gap-2 flex-wrap">
            {selectedTags.map(tag => (
              <div
                key={tag}
                className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm flex items-center gap-2"
              >
                <span>{tag}</span>
                <button
                  onClick={() => toggleTagSelection(tag)}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <button
          onClick={() => {
            setSelectedTag('all');
            setSelectedTags([]);
          }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition ${
            selectedTag === 'all' && selectedTags.length === 0
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Home size={20} />
            <span>전체 메모</span>
          </div>
          <span>({memos.length})</span>
        </button>

        {renderTagTree(tagHierarchy)}

        {uncategorizedTags.length > 0 && (
          <div className="mt-4 pt-4 border-t-2 border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-2 px-2">미분류 태그</div>
            <div className="space-y-1">
              {uncategorizedTags.map(tag => {
                const tagMemoCount = memos.filter(m => m.tags.includes(tag)).length;
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTagSelection(tag)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition ${
                      isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-yellow-50 text-gray-700 hover:bg-yellow-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Tag size={16} />
                      <span>{tag}</span>
                    </div>
                    <span>({tagMemoCount})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="space-y-3">
      {filteredMemos.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">
          {selectedTags.length > 0 
            ? '선택된 태그를 모두 포함하는 메모가 없습니다.' 
            : '해당 태그의 메모가 없습니다.'}
        </div>
      ) : (
        filteredMemos.map((memo, index) => (
          <div
            key={memo.id || index}
            onClick={() => handleEditMemo(memos.indexOf(memo))}
            className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800">{memo.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMemo(memos.indexOf(memo));
                }}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar size={14} />
              <span>{memo.date}</span>
            </div>

            {memo.content && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {memo.content}
              </p>
            )}

            <div className="flex gap-2 flex-wrap">
              {memo.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    memo.primaryTag === tag
                      ? 'bg-yellow-400 text-gray-800 font-medium'
                      : selectedTags.includes(tag)
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {memo.primaryTag === tag && <Star size={12} fill="currentColor" />}
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

  // 태그 관리 트리 렌더링 (드래그 앤 드롭)
  const renderManageTagTree = (tagList, level = 0, parentColor = null) => {
    return tagList.map(tag => {
      const isExpanded = expandedTags[tag.id];
      const hasChildren = tag.children && tag.children.length > 0;
      const tagMemoCount = memos.filter(m => m.tags.includes(tag.name)).length;
      const isEditing = editingTagId === tag.id;
      const isEditingColor = editingTagColor === tag.id;
      const effectiveColor = tag.color || parentColor || 'bg-gray-50 text-gray-800';
      
      return (
        <div key={tag.id} style={{ marginLeft: `${level * 24}px` }} className="mb-2">
          <div 
            className={`p-3 rounded-lg border-2 transition ${
              draggedFrom === tag.id ? 'border-indigo-400 opacity-50' : 'border-gray-200'
            } ${effectiveColor}`}
            onDragOver={handleDragOver}
            onDrop={() => handleDropOnTag(tag.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                <button
                  draggable
                  onDragStart={() => handleDragStart(tag.name, tag.id)}
                  className="cursor-move p-1 hover:bg-white hover:bg-opacity-30 rounded"
                >
                  <Grip size={16} />
                </button>

                {hasChildren && (
                  <button onClick={() => toggleTag(tag.id)}>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                )}
                {!hasChildren && <span className="w-4" />}
                
                {isEditing ? (
                  <input
                    type="text"
                    value={editingTagName}
                    onChange={(e) => setEditingTagName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') updateTagName(tag.id, editingTagName);
                    }}
                    onBlur={() => updateTagName(tag.id, editingTagName)}
                    className="flex-1 px-2 py-1 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                ) : (
                  <span className="font-medium">{tag.name}</span>
                )}
                
                <span className="text-sm opacity-75">({tagMemoCount}개)</span>
                {!tag.color && level > 0 && (
                  <span className="text-xs opacity-60">← 상위 색상</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <>
                    <button
                      onClick={() => setEditingTagColor(tag.id)}
                      className="px-2 py-1 bg-white bg-opacity-50 hover:bg-opacity-100 rounded text-sm font-medium"
                      title="색상 변경"
                    >
                      🎨
                    </button>
                    <button
                      onClick={() => {
                        setEditingTagId(tag.id);
                        setEditingTagName(tag.name);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      수정
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setSelectedParentTag(tag.id);
                    setNewTagName('');
                  }}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  하위추가
                </button>
                <button
                  onClick={() => deleteTagRecursive(tag.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  삭제
                </button>
              </div>
            </div>

            {isEditingColor && (
              <div className="mt-2 p-2 bg-white bg-opacity-70 rounded-lg">
                <div className="text-xs font-medium mb-2">
                  색상 선택 {level > 0 && '(하위 태그들도 이 색상을 따라갑니다)'}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateTagColor(tag.id, color.value)}
                      className={`w-8 h-8 rounded-lg ${color.value} border-2 ${
                        effectiveColor === color.value ? 'border-gray-800' : 'border-gray-300'
                      } hover:scale-110 transition`}
                      title={color.name}
                    />
                  ))}
                  <button
                    onClick={() => setEditingTagColor(null)}
                    className="ml-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
            
            {selectedParentTag === tag.id && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="하위 태그 이름"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addChildTag(tag.id)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  autoFocus
                />
                <button
                  onClick={() => addChildTag(tag.id)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  추가
                </button>
                <button
                  onClick={() => {
                    setSelectedParentTag(null);
                    setNewTagName('');
                  }}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                >
                  취소
                </button>
              </div>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className="mt-2">
              {renderManageTagTree(tag.children, level + 1, effectiveColor)}
            </div>
          )}
        </div>
      );
    });
  };

  // 태그 관리 페이지
  const renderTagManagementPage = () => {
    if (isManagingTags) {
      return (
        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">태그 계층 관리</h2>
            <button
              onClick={() => {
                setIsManagingTags(false);
                setExpandedTags({});
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
            >
              완료
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Grip size={20} className="text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 mb-1">드래그 앤 드롭으로 태그 정리</p>
                <p className="text-xs text-blue-700">
                  • 왼쪽 그립 아이콘을 드래그하여 다른 태그 위에 드롭하면 하위 태그로 이동<br/>
                  • 미분류 영역으로 드래그하면 미분류 태그로 이동
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">새 최상위 태그 추가</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="태그 이름"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTopLevelTag();
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addTopLevelTag}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                추가
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">태그 계층</h3>
            <div className="space-y-2">
              {renderManageTagTree(tagHierarchy)}
            </div>
          </div>

          {uncategorizedTags.length > 0 && (
            <div 
              className="p-4 border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={handleDropOnUncategorized}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Tag size={20} />
                  미분류 태그
                </h3>
                <span className="text-sm text-gray-500">{uncategorizedTags.length}개</span>
              </div>
              
              <div className="space-y-2">
                {uncategorizedTags.map(tag => {
                  const tagMemoCount = memos.filter(m => m.tags.includes(tag)).length;
                  const isEditingColor = editingTagColor === `uncategorized-${tag}`;
                  const tagColor = tagColors[tag] || getTagColor(tag);
                  
                  return (
                    <div key={tag}>
                      <div
                        draggable
                        onDragStart={() => handleDragStart(tag, 'uncategorized')}
                        className={`p-3 rounded-lg border border-gray-200 flex items-center justify-between cursor-move hover:shadow-md transition ${
                          draggedTag === tag ? 'opacity-50' : ''
                        } ${tagColor}`}
                      >
                        <div className="flex items-center gap-2">
                          <Grip size={16} />
                          <span className="font-medium">{tag}</span>
                          <span className="text-sm opacity-75">({tagMemoCount}개)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingTagColor(`uncategorized-${tag}`)}
                            className="px-2 py-1 bg-white bg-opacity-50 hover:bg-opacity-100 rounded text-sm font-medium"
                            title="색상 변경"
                          >
                            🎨
                          </button>
                          <button
                            onClick={() => deleteUncategorizedTag(tag)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                      
                      {isEditingColor && (
                        <div className="mt-2 p-2 bg-white rounded-lg">
                          <div className="text-xs font-medium mb-2">색상 선택</div>
                          <div className="flex gap-2 flex-wrap">
                            {colorOptions.map(color => (
                              <button
                                key={color.value}
                                onClick={() => updateUncategorizedTagColor(tag, color.value)}
                                className={`w-8 h-8 rounded-lg ${color.value} border-2 ${
                                  tagColor === color.value ? 'border-gray-800' : 'border-gray-300'
                                } hover:scale-110 transition`}
                                title={color.name}
                              />
                            ))}
                            <button
                              onClick={() => setEditingTagColor(null)}
                              className="ml-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-3 text-xs text-gray-600 text-center">
                👆 태그를 드래그하여 위의 태그 계층으로 이동하세요
              </div>
            </div>
          )}
        </div>
      );
    }

    const tagStats = allTagsUsed.map(tag => ({
      name: tag,
      count: memos.filter(m => m.tags.includes(tag)).length,
      primaryCount: memos.filter(m => m.primaryTag === tag).length
    }));

    return (
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">태그 통계</h2>
          <button
            onClick={() => setIsManagingTags(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Settings size={18} />
            태그 계층 관리
          </button>
        </div>
        
        {tagStats.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            등록된 태그가 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {tagStats.map(tag => (
              <div
                key={tag.name}
                className={`p-4 rounded-lg border-2 ${getTagColor(tag.name)} border-opacity-50`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{tag.name}</h3>
                    <div className="text-sm opacity-75">
                      총 {tag.count}개 메모 · 대표 태그 {tag.primaryCount}개
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTag(tag.name);
                      setCurrentPage('tags');
                    }}
                    className="px-4 py-2 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-lg font-medium transition"
                  >
                    보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 달력 페이지
  const renderCalendarPage = () => {
    const { daysInMonth, startDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];
    
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayMemos = getMemosForDate(dateString);
      const primaryTags = dayMemos.map(m => m.primaryTag).filter(Boolean);
      const today = new Date();
      const isToday = dateString === today.toISOString().split('T')[0];
      
      days.push(
        <div
          key={day}
          className={`min-h-[120px] border-2 p-3 hover:bg-indigo-50 transition cursor-pointer rounded-lg ${
            isToday ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
          }`}
        >
          <div className={`font-bold mb-2 text-lg ${
            isToday ? 'text-indigo-600' : 'text-gray-700'
          }`}>
            {day}
          </div>
          <div className="space-y-1.5">
            {primaryTags.slice(0, 4).map((tag, idx) => (
              <div
                key={idx}
                className={`text-xs px-2 py-1 rounded-md font-medium ${getTagColor(tag)} truncate shadow-sm`}
              >
                {tag}
              </div>
            ))}
            {primaryTags.length > 4 && (
              <div className="text-xs text-gray-600 font-medium px-2 py-1 bg-gray-100 rounded-md text-center">
                +{primaryTags.length - 4}개 더보기
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {year}년 {month + 1}월
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(year, month - 1))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              이전
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium transition"
            >
              오늘
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(year, month + 1))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              다음
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <div 
              key={day} 
              className={`text-center font-bold text-gray-700 py-3 ${
                idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : ''
              }`}
            >
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
          <Tag className="text-indigo-600" size={28} />
          태그 메모장
        </h1>
      </div>

        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'tags' && renderTagsPage()}
        {currentPage === 'manage' && renderTagManagementPage()}
        {currentPage === 'calendar' && renderCalendarPage()}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
  <div className="max-w-6xl mx-auto flex justify-around py-2 sm:py-3">
    <button
      onClick={() => setCurrentPage('home')}
      className={`flex flex-col items-center gap-0.5 sm:gap-1 px-3 sm:px-6 py-2 rounded-lg transition ${
        currentPage === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'
      }`}
    >
      <Home size={20} className="sm:w-6 sm:h-6" />
      <span className="text-[10px] sm:text-xs font-medium">홈</span>
    </button>
            <button
              onClick={() => setCurrentPage('tags')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition ${
                currentPage === 'tags' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'
              }`}
            >
              <Tag size={24} />
              <span className="text-xs font-medium">태그</span>
            </button>
            <button
              onClick={() => setCurrentPage('manage')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition ${
                currentPage === 'manage' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'
              }`}
            >
              <Settings size={24} />
              <span className="text-xs font-medium">관리</span>
            </button>
            <button
              onClick={() => setCurrentPage('calendar')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition ${
                currentPage === 'calendar' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'
              }`}
            >
              <Calendar size={24} />
              <span className="text-xs font-medium">달력</span>
            </button>
          </div>
        </div>

        <button
  onClick={() => setIsAddingMemo(true)}
  className="fixed bottom-16 sm:bottom-20 right-4 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition flex items-center justify-center hover:scale-110 active:scale-95 z-40"
>
  <Plus size={24} className="sm:w-7 sm:h-7" />
</button>
      </div>
    </div>
  );
}

