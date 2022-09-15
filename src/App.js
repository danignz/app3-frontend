import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import IsPrivate from './components/IsPrivate';
import EditProfile from "./views/EditProfile"
import Main from './views/Main';
import ProjectsFinished from "./views/ProjectsFinished";
import ProjectsRecruiting from "./views/ProjectsRecruiting"
import ProjectDetails from './views/ProjectDetails';
import CreateRequest from './views/CreateRequest';
import UserDetails from './views/UserDetails';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route path="projects-recruiting" element={<ProjectsRecruiting />} />
          <Route path="projects-finished" element={<ProjectsFinished />} />
        </Route>
        <Route path="/edit-profile" element={<IsPrivate><EditProfile/></IsPrivate>}/>
        <Route path="/project/:id" element={<IsPrivate><ProjectDetails/></IsPrivate>}/>
        <Route path="/create-request/:id" element={<IsPrivate><CreateRequest/></IsPrivate>}/>
        <Route path="/user/:id" element={<IsPrivate><UserDetails/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
