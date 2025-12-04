<template>
  <div class="landing-container">
    <div class="content-wrapper">
      <h1 class="main-title">Carlos Veizaga</h1>
      <p class="subtitle">Select your experience</p>
      
      <div class="cards-container">
        <!-- OS Experience Card -->
        <div class="card os-card" @click="navigateTo('devos')">
          <div class="card-content">
            <div class="icon-wrapper">
              <span class="material-icons">terminal</span>
            </div>
            <h2>Interactive OS</h2>
            <p>Immersive desktop experience. Explore my work through a simulated operating system.</p>
            <div class="badge desktop-badge">Best for Desktop</div>
          </div>
          <div class="card-bg"></div>
        </div>

        <!-- Classic Experience Card -->
        <div class="card classic-card" @click="navigateTo('classic')">
          <div class="card-content">
            <div class="icon-wrapper">
              <span class="material-icons">web</span>
            </div>
            <h2>Classic Portfolio</h2>
            <p>Traditional clean layout. Fast, accessible, and straight to the point.</p>
            <div class="badge mobile-badge" v-if="isMobile">Recommended for Mobile</div>
          </div>
          <div class="card-bg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobile = ref(false)

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const navigateTo = (route) => {
  router.push({ name: route })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

.landing-container {
  min-height: 100vh;
  background-color: #0f0f13;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* Background gradient effect */
.landing-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(76, 29, 149, 0.1) 0%, rgba(15, 15, 19, 0) 50%);
  animation: rotate 20s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.content-wrapper {
  z-index: 1;
  text-align: center;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.05em;
}

.subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 4rem;
  font-weight: 300;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  width: 350px;
  cursor: pointer;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px);
  border-color: rgba(165, 180, 252, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
}

.card:hover .icon-wrapper {
  background: rgba(165, 180, 252, 0.1);
  transform: scale(1.1);
}

.material-icons {
  font-size: 40px;
  color: #e2e8f0;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

p {
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.desktop-badge {
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.mobile-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* Hover gradients */
.os-card:hover .card-bg {
  opacity: 1;
}

.classic-card:hover .card-bg {
  opacity: 1;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.classic-card .card-bg {
  background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 60%);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .cards-container {
    flex-direction: column;
    align-items: center;
  }
  
  .card {
    width: 100%;
    max-width: 320px;
  }
}
</style>
