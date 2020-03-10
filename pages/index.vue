<template>
  <div class="container">
    <header class="header"></header>
    <main class="main">
      <form @submit.prevent="enterRoom">
        <p class="feedback" v-if="feedback">{{ feedback }}</p>
        <input type="text" v-model="nickname" class="input" placeholder="Your nickname" maxlength="20">
        <button class="button-enter" type="submit">Enter room</button>
      </form>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      nickname: '',
      feedback: ''
    }
  },
  methods: {
    enterRoom() {
      if (this.nickname.trim().length === 0) {
        return this.feedback = 'Invalid nickname'
      }
      localStorage.setItem('nn', this.nickname.trim())
      this.$router.push('/rooms')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 30vh;
  width: 100vw; 
  background: var(--color-yellow);
}
.main {
  height: 40vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  
  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    .feedback {
      color: var(--color-lightred);
      font-size: 1.4rem;
    }
    .input {
      font-size: 2.5rem;
      padding: 1rem;
      border: 5px solid var(--color-blue);
    }
    .button-enter {
      margin-top: 1.5rem;
      background: var(--color-lightred);
      color: var(--color-white);
      font-size: 2rem;
      cursor: pointer;
    }
  }

}
.footer {
  height: 30vh;
  width: 100vw;
  background: var(--color-black);
}
</style>
