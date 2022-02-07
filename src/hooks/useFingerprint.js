import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useState,useEffect } from 'react';


export default function useFingerprint(){
    const [fingerprintData,setFingerprintData]=useState(null);
    const [fingerprintPromise,setFingerprintPromise]=useState(null);
    const [fingerprintHash,setFingerprintHash]=useState(null)

    useEffect(()=>{
        setFingerprintPromise(FingerprintJS.load())
    },[])

    useEffect(async()=>{
        if(fingerprintPromise){
            const fpResponse = await fingerprintPromise
            const fpResult = await fpResponse.get()
            setFingerprintData(fpResult.components)
            setFingerprintHash(fpResult.visitorId)
        }
    },[fingerprintPromise])

    return {
        fingerprintData,
        fingerprintHash
    };

}