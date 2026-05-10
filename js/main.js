import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  initHero3D();
  initScrollHero();
  initRevealAnimation();
});

/* ===== 3D HERO MODEL - GLB MODEL ===== */
function initHero3D() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0.8, 5.8);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 2.2);
  directional.position.set(4, 6, 5);
  scene.add(directional);

  const greenLight = new THREE.PointLight(0x38d6a3, 18, 20);
  greenLight.position.set(4, -2, 4);
  scene.add(greenLight);

  const blueLight = new THREE.PointLight(0x5c7cfa, 18, 20);
  blueLight.position.set(-4, 2, 3);
  scene.add(blueLight);

  const loader = new GLTFLoader();

  let model;
  let mixer;
  const clock = new THREE.Clock();

  loader.load(
    "./assets/models/robot_playground.glb",
    (gltf) => {
      model = gltf.scene;

      model.scale.set(1.55, 1.55, 1.55);
      model.position.set(0, -0.15, 0);

      // Change this to 0 if it faces the wrong side
     model.rotation.y = -Math.PI / 16;

      scene.add(model);

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);

        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }
    },
    undefined,
    (error) => {
      console.error("Model loading failed:", error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) {
      mixer.update(delta);
    }

    if (model) {
      model.position.y = -0.15 + Math.sin(Date.now() * 0.0012) * 0.06;
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  });
}

/* ===== HERO SCROLL TRANSFORMATION ===== */
function initScrollHero() {
  const model = document.getElementById("hero3dWrap");
  const text = document.getElementById("heroText");

  if (!model || !text) return;

  const isMobile = window.innerWidth <= 1024;

  if (isMobile) {
    model.style.animation = "none";
    model.style.opacity = "1";
    model.style.transform = "none";

    text.style.opacity = "1";
    text.style.transform = "none";
    text.style.pointerEvents = "auto";
    return;
  }

  setTimeout(() => {
    model.style.animation = "none";
    model.style.opacity = "1";
  }, 1300);

  function updateHero() {
    const progress = Math.min(window.scrollY / 120, 1);

    const moveX = progress * 28;
    const scale = 1 - progress * 0.28;

    const textOpacity = progress;
    const textX = 80 - progress * 80;

    model.style.transform = `translateX(${moveX}vw) scale(${scale})`;

    text.style.opacity = textOpacity;
    text.style.transform = `translate(-${textX}px, -50%)`;
    text.style.pointerEvents = progress > 0.25 ? "auto" : "none";
  }

  window.addEventListener("scroll", updateHero, { passive: true });
  updateHero();
}

/* ===== REVEAL ANIMATION ===== */
function initRevealAnimation() {
  const revealItems = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}