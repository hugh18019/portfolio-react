import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import settings from '../../public/images/settings.svg';


const GameBoy = () => {
    const [loadedObj, setLoadedObj] = useState(false);

    const mountRef = useRef(null);
                    
    useEffect(() => {

        let mounted = true;

        (async () => {

            if (mounted) 
            {
                setLoadedObj(true);
            }

            if (loadedObj) 
            {
                var renderer = new THREE.WebGLRenderer();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    mountRef.current.appendChild(renderer.domElement);

                    const pmremGenerator = new THREE.PMREMGenerator( renderer );

                    var scene = new THREE.Scene();
                    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;
                    scene.background = new THREE.Color(0x1e2d3b);

                    const camera = new THREE.PerspectiveCamera 
                    (
                        55,
                        window.innerWidth / window.innerHeight, 
                        0.1,
                        1000
                    )
                    camera.position.set(0, 6, 20);

                    const controls = new OrbitControls( camera, renderer.domElement );
                    controls.target.set( 0, 6, 12 );
                    controls.update();
                    controls.enablePan = false;
                    controls.enableDamping = true;

                    var loader = new GLTFLoader();
                    var obj;

                    loader.load("/game_boy/game_boy.glb", function ( gltf )
                    {
                        obj = gltf.scene;
                        obj.receiveShadow = true;
                        obj.castShadow = true;
                        scene.add(obj);

                        animate();
                    }, undefined, function (e) {
                        console.log(e);
                    });

                    // var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
                    const ambientLight = new THREE.AmbientLight(0xcccccc, 0);
                    scene.add(ambientLight);
                    // scene.add(light);

                    window.onresize = function () {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();

                        renderer.setSize(window.innerWidth, window.innerHeight);
                    }

                    function resizeCanvasToDisplaySize() {
                        const canvas = renderer.domElement;
                        const width = canvas.clientWidth;
                        const height = canvas.clientHeight;
                        if (canvas.width !== width ||canvas.height !== height) {
                          // you must pass false here or three.js sadly fights the browser
                          renderer.setSize(width, height, false);
                          camera.aspect = width / height;
                          camera.updateProjectionMatrix();
                      
                          // set render target sizes here
                        }
                    }

                    function animate() {
                        resizeCanvasToDisplaySize();

                        requestAnimationFrame( animate );
                        obj.rotation.y += 0.02;
                        renderer.render( scene, camera );
                    };

                    return () => mountRef.current.removeChild( renderer.domElement );

            }
        })()

    }, [loadedObj])


    return (
        <div className="model-container" >
                <div className="hobby-title">
                    <Image src={settings} alt="settings"/>
                </div>
                <div style={{marginBottom: "10px"}} ref={mountRef} >

                </div>

                <div className="model-attribution" >
                    <a href="https://sketchfab.com/3d-models/game-boy-in-voxel-0a99ab3b9cac4bdeacc90118df63a8c9" target="_blank" rel="noopener noreferrer">
                        GAME BOY in voxel
                    </a>
                        by 
                    <a href="https://sketchfab.com/danidesa" target="_blank" rel="noopener noreferrer">
                        Dani Desa
                    </a>
                        , CC Attribution.
                </div>

        </div>
    );

}

export default GameBoy;