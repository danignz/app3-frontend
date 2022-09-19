import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import Signup from './views/Signup';
import IsPrivate from './components/IsPrivate';
import EditProfile from "./views/EditProfile"
import Main from './views/Main';
import ProjectDetails from './views/ProjectDetails';
import CreateRequest from './views/CreateRequest';
import UserDetails from './views/UserDetails';
import ManageRequests from './views/ManageRequests';
import ManageProjects from './views/ManageProjects';
import CreateProject from "./views/CreateProject"
import EditProject from "./views/EditProject"

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<IsPrivate><Main/></IsPrivate>}/>
        <Route path="/edit-profile" element={<IsPrivate><EditProfile/></IsPrivate>}/>
        <Route path="/project/:id" element={<IsPrivate><ProjectDetails/></IsPrivate>}/>
        <Route path="/create-request/:id" element={<IsPrivate><CreateRequest/></IsPrivate>}/>
        <Route path="/user/:id" element={<IsPrivate><UserDetails/></IsPrivate>}/>
        <Route path="/manage-requests" element={<IsPrivate><ManageRequests/></IsPrivate>}/>
        <Route path="/manage-projects" element={<IsPrivate><ManageProjects/></IsPrivate>}/>
        <Route path="/create-project" element={<IsPrivate><CreateProject/></IsPrivate>}/>
        <Route path="/edit-project/:id" element={<IsPrivate><EditProject/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
