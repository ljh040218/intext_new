// PromptList.jsx - CSS 클래스 의존성을 제거하고 인라인 스타일 사용
import React, { useState } from 'react';
import PromptItem from './PromptItem';

function PromptList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const prompts = [
    { id: 1, title: 'React 컴포넌트 구조 검토', content: 'React 컴포넌트의 구조를 검토하고 개선점을 제안해주세요...' },
    { id: 2, title: '중복 함수 리팩토링 요청', content: '코드에서 중복되는 함수들을 찾아 리팩토링해주세요...' },
    { id: 3, title: '최신 LLM 성능 비교 정리', content: '최신 대형 언어 모델들의 성능을 비교 분석해주세요...' },
    { id: 4, title: '사이버펑크 도시 이미지 생성', content: '네온 불빛이 가득한 사이버펑크 스타일의 도시 이미지를 생성해주세요...' },
    { id: 5, title: '[주제] 최신 기술 동향 조사', content: '최신 기술 동향에 대해 조사하고 정리해주세요...' }
  ];

  const handleItemClick = (itemId) => {
    const selectedPrompt = prompts.find(prompt => prompt.id === itemId);
    
    if (selectedPrompt) {
      // 먼저 선택 상태 표시
      setSelectedItem(itemId);
      
      // 클립보드에 복사
      navigator.clipboard.writeText(selectedPrompt.content)
        .then(() => {
          // 커스텀 토스트 알림 표시
          setTimeout(() => {
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }, 300);
          
          setTimeout(() => {
            setSelectedItem(null);
          }, 900);
        })
        .catch(err => {
          console.error('복사 실패:', err);
          // 실패 시에도 선택 상태 해제
          setSelectedItem(null);
        });
    }
  };

  return (
    <>
      {/* prompt-list 클래스 대신 인라인 스타일 사용 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {prompts.map((prompt) => (
          <PromptItem
            key={prompt.id}
            title={prompt.title}
            isSelected={selectedItem === prompt.id}
            onClick={() => handleItemClick(prompt.id)}
          />
        ))}
      </div>
      
      {/* 커스텀 토스트 알림 - 클래스 의존성 제거 */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#3182f6',
            color: 'white',
            padding: '18px 32px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '200px',
            textAlign: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            복사되었습니다!
          </div>
        </div>
      )}
    </>
  );
}

export default PromptList;