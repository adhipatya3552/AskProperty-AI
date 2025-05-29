import React, { createContext, useState, ReactNode } from 'react';

export type ModalType = 'login' | 'signup';

export interface ModalsContextType {
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  isModalOpen: (modalType: ModalType) => boolean;
}

export const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

export const ModalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const isModalOpen = (modalType: ModalType) => {
    return activeModal === modalType;
  };

  return (
    <ModalsContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalsContext.Provider>
  );
};