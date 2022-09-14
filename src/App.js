import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import EditProfile from "./views/EditProfile"
import Main from './views/Main';
import ProjectsFinished from "./views/ProjectsFinished";
import ProjectsRecruiting from "./views/ProjectsRecruiting"
import ProjectDetails from './views/ProjectDetails';

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
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="/edit-profile" element={<IsPrivate><EditProfile/></IsPrivate>}/>
        <Route path="/project/:id" element={<IsPrivate><ProjectDetails/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
