<template>
  <div class="container">
    <div class="header">
<!--      <div class="circle">{{ user.initial }}</div>-->
      <div class="circle">I</div>
      <div class="tabs">
        <router-link to="/welcome" class="tab" :class="{ active: currentTab === 'welcome' }">Welcome</router-link>
        <router-link to="/profile" class="tab" :class="{ active: currentTab === 'profile' }">User Profile</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../store/store';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export default {
  name: 'App',
  computed: {
    currentTab(): string {
      const route = useRoute();
      return route.name as string;
    },
    user(): User {
      const userStore = useUserStore();
      return computed(() => userStore.getUser()).value;
    },
  },
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const userStore = useUserStore();
    // TODO: ADD GUARD LATER
    // if (!userStore.isAuthenticated()) {
    //   next('/login'); // Redirect to login page if user is not logged in
    // } else {
      next();
    // }

  },
};
</script>

<style scoped>
.container {
  /* Container styles */
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 16px;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2196f3;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabs {
  display: flex;
  margin-left: 20px;
}

.tab {
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  color: #555;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #000;
  }
}

.tab.active {
  color: #000;
  font-weight: bold;
}
</style>
