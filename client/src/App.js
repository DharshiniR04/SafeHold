import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import { UserProvider } from './context/userContext';

function App() {
   return (
      <UserProvider>
         <Router>
            <Routes>
               <Route path="/" element={<Landing />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/home" element={<Home />} />
            </Routes>
         </Router>
      </UserProvider>
   );
}

export default App;
