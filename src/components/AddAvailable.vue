<template>
    <div class="container">
        <div class="row mb-3">            
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="addWish">Título</label>
                </div>
                <input
                    v-model="title"
                    type="text"
                    class="form-control"
                    aria-label="O que você deseja acessar..."
                    />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Intenção</span>
                </div>
                <textarea
                    v-model="description"
                    class="form-control"
                    aria-label="With textarea"
                ></textarea>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Modo</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01" v-model="mode">
                    <option>Abundante</option>
                    <option>Empático</option>
                    <option>Condicionado</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Tags</span>
                </div>
                <textarea
                    v-model="tags"
                    class="form-control"
                    aria-label="With textarea"
                ></textarea>
            </div>
            <div>
                <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="save()"
                >
                Salvar
                </button>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    name: "AddAvailable",
    data: function() {
        return {
            title: null,
            description: null,
            mode: null,
            tags: null
        }
    },
    methods: {
        async save() {
            let payload = {
                title: this.title,
                description: this.description,
                mode: this.mode,
                tags: this.tags
            }
            await this.$store.dispatch("saveAvailableDb", payload);
            this.clearFields();
        },
        clearFields() {
            this.title = null;
            this.description = null;
            this.mode = null;
            this.tags = null;
        }
    }
}
</script>