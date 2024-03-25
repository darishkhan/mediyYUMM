import Quote from "../components/Quote"
import { SignupComponent } from "../components/SignupComponent"

export const SignupPage = ()=>{
    return(
        <div className="grid md:grid-cols-2">
            <div className="md:col-span-1">
                <SignupComponent></SignupComponent>
            </div>
            <div className="md:col-span-1 invisible md:visible">
                <Quote/> 
            </div>
        </div>
    )
}