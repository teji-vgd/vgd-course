import {useState, useRef, useEffect} from 'react';
import './mini-code.css';
import ReactAce from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import mie from '../../lib/mie.js';

import iconEditorOutline from '../../assets/editor-outline.svg';
import iconEditorFilled from '../../assets/editor-filled.svg';

const MiniEditor = props => {
    const {
        code,
        lang
    } = props;
    
    const [updatedCode, setUpdatedCode] = useState(code);
    const previewElem = useRef(null);

    const codeLang = lang || 'p5';
        
    // TODO - WIP need to figure this piece out...
    if (props.baseId) {
        // If there's a base id, save the base sketch
        mie.bases[props.baseId] = code.slice(0, code.lastIndexOf('}'));
    }

    let lines = props.lines || 0;
    if (!lines) {
        for (let c of code) {
            if (c == '\n') lines++;
        }
        lines++;
    }
    // Keep track of errors while trying to run the code
    const [error, setError] = useState('');

    const cleanup = useRef(null);
	const play = () => {
        setError(''); // Clear any previous errors when re-running the code
        if (cleanup.current !== null) cleanup.current();

        try {
            const myP5 = mie.lang[codeLang].play.call(this, updatedCode, previewElem);
            cleanup.current = myP5.remove;
        } catch (e) {
            console.log(e);
            setError(e.message);
            console.log('Error type: ', typeof error);
        }
	};

    const [editorVisible, setEditorVisible] = useState(!props.editorDisabled && !props.hideEditor);


    useEffect(() => {
        play();
        
        return () => {
            cleanup.current();
        };

    });

	const toggleEditor = () => {
		setEditorVisible(!editorVisible);
	};
    
    return (
        <div style={{
            width: props.width || (props.horiz ? '480px':'300px'),
            height: props.height ||  (props.horiz ? '240px' : '400px')
        }}>
            <div 
                className={`mie ${codeLang} ${props.horiz ? 'horiz' : 'vert'}`}
                style={{
                    width: props.horiz ? (editorVisible ? '100%' : 'min-content') : 'unset',
                    height: editorVisible ? '100%' : 'unset'
                }}
            >
                <div className={'mie-title'}>
                    <div className={'mie-logo'}></div>
                    <span>
                        {props.title || 'Example Sketch'}
                    </span>
                    <div className={'mie-header-buttons'}>
                        { !props.editorDisabled &&
                            (<button 
                                className={'mie-edit'}
                                onClick={() => {
                                    toggleEditor();
                                }}
                            >
                                <img src={editorVisible ? iconEditorOutline : iconEditorFilled}>
                                </img>
                            </button>)
                        }
                        <button
                            className={'mie-play'}
                            title={'replay'}
                            onClick={() => play()}
                        />
                    </div>
                </div>
                <div
                    className={'mie-main'}
                >
                    <div
                        className={'mie-preview'}
                        ref={previewElem}
                    >
                        {/* Sketch will get populated here */}
                    </div>
                    {error && <span className='error-msg'>{error}</span>}
                    {editorVisible && (
                        <ReactAce
                            className={'mie-editor'}
                            mode={'javascript'}
                            theme={'monokai'}
                            value={updatedCode}
                            showGutter={false}
                            showPrintMargin={false}
                            useWrapMode={true}
                            onChange={setUpdatedCode}
                            setOptions={{
                                useWorker: false,
                                showLineNumbers: true,
                                minLines: 1,
                                maxLines: lines,
                                fontSize: '14px',
                                tabSize: 2,
                                
                                enableBasicAutocompletion: [
                                    {
                                        getCompletions: (editor, session, pos, prefix, callback) => {
                                            callback(null, mie.lang[codeLang].completions || []);
                                        }
                                    }
                                ],
                                enableLiveAutocompletion: true
                            }}
                            // onChange={onChange}
                            // name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                        />
                    )}

                </div>
                
            </div>
        </div>
        );
};

export default MiniEditor;