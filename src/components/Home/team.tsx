import { Avatar } from "@nextui-org/react"
import AvatarImage from './../../assets/home/avatar.png';

export const Team = () => {
    return(
        <div className="mt-[6em] p-10 ">
            <h2 className="text-4xl font-semibold text-center">Наша команда</h2>
            <div className="flex gap-4 justify-evenly items-center py-10">
                <div>
                    <Avatar src={AvatarImage} className="w-20 h-20 text-large" />
                    <p className="grid justify-center items-center font-bold">Фархат</p>
                    <p className="grid justify-center items-center">Создатель</p>
                </div>
                <div className="grid">
                    <Avatar src={AvatarImage} className="w-20 h-20 text-large" />
                    <p className="font-bold ml-2">Ерболат</p>
                    <p className="grid justify-center items-center">Директор</p>
                </div>
                <div className="grid">
                    <Avatar src={AvatarImage} className="w-20 h-20 text-large" />
                    <p className="grid justify-center items-center font-bold">Айгерим</p>
                    <p className="grid justify-center items-center">Менеджер</p>
                </div>
            </div>
        </div>
    )
}