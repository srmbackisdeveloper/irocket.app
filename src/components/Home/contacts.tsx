import { Card, CardBody } from "@nextui-org/react"

export const Contacts = () => {
    return (
        <div className="mt-[6em] p-10 bg-slate-100">
            <div className="pt-10">
                <h2 className="text-4xl font-semibold text-center">Появились вопросы?</h2>
                <p className="text-tiny uppercase font-bold text-center mt-4">Мы поможем найти ответы! С радостью ответим на все ваши вопросы</p>
            </div>
            <div className="grid lg:grid-cols-2 mt-[3em] gap-5">
                <div>
                    <Card className="p-5">
                        <CardBody className="gap-4">
                            <a className="text-2xl font-bold text-danger text-center" href="tel:+77774794422">+7 777 479 4422</a>
                            <p className="font-semibold text-center">Лучший способ получить быстрый ответ!</p>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card className="p-5">
                        <CardBody className="gap-4">
                            <a className="text-2xl font-bold text-danger text-center" href="mailto:test@test.com">test@test.com</a>
                            <p className="font-semibold text-center">Отвечаем в рабочее время в течении 10 минут</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}