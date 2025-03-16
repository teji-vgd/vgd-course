import MiniEditor from '../components/mini-code/mini-code.jsx';
import {setupStarter, mouseCircles} from '../sketches/setupExample.js';
const Tutorials = () => {
    return <div className='grid'>
    <div className="card">
      <MiniEditor title='Setup Starter' code={setupStarter}/>
    </div>
    <div className="card">
      <MiniEditor title='Mouse Circles' code={mouseCircles}/>
    </div>
  </div>;
};

export default Tutorials;