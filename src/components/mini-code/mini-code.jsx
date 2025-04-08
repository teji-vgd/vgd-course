import {useState, useRef, useEffect, useCallback} from 'react';
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
    const codeLang = lang || 'p5';
    const initialCode = code;
    const [playedCode, setPlayedCode] = useState(code);
    const [editorCode, setEditorCode] = useState(code);
    const previewElem = useRef(null);
    // Keep track of errors while trying to run the code
    const [error, setError] = useState('');

    let lines = props.lines || 0;
    if (!lines) {
        for (let c of code) {
            if (c == '\n') lines++;
        }
        lines++;
    }

    const cleanup = useRef(null);
    const myP5 = useRef(null);

    const play = useCallback((code) => {
        // TODO there might be a more convenient method for having a hidden base sketch
        let getFullSketch = props.baseSketchFun || (c => c);
        setError(''); // Clear any previous errors when re-running the code
        if (cleanup.current !== null) {
            cleanup.current();
        }

        try {
            console.log('creating canvas');
            myP5.current = mie.lang[codeLang].play.call(this, getFullSketch(code), previewElem);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }

        cleanup.current = myP5.current.remove;
	}, [codeLang, props]);

    const reset = () => {
        setPlayedCode(initialCode);
        play(initialCode);
    }

    const [editorVisible, setEditorVisible] = useState(!props.editorDisabled && !props.hideEditor);
    
    useEffect(() => {
        play(playedCode);
        
        return () => {
            cleanup.current();
        };
    
    }, [error, playedCode, play]);

	const toggleEditor = () => {
		setEditorVisible(!editorVisible);
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
                            onClick={() => setPlayedCode(editorCode)}
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
                            value={editorCode}
                            theme={dracula}
                            extensions={[javascript()]}
                            onChange={setEditorCode}
                        />
                    )}
                </div>
            </div>
        </div>
        );
};

export default MiniEditor;