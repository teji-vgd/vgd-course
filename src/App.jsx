import './App.css'

import LayoutExamples from './pages/examples.jsx';
import Tutorials from './pages/tutorials.jsx';
import Home from './pages/home.jsx';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router';

const App = () => {

  return (
    <Router
      basename='/vgd-course'
    >
      <div>
        <h1>Video Game Development</h1>
        <nav className='nav'>
          <NavLink to={`/`} end
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Home
          </NavLink>
          <NavLink to={`/tutorials`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Interactive Tutorials
          </NavLink>
          <NavLink to={`/examples`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Editor Layout Examples
          </NavLink>
        </nav>
        <div className={'page'}>
            <Routes>
              <Route path={`/`} exact element={<Home />} />
              <Route path={`/tutorials`} element={<Tutorials />} />
              <Route path={`/examples`} element={<LayoutExamples />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
