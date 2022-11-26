<script>
  import { localStorageWritable } from "@babichjacob/svelte-localstorage";
  const textInput = localStorageWritable("text-input", "Initial value");

  class Point {
    /**
     * @param {number} x
     * @param {number} y
     **/
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  const point = localStorageWritable("point", new Point(0, 0), {
    serialize: (pnt) => JSON.stringify([pnt.x, pnt.y]),
    deserialize(str) {
      /** @type {[number, number]} */
      const tup = JSON.parse(str);
      return new Point(tup[0], tup[1]);
    },
  });

  import lzString from "lz-string";

  const compressedText = localStorageWritable("compressed-text", "", {
    serialize: lzString.compressToUTF16,
    deserialize: lzString.decompressFromUTF16,
  });
</script>

<input bind:value={$textInput} type="text" />

<button
  on:click={() => {
    point.update((p) => {
      p.x += 1;
      return p;
    });
  }}>Increment x</button
>

<button
  on:click={() => {
    point.update((p) => {
      p.y -= 1;
      return p;
    });
  }}>Decrement y</button
>

<span>({$point.x}, {$point.y})</span>

<textarea bind:value={$compressedText} />
