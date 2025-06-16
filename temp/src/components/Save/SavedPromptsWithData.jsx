"use client";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IphoneXBarsStatus } from "./IphoneXBarsStatus";
import icon from "./icon.svg";
import "./saved-styles.css";

function SavedPromptsWithDrag() {
  const navigate = useNavigate();
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIntervalRef = useRef(null);

  const [savedPrompts, setSavedPrompts] = useState([
    {
      id: 11,
      title: "강의자료 요약",
      description: "긴 강의 내용을 핵심 포인트 중심으로 체계적으로 요약하는 프롬프트입니다. 학습 효율성을 높이고 중요한 개념을 놓치지 않도록 도와줍니다.",
      savedAt: new Date('2025-01-15T10:30:00')
    },
    {
      id: 1,
      title: "팩트체크 요청 프롬프트",
      description: "정보의 정확성을 검증하고 신뢰할 수 있는 출처를 확인하는 프롬프트입니다. 거짓 정보와 사실을 구분하는데 도움을 줍니다.",
      savedAt: new Date('2025-01-14T14:20:00')
    },
    {
      id: 13,
      title: "과제 리포트 구조화",
      description: "과제나 리포트 작성을 위해 수집한 자료를 체계적으로 구조화하는 프롬프트입니다. 논리적이고 설득력 있는 글쓰기에 도움이 됩니다.",
      savedAt: new Date('2025-01-13T16:45:00')
    },
    {
      id: 2,
      title: "신뢰도 평가 프롬프트",
      description: "소스의 신뢰도를 분석하고 정보의 질을 평가하는 프롬프트입니다. 미디어 리터러시 향상에 기여합니다.",
      savedAt: new Date('2025-01-12T09:15:00')
    },
    {
      id: 12,
      title: "시험대비 자료 정리",
      description: "시험 범위에 맞춰 중요한 개념과 키워드를 정리하는 프롬프트입니다. 효율적인 시험 준비를 위한 체계적 접근법을 제공합니다.",
      savedAt: new Date('2025-01-11T13:30:00')
    }
  ]);

  const handleProfileClick = () => {
    console.log('프로필 버튼 클릭됨!');
    navigate('/profile');
  };

  const handleRemovePrompt = (promptTitle) => {
    if (window.confirm('저장된 프롬프트를 삭제하시겠습니까?')) {
      setSavedPrompts(prev => prev.filter(prompt => prompt.title !== promptTitle));
      console.log(`${promptTitle} 삭제됨`);
    }
  };

  const handlePromptClick = (promptId) => {
    navigate(`/prompt/${promptId}`);
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    handleAutoScroll(e);
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDragOverItem(index);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) {
      return;
    }

    const newPrompts = [...savedPrompts];
    const draggedPrompt = newPrompts[draggedItem];
    
    newPrompts.splice(draggedItem, 1);
    
    const adjustedDropIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
    newPrompts.splice(adjustedDropIndex, 0, draggedPrompt);
    
    setSavedPrompts(newPrompts);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleAutoScroll = (e) => {
    const container = document.querySelector('.main-content-saved');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const mouseY = e.clientY;
    const scrollThreshold = 50;
    const scrollSpeed = 20;
    
    if (mouseY - containerRect.top < scrollThreshold && container.scrollTop > 0) {
      container.scrollTop -= scrollSpeed;
    }
    else if (containerRect.bottom - mouseY < scrollThreshold) {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (container.scrollTop < maxScroll) {
        container.scrollTop += scrollSpeed;
      }
    }
  };

  return (
    <div className="saved-page-wrapper">
      <div className="saved-container">
        <IphoneXBarsStatus />

        <div className="header-actions">
          <button className="direct-write-btn">
            + 직접 작성
          </button>
          <button className="sort-btn">
            <img src={icon} alt="Sort" className="sort-icon" />
          </button>
        </div>

        <main className="main-content-saved">
          <h1 className="page-title">프롬프트 보관함</h1>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="검색"
                className="search-input"
              />
            </div>
          </div>

          <div className="prompt-card-list" style={{ maxWidth: '360px', margin: '0 auto' }}>
            {savedPrompts.map((prompt, index) => (
              <article 
                key={prompt.id} 
                className="prompt-card"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => handlePromptClick(prompt.id)}
                style={{ 
                  cursor: 'grab',
                  transition: 'all 0.2s ease',
                  transform: dragOverItem === index && draggedItem !== index 
                    ? 'translateY(-4px)' 
                    : 'translateY(0)',
                  boxShadow: dragOverItem === index && draggedItem !== index 
                    ? '0 8px 25px rgba(0, 0, 0, 0.15)' 
                    : '0 1px 3px rgba(0, 0, 0, 0.05)',
                  borderColor: dragOverItem === index && draggedItem !== index 
                    ? '#3b82f6' 
                    : '#e2e8f0',
                  backgroundColor: draggedItem === index ? '#f8fafc' : '#ffffff',
                  padding: '16px',
                  marginBottom: '10px',
                  height: '160px'
                }}
                onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
              >
                <div className="prompt-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="prompt-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 className="prompt-title" style={{ flex: 1, marginRight: '8px' }}>{prompt.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '2px',
                          padding: '4px',
                          borderRadius: '4px',
                          cursor: 'grab',
                          opacity: '0.6',
                          transition: 'opacity 0.2s ease',
                          alignSelf: 'flex-start',
                          marginTop: '2px'
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '1'}
                        onMouseOut={(e) => e.target.style.opacity = '0.6'}
                      >
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <div style={{ width: '3px', height: '3px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></div>
                          <div style={{ width: '3px', height: '3px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></div>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <div style={{ width: '3px', height: '3px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></div>
                          <div style={{ width: '3px', height: '3px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></div>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <div style={{ width: '3px', height: '3px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></div>
                          <div style={{ width: '3px', height: '3px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></div>
                        </div>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePrompt(prompt.title);
                        }}
                        title="저장 해제"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#94a3b8',
                          padding: '4px',
                          borderRadius: '4px',
                          transition: 'color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#ef4444'}
                        onMouseOut={(e) => e.target.style.color = '#94a3b8'}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="prompt-description" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.4',
                    flex: '1'
                  }}>{prompt.description}</p>
                  <div className="prompt-meta" style={{ marginTop: '4px', marginBottom: '4px' }}>
                    <span 
                      className="saved-date"
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        fontWeight: '400'
                      }}
                    >
                      저장일: {prompt.savedAt.getMonth() + 1}월 {prompt.savedAt.getDate()}일
                    </span>
                  </div>
                  <button 
                    className="read-more-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePromptClick(prompt.id);
                    }}
                    style={{ marginTop: 'auto' }}
                  >
                    <span>Read more</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>

        <footer className="bottom-nav-saved">
          <Link to="/" className="nav-item">
            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </Link>
          <Link to="/search" className="nav-item">
            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </Link>
          <Link to="/savedwithdata" className="nav-item active">
            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>
          <div className="nav-item" onClick={handleProfileClick}>
            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SavedPromptsWithDrag;