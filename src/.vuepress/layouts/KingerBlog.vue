<script setup lang="ts">
import { withBase } from "vuepress/client";
import { Blog } from "vuepress-theme-hope/blog";
</script>

<template>
  <Blog>
    <!-- 默认 logo 已融入右侧视觉卡，清空原 slot 避免重复渲染。 -->
    <template #heroLogo />

    <template #heroInfo="{ text, tagline, style }">
      <section
        class="kinger-hero"
        :style="style"
        aria-labelledby="kinger-hero-title"
      >
        <div class="kinger-hero__copy">
          <p class="kinger-hero__eyebrow">AIOps · AI Infrastructure</p>
          <h1 id="kinger-hero-title" class="kinger-hero__title">
            {{ text }}
          </h1>
          <p v-if="tagline" class="kinger-hero__tagline">
            {{ tagline }}
          </p>
          <div class="kinger-hero__topics" aria-label="博客主要方向">
            <span>工程实践</span>
            <span>架构拆解</span>
            <span>故障复盘</span>
          </div>
        </div>

        <div class="kinger-hero__visual" aria-hidden="true">
          <div class="kinger-hero__logo-frame">
            <img
              :src="withBase('/assets/images/logo.png')"
              alt=""
              width="320"
              height="320"
            >
          </div>
        </div>
      </section>
    </template>
  </Blog>
</template>
