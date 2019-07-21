import React from "react"
import { login } from "../config/firebase"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    async login() {
        const { email, password } = this.state;
        await login(email, password)
        this.props.history.push("/chatlist");
    }

    render() {
        return (
            <div>
                Email: <input type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                Password: <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                <button onClick={() => this.login()}>Login</button>
                <p onClick={() => {
                    this.props.history.push("/register")
                }}>Dont have an account? click here to register</p>
            </div>
        )
    }
}

export default Login