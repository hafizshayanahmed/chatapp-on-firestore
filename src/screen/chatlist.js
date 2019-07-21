import React from "react"
import { getAllUsers, createRoom } from "../config/firebase"

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
        console.log(users)
        this.setState({
            users,
            con: true
        }) 
    }

    async startChat(e) {
        try{
         let chatRoom = await createRoom(e)
         console.log(e)
         this.props.history.push(`/chat/:${chatRoom._id}`)
        }catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.state.users)
        return (
            <div>
                {this.state.con && this.state.users.map((e) => {
                    return <div>
                        <ul>
                            <li style={{ listStyleType: "none" }}>{e.data.email}<button onClick={() => {
                                this.startChat(e._id)
                            }}>Chat</button></li>
                        </ul>
                    </div>
                })}
            </div>
        )
    }
}

export default Chatlist