import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
// https://github.com/pmndrs/drei
import { useGLTF, Detailed, Environment } from '@react-three/drei'
// https://github.com/pmndrs/react-postprocessing
// https://github.com/vanruesc/postprocessing
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'


function Joint({ index, z, speed }) {
    const ref = useRef()
    const refy = useRef()

    // useThree gives you access to the R3F state model
    const { viewport, camera } = useThree()
    // getCurrentViewport is a helper that calculates the size of the viewport
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
    // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
    // It can automatically handle draco and meshopt-compressed assets without you having to
    // worry about binaries and such ...
    const { nodes, materials } = useGLTF('/joint-transformed.glb')
    // By the time we're here the model is loaded, this is possible through React suspense
  
    // Local component state, it is safe to mutate because it's fixed data

  
    // useFrame executes 60 times per second
    // useFrame((state, dt) => {
      
    //   // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    //   // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    //   // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    //   if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
    //   // Rotate the object around
    //   ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
    //   // If they're too far up, set them back to the bottom
    //   if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    // })
    useFrame((state)=>{
        ref.current.rotation.set(Math.sin(state.clock.elapsedTime) * 0.1,Math.sin(state.clock.elapsedTime) * 0.1,Math.sin(state.clock.elapsedTime) * 0.1)
        refy.current.rotation.set(Math.sin(state.clock.elapsedTime) * 0.1,Math.sin(state.clock.elapsedTime) * 0.1,Math.sin(state.clock.elapsedTime) * 0.1)

    })
  
    // Using drei's detailed is a nice trick to reduce the vertex count because
    // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...
    return (
        <>
              <Detailed ref={ref} distances={[0,65,80]}>
              <mesh
              scale={6}
              position={[-15,3,0]}
              rotation={[0,Math.PI/4,0]}
              ref={ref}
              geometry={nodes['Simplygon_Proxy_5153e068-431a-4114-9fa9-ebc27b8ea276_SimplygonM'].geometry}
              material={materials.SimplygonMaterial}
            />
            
      </Detailed>
      <Detailed ref={refy} distances={[0,65,80]}>
              <mesh
              scale={6}
              position={[20,3,0]}
              rotation={[0,Math.PI/4,0]}
              ref={ref}
              geometry={nodes['Simplygon_Proxy_5153e068-431a-4114-9fa9-ebc27b8ea276_SimplygonM'].geometry}
              material={materials.SimplygonMaterial}
            />
            
      </Detailed>
        </>
      
      
    )
  }

export default function Joints(){
    return (
        <Joint castShadow/>


    )
}