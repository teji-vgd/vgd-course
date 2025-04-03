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
        lang
    } = props;
    
    const initialCode = code;
    const [updatedCode, setUpdatedCode] = useState(code);
    const previewElem = useRef(null);

    const codeLang = lang || 'p5';

    // TODO there might be a more convenient method for having a hidden base sketch
    let getFullSketch = props.baseSketchFun || (c => c);

    let lines = props.lines || 0;
    if (!lines) {
        for (let c of code) {
            if (c == '\n') lines++;
        }
        lines++;
    }
    // Keep track of errors while trying to run the code
    const [error, setError] = useState('');

    // const cleanup = useRef(null);
    let myP5 = {
        remove: () => {
            console.log('Removing empty...')
        }
    };
	const play = () => {
        setError(''); // Clear any previous errors when re-running the code
        //if (cleanup.current !== null) cleanup.current();
        if (myP5) {
            myP5.remove();
        }

        try {
            console.log('creating canvas');
            myP5 = mie.lang[codeLang].play.call(this, getFullSketch(updatedCode), previewElem);
        } catch (e) { // TODO there's a bug here where sometimes the previous sketch doesn't get removed properly...
            console.log(e);
            setError(e.message);
            console.log('Error type: ', typeof error);

            const errorMessageElem = previewElem.current.firstChild;
            if (errorMessageElem && errorMessageElem.className === 'error-msg') {
                previewElem.current.replaceChildren(errorMessageElem);
            }
        }

        //cleanup.current = myP5.remove;
	};

    const reset = () => {
        setUpdatedCode(initialCode);
    }

    const [editorVisible, setEditorVisible] = useState(!props.editorDisabled && !props.hideEditor);

    useEffect(() => {
        play();
        
        // return () => {
        //     cleanup.current();
        // };
        return () => {
            myP5.remove();
        };
    });

	const toggleEditor = () => {
		setEditorVisible(!editorVisible);
	};
    
    return (
        <div style={{
            width: props.width || (props.horiz ? '480px':'300px'),
            // height: props.height ||  (props.horiz ? '240px' : '400px')
            height: props.height ||  (props.horiz ? '240px' : 'fit-content')
        }}>
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
                    <span>
                        {props.title || 'Example Sketch'}
                    </span>
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
                            onClick={() => play()}
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
                            onChange={setUpdatedCode}
                        />
                    )}
                </div>
            </div>
        </div>
        );
};

export default MiniEditor;