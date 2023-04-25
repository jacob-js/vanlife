import React, { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { loginUser } from "../api";

export function loader({request}) {
    return new URL(request.url).searchParams.get('message')
}

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    const message = useLoaderData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null)
        setLoading(true)
        try {
            const data = await loginUser(loginFormData);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {(error || message) && <h3 className="red">{error?.message || message}</h3>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={loading}>{loading ? "Submitting...": "Log in"}</button>
            </form>
        </div>
    )

}