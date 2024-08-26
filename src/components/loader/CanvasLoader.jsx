import { Html, useProgress } from '@react-three/drei'
import React, { useEffect } from 'react'
import { CircularProgress } from './'
import { valtioState } from '../../redux/store/valtioStore'
import { useSnapshot } from 'valtio'

const CanvasLoader = () => {

    const { progress } = useProgress();

    valtioState.canvasKey = "";

    useEffect(() =>{
     if(progress === 100)
        valtioState.canvasKey = "Loaded";
     
    }, [progress])

  return (
    <Html>
        <span className='canvas-load'></span>
        <CircularProgress size={50} strokeWidth={5} percentage={progress} />
    </Html>
  )
}

export default CanvasLoader