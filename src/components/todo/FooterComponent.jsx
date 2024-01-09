import { useContext } from "react"
import { AuthContext } from "./security/AuthContext"

export default function FooterComponent() {
    const authContext = useContext(AuthContext)
    return (
        <footer className="Footer">
            <div className="container">
                Your Footer
            </div>
        </footer>
    )
}