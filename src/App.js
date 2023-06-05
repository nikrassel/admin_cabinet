import "./App.css"
import { Route, Routes } from "react-router-dom"
import SideNavBar from "./components/ui/sideNavBar"
import UpperNavBar from "./components/ui/upperNavBar"
import Proposal from "./components/page/proposal"
import ModeratorList from "./components/page/moderatorList"
import TaskList from "./components/page/taskList"
import PushMessages from "./components/page/pushMessages"

function App() {
    return (
        <div className="App flex text-bg-dark p-3">
            <div className="m-3">
                <UpperNavBar />
            </div>
            <div className="flex">
                <div className="row m-3">
                    <div className="col-md-2 mb-3">
                        <SideNavBar />
                    </div>
                    <div className="col-md-10">
                        <Routes>
                            <Route path="/" Component={Proposal} />
                            <Route path="/moderators" Component={ModeratorList} />
                            <Route path="/tasks" Component={TaskList} />
                            <Route path="/messages" Component={PushMessages} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
