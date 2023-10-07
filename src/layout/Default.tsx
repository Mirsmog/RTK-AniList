import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { FC } from "react"

const Default: FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default Default