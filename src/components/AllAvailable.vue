<template>
  <div>
      <h3>Para usufruto comum</h3>
    <table class="table table-hover">
      <thead>
        <tr>          
          <th scope="col">Nome</th>
          <th scope="col">Disponibilizou</th>          
          <th scope="col">Descrição</th>          
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(o, index) in available" :key="index">          
          <td>{{ o.fromName }}</td>
          <td>{{ o.title }}</td>
          <td>{{ o.description }} </td>          
        </tr>      
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "AvailableTable",
  computed: {
    available: function() {
      return this.$store.state.available;
    },
  },
};
</script>