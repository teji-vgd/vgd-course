import './home.css';
import IntroText from './introText.mdx';

const Home = () => {
    return <div className='home-main'>
        {<IntroText />}
    </div>;
};

export default Home;