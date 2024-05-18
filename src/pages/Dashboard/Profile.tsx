import { Button } from "@nextui-org/react";
import { useState } from "react"
import React from 'react';

interface IProfile {
    username?: string;
    email?: string;
}

export const Profile: React.FC<IProfile> = ({ username, email }) => {
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('+7')

    return (
        <div className="grid p-5 gap-5">
            <div className="border rounded-lg p-3 grid grid-cols-1 gap-4 max-w-2xl">
                <div>
                    <p className="font-semibold text-start text-sm">
                        Имя
                    </p>
                    <input
                        type="text"
                        placeholder={username}
                        className="grid border rounded-xl p-2 w-full mt-1"
                    />
                </div>
                <div>
                    <p className="font-semibold text-start text-sm">
                        Телефон
                    </p>
                    <input
                        className="grid border rounded-xl p-2 w-full mt-1"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="номер телефона"
                    />
                </div>
                <div>
                    <p className="font-semibold text-start text-sm">
                        Эл. почта
                    </p>
                    <input
                        type="email"
                        className="grid border rounded-xl p-2 w-full mt-1"
                        placeholder={email}
                    />
                    <p className="font-semibold text-start text-xs text-gray-500">
                        Свяжитесь с менеджером для изменения
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-start text-sm">
                        Пароль
                    </p>
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
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}