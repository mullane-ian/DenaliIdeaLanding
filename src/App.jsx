import * as THREE from 'three'
import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, Environment,useGLTF } from '@react-three/drei'
import Bottles from './Bottles'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import FocusLock from 'react-focus-lock';
import { useOnClickOutside } from './hooks';
import Joints from './Joints'
function Zoom({ vec = new THREE.Vector3(0, 0, 100) }) {
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 10, 0, 100), 0.075)
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 22, 0.075)
    state.camera.updateProjectionMatrix()
  })
}


function Tree({...props}){
  const group = useRef()
  const { nodes, materials } = useGLTF('/treew-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.08}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Bark01_2_Bark01_SHD_0.geometry} material={nodes.Bark01_2_Bark01_SHD_0.material} />
            <mesh
              geometry={nodes.Bark01_2_Bark01_SHD_0001.geometry}
              material={nodes.Bark01_2_Bark01_SHD_0001.material}
            />
            <mesh
              geometry={nodes.Bark01_2_Bark01_SHD_0002.geometry}
              material={nodes.Bark01_2_Bark01_SHD_0002.material}
            />
            <mesh
              geometry={nodes.Leaf01_2_Leaf01_su_SHD_0.geometry}
              material={nodes.Leaf01_2_Leaf01_su_SHD_0.material}
            />
            <mesh
              geometry={nodes.Leaf01_2_Leaf01_su_SHD_0001.geometry}
              material={nodes.Leaf01_2_Leaf01_su_SHD_0001.material}
            />
            <mesh
              geometry={nodes.Leaf01_2_Leaf01_su_SHD_0002.geometry}
              material={nodes.Leaf01_2_Leaf01_su_SHD_0002.material}
            />
            <mesh
              geometry={nodes.Leaf01_2_Leaf01_su_SHD_0003.geometry}
              material={nodes.Leaf01_2_Leaf01_su_SHD_0003.material}
            />
          </group>
        </group>
      </group>
    </group>
  )
}



export default function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

    return (
      <>
          <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </FocusLock>
        </div>
      
        
      </>
    </ThemeProvider>
      <Canvas antialias={true} dpr={[1, 1.5]} shadows camera={{ position: [0, 0, 100], fov: 22 }}>
      <fog attach="fog" args={['#f0f0f0', 100, 150]} />
      <color attach="background" args={['#f0f0f0']} />
      <spotLight
        penumbra={1}
        angle={1}
        castShadow
        position={[10, 60, -5]}
        intensity={8}
        shadow-mapSize={[512, 512]}
      />
      <hemisphereLight intensity={0.2} />

       <Suspense fallback={null}>
       <Zoom />
        <group position={[2.5, -12, 0]}>
          <Bottles />
          <mesh
              rotation-x={-Math.PI / 2}
              position={[0, 0.01, 0]}
              scale={[200, 200, 200]}
              receiveShadow
              renderOrder={100000}>
              <planeBufferGeometry attach="geometry"  />
              <shadowMaterial attach="material" transparent color="#251005" opacity={0.2} />
            </mesh>
            <Reflector
              resolution={1024}
              mirror={0.5}
              mixBlur={1}
              mixStrength={2}
              depthScale={1}
              minDepthThreshold={1}
              maxDepthThreshold={1}
              rotation-x={-Math.PI / 2}
              rotation-z={Math.PI / 4}

            

              position={[0,-1,0]}
              args={[175, 175]}>
        
              {(Material, props) => <Material {...props} color="#2B8951" metalness={0} roughness={0.75} />}
            </Reflector>
        </group>
        <Environment preset="forest" />
        <Text
            position={[0, 14, -30]}
            letterSpacing={0.05}
            font="/Komoda.ttf"
            border={'1px solid red'}
            fontSize={20 } //if (screen width < ?)
            color="#2B8951"
            material-toneMapped={false}
            material-fog={false}
            anchorX="center"
            maxWidth={200}
            anchorY="middle">
            {`DENALI`}
          </Text> 
          <Text
            position={[0, -10, 30]}
            maxWidth={200}
            letterSpacing={0.05}
            font="/Komoda.ttf"
            fontSize={5 } //if (screen width < ?)
            color="#f0f0f0"
            material-toneMapped={false}
            material-fog={false}
            anchorX="center"
            anchorY="middle">
            {`Elevate Your High`}
          </Text> 
          <Tree position={[20,-10,-40]}/>
          <Tree position={[-20,-10,-40]}/>
          <Tree scale={[2,2,2]} position={[50,-20,-80]}/>
          <Tree scale={[1.5,2,2]} position={[-30,-20,-48]}/>
          <Tree scale={[1.5,3,2]} position={[-50,-20,-30]}/>
          <Tree scale={[3,2,2]} position={[0,-20,-70]}/>
          {/* <Joints speed={1}/> */}
       </Suspense>
      </Canvas>
      </>
      
    );
  };
