import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const handleSave = () => {
        if(!name || !email) return;

        if(emailAlreadyExists()) {
            return alert("E-mail already exists!")
        }

        if(Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_client", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    const emailAlreadyExists = () => {
        if(dataEdit.email !== email && data?.lenght) {
            return data.find((item) => item.email === email);
        }

        return false;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Clients Register</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;