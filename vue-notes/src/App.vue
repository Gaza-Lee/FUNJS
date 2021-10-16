<script setup>
import { ref } from "vue";
const notes = ref([]);
const text = ref("");
function add() {
  if (!text.value.trim()) return;
  notes.value.unshift({ id: Date.now(), text: text.value });
  text.value = "";
}
function remove(id) {
  notes.value = notes.value.filter(n => n.id !== id);
}
</script>

<template>
  <div class="app">
    <h1>Notes (Vue)</h1>
    <form @submit.prevent="add">
      <input v-model="text" placeholder="write a note" />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="n in notes" :key="n.id">
        {{ n.text }}
        <button @click="remove(n.id)">x</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app { max-width: 420px; margin: 40px auto; font-family: sans-serif; }
h1 { text-align: center; }
form { display: flex; gap: 8px; margin-bottom: 12px; }
input { flex: 1; padding: 8px; }
button { padding: 8px 12px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #ddd; }
</style>
