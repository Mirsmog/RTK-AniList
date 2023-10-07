import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-center">
            <div>
                <div className="text-9xl font-bold">404</div>
                <div className="text-4xl">Oops, sorry we can't find that page!</div>
                <div className="text-2xl">Either something went wrong or the page doesn't exist anymore.</div>
                
            </div>
        </div>
    )
}
export default NotFound