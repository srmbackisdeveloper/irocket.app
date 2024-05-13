import { Search } from "../../components/shared/icons/Search.icon"

export const Analytics = () => {
    return(
        <div className="grid p-5 gap-5">
            <div className="flex flex-wrap border rounded-lg p-2 gap-2 max-w-[16em] items-center">
                <Search/>
                <input type="text" placeholder="Артикул" className=""/>
            </div>
            <div className="grid border rounded-lg p-5">
                <p className="grid justify-center items-center text-danger">товары не найдены !</p>
            </div>
        </div>
    )
}