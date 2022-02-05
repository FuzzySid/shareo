import {storage} from '../firebase.config'
import { getDownloadURL, ref, uploadBytesResumable, getMetadata } from "firebase/storage";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom';

export default function Home(){
    const [video,setVideo]=useState(null)
    const [progress,setProgress]=useState(0)
    const [downloadedUrl,setDownloadedUrl]=useState(null)
    const [uploadStatus,setUploadStatus]=useState(null)
    const [uploadedVideoMetaData,setUploadedVideoMetaData]=useState(null)
  
    const resetStatesForNewUpload=()=>{
      if(downloadedUrl) setDownloadedUrl(null);
      if(uploadStatus!=null) setUploadStatus(null);
      if(uploadedVideoMetaData!=null) setUploadedVideoMetaData(null)
    }
  
    const handleChange=(e)=>{
      resetStatesForNewUpload();
      const _video=e.target.files[0];
      setVideo(_video)
    }
  
    const getUploadedVideoMetaData=(ref)=>{
      getMetadata(ref)
        .then((metadata) => {
          // Metadata now contains the metadata for 'images/forest.jpg'
          setUploadedVideoMetaData(metadata);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          setUploadedVideoMetaData(null);
        });
    }
  
    const uploadVideo=()=>{
      const videoId=nanoid();
      const videoRef=ref(storage,`videos/${videoId}`)
      const uploadVideo=uploadBytesResumable(videoRef,video);
      uploadVideo.on('state_changed',(snapshot)=>{
        const _progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setProgress(_progress)
      },
      (err)=>{
        console.log(err);
        setProgress(0);
        setUploadStatus(false);
      },
      ()=>{
        getDownloadURL(uploadVideo.snapshot.ref)
          .then(_downloadedUrl=>{
            setDownloadedUrl(_downloadedUrl)  
            setProgress(0)
            setUploadStatus(true)
            getUploadedVideoMetaData(videoRef);
        })
      }
      )
    }
  
    useEffect(()=>{
      if(video) uploadVideo()
    },[video])

    return(
        <div>
             <input onChange={handleChange} type="file" />
                {progress>0 && <h4>File Uploading... {progress}</h4>}
                {
                    uploadStatus!=null && 
                    (uploadStatus==true ? 
                    <p>Your file was uploaded successfully! </p>
                    :
                    <p>Oops! There was some error uploading the file</p>
                    )
                }
                {downloadedUrl && <a href={downloadedUrl}>Download File</a> }
                {uploadedVideoMetaData && 
                    <div> 
                    You can see your file by visiting 
                    <Link to={`/video/${uploadedVideoMetaData.name}`}>this</Link> link. You can also share the link with others 
                    to see the video. 
                    </div>
                }
        </div>
    )
}