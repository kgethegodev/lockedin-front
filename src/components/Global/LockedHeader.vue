<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()
const showMenu = ref(false)

const logout = () => {
  showMenu.value = false
  authStore.logout().then(() => {
    router.replace("/register")
  })
}
</script>

<template>
<div class="locked-header-container">
  <div class="container">
    <div class="locked-header">
      <img src="@/assets/images/logo-small.svg" alt="Logo for Lockd-In">
      <div v-if="authStore.user" class="lockd-username" @click="showMenu = !showMenu">
        <p>{{authStore.user.name}}<span>.</span></p>
        <img :class="{'open-menu':showMenu}" src="@/assets/images/icons/chevron-down.svg" alt="chevron down" >
      </div>
    </div>
  <Transition>
    <div class="lockd-menu" v-if="showMenu">
      <router-link class="lockd-menu-item" to="#">
      profile<span>.</span>
      </router-link>
      <router-link class="lockd-menu-item" to="#">
      vaults<span>.</span>
      </router-link>
      <router-link class="lockd-menu-item" to="#" @click.prevent="authStore.logout">
      logout<span>.</span>
      </router-link>
    </div>
  </Transition>
  </div>
</div>
</template>

<style scoped lang="scss">
.locked-header-container {
  position: fixed;
  top: 2.4rem;
  width: 100%;
  .locked-header {
    min-height: 6.6rem;
    background: var(--charcoal-black);
    border-radius: 2.4rem;
    //left: 50%;
    //transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    padding: 0 2.4rem;
    align-items: center;

    .lockd-username {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      cursor: pointer;

      p {
        font-size: 1.6rem;
        font-weight: 900;
        color: var(--tangerine-sunset);
        text-transform: lowercase;

        span {
          color: var(--silver-cloud);
          font-size: 1.6rem;
          font-weight: 900;
        }
      }

      img {
        transition: .2s linear;

        &.open-menu {
          rotate: 180deg;
        }
      }
    }
  }

  .lockd-menu {
    width: min(26.4rem, 100%);
    display: flex;
    flex-direction: column;
    border-radius: 2.4rem;
    background: var(--charcoal-black);
    margin: 2.4rem 0 0 auto;
    overflow: hidden;

    .lockd-menu-item {
      padding: 2.4rem 0;
      text-align: center;
      color: var(--silver-cloud);
      font-size: 1.6rem;
      font-weight: 900;
      border-bottom: .1rem solid var(--ash-gray);
      transition: .2s linear;

      span {
        color: var(--tangerine-sunset);
        font-size: 1.6rem;
        font-weight: 900;
        transition: .2s linear;
      }

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: var(--soft-ivory);
        color: var(--tangerine-sunset);

        span {
          color: var(--charcoal-black);
        }
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>