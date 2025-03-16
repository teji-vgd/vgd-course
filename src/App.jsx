import './App.css'

import LayoutExamples from './pages/examples.jsx';
import Tutorials from './pages/tutorials.jsx';
import Home from './pages/home.jsx';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router';

const App = () => {
  const pathPrefix = '/vgd-course';

  return (
    <Router>
      <div>
        <h1>Video Game Development</h1>
        <div className='nav'>
          <NavLink to={`${pathPrefix}/`} end
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Home
          </NavLink>
          <NavLink to={`${pathPrefix}/tutorials`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Interactive Tutorials
          </NavLink>
          <NavLink to={`${pathPrefix}/examples`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Editor Layout Examples
          </NavLink>
        </div>
        <div className={'page'}>
            <Routes>
              <Route path={`${pathPrefix}/`} exact element={<Home />} />
              <Route path={`${pathPrefix}/tutorials`} element={<Tutorials />} />
              <Route path={`${pathPrefix}/examples`} element={<LayoutExamples />} />
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
