import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { FC } from "react"
import React from "react"

const Default: FC = () => {
    const overlay = React.useRef<HTMLDivElement>(null)
    return (
        <div className="wrapper" ref={overlay}>
            <Header overlay={overlay} />
            <main className="fullHeight">
                <Outlet />
            </main>
        </div>
    )
}
export default Default