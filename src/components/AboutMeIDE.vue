<template>
  <div
    class="w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 font-mono text-left relative group"
  >
    <!-- IDE Header (Tabs) -->
    <div class="bg-[#252526] flex items-center border-b border-[#1e1e1e]">
      <!-- Tab 1: about.js -->
      <div
        class="px-4 py-2 bg-[#1e1e1e] text-white text-sm flex items-center gap-2 border-t-2 border-blue-500"
      >
        <i class="fab fa-js text-yellow-400"></i>
        <span>about.js</span>
        <i class="fas fa-times text-gray-500 hover:text-white ml-2 cursor-pointer text-xs"></i>
      </div>
      <!-- Tab 2: bio.json (Inactive) -->
      <div
        class="px-4 py-2 text-gray-500 text-sm flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer transition-colors"
      >
        <i class="fas fa-code text-green-400"></i>
        <span>bio.json</span>
      </div>
    </div>

    <!-- IDE Body (Code Area) -->
    <div class="p-0 flex min-h-[400px]">
      <!-- Line Numbers -->
      <div
        class="bg-[#1e1e1e] text-gray-600 text-right pr-4 py-4 select-none border-r border-[#2d2d2d] w-12 text-sm leading-6"
      >
        <div v-for="n in 20" :key="n">{{ n }}</div>
      </div>

      <!-- Code Content -->
      <div class="flex-grow p-4 text-sm md:text-base leading-6 font-mono overflow-x-auto">
        <!-- Comment Block -->
        <div class="text-gray-500 mb-2">
          /**<br />
          &nbsp;* @file Overview of Carlos Veizaga<br />
          &nbsp;* @description Passionate developer building the future.<br />
          &nbsp;*/
        </div>

        <!-- Class Definition -->
        <div>
          <span class="text-purple-400">class</span> <span class="text-yellow-300">Developer</span>
          <span class="text-white">{</span>
        </div>

        <!-- Constructor -->
        <div class="pl-4">
          <span class="text-blue-400">constructor</span>() <span class="text-white">{</span>
        </div>
        <div class="pl-8">
          <span class="text-blue-300">this</span>.<span class="text-blue-300">name</span> =
          <span class="text-green-300">'Carlos Veizaga'</span>;
        </div>
        <div class="pl-8">
          <span class="text-blue-300">this</span>.<span class="text-blue-300">location</span> =
          <span class="text-green-300">'Cochabamba, Bolivia'</span>;
        </div>
        <div class="pl-8">
          <span class="text-blue-300">this</span>.<span class="text-blue-300">traits</span> = [<span
            class="text-green-300"
            >'Creative'</span
          >, <span class="text-green-300">'Resilient'</span>,
          <span class="text-green-300">'Detail-Oriented'</span>];
        </div>
        <div class="pl-4">
          <span class="text-white">}</span>
        </div>

        <!-- Method: getBio -->
        <div class="pl-4 mt-4">
          <span class="text-yellow-300">getBio</span>() <span class="text-white">{</span>
        </div>
        <div class="pl-8 text-gray-300">
          <span class="text-purple-400">return</span> `
          <div class="pl-4 border-l-2 border-gray-700 my-2 italic text-gray-400">
            I transform complex problems into elegant, scalable solutions.<br />
            My journey is fueled by coffee and a relentless curiosity<br />
            to master the latest web technologies.
          </div>
          `;
        </div>
        <div class="pl-4">
          <span class="text-white">}</span>
        </div>

        <div class="mt-2">
          <span class="text-white">}</span>
        </div>

        <div class="mt-4">
          <span class="text-purple-400">export default</span>
          <span class="text-yellow-300">Developer</span>;
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for static display
</script>
