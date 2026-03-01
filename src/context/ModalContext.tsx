'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import ComingSoonModal from '@/components/ui/ComingSoonModal';
import useModalNavigation from '@/hooks/useModalNavigation';

const ModalContext = createContext({ showModal: () => { } });

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModalCallback = useCallback(() => setIsOpen(false), [setIsOpen]);
  const { pushModal, popModal } = useModalNavigation("comming", isOpen, closeModalCallback);

  const showModal = () => {
    pushModal("1");
    setIsOpen(true)
  };
  const closeModal = () => {
    popModal();
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      <ComingSoonModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useComingSoon = () => useContext(ModalContext);