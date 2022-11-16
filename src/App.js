import './App.css';

import UserList from "./components/UserList";
import ResourceList from "./components/ResourceList";
import CurrentUser from "./components/CurrentUser";

function App() {
    return (
        <div className="App" style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <CurrentUser/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flex: 3}}>
                <UserList/>
                <ResourceList/>
            </div>
        </div>
    );
}

export default App;
