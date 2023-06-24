<script lang="ts">
  import type { Client } from "@xmpp/client";
  const { client, xml, jid } = window["XMPP"];
  let xmpp: Client | undefined;
  let isLoggedIn = true;
  let loginButtonElement: HTMLButtonElement;
  function login(event: MouseEvent) {
    event.preventDefault();
    disableLoginButtonElement();
    const service = event.target["form"][0]["value"];
    const username = event.target["form"][1]["value"];
    const password = event.target["form"][2]["value"];
    if (xmpp === undefined) {
      return;
    }
    xmpp = client({
      service,
      username,
      password,
    });
    xmpp
      .start()
      .then(() => {
        isLoggedIn = true;
      })
      .then((jid) => {})
      .catch(() => {
        enableLoginButtonElement();
      });
  }

  function enableLoginButtonElement() {
    loginButtonElement.textContent = "Login";
    loginButtonElement.disabled = false;
  }

  function disableLoginButtonElement() {
    loginButtonElement.textContent = "Loading...";
    loginButtonElement.disabled = true;
  }
</script>

{#if isLoggedIn}
  <main>
    <ul><li><button type="button">servers/conversations</button></li></ul>
    <ul><li><button type="button">messages</button></li></ul>
  </main>
{:else}
  <form>
    <label for="service">service:</label>
    <input
      type="text"
      name="service"
      value="ws://localhost:5280/xmpp-websocket"
    />
    <label for="username">username:</label>
    <input type="text" name="username" />
    <label for="password">password:</label>
    <input type="password" name="password" />
    <button type="submit" on:click={login} bind:this={loginButtonElement}>
      Login
    </button>
  </form>
{/if}

<style>
</style>
