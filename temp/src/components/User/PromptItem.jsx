import React from 'react';

function PromptItem({ title, isSelected = false, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    console.log(`${title} 프롬프트 클릭됨`);
  };

  return (
    <div 
      style={{
        backgroundColor: '#ffffff',
        border: `1px solid ${isSelected ? '#2388ff' : '#e3e6ea'}`,
        borderRadius: '8px',
        padding: '12px 16px',
        minHeight: '42px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isSelected ? '0 1px 3px rgba(35, 136, 255, 0.1)' : 'none',
        animation: isSelected ? 'activeEffect 1s ease-out' : 'none'
      }}
      onClick={handleClick}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%'
      }}>
        <div style={{
          width: '14px',
          height: '14px',
          border: `1px solid ${isSelected ? '#2388ff' : '#d1d5db'}`,
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          backgroundColor: isSelected ? '#2388ff' : 'transparent'
        }}>
          {isSelected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span style={{
          fontSize: '17px',
          fontWeight: '400',
          color: '#2a323c',
          flex: 1
        }}>
          {title}
        </span>
      </div>
    </div>
  );
}

export default PromptItem;