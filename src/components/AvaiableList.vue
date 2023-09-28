<template>
  <div>
    <div class="card bg-warning">
      <h6 class="ml-3 mr-3 mb-1 mt-1">Para usufruto comum
      <button @click="addAvailable()">+</button>
      </h6>
      <table class="table table-hover">
        <tbody class="bg-white" :v-model="selectedAvailable">
          <tr v-for="(o, index) in available" :key="index" @click="details(o)">
            <td>{{ o.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Details Modal -->
    <div
      class="modal fade"
      id="availableDetails"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="availableDetailsLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="availableDetailsLabel">
              {{ selectedAvailable.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><strong>Disponibilizado por:</strong> {{ selectedAvailable.fromName }}</p>            
            <p><strong>Descrição:</strong> {{ selectedAvailable.description }}</p>                      
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>          
          </div>
        </div>
      </div>
    </div>
                <!-- Add Available Modal -->
    <div
      class="modal fade bg-warning"
      id="addavailable"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="addAvailableLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAvailableLabel">
             Disponibilizar para usufruto Comum
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <AddAvailable />  
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddAvailable from "./AddAvailable";
export default {
  name: "AvailableList",
  components: {
    AddAvailable
  },
  data() {
    return {
      selectedAvailable: {},
    };
  },
  computed: {
    available: function() {
      return this.$store.state.availableActive;
    },
  },
  methods: {
    details(o) {
      $('#availableDetails').modal('show');
      this.selectedAvailable = o;
    },
    addAvailable() {
      $('#addavailable').modal('show');      
    }
  },
};
</script>
