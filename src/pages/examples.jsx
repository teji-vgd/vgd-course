import MiniEditor from '../components/mini-code/mini-code.jsx';
import {setupStarter, mouseCircles} from '../sketches/setupExample.js';
const LayoutExamples = () => {
    return <div className='grid'>
    <div className="card">
      <MiniEditor title='Example, horiz, no wh' horiz code={setupStarter}/>
    </div>
    <div className="card">
      <MiniEditor title='Example, no extras' code={mouseCircles}/>
    </div>
    <div className="card">
      <MiniEditor title='Example, w=500' width='500px' code={mouseCircles}/>
    </div>
    <div className="card">
      <MiniEditor title='Example, h=500' height='500px' code={mouseCircles}/>
    </div>
    <div className="card">
      <MiniEditor title='Example, w,h=500' width='500px' height='500px' code={mouseCircles}/>
    </div>
    <div className="card">
      <MiniEditor title='Example, editor hidden' hideEditor code={mouseCircles}/>
    </div>
    <div className="card">
      <MiniEditor title='Example, no editor' editorDisabled code={mouseCircles}/>
    </div>
  </div>;
};

export default LayoutExamples;