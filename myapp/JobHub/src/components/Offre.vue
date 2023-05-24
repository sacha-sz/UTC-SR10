<script setup>
import { ref } from 'vue';

const listItems = ref([]);
async function getData() {
    const res = await fetch("http://localhost:3000/api/Offre_Emploie");
    const finalRes = await res.json();
    listItems.value = finalRes;
}
getData()
</script>
<template>
    <div>
        <h1> Liste des offres </h1>
        <table border="1" v-if="listItems.length > 0">
            <thead>
                <tr>
                    <th scope="col">Intitule</th>
                    <th scope="col">Salaire</th>
                    <th scope="col">rythme</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listItems">
                    <td>{{ item.intitule }}</td>
                    <td>{{ item.salaire_min }}</td>
                    <td>{{ item.rythme }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>