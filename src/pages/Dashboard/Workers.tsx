import { Button } from "@nextui-org/react"

export const Workers = () => {
    return(
        <div className="grid p-5 gap-5">
            <div className="flex flex-wrap justify-between items-center border rounded-lg p-3">
                <h2 className="text-lg font-semibold">Сотрудники</h2>
                <Button
                    color="danger"
                    variant="bordered"
                    className="text-black px-7 font-semibold hover:bg-danger hover:text-white"
                    >
                    Добавить
                </Button>
            </div>
            <div className="grid border rounded-lg p-5">
                <p className="grid justify-center items-center text-danger">сотрудники не найдены !</p>
            </div>
        </div>
    )
}