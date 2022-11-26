<h1 align="center">🗄️ Svelte localStorage</h1>

This library for Svelte provides writable stores that automatically synchronize with `localStorage`.

It has been tested to work with Vite, with or without SvelteKit. It may also work with any other bundler that respects [`exports` maps](https://nodejs.org/api/packages.html#package-entry-points).

## 💻 Installation

```sh
npm install --save-dev @babichjacob/svelte-localstorage
```

### ⌨️ TypeScript

This package uses JSDoc for types and documentation, so an extra step is needed to use it in TypeScript projects [for now](https://github.com/babichjacob/svelte-localstorage/issues/22). Configure your `tsconfig.json` so that it has `compilerOptions.maxNodeModuleJsDepth` set to at least 1:

```jsonc
// tsconfig.json
{
  // When using SvelteKit: "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    // Other options...
    "maxNodeModuleJsDepth": 1
  }
}
```

## 🛠 Usage

Import and use the writable store creator from `@babichjacob/svelte-localstorage`:

```svelte
<script>
	import { localStorageWritable } from "@babichjacob/svelte-localstorage";
	const textInput = localStorageWritable("text-input", "Initial value");
</script>

<input bind:value={$textInput} type="text">
```

You can create stores with `localStorageWritable` and read from them without having to check whether you're in the browser or on the server. You generally should only write while in the browser.

### ⚙️ Options

- `key`: what key in `localStorage` to synchronize with
- `initial`: the initial value of the writable store
- `serde` (optional): how to serialize and deserialize the store value
  - `serialize` (default `JSON.stringify`): how to create a string representation of the store value to put in `localStorage`
  - `deserialize` (default `JSON.parse`): how to convert the string representation in `localStorage` to a value to put in the store

### 💱 Serialization and deserialization

Only strings can be put in `localStorage`, so whatever values you want this store to have must be representable as strings somehow. JSON is the default format used, since it supports common types. You can pass a custom `serialize` and `deserialize` function for objects that `JSON.stringify` and `JSON.parse` can't handle, like custom `class`es:

```js
import { localStorageWritable } from "@babichjacob/svelte-localstorage";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const point = localStorageWritable("point", new Point(0, 0), {
  // You can still use JSON.stringify and JSON.parse to help, if you want
  serialize: (pnt) => JSON.stringify([pnt.x, pnt.y]),
  deserialize(str) {
    const [x, y] = JSON.parse(str);
    return new Point(x, y);
  },
});
```

### 🗜️ Compression and decompression

You can further utilize `serialize` and `deserialize` to store the data compressed in `localStorage`, perhaps to stay under [the 5 MB limit](https://storage.spec.whatwg.org/#storage-endpoint-quota) your website / app has available.

Any compression algorithm can be used, but [`lz-string`](https://www.npmjs.com/package/lz-string) is chosen for example:

```js
<script>
  import { localStorageWritable } from "@babichjacob/svelte-localstorage";

  import lzString from "lz-string";

  const draft = localStorageWritable("blog-post-draft", { time: new Date(), content: "" }, {
    serialize: (obj) => {
      const serialized = ...; // create a string representation somehow
      const compressed = lzString.compressToUTF16(serialized);
      return compressed;
    },
    deserialize: (text) => {
      const decompressed = lzString.decompressFromUTF16(text);
      const deserialized = ...; // convert the string representation to an object somehow
      return deserialized;
    },
  });
</script>

<h1>Write a new blog post</h1>
<h2>Draft started at {$draft.time}</h2>

<textarea bind:value={$draft.content}></textarea>
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
