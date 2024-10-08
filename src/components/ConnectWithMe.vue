<template>
    <h3 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Connect With Me</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a href="https://www.linkedin.com/in/jcarlos-veizaga" class="social-link" target="_blank">
            <IconLinkedin></IconLinkedin>

            <span class="text-gray-800 dark:text-white font-medium">LinkedIn</span>
        </a>

        <a href="https://github.com/carlosJCVC" class="social-link" target="_blank">
            <IconGithub></IconGithub>

            <span class="text-gray-800 dark:text-white font-medium">GitHub</span>
        </a>

        <a href="https://x.com/carlosveizagajc" class="social-link" target="_blank">
            <IconTwitter></IconTwitter>

            <span class="text-gray-800 dark:text-white font-medium">Twitter</span>
        </a>

        <a :href="mailtoLink" class="social-link">
            <IconGoogle></IconGoogle>

            <span class="text-gray-800 dark:text-white font-medium">Google</span>
        </a>
    </div>
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Me</h4>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            I'm a passionate full-stack developer with expertise in Vue.js, React, and Node.js.
            My journey in tech has been driven by a love for creating elegant solutions to complex problems.
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
            or sharing my knowledge through tech blogs and community meetups.
            I'm always excited about new collaborations and opportunities to push the boundaries of what's possible in
            web development.
        </p>
    </div>
</template>

<script setup>
import IconGithub from './icons/IconGithub.vue';
import IconGoogle from './icons/IconGoogle.vue';
import IconLinkedin from './icons/IconLinkedin.vue';
import IconTwitter from './icons/IconTwitter.vue';

import { computed } from 'vue';

const recipientEmail = 'carlosveizaga.jcvc@gmail.com';
const subject = 'Inquiry from Your Portfolio Website';
const body = 'Hello, I would like to contact you about...';

const mailtoLink = computed(() => {
    const params = new URLSearchParams({
        subject: subject,
        body: body
    });
    return `mailto:${recipientEmail}?${params.toString()}`;
});

</script>

<style scoped>
.social-link {
    @apply flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1;
}
</style>