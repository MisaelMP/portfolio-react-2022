import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FontLoader, TextGeometryParameters, Font, TextGeometry } from 'three-stdlib';

/** A color‐range type for gradient interpolation. */
type ColorRange = { from: THREE.Color; to: THREE.Color };

const COLORS: ColorRange[] = [
	{ from: new THREE.Color('#ff699f'), to: new THREE.Color('#a769ff') },
	{ from: new THREE.Color('#683fee'), to: new THREE.Color('#527ee1') },
	{ from: new THREE.Color('#ee663f'), to: new THREE.Color('#f5678d') },
	{ from: new THREE.Color('#ee9ca7'), to: new THREE.Color('#ffdde1') },
	{ from: new THREE.Color('#f7971e'), to: new THREE.Color('#ffd200') },
	{ from: new THREE.Color('#56ccf2'), to: new THREE.Color('#2f80ed') },
	{ from: new THREE.Color('#fc5c7d'), to: new THREE.Color('#6a82fb') },
	{ from: new THREE.Color('#dce35b'), to: new THREE.Color('#45b649') },
];

function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Each letter mesh carries its Cannon body, initial offset, and size.
 */
interface LetterMesh extends THREE.Mesh {
	body: CANNON.Body;
	initPositionOffset: CANNON.Vec3;
	initPosition: CANNON.Vec3;
	size: THREE.Vector3;
}

// Add bevelSegments to the type and options
type ExtendedTextGeometryParameters = TextGeometryParameters & { bevelSegments?: number };

/**
 * We store a “ground” body and a flag on each word group.
 * We also stash the href so you could navigate when that word is clicked.
 */
interface WordGroup extends THREE.Group {
	ground: CANNON.Body;
	len: number;
	isGroundDisplayed: boolean;
	href: string;
}

/**
 * MenuDrop no longer queries the DOM. Instead, we pass in an array of
 * { label, href } items. We render each label as a 3D word stack.
 */
export default class MenuDrop {
	private scene: THREE.Scene;
	private world: CANNON.World;
	private camera: THREE.Camera;
	private clock = new THREE.Clock();
	private loader = new FontLoader();
	private mouse = new THREE.Vector2();
	private raycaster = new THREE.Raycaster();
	private cMaterial = new CANNON.Material('cMaterial');
	private worldMat = new CANNON.Material('worldMat');
	private totalMass = 1;
	private margin = 6;
	private offset = 0;
	private force = 25;
	private words: WordGroup[] = [];
	private items: { label: string; href: string }[];

	/**
	 * @param items   Each object has `.label` (string) and `.href` (string).
	 * @param scene   The Three.js Scene to add into.
	 * @param world   The Cannon-es World to add bodies into.
	 * @param camera  The Three.js Camera used for raycasting.
	 */
	constructor(items: { label: string; href: string }[], scene: THREE.Scene, world: CANNON.World, camera: THREE.Camera) {
		this.items = items;
		this.scene = scene;
		this.world = world;
		this.camera = camera;

		// We center the stack of words around Y = 0:
		this.offset = this.items.length * this.margin * 0.5;

		// Load the font, then build everything:
		this.loader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
			this.setup(font);
		});

		this.bindEvents();
	}

	/** Listen for click & mousemove. */
	private bindEvents() {
		document.addEventListener('click', () => this.onClick());
		window.addEventListener('mousemove', (e) => this.onMouseMove(e));
	}

	/**
	 * Build every word‐group from `this.items`.
	 */
	private setup(font: Font) {
		this.words = [];

		const textOptions: ExtendedTextGeometryParameters = {
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
		// We reverse so that items[0] ends up at the bottom in 3D space:
		this.items
			.slice()
			.reverse()
			.forEach((item, i) => {
				const wordGroup = new THREE.Group() as WordGroup;
				wordGroup.len = 0;
				wordGroup.isGroundDisplayed = false;
				wordGroup.href = item.href;

				// An invisible “ground” plane for this word:
				wordGroup.ground = new CANNON.Body({
					mass: 0,
					shape: new CANNON.Box(new CANNON.Vec3(50, 50, 0.1)),
					quaternion: new CANNON.Quaternion().setFromEuler(Math.PI / -2, 0, 0),
					position: new CANNON.Vec3(0, i * this.margin - this.offset, 0),
					material: this.worldMat,
				});

				const randomColor = pick(COLORS);
				const innerText = item.label;

				innerText.split('').forEach((letterChar, j) => {
					const progress = j / (innerText.length - 1);
					const letterGeo = new TextGeometry(letterChar, textOptions);
					letterGeo.computeBoundingBox();
					letterGeo.computeBoundingSphere();

					// MeshPhongMaterial with gradient:
					const material = new THREE.MeshPhongMaterial({
						color: randomColor.from.clone().lerp(randomColor.to, progress),
					});
					const mesh = new THREE.Mesh(letterGeo, material) as unknown as LetterMesh;

					// Store half‐size for the Cannon box:
					mesh.size = letterGeo.boundingBox!.getSize(new THREE.Vector3()).multiplyScalar(0.5);

					// “Rest” position in world‐space (centered on Y, z=0):
					mesh.initPosition = new CANNON.Vec3(
						wordGroup.len * 2,
						(this.items.length - 1 - i) * this.margin - this.offset,
						0
					);
					// Offset to drop from:
					mesh.initPositionOffset = new CANNON.Vec3(
						mesh.initPosition.x,
						mesh.initPosition.y + (i + 1) * 30 + 30 + j * 0.01,
						mesh.initPosition.z
					);

					wordGroup.len += mesh.size.x;

					// Cannon box shape that matches the letter's half‐extents:
					const boxShape = new CANNON.Box(new CANNON.Vec3(mesh.size.x, mesh.size.y, mesh.size.z));
					const body = new CANNON.Body({
						mass: this.totalMass / innerText.length,
						position: mesh.initPositionOffset.clone(),
						material: this.cMaterial,
						angularDamping: 0.99,
					});
					body.addShape(
						boxShape,
						new CANNON.Vec3(
							letterGeo.boundingSphere!.center.x,
							letterGeo.boundingSphere!.center.y,
							letterGeo.boundingSphere!.center.z
						)
					);

					this.world.addBody(body);
					mesh.body = body;
					wordGroup.add(mesh);
				});

				// Center entire word by shifting letters' x:
				wordGroup.children.forEach((letter) => {
					const lm = letter as LetterMesh;
					lm.body.position.x -= wordGroup.len;
				});

				this.words.push(wordGroup);
				this.scene.add(wordGroup);
			});

		// Add a ContactMaterial for friction/restitution:
		const contactMat = new CANNON.ContactMaterial(this.cMaterial, this.worldMat, {
			friction: 0.002,
			restitution: 0.2,
			contactEquationStiffness: 1e20,
			contactEquationRelaxation: 3,
		});
		this.world.addContactMaterial(contactMat);

		this.setConstraints();
	}

	/** On mousemove, raycast to set cursor style. */
	private onMouseMove(event: MouseEvent) {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycaster.intersectObjects(this.scene.children, true);
		document.body.style.cursor = intersects.length > 0 ? 'pointer' : '';
	}

	/**
	 * On click:
	 *  Raycast, find intersected letter.
	 *  Apply impulse to that letter’s body.
	 *  Remove that word’s “ground” after a short delay, so it falls.
	 *  Optionally, navigate to the word’s href—uncomment if desired.
	 */
	private onClick() {
		this.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycaster.intersectObjects(this.scene.children, true);
		if (!intersects.length) return;

		const { object, face } = intersects[0];
		if (!(object instanceof THREE.Mesh) || !face) return;

		const normal = face.normal as THREE.Vector3;
		const cannonNormal = new CANNON.Vec3(normal.x, normal.y, normal.z);
		const impulse = cannonNormal.scale(-this.force);

		this.words.forEach((word, idx) => {
			word.children.forEach((letter) => {
				const lm = letter as LetterMesh;
				if (lm !== object) return;

				// Apply the impulse and delay the navigation:
				lm.body.applyLocalImpulse(impulse, new CANNON.Vec3());

				setTimeout(() => {
					window.open(word.href, '_blank');
				}, 1000);
			});

			// Remove the “ground” as before:
			setTimeout(() => {
				this.world.removeBody(word.ground);
			}, 150 * (1 - this.clock.getDelta()) * (this.words.length + idx));
		});
	}

	/** Called each frame (after world.step). Sync meshes to bodies + check resets. */
	public update() {
		if (!this.words.length) return;

		this.words.forEach((word, wIdx) => {
			word.children.forEach((letterObj, lIdx) => {
				const lm = letterObj as LetterMesh;
				lm.position.copy(lm.body.position as unknown as THREE.Vector3);
				lm.quaternion.copy(lm.body.quaternion as unknown as THREE.Quaternion);

				// If last word has fallen below y = -50, reset everything:
				if (wIdx === this.words.length - 1 && lm.body.position.y <= -50) {
					this.resetAll();
				}

				if (word.isGroundDisplayed) return;

				// If letter touches “ground‐plane” (body.y + initY ≤ 0), add that word’s ground:
				if (lm.body.position.y + lm.initPosition.y <= 0) {
					this.world.addBody(word.ground);
					word.isGroundDisplayed = true;
				}
			});
		});
	}

	/** Reset all words to their original positions and re‐colour. */
	private resetAll() {
		this.words.forEach((word) => {
			word.isGroundDisplayed = false;
			const randomColor = pick(COLORS);

			word.children.forEach((letterObj, idx) => {
				const lm = letterObj as LetterMesh;
				const progress = idx / (word.children.length - 1);

				lm.body.sleep();
				const lmMaterial = lm.material as THREE.MeshPhongMaterial;
				lmMaterial.color = randomColor.from.clone().lerp(randomColor.to, progress);
				lmMaterial.needsUpdate = true;

				const { x, y, z } = lm.initPositionOffset;
				lm.body.position.set(x - word.len, y, z);
				lm.body.quaternion.set(0, 0, 0, 1);
				lm.body.angularVelocity.setZero();
				lm.body.force.setZero();
				lm.body.torque.setZero();
				lm.body.wakeUp();
			});
		});
	}

	/** Constrain each pair of adjacent letters in a word. */
	private setConstraints() {
		this.words.forEach((word) => {
			for (let i = 0; i < word.children.length - 1; i++) {
				const meshA = word.children[i] as LetterMesh;
				const meshB = word.children[i + 1] as LetterMesh;

				const constraint = new CANNON.ConeTwistConstraint(meshA.body, meshB.body, {
					pivotA: new CANNON.Vec3(meshA.size.x * 2, 0, 0),
					pivotB: new CANNON.Vec3(0, 0, 0),
					axisA: CANNON.Vec3.UNIT_X,
					axisB: CANNON.Vec3.UNIT_X,
					angle: 0,
					twistAngle: 0,
					maxForce: 1e30,
				});
				constraint.collideConnected = true;
				this.world.addConstraint(constraint);
			}
		});
	}
}
