import {useState, useRef, useEffect} from 'react';
import './mini-code.css';
import ReactAce from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import mie from '../../lib/mie.js';

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

    const cleanup = useRef(null);
	const play = () => {
        if (cleanup.current !== null) cleanup.current();

        const myP5 = mie.lang[codeLang].play.call(this, updatedCode, previewElem);

        cleanup.current = myP5.remove;
	};

    useEffect(() => {
        play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]); // This insures we run only once on load

	// toggleEditor() {
	// 	if (this.editorElem.style.display == 'none') {
	// 		this.showEditor();
	// 	} else {
	// 		this.hideEditor();
	// 	}
	// }

	// showEditor() {
	// 	let ed = this.editorElem;
	// 	let pr = this.previewElem;
	// 	ed.style.display = 'block';
	// 	pr.style.width = 'unset';
	// 	this.editor.focus();
	// }

	// hideEditor() {
	// 	let ed = this.editorElem;
	// 	let pr = this.previewElem;
	// 	pr.style.width = '100%';
	// 	ed.style.display = 'none';
	// }
    
    return (
            <div 
                className={`mie ${codeLang} ${props.horiz ? 'horiz' : 'vert'}`}
                style={{
                    width: props.width || '',
                    height: props.height || ''

                }}
            >
                <div className={'mie-title'}>
                    <div className={'mie-logo'}></div>
                    <span>
                        {props.title}
                    </span>
                    { /*props.editorButton && */
                        (<button 
                            className={'mie-edit'}
                            onClick={() => {
                                // toggleEditor();
                            }}
                        >
                            {'{ }'}
                        </button>)
                    }
                    <button
                        className={'mie-play'}
                        title={'replay'}
                        onClick={() => play()}
                    />
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
                    {!mie.editorDisabled && (
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
        );
};

export default MiniEditor;