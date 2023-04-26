import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { loginUser } from "../api";

export function loader({request}) {
    return new URL(request.url).searchParams.get('message')
}

export async function action({request}){
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin", true)
        return redirect('/host')
    } catch (error) {
        return error?.message
    }
}

export default function Login() {
    const message = useLoaderData();
    const errorMessage = useActionData();
    const navigation = useNavigation();

    const submitting = navigation.state === 'submitting';

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {(errorMessage || message) && <h3 className="red">{errorMessage || message}</h3>}
            <Form className="login-form" method="post">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={submitting}>{submitting ? "Submitting...": "Log in"}</button>
            </Form>
        </div>
    )

}