<template>
  <div
    class="relative overflow-hidden bg-gradient-to-tl from-white to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
    <div class="absolute inset-0 bg-white dark:bg-gray-800 opacity-80 backdrop-blur-sm z-0"></div>
    <div class="relative z-10 p-8">
      <h3 class="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-300">
        3D Skills Sphere
      </h3>
      <div
        class="bg-white bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-xl p-6 shadow-inner transition-colors duration-300">
        <div class="skill-sphere-container relative h-[400px] w-full">
          <canvas ref="skillSphere" class="w-full h-full"></canvas>

          <!-- Tooltip for hovered skill -->
          <div v-if="hoveredSkill"
            class="absolute bottom-4 left-4 p-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-800 dark:text-white rounded-lg shadow-lg transition-all duration-300 backdrop-blur-sm">
            <h4 class="text-lg font-semibold text-blue-600 dark:text-blue-300">{{ hoveredSkill.name }}</h4>
            <p class="text-sm mt-1">Proficiency: <span class="font-medium">{{ hoveredSkill.level }}%</span></p>
            <p class="text-sm mt-2">{{ hoveredSkill.description }}</p>
          </div>
        </div>
      </div>
      <div class="mt-6 text-sm text-gray-600 dark:text-gray-300 text-center">
        Hover over the sphere to explore skills
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { storeToRefs } from 'pinia'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThemeStore } from '@/store/useThemeStore';

const skillSphere = ref(null);
const hoveredSkill = ref(null);
const sphereMaterial = ref(null);

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore)

const skills = [
  { name: 'JavaScript', level: 90, description: 'Proficient in modern ES6+ features', category: 'Frontend' },
  { name: 'Vue.js', level: 85, description: 'Experienced with Vue 3 and Composition API', category: 'Frontend' },
  { name: 'React', level: 80, description: 'Solid understanding of React and its ecosystem', category: 'Frontend' },
  { name: 'Node.js', level: 85, description: 'Strong backend development skills with Express', category: 'Backend' },
  { name: 'Python', level: 75, description: 'Proficient in data analysis and scripting', category: 'Backend' },
  { name: 'SQL', level: 80, description: 'Experienced with relational database design', category: 'Database' },
  { name: 'MongoDB', level: 70, description: 'Familiar with NoSQL database concepts', category: 'Database' },
  { name: 'Docker', level: 65, description: 'Basic containerization and deployment skills', category: 'DevOps' },
  { name: 'AWS', level: 60, description: 'Familiarity with cloud services and deployment', category: 'DevOps' },
  { name: 'UI/UX Design', level: 70, description: 'Eye for design and user experience principles', category: 'Design' },
];

const updateSphereColor = (currentTheme) => {
  if (sphereMaterial.value) {
    sphereMaterial.value.color.setHex(currentTheme === 'dark' ? 0xCCCCCC : 0x333333);
  }
};

watch(theme, (newTheme) => {
  updateSphereColor(newTheme)
})

let scene, camera, renderer, controls;

onMounted(() => {
  initSkillSphere();
  window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
});

const initSkillSphere = () => {
  const container = skillSphere.value.parentElement;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: skillSphere.value, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;

  camera.position.z = 5;

  const geometry = new THREE.SphereGeometry(2, 32, 32);
  sphereMaterial.value = new THREE.MeshBasicMaterial({ color: theme.value == 'dark' ? 0xCCCCCC : 0x333333, wireframe: true });
  const sphere = new THREE.Mesh(geometry, sphereMaterial.value);
  scene.add(sphere);

  const skillPoints = [];
  skills.forEach((skill, index) => {
    const phi = Math.acos(-1 + (2 * index) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const x = 2 * Math.cos(theta) * Math.sin(phi);
    const y = 2 * Math.sin(theta) * Math.sin(phi);
    const z = 2 * Math.cos(phi);

    const point = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: getCategoryColor(skill.category) })
    );
    point.position.set(x, y, z);
    point.userData = skill;
    scene.add(point);
    skillPoints.push(point);
  });

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  skillSphere.value.addEventListener('mousemove', (event) => {
    const rect = skillSphere.value.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(skillPoints);

    if (intersects.length > 0) {
      hoveredSkill.value = intersects[0].object.userData;
    } else {
      hoveredSkill.value = null;
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

const onWindowResize = () => {
  const container = skillSphere.value.parentElement;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

const getCategoryColor = (category) => {
  const colors = {
    Frontend: 0x4287f5,
    Backend: 0xf54242,
    Database: 0x42f554,
    DevOps: 0xf5a442,
    Design: 0xf542f2
  };
  return colors[category] || 0xffffff;
}
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.skill-sphere-container {
  animation: float 6s ease-in-out infinite;
}
</style>