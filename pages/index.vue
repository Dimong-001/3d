<template>
    <div id="three-container" ref="threeContainer" class="w-full h-screen"></div>
</template>
  
<script>
import * as THREE from "three";
import { onMounted, onUnmounted, ref } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
setup() {
  const containerRef = ref(null); // Reference to the container div

  onMounted(() => {
    const container = containerRef.value;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Change background color of the scene
    scene.background = new THREE.Color(0x222222); // Dark gray

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add light
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Position the camera
    camera.position.set(0, 0, 5);

    // Add OrbitControls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth the movement
    controls.dampingFactor = 0.1;
    controls.enableZoom = true; // Enable zooming with mouse scroll

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

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Update the controls
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
  
