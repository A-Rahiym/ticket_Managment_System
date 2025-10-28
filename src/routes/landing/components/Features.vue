<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
import { features } from '@/mock/mock';


</script>

<template>
  <section class="px-6 py-20 bg-muted/30">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <p class="text-sm text-primary">Features</p>
        </div>
        <h2 class="mb-4">Everything You Need to Succeed</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed to help you manage support tickets efficiently and delight your customers.
        </p>
      </div>

      <!-- Feature cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
          :gradient="feature.gradient"
        />
      </div>
    </div>
  </section>
</template>
