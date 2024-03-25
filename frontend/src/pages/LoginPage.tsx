import { LoginComponent } from "../components/LoginComponent"
import Quote from "../components/Quote"



export const LoginPage = ()=>{

    

    return(
        <div className="grid md:grid-cols-2">
            <div className="md:col-span-1">
                <LoginComponent></LoginComponent>
            </div>
            <div className="md:col-span-1 invisible md:visible">
                <Quote/> 
            </div>
        </div>
    )
}