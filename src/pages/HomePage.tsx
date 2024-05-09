import { Cards } from "./../components/Home/card"
import { Main } from "../components/Home/main"
import { Offer } from "../components/Home/offer"
import { Feedback } from "../components/Home/feedback"
import { Step } from "../components/Home/step"
import { Faq } from "../components/Home/faq"
import { Team } from "../components/Home/team"
import { Contacts } from "../components/Home/contacts"

export const HomePage = () => {
    return(
        <div>
            <Main/>
            <Cards/>
            <Offer/>
            <Feedback/>
            <Step/>
            <Faq/>
            <Team/>
            <Contacts/>
        </div>
    )
}