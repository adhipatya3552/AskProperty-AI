import { useContext } from 'react';
import { ModalsContext, ModalsContextType } from '../context/ModalsContext';

export const useModals = (): ModalsContextType => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalsProvider');
  }
  return context;
};