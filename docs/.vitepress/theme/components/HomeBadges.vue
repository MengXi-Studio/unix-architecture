<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const isZh = computed(() => lang.value.startsWith('zh'))

const githubUrl = 'https://github.com/MengXi-Studio/unix-architecture'
</script>

<template>
	<div class="home-badges">
		<a :href="githubUrl + '/releases'" target="_blank" rel="noopener">
			<img
				:alt="isZh ? 'GitHub release' : 'GitHub release'"
				src="https://img.shields.io/github/v/release/MengXi-Studio/unix-architecture.svg?style=flat-square&color=42b883"
			/>
		</a>
		<a :href="githubUrl" target="_blank" rel="noopener">
			<img
				:alt="isZh ? 'GitHub stars' : 'GitHub stars'"
				src="https://img.shields.io/github/stars/MengXi-Studio/unix-architecture.svg?style=flat-square&color=35495e"
			/>
		</a>
		<a :href="githubUrl" target="_blank" rel="noopener">
			<img
				:alt="isZh ? 'GitHub license' : 'GitHub license'"
				src="https://img.shields.io/github/license/MengXi-Studio/unix-architecture.svg?style=flat-square&color=42b883"
			/>
		</a>
		<a :href="githubUrl" target="_blank" rel="noopener">
			<img
				:alt="isZh ? 'HBuilderX 5.34+' : 'HBuilderX 5.34+'"
				src="https://img.shields.io/badge/HBuilderX-5.34%2B-35495e?style=flat-square"
			/>
		</a>
	</div>
</template>

<style scoped>
.home-badges {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 8px;
	margin-top: 24px;
	margin-bottom: 8px;
}

.home-badges img {
	height: 20px;
	vertical-align: middle;
	transition: opacity 0.2s;
}

.home-badges a:hover img {
	opacity: 0.85;
}
</style>
