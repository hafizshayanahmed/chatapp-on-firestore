import React from "react"
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as routes from "../screen/index"

class router extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/login" component={routes.login} />
                    <Route path="/register" component={routes.register} />
                    <Route path="/chat/:id" component={routes.chat} />
                    <Route path="/chatlist" component={routes.chatlist} />
                </div>
            </Router>
        )
    }
}

export default router