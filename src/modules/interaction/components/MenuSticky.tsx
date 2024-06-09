import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as C from 'cannon';

const force = 30;
const fontURL = '';
const colors = [
	{
		from: new THREE.Color('#DF872D'),
		to: new THREE.Color('#B35E07'),
	},
	{
		from: new THREE.Color('#e2ad76'),
		to: new THREE.Color('#bb7d6e'),
	},
	{
		from: new THREE.Color('#5d3d42'),
		to: new THREE.Color('#5d2d29'),
	},
];

interface MenuProps {
	scene: THREE.Scene;
	world: C.World;
	camera: THREE.Camera;
}

interface MenuHandle {
	update: () => void;
}

const MenuSticky = forwardRef<MenuHandle, MenuProps>(({ scene, world, camera }, ref) => {
	const loader = new FontLoader();
	const mouse = new THREE.Vector2();
	const raycaster = new THREE.Raycaster();
	const wordsRef = useRef<THREE.Group[]>([]);
	const navItemsRef = useRef<NodeListOf<HTMLAnchorElement>>(document.querySelectorAll('.mainNav a'));

	useEffect(() => {
		loader.load(fontURL, (font) => setup(font));

		const clickListener = onClick;
		const mouseMoveListener = onMouseMove;

		document.addEventListener('click', clickListener);
		window.addEventListener('mousemove', mouseMoveListener);

		return () => {
			document.removeEventListener('click', clickListener);
			window.removeEventListener('mousemove', mouseMoveListener);
		};
	}, []);

	const setup = (font: THREE.Font) => {
		const cMaterial = new C.Material();
		const totalMass = 1;
		const margin = 6;
		const offset = navItemsRef.current.length * margin * 0.5 - 1;
		const options = {
			font,
			size: 3,
			height: 0.4,
			curveSegments: 24,
			bevelEnabled: true,
			bevelThickness: 0.9,
			bevelSize: 0.3,
			bevelOffset: 0,
			bevelSegments: 10,
		};

		const words: THREE.Group[] = [];
		navItemsRef.current.forEach(($item, i) => {
			const { innerText } = $item;
			const wordGroup = new THREE.Group();
			wordGroup.userData.len = 0;

			Array.from(innerText).forEach((letter, j) => {
				const progress = j / (innerText.length - 1);
				const material = new THREE.MeshPhongMaterial({
					color: colors[i].from.lerp(colors[i].to, progress),
					shininess: 200,
				});
				const geometry = new THREE.TextBufferGeometry(letter, options);

				geometry.computeBoundingBox();
				geometry.computeBoundingSphere();

				const mesh = new THREE.Mesh(geometry, material);
				mesh.userData.size = geometry.boundingBox!.getSize(new THREE.Vector3()).multiplyScalar(0.5);

				const initPosition = new C.Vec3(
					wordGroup.userData.len * 2,
					(navItemsRef.current.length - 1 - i) * margin - offset,
					0
				);
				wordGroup.userData.len += mesh.userData.size.x;

				const box = new C.Box(new C.Vec3(mesh.userData.size.x, mesh.userData.size.y, mesh.userData.size.z));
				mesh.userData.body = new C.Body({
					mass: totalMass / innerText.length,
					position: initPosition,
					material: cMaterial,
				});
				mesh.userData.body.addShape(
					box,
					new C.Vec3(
						geometry.boundingSphere!.center.x,
						geometry.boundingSphere!.center.y,
						geometry.boundingSphere!.center.z
					)
				);

				world.addBody(mesh.userData.body);
				wordGroup.add(mesh);
			});

			wordGroup.children.forEach((letter: THREE.Object3D) => {
				letter.userData.body.position.x -= wordGroup.userData.len;
			});

			words.push(wordGroup);
			scene.add(wordGroup);
		});

		wordsRef.current = words;
		setConstraints(words);
		addPivots(words);
	};

	const setConstraints = (words: THREE.Group[]) => {
		words.forEach((word) => {
			for (let i = 0; i < word.children.length; i++) {
				const letter = word.children[i];
				const nextLetter = i + 1 === word.children.length ? null : word.children[i + 1];
				if (!nextLetter) continue;

				const c = new C.ConeTwistConstraint(letter.userData.body, nextLetter.userData.body, {
					pivotA: new C.Vec3(letter.userData.size.x * 0.7, letter.userData.size.y, 0),
					pivotB: new C.Vec3(-letter.userData.size.x * 0.7, letter.userData.size.y, 0),
					axisA: C.Vec3.UNIT_X,
					axisB: C.Vec3.UNIT_X,
					angle: 0,
					twistAngle: 0,
				});
				c.collideConnected = true;
				world.addConstraint(c);
			}
		});
	};

	const addPivots = (words: THREE.Group[]) => {
		words.forEach((word) => {
			const firstLetter = word.children[0];
			const lastLetter = word.children[word.children.length - 1];

			word.userData.pA = new C.Body({
				mass: 0,
				position: new C.Vec3(
					firstLetter.userData.body.position.x - 2,
					firstLetter.userData.body.position.y + firstLetter.geometry.boundingSphere!.center.y,
					firstLetter.geometry.boundingSphere!.center.z
				),
				shape: new C.Sphere(0.1),
			});

			word.userData.pB = new C.Body({
				mass: 0,
				position: new C.Vec3(
					lastLetter.userData.body.position.x + lastLetter.userData.size.x + 2.5,
					lastLetter.userData.body.position.y + lastLetter.geometry.boundingSphere!.center.y,
					lastLetter.geometry.boundingSphere!.center.z
				),
				shape: new C.Sphere(0.1),
			});

			const cA = new C.ConeTwistConstraint(word.userData.pA, firstLetter.userData.body, {
				pivotA: new C.Vec3(2, 0.5, 0.5),
				pivotB: new C.Vec3(
					0,
					firstLetter.geometry.boundingSphere!.center.y,
					firstLetter.geometry.boundingSphere!.center.z
				),
				axisA: C.Vec3.UNIT_X,
				axisB: C.Vec3.UNIT_X,
			});

			const cB = new C.ConeTwistConstraint(word.userData.pB, lastLetter.userData.body, {
				pivotA: new C.Vec3(-lastLetter.userData.size.x - 2.5, 0.5, 0.5),
				pivotB: new C.Vec3(
					0,
					lastLetter.geometry.boundingSphere!.center.y,
					lastLetter.geometry.boundingSphere!.center.z
				),
				axisA: C.Vec3.UNIT_X,
				axisB: C.Vec3.UNIT_X,
			});

			world.addConstraint(cA);
			world.addConstraint(cB);

			world.addBody(word.userData.pA);
			world.addBody(word.userData.pB);
		});
	};

	const onMouseMove = (event: MouseEvent) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects(scene.children, true);
		document.body.style.cursor = intersects.length > 0 ? 'pointer' : '';
	};

	const onClick = () => {
		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length > 0) {
			const obj = intersects[0];
			const { object, face } = obj;

			if (!object.isMesh) return;

			const impulse = new C.Vec3().copy(face.normal).scale(-force);

			wordsRef.current.forEach((word) => {
				word.children.forEach((letter: THREE.Object3D) => {
					const body = letter.userData.body;
					if (letter !== object) return;
					body.applyLocalImpulse(impulse, new C.Vec3());
				});
			});
		}
	};

	const update = () => {
		if (!wordsRef.current) return;

		wordsRef.current.forEach((word) => {
			for (let i = 0; i < word.children.length; i++) {
				const letter = word.children[i];
				letter.position.copy(letter.userData.body.position);
				letter.quaternion.copy(letter.userData.body.quaternion);
			}
		});
		requestAnimationFrame(update);
	};

	useImperativeHandle(ref, () => ({
		update,
	}));

	return null; // This component does not render anything
});

export default MenuSticky;
