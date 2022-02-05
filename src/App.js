import './App.css';
import useAuth from './hooks/useAuth';


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Video from './pages/Video';
import Home from './pages/Home';

function App() {
  
  const {signIn}=useAuth()




  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="video" element={<Video />}>
              <Route path=":videoid" element={<Video />} />
            </Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
