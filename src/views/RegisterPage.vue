<script setup>
import TextInput from "@/components/Form/TextInput.vue";
import {computed, reactive, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()
const error = ref(null)
const form = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
})
const is_loading = ref(false)
const disabled = computed(() =>
    is_loading.value ||
    form.name === null ||
    form.email === null ||
    form.password === null ||
    form.password_confirmation === null
)
const submit = async () => {
  is_loading.value = true
  error.value = null

  await authStore.register(form).then(() => {
    router.push("/")
  }).catch(err => {
    error.value = err?.data?.message ?? "Something went wrong. Please try again later."
  }).finally(() => {
    is_loading.value = false
  })
}
</script>

<template>
  <div class="full-h-page">
    <div class="small-container">
      <img src="@/assets/images/logo-big.svg" alt="">
      <h1>create an account.</h1>
      <form @submit.prevent="submit">
        <p class="error-block" v-if="error" >{{error}}</p>
        <div class="text-input-group">
          <text-input placeholder="name." type="text" v-model="form.name" required />
          <text-input placeholder="email." type="email" v-model="form.email" required/>
          <text-input placeholder="password." type="password" v-model="form.password"  required/>
          <text-input placeholder="confirm password." type="password" v-model="form.password_confirmation"  required/>
        </div>
        <button type="submit" class="lockd-btn" :disabled>register.</button>
        <p class="">have an account?
          <router-link to="/login">log in<span>.</span>
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.full-h-page {
  min-height: calc(100vh - 7.5rem);
  display: flex;
  justify-content: center;
  align-items: center;

  .small-container {
    width: min(100%, 55.2rem);
    display: flex;
    flex-direction: column;
    gap: 4.8rem;
    align-items: center;

    form {
      width: 100%;

      .error-block {
        background: var(--tangerine-sunset);
        font-weight: 900;
        padding: 1rem;
        text-align: center;
        color: var(--silver-cloud);
        margin-bottom: 1.2rem;
      }

      .text-input-group {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
        margin-bottom: 3.6rem;
      }

      p {
        text-align: center;

        a {
          font-weight: 900;
          color: var(--tangerine-sunset);
          text-decoration: underline;
          transition: 0.3s ease-in-out;

          span {
            font-weight: 900;
            color: var(--charcoal-black);
            transition: 0.3s ease-in-out;
          }

          &:hover {
            color: var(--charcoal-black);

            span {
              color: var(--tangerine-sunset);
            }
          }
        }
      }
    }
  }
}
</style>