<template>
  <nav
    v-if="authStore.isAuthenticated"
    class="bg-card/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/dashboard" class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center"
          >
            <span class="font-bold text-white">T</span>
          </div>
          <span
            class="font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            TicketFlow
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <div
            class="flex items-center gap-2 bg-secondary/50 p-1 rounded-full border border-primary/10"
          >
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="px-5 py-2 rounded-full transition-all"
              :class="{
                'bg-card shadow-sm font-medium': $route.path === item.path,
                'text-muted-foreground hover:text-foreground': $route.path !== item.path,
              }"
              :aria-current="$route.path === item.path ? 'page' : undefined"
            >
              {{ item.name }}
            </RouterLink>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-full border border-primary/10"
            >
              <User class="w-4 h-4 text-muted-foreground" />
              <span class="text-sm">{{ authStore.user?.name || 'Admin' }}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-full border-2 border-[hsl(var(--neon-green))] shadow-md shadow-[hsl(var(--neon-green))]/20 hover:bg-red-500/10 btn-hover-scale"
              aria-label="Log out"
              @click="authStore.handleLogout"
            >
              <LogOut class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden rounded-full border-2 border-[hsl(var(--neon-green))] shadow-md shadow-[hsl(var(--neon-green))]/20 btn-hover-scale"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <component :is="isMobileMenuOpen ? X : Menu" class="w-5 h-5" />
        </Button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="md:hidden mt-4 bg-card border border-primary/10 rounded-xl shadow-lg p-4 animate-in slide-in-from-top duration-300"
        role="menu"
      >
        <div class="flex flex-col gap-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg transition-all"
            :class="{
              'bg-secondary/50 font-medium': $route.path === item.path,
              'text-muted-foreground hover:text-foreground': $route.path !== item.path,
            }"
            :aria-current="$route.path === item.path ? 'page' : undefined"
            role="menuitem"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>
          <div
            class="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-lg border border-primary/10"
          >
            <div class="flex items-center gap-2">
              <User class="w-4 h-4 text-muted-foreground" />
              <span class="text-sm">{{ authStore.user?.name || 'Admin' }}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              class="rounded-full border-2 border-[hsl(var(--neon-green))] hover:bg-red-500/10 btn-hover-scale"
              aria-label="Log out"
              role="menuitem"
              @click="logoutuser"
            >
              <LogOut class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Button from './ui/Button.vue'
import { LogOut, User, Menu, X } from 'lucide-vue-next'

const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const router = useRouter()
const logoutuser = () => {
  console.log('Logging out user...')
  authStore.handleLogout()
  isMobileMenuOpen.value = false
  router.replace('/login')
}
const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Tickets', path: '/tickets' },
]
</script>
<style scoped>
/* Scoped styles if needed */
</style>
