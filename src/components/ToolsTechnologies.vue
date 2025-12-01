<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 p-8">
    <h3 class="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-white">
      {{ $t('skills.technologies') }}
    </h3>
    <div class="flex flex-wrap justify-center gap-6">
      <div
        v-for="tool in tools"
        :key="tool.name"
        class="group flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:transform hover:scale-105 shadow-md"
      >
        <div class="w-16 h-16 mb-2 flex items-center justify-center">
          <img
            :src="tool.icon"
            :alt="tool.name"
            class="w-12 h-12 transition-transform duration-300 group-hover:scale-110 dark:filter dark:brightness-110 dark:contrast-125"
          />
        </div>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ tool.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import VSCodeIcon from '@/assets/icons/vscode.svg'
import DockerIcon from '@/assets/icons/docker-mark-blue.svg'
import GitIcon from '@/assets/icons/git-icon.svg'
import WebpackIcon from '@/assets/icons/icon.svg'
import PostmanIcon from '@/assets/icons/postman-logo-orange-stacked.svg'
import HTMLIcon from '@/assets/icons/html-5.svg'
import CSSIcon from '@/assets/icons/css-3.svg'
import JavaScriptIcon from '@/assets/icons/javascript.svg'
import AngularIcon from '@/assets/icons/angular-icon.svg'
import ReactIcon from '@/assets/icons/react.svg'
import VueIcon from '@/assets/icons/vue.svg'
import BootstrapIcon from '@/assets/icons/bootstrap.svg'
import MaterializeIcon from '@/assets/icons/materializecss.svg'
import DartIcon from '@/assets/icons/dart.svg'
import FlutterIcon from '@/assets/icons/flutter.svg'
import PHPIcon from '@/assets/icons/php.svg'
import LaravelIcon from '@/assets/icons/laravel.svg'
import CodeignitherIcon from '@/assets/icons/codeigniter-icon.svg'
import WordpressIcon from '@/assets/icons/wordpress-icon.svg'
import DrupalIcon from '@/assets/icons/drupal-icon.svg'
import NodeIcon from '@/assets/icons/nodejs-icon.svg'
import NestIcon from '@/assets/icons/nestjs.svg'

const tools = [
  { name: 'VS Code', icon: VSCodeIcon },
  { name: 'HTML5', icon: HTMLIcon },
  { name: 'CSS3', icon: CSSIcon },
  { name: 'Bootstrap', icon: BootstrapIcon },
  { name: 'Materialize', icon: MaterializeIcon },
  { name: 'JavaScript', icon: JavaScriptIcon },
  { name: 'Angular', icon: AngularIcon },
  { name: 'Vue', icon: VueIcon },
  { name: 'Nodejs', icon: NodeIcon },
  { name: 'Nestjs', icon: NestIcon },
  { name: 'React', icon: ReactIcon },
  { name: 'Dart', icon: DartIcon },
  { name: 'Flutter', icon: FlutterIcon },
  { name: 'PHP', icon: PHPIcon },
  { name: 'Laravel', icon: LaravelIcon },
  { name: 'Codeigniter', icon: CodeignitherIcon },
  { name: 'Wordpress', icon: WordpressIcon },
  { name: 'Drupal', icon: DrupalIcon },
  { name: 'Git', icon: GitIcon },
  { name: 'Docker', icon: DockerIcon },
  { name: 'Webpack', icon: WebpackIcon },
  { name: 'Postman', icon: PostmanIcon },
  { name: 'React Native', icon: ReactIcon }
]
</script>

<style lang="scss" scoped></style>
