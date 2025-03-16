import './App.css'

import LayoutExamples from './pages/examples.jsx';
import Tutorials from './pages/tutorials.jsx';
import Home from './pages/home.jsx';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router';

const App = () => {


  return (
    <Router>
      <div>
        <h1>Video Game Development</h1>
        <div className='nav'>
          <NavLink to="/" end
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Home
          </NavLink>
          <NavLink to="/tutorials"
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Interactive Tutorials
          </NavLink>
          <NavLink to="/layout-examples"
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Editor Layout Examples
          </NavLink>

          {/* <button
            className={'examples-button'}
            onClick={() =>{
              closeAll();
              setHomeVisible(true);
            }}
          >
            Home
          </button>
          <button
            className={'examples-button'}
            onClick={() =>{
              closeAll();
              setTutorialsVisible(!tutorialsVisible)
            }}
          >
            Interactive Tutorials
          </button>
          <button
            className={'examples-button'}
            onClick={() => {
              closeAll();
              setExamplesVisible(!examplesVisible);
            }}
          >
            Editor Layout Examples
          </button> */}
        </div>
        <div className={'page'}>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='tutorials' element={<Tutorials />} />
              <Route path='layout-examples' element={<LayoutExamples />} />
            </Routes>
          {/* {homeVisible && <Home />}
          {tutorialsVisible && <Tutorials />}
          {examplesVisible && <LayoutExamples />}   */}
        </div>
      </div>
    </Router>
  );
}

export default App
