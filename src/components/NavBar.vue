<template>
    <nav class="fixed w-full z-50 transition-all duration-300 bg-transparent" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <a href="#inicio" class="text-2xl font-bold gradient-text">CARLOS DEV</a>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#inicio" class="nav-link text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
                        <a href="#sobre-mi" class="nav-link text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">Sobre Mí</a>
                        <a href="#proyectos" class="nav-link text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">Proyectos</a>
                        <a href="#habilidades" class="nav-link text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">Habilidades</a>
                        <a href="#contacto" class="nav-link text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">Contacto</a>
                    </div>
                </div>
                <div class="md:hidden">
                    <button type="button" class="text-white hover:text-indigo-200 focus:outline-none focus:text-indigo-200" aria-controls="mobile-menu" aria-expanded="false" id="mobile-menu-button">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="md:hidden hidden bg-white shadow-lg rounded-lg mt-2 mx-4" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#inicio" class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Inicio</a>
                <a href="#sobre-mi" class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Sobre Mí</a>
                <a href="#proyectos" class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Proyectos</a>
                <a href="#habilidades" class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Habilidades</a>
                <a href="#contacto" class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Contacto</a>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

</style>