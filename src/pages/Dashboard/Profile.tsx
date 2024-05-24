import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDisclosure } from "@nextui-org/react";
import AlertModal from "./../../components/Dashboard/AlertModal"; // Adjust the import path as needed

export const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState<string>(user?.fullName || "");
  const [number, setNumber] = useState<string>(user?.phoneNumber || "+7");
  const [email] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMessage, setModalMessage] = useState<string>("");

  const showModal = (message: string) => {
    setModalMessage(message);
    onOpen();
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (!input.startsWith("7")) {
      input = "7" + input;
    }
    if (input.length <= 11) {
      setNumber(`+${input}`);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile({ fullName: name, phoneNumber: number });
      showModal("Профиль успешно обновлен!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showModal("Не удалось обновить профиль. Пожалуйста, попробуйте снова.");
    }
  };

  return (
    <div className="grid p-5 gap-5">
      <div className="border rounded-lg p-3 grid grid-cols-1 gap-4 max-w-2xl">
        <div>
          <p className="font-semibold text-start text-sm">Имя</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user?.fullName || ""}
            className="grid border rounded-xl p-2 w-full mt-1"
          />
        </div>
        <div>
          <p className="font-semibold text-start text-sm">Телефон</p>
          <input
            className="grid border rounded-xl p-2 w-full mt-1"
            type="text"
            pattern="\d*"
            inputMode="numeric"
            value={number}
            onChange={handleNumberChange}
            maxLength={12} // Adjusted maxLength to account for the "+"
            placeholder={"+7(___)___-__-__"}
          />
        </div>
        <div>
          <p className="font-semibold text-start text-sm">Эл. почта</p>
          <input
            type="email"
            value={email}
            disabled
            className="grid border rounded-xl p-2 w-full mt-1"
            placeholder={user?.email || ""}
          />
          <p className="font-semibold text-start text-xs text-gray-500">
            Свяжитесь с менеджером для изменения
          </p>
        </div>
        <div>
          <p className="font-semibold text-start text-sm">Пароль</p>
          <input
            className="grid border rounded-xl p-2 w-full mt-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <p className="font-semibold text-start text-xs text-gray-500">
            Оставьте пустым чтобы не изменять
          </p>
        </div>
        <div className="grid justify-end">
          <Button
            variant="shadow"
            className="bg-danger text-white px-7 font-semibold"
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
      <AlertModal message={modalMessage} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
