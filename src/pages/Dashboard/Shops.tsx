import { Button, Divider } from "@nextui-org/react"
import { CartIcon } from "../../components/shared/icons/Cart.icon"
import { EditIcon } from "../../components/shared/icons/Edit.icon"
import { CrossIcon } from "../../components/shared/icons/Cross.icon"

export const Shops = () => {
    return(
        <div className="p-5">
            <div className="flex justify-between items-center p-3 border rounded-lg mb-5">
                <h2 className="text-2xl font-semibold">Магазины</h2>
                <Button color="danger" variant="bordered" className="text-black px-7 font-semibold hover:bg-danger hover:text-white">Добавить</Button>
            </div>
            <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between pb-5">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gray-200">
                            <CartIcon />
                        </div>
                        <div>
                            <a href="#" className="text-lg font-semibold text-danger hover:text-blue-700 duration-300">Shop Name</a>
                            <p className="text-sm font-meduim">ID: Shop ID</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <EditIcon />
                        <CrossIcon />
                    </div>
                </div>
                <Divider />
            </div>
            <div className="grid grid-cols-3">
                <div>
                    <div>
                        <h4></h4>
                    </div>
                    <div></div>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}