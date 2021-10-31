<template>
  <div>
    Login page
    <button class="button" @click="login">Login </button>
  </div>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default {
  setup() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
	  const state = useStorage('user', { username: 'tieu', greeting: 'Hello' })

    function login() {
      signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log(user);
      }).catch(error => {
          const errorCode = error.code;
          const email = error.email;
          console.log(errorCode, email);
      })
    }
    return {
        login
    }
  }
}
</script>
