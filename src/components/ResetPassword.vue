<template>
    <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email">
        <div class="form-group">
            <button class="btn btn-primary" @click="sendPasswordResetEmail">Entrar</button>
        </div>                                
    </div>
</template>
<script>
export default {
    name: "ResetPassword",
    data(){
        return {
            email:null,    
        }
    },
    methods:{
        sendPasswordResetEmail(){
        fb.auth().sendPasswordResetEmail(this.email)
        .then(function() {
            alert('Email enviado com sucesso');
        })
        .catch(function(error) {
            alert('Deu ruim: ' + error);
        });
      }
        
    }
}
</script>