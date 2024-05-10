import { Button } from "@nextui-org/react"
import { useState } from "react";

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('+7');
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="grid justify-center items-center gap-5 p-40">
            <div className="grid justify-center items-center">
                <h2 className="text-3xl font-semibold text-center">Добро пожаловать</h2>
                <p className="font-semibold text-center text-sm text-gray-500 mt-1">Укажите данные для входа</p>
            </div>
            <div className="grid justify-center items-center">
                <p className="font-semibold text-start text-sm text-gray-500">Эл. почта</p>
                <input
                    className="grid border rounded-xl p-2 min-w-72 mt-1"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="эл. почта" />
            </div>
            <div className="grid justify-center items-center">
                <p className="font-semibold text-start text-sm text-gray-500">Номер телефона</p>
                <input
                    className="grid border rounded-xl p-2 min-w-72 mt-1"
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="номер телефона" />
            </div>
            <div className="grid justify-center items-center">
                <p className="font-semibold text-start text-sm text-gray-500">Пароль</p>
                <input
                    className="grid border rounded-xl p-2 min-w-72 mt-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="пароль" />
            </div>
            <div className="grid justify-center items-center">
                <p className="font-semibold text-start text-sm text-gray-500">Подтверждение пароля</p>
                <input
                    className="grid border rounded-xl p-2 min-w-72 mt-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="подтверждение пароля" />
            </div>
            <div className="grid justify-center items-center">
                <Button
                    color="danger"
                    variant="shadow"
                    className="min-w-72 font-semibold"
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className="flex gap-4 justify-center">
                <p className="font-semibold text-sm text-gray-500">У Вас уже есть аккаунт?</p>
                <a className="font-semibold text-sm text-blue-700" href="/login">Войти</a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 ">
                <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <p className="font-semibold text-sm text-gray-500">Я согласен с</p>
                <a className="font-semibold text-sm text-blue-700" href="https://irocket.kz/policy">пользовательским соглашением</a>
            </div>
        </div>
    )
}