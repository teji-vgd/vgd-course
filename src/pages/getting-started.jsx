import './home.css';
import GettingStarted from './getting-started.mdx';

const GettingStartedPage = () => {
    return <div className='home-main'>
        {<GettingStarted />}
    </div>;
};

export default GettingStartedPage;