import React from "react"
import { sendMessageToDb, getMessages } from "../config/firebase"

class chat extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            con: false
        }
    }

    componentDidMount() {
        this.getAllMessages()
    }

    async sendMessage() {
        await sendMessageToDb(this.state.text, this.props.match.params.id)
        this.setState({ text: "" })
        this.getAllMessages()
    }

    async getAllMessages() {
        const roomId = this.props.match.params.id
        try {
            const msg = await getMessages(roomId)
            this.setState({
                msg,
                con: true
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.state.msg)
        return (
            <div style={{width: "100%", height: "100vh"}}>
                {this.state.con && this.state.msg.map((e)=> {
                    return <ul>
                        <li style={{listStyleType: "none"}}>{e.data.message}</li>
                    </ul>
                })}
                <div style={{ width: "100%", position: "fixed", bottom: 0 }}>
                    <input value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
                    <button onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        )
    }
}

export default chat