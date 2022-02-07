import {storage} from '../firebase.config'
import { ref, getDownloadURL } from "firebase/storage";
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Disqus from "disqus-react"
import ReactPlayer from 'react-player'
import useFingerprint from '../hooks/useFingerprint';

const disqusShortname = "shareo"
const disqusConfig = {
      url: "http://localhost:3000/video:videoid", //URL of the video page
      identifier: "article-id",                   //Video ID
      title: "Title of Your Article"              //From Video Metadata
}

export default function Video(){

    /* Video State */
    const [videoId,setVideoId]=useState(null);          //Video Nanoid
    const [notFound,setNotFound]=useState(false);       //Fallback for invalid video id in URL
    const [videoUrl,setVideoUrl]=useState(null);        //Download URL of the video

    /* Video State for Calculating Video View Session */
    const [videoDuration,setVideoDuration]=useState(null);              //Total Length of Video  
    const [isVideoStarted,setIsVideoStarted]=useState(false);           //If Video Start Button was pressed
    const [videoPlayedProgress,setVideoPlayedProgress]=useState(null);  //Keep track of video play pointer
    const [videoPausedState,setVideoPausedState]=useState(null);        //Keep track of video's state whenever paused
    const [isVideoPlaying,setIsVideoPlaying]=useState(false);           //If video is playing

    //Unique Fingerprint Hash
    const fingerprintHash=useFingerprint()

    const urlParams = useParams();
    
    useEffect(()=>{
        if(urlParams && urlParams.videoid){
            setVideoId(urlParams.videoid)
        }
        else setNotFound(true)
    },[])

    useEffect(()=>{
        if(videoId){
            const videoRef=ref(storage,`videos/${videoId}`)
            getDownloadURL(ref(videoRef))
            .then(_videoUrl=>{
              console.log(_videoUrl)
              setVideoUrl(_videoUrl)
            })
            .catch(error=>{
                console.log(error)
                setVideoId(null)
                setNotFound(true)
            })
        }
    },[videoId])

    const handleProgress=(playedProgress)=>setVideoPlayedProgress(playedProgress);

    const handleDuration=duration=>setVideoDuration(duration);

    const handleStart=()=>setIsVideoStarted(true);

    const handlePlay=()=>setIsVideoPlaying(true);

    const handlePause=(pausedState)=>setVideoPausedState(pausedState)

    useEffect(()=>{
        /*
            Compute a video view session using the dependencies and
            compare that session's length against the longest session
            length so far
        */
    },[
        videoPlayedProgress,
        videoDuration,
        isVideoPlaying,
        isVideoStarted,
        videoPausedState
    ])

    useEffect(()=>{

    },[isVideoStarted,videoPlayedProgress])

    return(
        <div className="videopage-container">
            <h3>Video Page</h3>
            {notFound==true && <p>Looks like the page you're looking for does not exist</p> }
            {
                videoUrl && 
                <div>
                    <ReactPlayer 
                        url={videoUrl} 
                        width={"400px"} 
                        controls 
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        progressInterval={3000}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onStart={handleStart}
                        style={{margin:'0 auto'}}
                    >
                    
                    </ReactPlayer>
                    <p>Views: <span></span></p>
                    <div className='comments-container'>
                     <Disqus.DiscussionEmbed
                        shortname={disqusShortname}
                        config={disqusConfig}
                        />
                    </div>
                </div>
            }
        </div>
    )
}