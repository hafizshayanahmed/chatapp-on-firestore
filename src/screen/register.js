import React from "react"
import { register } from "../config/firebase"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    async register() {
        const { email, password } = this.state;
        try {
            const reg = await register(email, password)
            console.log(reg)
            this.props.history.push("/login");
        }
        catch (e) {
            alert(e.message)
        }
    }

    render() {
        return (
            <div>
                Email: <input type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                Password: <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                <button onClick={() => this.register()}>Register</button>
                <p onClick={() => {
                    this.props.history.push("/login")
                }}>Already have an account? click here to login</p>
            </div>
        )
    }
}

export default Login