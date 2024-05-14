import { Search } from "../../components/shared/icons/Search.icon"

export const Analytics = () => {
    return(
        <div className="grid p-5 gap-5">
            <div className="grid border rounded-lg p-3">
                <div className="flex border-gray-200 border-2 rounded-lg p-[6px] gap-2 max-w-[16em] max-h-fit items-center focus:border-black duration-200 focus-within:border-black">
                    <Search/>
                    <input type="text" placeholder="Артикул / Название" className=""/>
                </div>
            </div>
            <div className="grid border rounded-lg p-5">
                <p className="grid justify-center items-center text-danger">товары не найдены !</p>
            </div>
        </div>
    )
}