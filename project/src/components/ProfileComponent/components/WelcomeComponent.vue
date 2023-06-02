<template>
  <div class="welcome-container">
<!--    <h2>Hello, {{ firstName }}! Welcome to your {{ businessName }}</h2>-->
    <h2>Hello, {{  }}! Welcome to your {{  }}</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../../store/store';
import { useRouter } from 'vue-router';

export default {
  name: 'WelcomeScreen',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const firstName = computed(() => userStore.state.user.firstName);
    const businessName = computed(() => userStore.state.user.businessName);

    const logout = () => {
      userStore.reset();
      router.push('/login');
    };

    return {
      firstName,
      businessName,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.welcome-container {
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }

  h2 {
    text-align: center;
    font-size: 24px;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;

    @media (max-width: 480px) {
      font-size: 14px;
    }

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
