import {useState} from 'react';
import './App.css'

import LayoutExamples from './pages/examples.jsx';
import Tutorials from './pages/tutorials.jsx';
import Home from './pages/home.jsx';

const App = () => {
  const [examplesVisible, setExamplesVisible] = useState(false);
  const [tutorialsVisible, setTutorialsVisible] = useState(false);
  const [homeVisible, setHomeVisible] = useState(true);

  const closeAll = () => {
    setExamplesVisible(false);
    setTutorialsVisible(false);
    setHomeVisible(false);
  };

  return (
    <div>
      <h1>Video Game Development</h1>
      <div className='nav'>
        <button
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
          Tutorials
        </button>
        <button
          className={'examples-button'}
          onClick={() => {
            closeAll();
            setExamplesVisible(!examplesVisible);
          }}
        >
          Editor Layout Examples
        </button>
      </div>
      <div className={'page'}>
        {homeVisible && <Home />}
        {tutorialsVisible && <Tutorials />}
        {examplesVisible && <LayoutExamples />}  
      </div>
    </div>
  );
}

export default App
