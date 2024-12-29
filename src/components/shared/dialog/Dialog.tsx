import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
} from "react";
import { AppContext } from "@/context/app/AppContext.tsx";
import Modal from "react-responsive-modal";
import { Sheet } from "react-modal-sheet";
import "react-responsive-modal/styles.css";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const Dialog = ({ children, isOpen, setIsOpen }: DialogProps) => {
  const { isMobile } = useContext(AppContext);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      {isMobile && (
        <>
          <Sheet isOpen={isOpen} onClose={onCloseModal}>
            <Sheet.Container>
              <div className={"px-5 py-2 overflow-x-auto"}>
                <Sheet.Header />
                <Sheet.Content>{children}</Sheet.Content>
              </div>
            </Sheet.Container>
            <Sheet.Backdrop />
          </Sheet>
        </>
      )}
      {!isMobile && (
        <>
          <Modal
            open={isOpen}
            onClose={onCloseModal}
            center
            classNames={{ modal: "min-w-[500px] min-h-[100px]" }}
          >
            {children}
          </Modal>
        </>
      )}
    </>
  );
};
