// Stage.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as C from 'cannon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MenuSticky from './MenuSticky';

const distance = 15;

interface LayoutProps {
	W: number;
	H: number;
}

interface StageProps {
	layout: LayoutProps;
}

const Stage: React.FC<StageProps> = ({ layout }) => {
	const stageRef = useRef<HTMLCanvasElement | null>(null);
	const worldRef = useRef<C.World>(new C.World());
	const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
	const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const menuRef = useRef<typeof MenuSticky | null>(null);

	useEffect(() => {
		const $stage = stageRef.current;

		// Init Physics world
		const world = worldRef.current;
		world.gravity.set(0, -50, 0);

		// Init Three components
		const scene = sceneRef.current;
		scene.fog = new THREE.Fog(0x312929, -10, 100);

		setCamera(layout);
		setLights();
		setRender($stage, layout);
		addObjects();

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [layout]);

	const onResize = () => {
		if (!cameraRef.current) return;

		const { W, H } = layout;
		cameraRef.current.aspect = W / H;
		cameraRef.current.top = distance;
		cameraRef.current.right = distance * cameraRef.current.aspect;
		cameraRef.current.bottom = -distance;
		cameraRef.current.left = -distance * cameraRef.current.aspect;

		cameraRef.current.updateProjectionMatrix();
		rendererRef.current?.setSize(W, H);
	};

	const setCamera = ({ W, H }: LayoutProps) => {
		const aspect = W / H;
		cameraRef.current = new THREE.OrthographicCamera(
			-distance * aspect,
			distance * aspect,
			distance,
			-distance,
			-10,
			100
		);
		cameraRef.current.position.set(-10, 10, 10);
		cameraRef.current.lookAt(new THREE.Vector3());
	};

	const setLights = () => {
		const scene = sceneRef.current;

		const ambient = new THREE.AmbientLight(0xcccccc);
		scene.add(ambient);

		const foreLight = new THREE.DirectionalLight(0xffffff, 0.5);
		foreLight.position.set(5, 5, 20);
		scene.add(foreLight);

		const backLight = new THREE.DirectionalLight(0xffffff, 1);
		backLight.position.set(-5, -5, -10);
		scene.add(backLight);
	};

	const setRender = ($stage: HTMLCanvasElement | null, { W, H }: LayoutProps) => {
		if (!$stage) return;

		rendererRef.current = new THREE.WebGLRenderer({
			antialias: true,
			canvas: $stage,
		});

		rendererRef.current.setClearColor(0x312929);
		rendererRef.current.setSize(W, H);
		rendererRef.current.setPixelRatio(window.devicePixelRatio);
		rendererRef.current.setAnimationLoop(() => draw());
	};

	const addObjects = () => {
		const scene = sceneRef.current;
		const world = worldRef.current;
		const camera = cameraRef.current;

		if (camera) {
			return <MenuSticky ref={menuRef} scene={scene} world={world} camera={camera} />;
		}
	};

	const draw = () => {
		updatePhysics();
		rendererRef.current?.render(sceneRef.current, cameraRef.current!);
	};

	const updatePhysics = () => {
		menuRef.current?.update();

		worldRef.current.step(1 / 60);
	};

	return <canvas id='stage' ref={stageRef} />;
};

export default Stage;
