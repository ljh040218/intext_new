import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StudyPromptsViewer.module.css';
import IphoneXBarsStatus from "./IphoneXBarsStatus.jsx";
import { promptsData } from './promptsData.js';

const StudyPromptsViewer = () => {
  const { id } = useParams(); 
  const [activeAI, setActiveAI] = React.useState('chatgpt');

  // URL 파라미터에서 프롬프트 데이터 가져오기
  const getCurrentPrompt = (urlId) => {
    // 먼저 직접 ID로 찾기 (숫자 ID들: 1, 2, 3, 11, 12, 13, 14 등)
    if (promptsData[urlId]) {
      return promptsData[urlId];
    }
    
    // URL 파라미터 매핑 (문자열 ID들)
    const mapping = {
      'lecture': 'lecture',
      'exam': 'exam', 
      'paper': 'paper',
      'report': 'report',
      'summary': 'lecture', // 요약 관련은 강의자료 요약으로
      'study': 'exam', // 학습 관련은 시험대비로
      'fact-check': '1', // 팩트체크
      'reliability': '2', // 신뢰도 평가
      'verification': '3', // 정보 검증
      'fact-verification': '4', // 사실 여부 확인
      'source-check': '5' // 출처 확인
    };
    
    const mappedKey = mapping[urlId];
    return promptsData[mappedKey] || promptsData['lecture']; // 기본값
  };

  const currentPrompt = getCurrentPrompt(id);

  // 디버깅을 위한 콘솔 로그 (개발시에만 사용)
  console.log('URL ID:', id);
  console.log('Current Prompt:', currentPrompt);

  const currentContent = currentPrompt[activeAI];

  const copyToClipboard = () => {
    if (currentContent && currentContent.content) {
      navigator.clipboard.writeText(currentContent.content).then(() => {
        alert('프롬프트가 클립보드에 복사되었습니다!');
      }).catch(err => {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다.');
      });
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  // 프롬프트가 없는 경우 에러 처리
  if (!currentPrompt) {
    return (
      <div className={styles.container}>
        <IphoneXBarsStatus />
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className={styles.title}>프롬프트를 찾을 수 없습니다</h1>
        </div>
        <div className={styles.contentArea}>
          <div className={styles.promptContent}>
            요청하신 프롬프트를 찾을 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <IphoneXBarsStatus />
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className={styles.title}>{currentPrompt.title}</h1>
        <button className={styles.saveButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>저장하기</span>
        </button>
      </div>

      <div className={styles.promptSelector}>
        <div className={styles.aiToggle}>
          <button 
            className={`${styles.aiBtn} ${activeAI === 'chatgpt' ? styles.active : ''}`}
            onClick={() => setActiveAI('chatgpt')}
          >
            ChatGPT
          </button>
          <button 
            className={`${styles.aiBtn} ${activeAI === 'claude' ? styles.active : ''}`}
            onClick={() => setActiveAI('claude')}
          >
            Claude
          </button>
        </div>
      </div>
      
      <div className={styles.contentArea}>
        <div className={styles.promptContent}>
          {currentContent?.content || '프롬프트 내용을 불러올 수 없습니다.'}
        </div>
      </div>
      
      <button className={styles.copyButton} onClick={copyToClipboard}>
        복사하기
      </button>
    </div>
  );
};

export default StudyPromptsViewer;