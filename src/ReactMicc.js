import React, { Component } from 'react';

import { ReactMic } from 'react-mic';
import intro from './intro.m4a'
import ding from './ding.m4a'
import outro from './outro.m4a'
import ReactGA from 'react-ga';
import ReactAudioPlayer from 'react-audio-player';
import './styles.css';

ReactGA.initialize('UA-98862819-1');

export default class ReactMicc extends Component {
    constructor(props) {
        super(props);
        this.rap = React.createRef();
        this.rap2 = React.createRef();
        this.rap3 = React.createRef();
        this.rap4 = React.createRef();
        this.state = {
            begin: false,
            blobObject: null,
            isRecording: false,
            isPaused: false
        }
    }

    componentDidMount() {
        ReactGA.pageview(window.location.pathname);
    }

    startOrPauseRecording = () => {
        const { isPaused, isRecording } = this.state

        if (isPaused) {
            this.setState({ isPaused: false })
        } else if (isRecording) {
            this.setState({ isPaused: true })
        } else {
            this.setState({ isRecording: true })
        }
    }

    stopRecording = () => {
        this.setState({ isRecording: false });
    }

    onSave = (blobObject) => {
    }

    onStart = () => {
        console.log('You can tap into the onStart callback');
    }

    onStop = (blobObject) => {
        console.log('save')
        this.setState({ blobURL: blobObject.blobURL });
    }

    onData(recordedBlob) {
        console.log('ONDATA CALL IS BEING CALLED! ', recordedBlob);
    }

    onBlock() {
        alert('ya blocked me!')
    }

    onPause() {
        alert('ya paused it')
    }

    onBeginClick = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true })
            this.rap.audioEl.play()
        } catch (error) {
            console.log(error)
            console.log('error')
        }
    }

    onEnded = () => {
        console.log('recorded')
        this.setState({ isRecording: true })
        setTimeout(
            function () {
                this.stopRecording()
                this.rap2.audioEl.play()
            }.bind(this), 5000
        )
    }
    onEnded2 = () => {
        console.log('recorded')
        this.rap3.audioEl.play()
    }

    onEnded3 = () => {
        console.log('stapp')
        this.rap4.audioEl.play()
    }

    render() {
        const { blobURL, isRecording, isPaused } = this.state;

        return (
            <div>
                {/* Intro and first ding*/}
                <ReactAudioPlayer
                    src={intro}
                    controls
                    ref={(element) => { this.rap = element; }}
                    onEnded={this.onEnded}
                />
                {/* Second ding */}
                <ReactAudioPlayer
                    src={ding}
                    controls
                    ref={(element) => { this.rap2 = element; }}
                    onEnded={this.onEnded2}
                />
                {/* Record play */}
                <ReactAudioPlayer
                    src={this.state.blobURL}
                    controls
                    ref={(element) => { this.rap3 = element; }}
                    onEnded={this.onEnded3}
                />
                {/* Outtro */}
                <ReactAudioPlayer
                    src={outro}
                    controls
                    ref={(element) => { this.rap4 = element; }}
                />
                <button onClick={this.onBeginClick}>Begin</button>
                <ReactMic
                    record={isRecording}
                    pause={isPaused}
                    audioBitsPerSecond={128000}
                    onStop={this.onStop}
                    onStart={this.onStart}
                    onSave={this.onSave}
                    onData={this.onData}
                />
                {/* <h1>React-Mic-Plus</h1>
                <p><a href="https://github.com/hackingbeauty/react-mic">Documentation</a></p>
                <ReactMic
                    className="oscilloscope"
                    record={isRecording}
                    pause={isPaused}
                    backgroundColor="#FF4081"
                    visualSetting="sinewave"
                    audioBitsPerSecond={128000}
                    onStop={this.onStop}
                    onStart={this.onStart}
                    onSave={this.onSave}
                    onData={this.onData}
                    onBlock={this.onBlock} //Only available in React-Mic-Plus
                    onPause={this.onPause} //Only available in React-Mic-Plus
                    strokeColor="#000000" />
                <button onClick={this.onBeginClick}>asdjahdkjashdk</button>
                <div>
                    <audio ref="audioSource" controls="controls" src={blobURL}></audio>
                </div>
                <br />
                <br />
                <button
                    className="btn"
                    secondary={true}
                    onClick={this.startOrPauseRecording}>
                    {(isRecording && !isPaused) ? 'pause' : 'on'}
                </button>
                <button
                    className="btn"
                    secondary={true}
                    disabled={!isRecording}
                    onClick={this.stopRecording}>
                    <span>off</span>
                </button>
                <br />
                <br />
                <br />
                <p>As featured in the course <br /><a href="http://professionalreactapp.com">How To Develop A Professional React App</a></p>
                <br />
                <br />
                <p>Check out how I use it in my app
          <br />
                    <a href="http://voicerecordpro.com" target="_blank">Voice Record Pro</a> (record your voice and publish it)</p> */}
            </div>
        );
    }
}
