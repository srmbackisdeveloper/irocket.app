import { Outlet } from "react-router-dom"
import Header from "../../components/Header"

export const RootPage = () => {
    return(
        <div>
            <Header/>
            <section> <Outlet/> </section>
        </div>
    )
}