<template>
  <div>
    <h4>Histórico de Emissões</h4>
    <table class="table table-hover">
      <thead>        
        <tr>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Descrição</th>          
          <th scope="col">Quantidade</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(i,index) in allEmissions" :key="index"       
        >
          <td>{{ i.toName }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.description }}</td>          
          <td>{{ i.initialAmount }}</td>
        </tr>
      </tbody>
    </table>    
  </div>
</template>
<script>
export default {
  name: "AllEmissions",
  computed: {
    allEmissions() {
      return this.$store.state.tokens;
    },
  },
};
</script>
