<script context="module">
  export const prerender = true;
</script>

<script>
  import { localStorageStore } from "@babichjacob/svelte-localstorage/svelte-kit";
  const textInput = localStorageStore("text-input", "Initial value");

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

  const point = localStorageStore("point", new Point(0, 0), {
    serialize: (pnt) => JSON.stringify([pnt.x, pnt.y]),
    deserialize(str) {
      /** @type {[number, number]} */
      const tup = JSON.parse(str);
      return new Point(tup[0], tup[1]);
    },
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
