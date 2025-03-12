import './App.css'

import MiniEditor from './components/mini-code/mini-code.jsx';

import {setupStarter, mouseCircles} from './sketches/setupExample.js';


const App = () => {
  return (
    <div className='grid'>
      <div className="card">
        <MiniEditor code={setupStarter}/>
      </div>
      <div className="card">
        <MiniEditor code={mouseCircles}/>
      </div>
    </div>
  )
}

export default App
