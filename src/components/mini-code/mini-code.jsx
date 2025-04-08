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
import logo from '/vgd-pm-favicon.svg';

const MiniEditor = props => {
    const {
        code,
        baseSketchFun,
        lang
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
    
    const reset = () => {
        // Display the initial code in the editor
        setUpdatedCode(initialCode);
        // Run the initial code
        setCodeToRun(initialCode);
    };

    const [editorVisible, setEditorVisible] = useState(!props.editorDisabled && !props.hideEditor);
    
    const handlePlayClick = () => {
        // The useEffect hook is also triggered on error state change
        // Resetting the error here ensures that the error stays displayed if the user
        // clicks play several times (without updating any of the code)

        // Reset the error
        setError('');
        // Run the updated code
        setCodeToRun(updatedCode);
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

    }, [codeLang, baseSketchFun, codeToRun, error]); // codeToRun and error are the only ones that should actually change

	const toggleEditor = () => {
		setEditorVisible(!editorVisible);
	};

    const handleCodeChange = value => {
        setUpdatedCode(value);
    };
    
    return (
        <div className={`mini-editor-container ${props.horiz ? 'mini-editor-container--horizontal-style' : ''}`}>
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
                        <button
                            className={'mie-play'}
                            title={'reset code'}
                            onClick={() => reset()}
                        >
                            <img src={resetIcon} />
                        </button>
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
                            title={'run code'}
                            onClick={handlePlayClick}
                        >
                            <img src={playIcon} />
                        </button>
                    </div>
                </div>
                <div className={'mie-main'}>
                    <div
                        className={'mie-preview'}
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