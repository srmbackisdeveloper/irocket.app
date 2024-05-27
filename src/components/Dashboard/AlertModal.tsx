import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

type AlertModalProps = {
    message: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

const AlertModal: React.FC<AlertModalProps> = ({ message, isOpen, onOpenChange }) => (
    <Modal
        size="sm"
        placement="center"
        className="grid justify-center items-center bg-green-500 text-white font-semibold p-2 text-lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalBody onClick={onClose}>
                        <p>{message}</p>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    </Modal>
);

export default AlertModal;
