<template>
  <div class="container">
    <div class="row">        
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Para</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="quemRecebe">
          <option selected>Selecione...</option>
          <option v-for="(u, index) in users" :key="index" :value="u.name">{{ u.name }}</option>
            </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Quantidade</span>
        </div>
        <input
          v-model.number="amount"
          type="number"
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
        />
        <div class="input-group-append">
          <span class="input-group-text">E2C</span>
        </div>
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Micronarrativa</span>
        </div>
        <textarea
          v-model="descricao"
          class="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>      
      <br />
      <div>
        <button
          type="button"
          class="btn btn-primary btn-sm mt-2 mb-2"
          @click="emitirTokens()"
        >
          Reconhecer
        </button>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: "NewEmissionModal",
  data: function() {
    return {
      transactions: [],
      descricao: null,      
      quemRecebe: null,
      amount: null,     
    };
  },  
  methods: {
    emitirTokens() {
      if (
        this.amount !== null &&
        this.descricao !== null &&
        this.quemRecebe !== null &&
        this.quemReconhece !== null
      ) {
        let payload = {
          toName: this.quemRecebe,
          //toUid: this.quemRecebe.id,
          amount: this.amount,
          description: this.descricao,         
        };
        this.$store.dispatch("emmitTokens", payload);
        this.clearFields();
      } else {
        alert("Faltou preencher algum campo. Tente novamente");
      }
    },      
    clearFields() {
      this.quemRecebe = null;
      this.descricao = null;      
      this.amount = null;
      this.email = null;
      //this.quemReconhece = this.userProfile;
      this.contact = null;
      this.preLiquiWish = null;
    },
    enviarEmail() {
      if (
        this.amount !== null &&
        this.descricao !== "" &&
        this.email !== null
      ) {
        let payload = {  
          amount: this.amount,
          description: this.descricao,
          email: this.email
        };
        this.$store.dispatch("sendInviteEmail", payload);
        this.clearFields();
      } else {
        alert("Faltou preencher algum campo. Tente novamente");
      }
    },  
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile.uid;
    },
    users() {
      return this.$store.state.users;
    },

  }
};
</script>
