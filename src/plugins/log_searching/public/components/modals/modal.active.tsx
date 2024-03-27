import React from 'react';
import {
  ModalBlock,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from './modal.styles';

interface PropsModal {
  title: string;
  footer: any;
  children: React.ReactNode;
  active: boolean;
  hideModal: any;
  width: number;
}

const Modal = ({ title, footer, children, active, hideModal, ...props }: PropsModal) => {
  return (
    <>
      {active && (
        <ModalBlock onClose={() => {}}>
          <ModalOverlay>
            <ModalContainer {...props}>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>{footer}</ModalFooter>
            </ModalContainer>
          </ModalOverlay>
        </ModalBlock>
      )}
    </>
  );
};

export { Modal };
