<template>
  <div id="three-container" ref="threeContainer" class="w-full h-screen"></div>
</template>

<script>
import * as THREE from "three";
import { onMounted, onUnmounted, ref } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  setup() {
    const containerRef = ref(null);

    onMounted(() => {
      const container = containerRef.value;
      if (!container) return;

      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 3);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);

      // Transparent background
      renderer.setClearColor(0x000000, 0);

      // Add light
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(2, 2, 5);
      scene.add(light);

      // Load 3D Emoji Model from your assets folder
      const loader = new GLTFLoader();
      let emojiModel = null;

      loader.load(
        "/assets/scene.gltf", // Use the correct relative path
        (gltf) => {
          emojiModel = gltf.scene;
          emojiModel.scale.set(1.5, 1.5, 1.5); // Adjust size if necessary
          scene.add(emojiModel);
        },
        undefined,
        (error) => {
          console.error("Error loading emoji model", error);
        }
      );

      // Add OrbitControls for interaction
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.enableZoom = true;

      // Handle window resize
      const onWindowResize = () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      };
      window.addEventListener("resize", onWindowResize);

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);

        if (emojiModel) {
          emojiModel.rotation.y += 0.01; // Rotate emoji model
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup on component unmount
      onUnmounted(() => {
        window.removeEventListener("resize", onWindowResize);
        container.removeChild(renderer.domElement);
        renderer.dispose();
      });
    });

    return {
      threeContainer: containerRef,
    };
  },
};
</script>

<style>
#three-container {
  position: relative;
  overflow: hidden;
}
</style>
