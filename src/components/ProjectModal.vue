<template>
    <Teleport to="body">
        <TransitionRoot as="template" :show="!!project">
            <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="$emit('close')">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div
                            class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                            <div class="absolute top-0 right-0 pt-4 pr-4">
                                <button @click="$emit('close')"
                                    class="text-gray-400 hover:text-gray-500 focus:outline-none">
                                    <span class="sr-only">Close</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div v-if="project">
                                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3"
                                        class="text-3xl leading-6 font-bold text-gray-900 dark:text-gray-100 mb-4">
                                        {{ project.title }}
                                    </DialogTitle>
                                    <div class="mt-4">
                                        <img :src="project.image" :alt="project.title"
                                            class="w-full h-64 object-cover rounded-lg mb-6">
                                        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ project.fullDescription }}
                                        </p>
                                        <h4 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Key
                                            Features:</h4>
                                        <ul class="list-disc list-inside mb-4 text-gray-600 dark:text-gray-400">
                                            <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
                                        </ul>
                                        <h4 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                            Technologies Used:</h4>
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span v-for="tech in project.technologies" :key="tech"
                                                class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full">
                                                {{ tech }}
                                            </span>
                                        </div>
                                        <div class="mt-8 flex justify-center space-x-4">
                                            <a :href="project.liveUrl" target="_blank" rel="noopener noreferrer"
                                                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                View Live Demo
                                            </a>
                                            <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
                                                class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                View on GitHub
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </Teleport>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';

defineProps({
    project: {
        type: Object,
        default: null
    }
});
</script>

<style scoped>
/* You can add any scoped styles here if needed */
</style>