import {useState, useRef, useEffect} from 'react';
import './mini-code.css';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import {javascript} from '@codemirror/lang-javascript';

import mie from '../../lib/mie.js';

import iconEditorGrayed from '../../assets/terminal-icon-gray.svg';
import iconEditorDark from '../../assets/terminal-icon-blue.svg';
import playIcon from '../../assets/play-circle-blue.svg';
import resetIcon from '../../assets/reset-icon-black.svg';
import stopIcon from '../../assets/stop-circle.svg';
import logo from '/vgd-pm-favicon.svg';

const MiniEditor = props => {
    const {
        code,
        baseSketchFun,
        lang,
        stopCode,
    } = props;
    
    const initialCode = code;
    const [updatedCode, setUpdatedCode] = useState(code);
    const previewElem = useRef(null);

    const codeLang = lang || 'p5';

    let lines = props.lines || 0;
    if (!lines) {
        for (let c of code) {
            if (c == '\n') lines++;
        }
        lines++;
    }

    // Keep track of errors while trying to run the code
    const [error, setError] = useState('');

    // Code to run is updated when we click the play or reset buttons
    // (which then triggers the useEffect hook)
    const [codeToRun, setCodeToRun] = useState(initialCode);

    // A silly piece of state that updates whenever we click the play or reset buttons
    // this is to ensure that we actually trigger the useEffect hook again if we
    // click play or reset again and again without changing the code.
    const [playCount, setPlayCount] = useState(0);

    const [editorVisible, setEditorVisible] = useState(!props.editorDisabled && !props.hideEditor);
    
    const handlePlayClick = () => {
        // Clear any error
        setError('');
        // Run the updated code
        setCodeToRun(updatedCode);
        // Ensure play runs when clicked even if nothing above has changed
        setPlayCount(c => c + 1);
    };

    const handleStopClick = () => {
        if (stopCode) {
            setCodeToRun(stopCode);
        }
    };

    const reset = () => {
        // Clear any error
        setError('');
        // Display the initial code in the editor
        setUpdatedCode(initialCode);
        // Run the initial code
        setCodeToRun(initialCode);
        // Ensure reset runs when clicked even if nothing above has changed
        setPlayCount(c => c + 1);
    };

    useEffect(() => {
        let myP5;
        
        const play = () => {
            let getFullSketch = baseSketchFun || (c => c);

            try {
                myP5 = mie.lang[codeLang].play.call(this, getFullSketch(codeToRun), previewElem);
            } catch (e) {
                console.log(e);
                setError(e.message);

                // If we got an error, we don't have a valid p5 sketch, so we need
                // to make a fake one with a remove function for cleanup
                myP5 = {
                    remove: () => {
                        console.log('Removing empty...')
                    }
                }
            }
        };

        play();
            
        return () => {
            myP5.remove();
        };

    }, [codeLang, baseSketchFun, codeToRun, playCount]); // codeToRun and playCount are the only ones that should actually change

	const toggleEditor = () => {
		setEditorVisible(!editorVisible);
	};

    const handleCodeChange = value => {
        setUpdatedCode(value);
    };

    let wh = {};
    
    if (props.width) {
        wh.width = props.width;
    }

    if (props.height) {
        wh.height = props.height;
    }


    return (
        <div className={`mini-editor-container ${(props.horiz && !props.width) ? 'mini-editor-container--horizontal-style' : ''}`}
            style={wh}
        >
            <div 
                className={`mie ${codeLang} ${props.horiz ? 'horiz' : 'vert'}`}
                style={{
                    width: props.horiz ? (editorVisible ? '100%' : 'min-content') : 'unset',
                    height: editorVisible ? '100%' : 'unset'
                }}
            >
                <div className={'mie-title'}>
                    <div className={'mie-logo'}>
                        <img src={logo}></img>
                    </div>
                    <div className='title-div'>
                        {props.title || 'Example Sketch'}
                    </div>
                    <div className={'mie-header-buttons'}>
                        { !props.editorDisabled &&
                            (<button 
                                className={'mie-edit'}
                                title={editorVisible ? 'hide editor' : 'show editor'}
                                onClick={() => {
                                    toggleEditor();
                                }}
                            >
                                <img src={editorVisible ? iconEditorDark : iconEditorGrayed}>
                                </img>
                            </button>)
                        }
                        <button
                            className={'mie-play'}
                            title={'reset code'}
                            onClick={() => reset()}
                        >
                            <img src={resetIcon} />
                        </button>
                        <button
                            className={'mie-play'}
                            title={'run code'}
                            onClick={handlePlayClick}
                        >
                            <img src={playIcon} />
                        </button>
                        {stopCode && <button
                            className={'mie-play'}
                            title={'stop code'}
                            onClick={handleStopClick}
                        >
                            <img src={stopIcon} />
                        </button>}
                    </div>
                </div>
                <div className={`mie-main ${(props.height || props.width) ? 'full' : ''}`}>
                    <div
                        className={`mie-preview ${props.height ? 'custom-height-flex-start' : ''}`}
                        ref={previewElem}
                    >
                        {error && <span className='error-msg'>{error}</span>}
                        {/* Sketch will get populated here */}
                    </div>
                    {editorVisible && (
                        <CodeMirror
                            width="100%"
                            height="100%"
                            value={updatedCode}
                            theme={dracula}
                            extensions={[javascript()]}
                            onChange={handleCodeChange}
                        />
                    )}
                </div>
            </div>
        </div>
        );
};

export default MiniEditor;