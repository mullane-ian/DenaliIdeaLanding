import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { useCursor, useGLTF } from '@react-three/drei'
import { material } from './store'
import img from '/denali.jpg'


const bottleMaterial = new THREE.MeshPhysicalMaterial({
    color: '#efefef',
    transmission: 1,
    roughness: 0.0,
    thickness: 2,
    envMapIntensity: 6,
    clearcoat:2,
    clearcoatRoughness:0

  })

  function Label({  ...props }) {
    const texture = useLoader(THREE.TextureLoader, img)
    
    return (
      <group {...props}>
        <mesh raycast={() => null}>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]}/>
          <meshStandardMaterial attach="material" doubleside={true} map={texture} roughness={1} />
        </mesh>
      </group>
    )
  }
  function Bud({hovered,...props}) {

    const group=useRef()

    const vec = new THREE.Vector3(9.5, 0, -70);
    const vec1 = new THREE.Vector3(9.5, 10, -15);


    useFrame((state)=>{
      hovered ? group.current.position.lerp(vec, 0.1):  group.current.position.lerp(vec1, 0.1)
      group.current.rotation.z = hovered ? Math.sin (state.clock.elapsedTime) * 0.5:  Math.sin (state.clock.elapsedTime) * 0.1;


    })
  
   
    const { nodes, materials } = useGLTF('/bud-transformed.glb')
    return (
      <group  rotation={[-Math.PI/2,0,0]}position={[-5,0,0]}ref={group} {...props} dispose={null}>
        <group position={[-12.29, -21.87, -5.38]} rotation={[1.57, 0, 0]}>
          <group rotation={[-Math.PI, 0, 0]}>
            <mesh geometry={nodes.meshNode_Material_u1_v1_0.geometry} material={materials.Material_u1_v1} />
          </group>
        </group>
      </group>
    )
  }


  function Bottle({ glas, cap, children, ...props }) {
    const ref = useRef()
    const lid = useRef()
    const vec = new THREE.Vector3(0, 0, -50);
    const vec1 = new THREE.Vector3(0, 0, 0);

    const { nodes } = useGLTF('/jar-transformed.glb')
    const [hovered, set] = useState(false)

    useCursor(hovered)
    
    useFrame((state)=>{
      
        // lid.current.position.z = Math.abs(Math.sin (state.clock.elapsedTime * 0.1) * (hovered?30:1))- (hovered?30:1)
        lid.current.rotation.z = hovered ? Math.sin (state.clock.elapsedTime) * 1:  Math.sin (state.clock.elapsedTime) * 0.1;
        hovered ? lid.current.position.lerp(vec, 0.1):  lid.current.position.lerp(vec1, 0.1)
        lid.current.rotation.x = hovered ? Math.sin (state.clock.elapsedTime) * 0.1:  0;
        lid.current.rotation.y = hovered ? Math.sin (state.clock.elapsedTime) * 0.05:  0;
        
        hovered ? lid.current.position.lerp(vec, 0.1):  lid.current.position.lerp(vec1, 0.1)
        
    })
    return (
      <group rotation={[Math.PI / 2, 0, 3]} {...props} onPointerOver={(e) => set(true)} onPointerOut={() => set(false)}>
        <group ref={ref}>
          <mesh castShadow geometry={nodes[glas].geometry} material={bottleMaterial} />
          <mesh castShadow ref={lid} geometry={nodes[cap].geometry} material={material.cap} material-color="white" />
        </group>
        <Bud hovered={hovered} />
      </group>
    )
  }


export default function Bottles({ ...props }) {
    const group = useRef()
    const label = useRef()


    const { nodes, materials } = useGLTF('/jar-transformed.glb')
    const [a, b] = useLoader(THREE.TextureLoader, ['/label.jpg', '/label.jpg'])

    return (
      <group ref={group} {...props} dispose={null}>

        <group {...props} dispose={null} scale={[0.3, 0.3, 0.3]}>
            <Bottle position={[0, 0, 0]} glas="Untitled023" cap="Untitled023_1">
                
            </Bottle>
            
        </group>
        <Label useRef={label}  scale={[6,5,5]} position={[0,4.9,-10]}/>

      </group>
    )
  }
  
  useGLTF.preload('/jar-transformed.glb')
