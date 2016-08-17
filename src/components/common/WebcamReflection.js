"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as UserActions from "../../actions/UserActions";
import * as ServerActions from "../../actions/ServerActions";
import {bindActionCreators} from "redux";
import {ReplayVideo} from "./ReplayVideo";

class WebcamReflection extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            streamObject: null,
            recordingObject: null,
            buffer: null,
            file: null,
            dataUrl: null,
            retrievedDataURL: null,
            thisBlob: null,
            readerResult: null,
            tempBuffer: null
        };

        this.beginRecording = this.beginRecording.bind(this);
        this.requestWebcamPermission = this.requestWebcamPermission.bind(this);
        this.endRecording = this.endRecording.bind(this);
        this.onDataAvailable = this.onDataAvailable.bind(this);
        this.bufferToDataUrl = this.bufferToDataUrl.bind(this);
        this.dataUrlToFile = this.dataUrlToFile.bind(this);
        this.playFromNewlyRecorded = this.playFromNewlyRecorded.bind(this);
        this.uploadToAWS = this.uploadToAWS.bind(this);
        this.retrieveFromAWS = this.retrieveFromAWS.bind(this);
    }

    beginRecording() {
        console.log(this.state.streamObject);
        let options = {mimeType: "video/webm"};
        let recorder = new MediaRecorder(this.state.streamObject, options);
        recorder.ondataavailable = this.onDataAvailable;
        recorder.start();
        this.setState({recordingObject: recorder});
    }

    onDataAvailable(event) {
        if(event.data) {
            let buffer = [];
            if (this.state.buffer) buffer = [...this.state.buffer];
            buffer.push(event.data);
            this.setState({buffer});
        }
    }

    endRecording() {
        let recordingObject = this.state.recordingObject;
        recordingObject.stop();
        //ends the feed below
        recordingObject.stream.getTracks().forEach(function(track) {track.stop();});
        this.bufferToDataUrl(this.state.buffer, (dataUrl, blob) => {
            let file = this.dataUrlToFile(dataUrl);
            this.setState({file});
            this.setState({dataUrl});
            this.setState({readerResult: dataUrl});
            this.setState({thisBlob: blob})
            //to download file
            /*let url = URL.createObjectURL(blob),
                el = document.createElement("a");

            document.body.appendChild(el);
            el.style = "display:none";
            el.href = url;
            el.download = "video.webm";
            el.click();
            URL.revokeObjectURL(url);*/
        });
    }

    playFromNewlyRecorded() {
        let video = document.querySelector("video");
        video.src = this.state.dataUrl;
        video.type = "video/webm";
        video.play();
        //video.onloadedmetadata = e => {video.play();
    }

    requestWebcamPermission() {
        let constraints = {
            audio: true,
            video: {
                height: {ideal: 720},
                width: {ideal: 1280}
            }
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                let video = document.querySelector("video");
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = e => video.play();
                this.setState({streamObject: stream});
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }

    bufferToDataUrl(buffer, callback) {
        let blob = new Blob(buffer, {
            type: "video/webm"
        });

        console.log("New blob: ", blob);
        let reader = new FileReader();
        reader.onload = function() {
            callback(reader.result, blob);
        };
        reader.readAsDataURL(blob);
    }

    dataUrlToFile(dataUrl) {
        let binary = atob(dataUrl.split(",")[1]);
        let data = [];
        for (let i = 0; i < binary.length; i++) {
            data.push(binary.charAt(i));
        }
        return new File([new Uint8Array(data)],'recorded-video.webm', {
            type: 'video/webm'
        });
    }

    uploadToAWS() {
        this.props.ServerActions.uploadToAWS(this.state.thisBlob);
    }
    
    retrieveFromAWS() {
        this.props.ServerActions.retrieveFromAWS();
        let setState = (state) => this.setState({readerResult: state});
        let setBuffer = (state) => this.setState({tempBuffer: state});
        fetch("/api/users/retrieveVideo")
            .then(response => {
                console.log("Response: ", response)
                return response.json();
            })
            .then(parsedResponse => {
                console.log("Parsed response: ", parsedResponse);

                setBuffer(parsedResponse.Body.data);
                this.bufferToDataUrl(this.state.tempBuffer, (dataUrl, blob) => {
                   this.setState({readerResult: dataUrl});


                    let url = URL.createObjectURL(blob),
                        el = document.createElement("a");

                    document.body.appendChild(el);
                    el.style = "display:none";
                    el.href = url;
                    el.download = "video.webm";
                    el.click();
                    URL.revokeObjectURL(url);
                });
            })
            .catch(error => {
                console.log("Error: ", error);
            });

    }


    render() {
        let replayVideo;
        if (this.state.readerResult) replayVideo = <ReplayVideo source={this.state.readerResult}/>
        return (
            <div className="container-fluid">
                <div id="webcamContainer">
                    <video autoPlay="true" id="videoElement">

                    </video>
                </div>
                <button className="button"
                        onClick={this.requestWebcamPermission}>Request</button>
                <button onClick={this.beginRecording}>Begin</button>
                <button onClick={this.endRecording}>End</button>
                <button onClick={this.playFromNewlyRecorded}>Play from Recorded</button>
                <button onClick={this.uploadToAWS}>Upload</button>
                <button onClick={this.retrieveFromAWS}>Retrieve from AWS</button>
                <div>
                    {replayVideo}
                </div>
            </div>
        );

    }
}

WebcamReflection.propTypes = {
    ServerActions: PropTypes.object.isRequired,
    UserActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        ServerActions: bindActionCreators(ServerActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WebcamReflection);