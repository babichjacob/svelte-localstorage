<h1 align="center">🗄️ Svelte localStorage</h1>

This library for Svelte provides writable stores that automatically synchronize with `localStorage`.

## 💻 Installation
```sh
npm install --save-dev @babichjacob/svelte-localstorage
```

## 🧰 SvelteKit
Use the writable store creator from `@babichjacob/svelte-localstorage/svelte-kit`:

```svelte
<script>
	import { localStorageStore } from "@babichjacob/svelte-localstorage/svelte-kit";
	const textInput = localStorageStore("text-input", "Initial value");
</script>

<input bind:value={$textInput} type="text">
```

## 🌱 Sapper
Use the writable store creator from `@babichjacob/svelte-localstorage/sapper`:

```svelte
<script>
	import { localStorageStore } from "@babichjacob/svelte-localstorage/sapper";
	const textInput = localStorageStore("text-input", "Initial value");
</script>

<input bind:value={$textInput} type="text">
```

## 🌐 Svelte in the browser only
Use the writable store creator from `@babichjacob/svelte-localstorage/browser`:

```svelte
<script>
	import { localStorageStore } from "@babichjacob/svelte-localstorage/browser";
	const textInput = localStorageStore("text-input", "Initial value");
</script>

<input bind:value={$textInput} type="text">
```

## ⚡️ Generic SSR framework
The store creators above are specialized for the most common environments. This one *probably* works in place of all of the above, so you could possibly use this no matter what the situation is.

```svelte
<script>
	import { localStorageStore } from "@babichjacob/svelte-localstorage/ssr";

	const textInput = localStorageStore("text-input", "Initial value");
</script>

<input bind:value={$textInput} type="text">
```

## 🗺 Custom environment
The store creators described above are all built from the base store creator. You can use it in any environment by providing the `browser` argument with the correct value:

```svelte
<script>
	import { localStorageStore } from "@babichjacob/svelte-localstorage/base";
	import { isServer } from "@some-framework/metadata";

	const textInput = localStorageStore("text-input", "Initial value", !isServer);
</script>

<input bind:value={$textInput} type="text">
```

## 😵 Help! I have a question
Create an issue and I'll try to help.

## 😡 Fix! There is something that needs improvement
Create an issue or pull request and I'll try to fix.

## 📄 License
MIT

## 🙏 Attribution

_Repository preview image generated with [GitHub Social Preview](https://social-preview.pqt.dev/)_

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
