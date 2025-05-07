import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router';
import './App.css'

import LayoutExamples from './pages/examples.jsx';
import Tutorials from './pages/tutorials.jsx';
import Home from './pages/home.jsx';
import Footer from './pages/footer.mdx';
import GettingStarted from './pages/getting-started.jsx';
import Sprites from './pages/sprites.jsx';
import ExploringSprites from './pages/exploringSprites.jsx';
import vgdLogo from '/vgd-logo-no-text.svg';
import GameIcons from './pages/gameIcons.mdx';

const App = () => {

  return (
    <Router
      basename='/vgd-course/' // The trailing slash is not recommended for basename but it helps with a local bug
    >
      <div className='main-content'>
        <div className='header'>
          <img src={vgdLogo} width={'40px'} height={'40px'} />
          <h1 className='main-title'>Video Game Development</h1>
        </div>
        <nav className='nav'>
          <NavLink to={''} end
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Home
          </NavLink>
          <NavLink to={`gettingStarted`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Getting Started
          </NavLink>
          <NavLink to={`sprites`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Sprites
          </NavLink>
          <NavLink to={`exploringSprites`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Exploring Sprites
          </NavLink>
          {/* <NavLink to={`tutorials`}
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
          </NavLink> */}
          <NavLink to={`gameIcons`}
            className={({ isActive, isPending }) =>
              isPending ? "nav-button pending" : isActive ? "nav-button active" : "nav-button"
            }
          >
            Game Icons
          </NavLink>
        </nav>
        <div className={'page'}>
            <Routes>
              <Route path={`/`} exact element={<Home />} />
              <Route path={'gettingStarted'} element={<GettingStarted/>} />
              <Route path={`tutorials`} element={<Tutorials />} />
              <Route path={`examples`} element={<LayoutExamples />} />
              <Route path={`sprites`} element={<Sprites />} />
              <Route path={`sprites/exploringSprites`} element={<ExploringSprites />} />
              <Route path={`exploringSprites`} element={<ExploringSprites />} />
              <Route path={`gameIcons`} element={<GameIcons />} />
            </Routes>
        </div>
      </div>
      <div className='footer'><Footer /></div>
    </Router>
  );
}

export default App
