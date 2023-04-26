import { redirect } from "react-router-dom"

export async function requireAuth() {
    const isLoggedIn = localStorage.getItem("loggedin")
    
    if (!isLoggedIn) {
        return redirect("/login")
    }
}