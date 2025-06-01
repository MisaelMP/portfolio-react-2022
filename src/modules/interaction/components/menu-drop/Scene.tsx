import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import MenuDrop from './MenuDrop';

export type MenuItem = {
	label: string;
	href: string;
};

type SceneProps = {
	menuItems: MenuItem[];
};

const Scene: React.FC<SceneProps> = ({ menuItems }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const frameIdRef = useRef<number>();
	const menuDropRef = useRef<MenuDrop | null>(null);
	const sceneRef = useRef<THREE.Scene>();
	const cameraRef = useRef<THREE.OrthographicCamera>();
	const rendererRef = useRef<THREE.WebGLRenderer>();
	const worldRef = useRef<CANNON.World>();

	useLayoutEffect(() => {
		if (!containerRef.current || !canvasRef.current) return;

		// Immediately read window dimensions (guaranteed correct on hard reload):
		const initialW = window.innerWidth;
		const initialH = window.innerHeight;

		// Create Three.js Scene + OrthographicCamera
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x202533, -10, 100);
		sceneRef.current = scene;

		const distance = 15;
		const aspect = initialW / initialH;
		const camera = new THREE.OrthographicCamera(-distance * aspect, distance * aspect, distance, -distance, -10, 100);
		camera.position.set(-10, 10, 10);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		cameraRef.current = camera;

		// Add Lights
		const ambient = new THREE.AmbientLight(0xcccccc);
		scene.add(ambient);
		const foreLight = new THREE.DirectionalLight(0xffffff, 0.5);
		foreLight.position.set(5, 5, 20);
		scene.add(foreLight);
		const backLight = new THREE.DirectionalLight(0xffffff, 1);
		backLight.position.set(-5, -5, -10);
		scene.add(backLight);

		// Create Renderer (with transparent background)
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: canvasRef.current,
			alpha: true, // allow transparency
			preserveDrawingBuffer: false,
		});

		renderer.setClearColor(0x202533, 1);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(initialW, initialH, false);
		rendererRef.current = renderer;

		// Create Cannon‐ES World
		const world = new CANNON.World();
		world.gravity.set(0, -50, 0);
		worldRef.current = world;

		// Instantiate MenuDrop
		menuDropRef.current = new MenuDrop(menuItems, scene, world, camera);

		const isMobileOnLoad = initialW <= 767;
		const initialScale = isMobileOnLoad ? 0.7 : 1;
		scene.scale.set(initialScale, initialScale, initialScale);

		// onResize handler (for subsequent resizes):
		const onResize = () => {
			const newW = window.innerWidth; // use window.innerWidth again
			const newH = window.innerHeight;
			renderer.setSize(newW, newH);
			const newAspect = newW / newH;
			camera.left = -distance * newAspect;
			camera.right = distance * newAspect;
			camera.updateProjectionMatrix();
			const isMobileNow = newW <= 767;
			const scaleNow = isMobileNow ? 0.7 : 1;
			scene.scale.set(scaleNow, scaleNow, scaleNow);
		};
		window.addEventListener('resize', onResize);

		// Start animation loop:
		const animate = () => {
			world.step(1 / 60);
			menuDropRef.current?.update();
			renderer.render(scene, camera);
			frameIdRef.current = requestAnimationFrame(animate);
		};
		animate();

		// Cleanup on unmount
		return () => {
			window.removeEventListener('resize', onResize);
			if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
			renderer.dispose();
			scene.clear();
			world.bodies.forEach((b) => world.removeBody(b));
		};
	}, [menuItems]);

	return (
		<div ref={containerRef} className='fixed inset-0 overflow-hidden'>
			<canvas ref={canvasRef} className='w-full h-full block' />
		</div>
	);
};

export default Scene;
