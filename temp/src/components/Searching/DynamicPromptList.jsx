"use client";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./InputDesign.module.css";
import StatusBar from "./StatusBar";
import SearchBar from "./SearchBar";
import ContentCard from "./ContentCard"; 
import chipIcon from "./chip.svg";

function DynamicPromptList() {
  const { subcategoryName } = useParams();
  const [sortOrder, setSortOrder] = useState('latest'); 

  // 세부카테고리별 데이터 매핑
  const subcategoryData = {
    'summary': {
      title: '요약 & 정리',
      prompts: [
        {
          id: 11,
          title: "강의자료 요약",
          description: "긴 강의 내용을 핵심 포인트 중심으로 체계적으로 요약하는 프롬프트입니다.",
          date: new Date('2025-01-05')
        },
        {
          id: 12,
          title: "시험대비 자료 정리",
          description: "시험 범위에 맞춰 중요한 개념과 키워드를 정리하는 프롬프트입니다.",
          date: new Date('2025-01-12')
        },
        {
          id: 13,
          title: "과제 리포트 구조화",
          description: "과제나 리포트 작성을 위해 수집한 자료를 체계적으로 구조화하는 프롬프트입니다.",
          date: new Date('2025-01-25')
        },
        {
          id: 14,
          title: "학술 논문 정리",
          description: "학술 논문의 핵심 내용과 연구 결과를 간결하게 정리하는 프롬프트입니다.",
          date: new Date('2025-01-20')
        },
      ]
    },
    'misinformation-prevention': {
      title: '거짓정보 방지',
      prompts: [
        {
          id: 1,
          title: "팩트체크 요청 프롬프트",
          description: "정보의 정확성을 검증하고 신뢰할 수 있는 출처를 확인하는 프롬프트입니다.",
          date: new Date('2024-01-01')
        },
        {
          id: 2,
          title: "신뢰도 평가 프롬프트", 
          description: "소스의 신뢰도를 분석하고 정보의 질을 평가하는 프롬프트입니다.",
          date: new Date('2024-01-15')
        },
        {
          id: 3,
          title: "정보 검증 체크리스트",
          description: "체계적인 정보 검증을 위한 단계별 체크리스트 프롬프트입니다.",
          date: new Date('2024-02-01')
        }
      ]
    },
    'fact-checking': {
      title: '사실 확인',
      prompts: [
        {
          id: 4,
          title: "사실 여부 확인 프롬프트",
          description: "주장의 사실 여부를 체계적으로 확인하는 프롬프트입니다.",
          date: new Date('2024-01-10')
        },
        {
          id: 5,
          title: "출처 확인 프롬프트",
          description: "정보의 원본 출처를 찾고 검증하는 프롬프트입니다.",
          date: new Date('2024-01-20')
        }
      ]
    },
    'document-writing': {
      title: '문서 작성',
      prompts: [
        {
          id: 6,
          title: "기획서 작성 프롬프트",
          description: "체계적이고 설득력 있는 기획서를 작성하는 프롬프트입니다.",
          date: new Date('2024-02-05')
        },
        {
          id: 7,
          title: "보고서 템플릿 프롬프트",
          description: "효과적인 보고서 구조와 내용을 작성하는 프롬프트입니다.",
          date: new Date('2024-02-10')
        },
        {
          id: 8,
          title: "제안서 작성 프롬프트",
          description: "클라이언트를 설득하는 제안서를 작성하는 프롬프트입니다.",
          date: new Date('2024-02-15')
        }
      ]
    },
    'content-writing': {
      title: '콘텐츠 작성',
      prompts: [
        {
          id: 9,
          title: "블로그 포스트 작성",
          description: "독자의 관심을 끄는 매력적인 블로그 글을 작성하는 프롬프트입니다.",
          date: new Date('2024-01-05')
        },
        {
          id: 10,
          title: "기사 작성 프롬프트",
          description: "뉴스 기사 스타일의 정확하고 객관적인 글을 작성하는 프롬프트입니다.",
          date: new Date('2024-01-12')
        }
      ]
    },
    'translation': {
      title: '번역 & 언어',
      prompts: [
        {
          id: 15,
          title: "자연스러운 번역",
          description: "맥락을 고려한 자연스러운 번역을 위한 프롬프트입니다.",
          date: new Date('2024-03-01')
        },
        {
          id: 16,
          title: "언어 학습 도우미",
          description: "외국어 학습을 효과적으로 지원하는 프롬프트입니다.",
          date: new Date('2024-03-10')
        }
      ]
    },
    'research': {
      title: '자료 검색',
      prompts: [
        {
          id: 17,
          title: "정보 수집 전략",
          description: "효과적인 정보 수집을 위한 체계적 접근 프롬프트입니다.",
          date: new Date('2024-04-01')
        },
        {
          id: 18,
          title: "리서치 보고서 작성",
          description: "수집한 정보를 체계적으로 정리하는 프롬프트입니다.",
          date: new Date('2024-04-15')
        }
      ]
    },
    'data-analysis': {
      title: '데이터 분석',
      prompts: [
        {
          id: 19,
          title: "통계 데이터 해석",
          description: "복잡한 통계 데이터를 이해하기 쉽게 해석하는 프롬프트입니다.",
          date: new Date('2024-05-01')
        },
        {
          id: 20,
          title: "인사이트 도출",
          description: "데이터에서 의미 있는 인사이트를 찾아내는 프롬프트입니다.",
          date: new Date('2024-05-15')
        }
      ]
    }
  };

  const currentData = subcategoryData[subcategoryName] || {
    title: '프롬프트 목록',
    prompts: []
  };

  // 정렬된 컨텐츠
  const sortedItems = [...currentData.prompts].sort((a, b) => {
    if (sortOrder === 'latest') {
      return b.date - a.date; // 최신순
    } else {
      return a.date - b.date; // 오래된순
    }
  });

  const handleSort = () => {
    setSortOrder(prev => prev === 'latest' ? 'oldest' : 'latest');
  };

  return (
    <div className={styles.inputDesignPageWrapper}>
      <div className={styles.inputDesignContainer}>
        <StatusBar time="9:41" showBackButton={true} />

        <main className={styles.inputDesignMain}>
          <div className={styles.inputDesignTitleSection}>
            <h1 className={styles.inputDesignMainTitle}>{currentData.title}</h1>
            <div className={styles.inputDesignFloatingChip} onClick={handleSort}>
              <img src={chipIcon} alt="정렬" />
            </div>
          </div>
          
          <SearchBar placeholder="검색" />

          <section className={styles.inputDesignContentList}>
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <ContentCard
                  key={item.id}
                  itemId={item.id}
                  title={item.title}
                  description={item.description}
                  readMoreText="Read more"
                  onArrowClick={() => console.log(`${item.title} 클릭됨`)}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>아직 프롬프트가 없습니다.</p>
              </div>
            )}
          </section>
        </main>

        <footer className={styles.inputDesignBottomNavigation}>
          <Link to="/" className={styles.inputDesignNavItem} >
            <svg className={styles.inputDesignNavIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </Link>
          <Link to="/search" className={`${styles.inputDesignNavItem} ${styles.active}`}>
            <svg className={styles.inputDesignNavIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </Link>
          <Link to="/saved" className={styles.inputDesignNavItem}>
            <svg className={styles.inputDesignNavIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>
          <Link to="/profile" className={styles.inputDesignNavItem}>
            <svg className={styles.inputDesignNavIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default DynamicPromptList;