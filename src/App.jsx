import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router';
import './App.css'

import LayoutExamples from './pages/examples.jsx';
import Tutorials from './pages/tutorials.jsx';
import Home from './pages/home.jsx';
import Footer from './pages/footer.mdx';
import vgdLogo from '/vgd-logo-no-text.svg'

const App = () => {

  return (
    <Router
      basename='/vgd-course/' // The trailing slash is not recommended for basename but it helps with a local bug
    >
      <div>
        <div className='header'>
          <img src={vgdLogo} width={'40px'} height={'40px'} />
          <h1>Video Game Development</h1>
        </div>
        <nav className='nav'>
          <NavLink to={''} end
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Home
          </NavLink>
          <NavLink to={`tutorials`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Interactive Tutorials
          </NavLink>
          <NavLink to={`examples`}
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
              <Route path={`tutorials`} element={<Tutorials />} />
              <Route path={`examples`} element={<LayoutExamples />} />
            </Routes>
        </div>
      </div>
      <div className='footer'><Footer /></div>
    </Router>
  );
}

export default App
