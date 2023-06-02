<template>
  <div class="container">
    <div class="login-container row">
      <div class="column form-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" :disabled="isLoading">
            <template v-if="isLoading">
              <div class="loader-container">
                <div class="loader"></div>
              </div>
            </template>
            <template v-else>
              Login
            </template>
          </button>
        </form>
      </div>
      <div class="column image-container">
        <img class="login-image" src="@/assets/green_login_page.svg" alt="Login Image">
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { ref } from 'vue';
import { login } from '../services/api';
import { pinia } from '../store/store';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginScreen',
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    const loginUser = async () => {
      try {
        isLoading.value = true;
        const response = await login(email.value, password.value);
        const token: string = response.data.token;

        pinia.state.token = token;
      } catch (error) {

        console.error(error);

        setTimeout(() => {
          isLoading.value = false;
          router.push('/welcome');
        }, 2000);
      } finally {
        setTimeout(() => {
          isLoading.value = false;
          router.push('/welcome');
        }, 2000);

      }
    };

    return {
      email,
      password,
      isLoading,
      login: loginUser,
    };
  },
};
</script>

<style lang="scss" scoped>
//.login-container {
//  display: flex;
//  flex-wrap: wrap;
//  justify-content: center;
//}
//
//.login-column {
//  flex: 1 1 50%;
//  padding: 20px;
//}
//
//.left-column {
//  display: none;
//}
//
//.right-column {
//  display: block;
//}
//
//@media (min-width: 768px) {
//  .left-column {
//    display: block;
//  }
//
//  .right-column {
//    margin-left: 20px;
//  }
//}
//
//.image-container {
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  height: 100%;
//}
//
//.login-image {
//  height: 100%;
//  max-width: 100%;
//  object-fit: contain;
//}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

button {
  position: relative;
  margin: 20px auto;
  padding: 0;
  height: 56px;
  width: 228px;
  border-radius: 100px;
  background-color: #18C746;
  color: #fff;
  font-size: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #13933A;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      animation: spin 1s linear infinite;

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }
  }
}

@media (max-width: 768px) {
  .login-container {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .login-container {
    max-width: 240px;
  }
}
</style>
