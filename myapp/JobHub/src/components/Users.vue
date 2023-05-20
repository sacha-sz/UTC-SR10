<script setup>
import { ref } from 'vue';

const listItems = ref([]);
async function getData() {
    const res = await fetch("http://localhost:3000/api/users");
    const finalRes = await res.json();
    listItems.value = finalRes;
}
getData()
</script>
<template>
    <div>
        <h1> Liste des utilisateurs </h1>
        <table border="1" v-if="listItems.length > 0">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listItems">
                    <td>{{ item.nom }}</td>
                    <td>{{ item.prenom }}</td>
                    <td>{{ item.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>