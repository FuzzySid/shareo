import {storage} from '../firebase.config'
import { ref, getDownloadURL } from "firebase/storage";
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Video(){

    const [videoId,setVideoId]=useState(null)
    const [notFound,setNotFound]=useState(false)
    const [videoUrl,setVideoUrl]=useState(null)

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

    return(
        <div className="videopage-container">
            <h3>Video Page</h3>
            {notFound==true && <p>Looks like the page you're looking for does not exist</p> }
            {
                videoUrl && 
                <div>
                    <video width="320" height="240" controls>
                        <source src={videoUrl} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <p>Views: <span></span></p>
                    <div>
                        {/* Comments */}
                    </div>
                </div>
            }
        </div>
    )
}