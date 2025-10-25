<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
import { Zap, Shield, BarChart3, Users, Bell, Clock } from 'lucide-vue-next'

// Define the features array
const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Quick ticket creation and resolution with an intuitive interface designed for speed.',
    gradient: 'gradient-purple-pink',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security ensuring your data is always protected and accessible.',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description:
      'Gain insights with comprehensive reports and real-time ticket statistics.',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Assign tickets, track progress, and collaborate seamlessly with your team.',
    gradient: 'bg-gradient-to-br from-orange-500 to-amber-600',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Stay updated with intelligent alerts for ticket updates and assignments.',
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Access your tickets anytime, anywhere with our cloud-based platform.',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
  },
]
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
