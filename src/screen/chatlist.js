import React from "react"
import { getAllUsers, chatRoom } from "../config/firebase"

class Chatlist extends React.Component {
    constructor() {
        super();
        this.state = {
            con: false
        }
    }

    componentDidMount() {
        this.getusers()
    }

    async getusers() {
        const users = await getAllUsers()
        this.setState({
            users,
            con: true
        })
    }

    async startChat(e) {
        console.log(e)
    }

    render() {
        console.log(this.state.users)
        return (
            <div>
                {this.state.con && this.state.users.map((e) => {
                    return <div>
                        <ul>
                            <li style={{ listStyleType: "none" }}>{e.data.email}<button onClick={() => {
                                this.startChat(e.id)
                            }}>Chat</button></li>
                        </ul>
                    </div>
                })}
            </div>
        )
    }
}

export default Chatlist