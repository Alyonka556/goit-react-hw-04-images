import React, { useEffect } from 'react';
import { CloseButton, ModalContent, ModalWrapper } from './Modal.styled.js';

export const Modal = ({ onClose, url }) => {
  useEffect(() => {
    const handleKeyDownEvent = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <ModalWrapper onClick={handleBackdropClick}>
      <ModalContent>
        <img
          src={url}
          alt="preview img"
          onError={e => {
            console.error('Image failed to load', e);
          }}
        />
        <CloseButton onClick={closeModal}>×</CloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};
