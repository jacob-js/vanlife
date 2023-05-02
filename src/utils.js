import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const isLoggedIn = localStorage.getItem("loggedin")
    const nextPathname = request ? new URL(request.url).pathname: '/'
    
    if (!isLoggedIn) {
        return redirect(`/login?message=You must log in first.&redirectTo=${nextPathname}`)
    }
}