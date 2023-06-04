import "./App.css"
import MainComponent from "./components/ui/mainComponent"
import SideNavBar from "./components/ui/sideNavBar"
import UpperNavBar from "./components/ui/upperNavBar"

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
                        <MainComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
