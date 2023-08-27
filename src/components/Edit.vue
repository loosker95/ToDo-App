<template>
  <div class="content">
    <div class="row">
      <div class="col-md-7" style="margin: 0 auto;">
        <h1>Edit</h1>
        <h6>Update task</h6>
        <router-link :to="{name: 'Welcome'}"><h6 class="link">Go back to Home page</h6></router-link>
        <hr />
        <form>
            <div id="myText" v-if="success" class="alert alert-success" role="alert">
                {{ success }}
            </div>

            <div id="myText" v-if="notSuccess" class="alert alert-danger" role="alert">
                <li v-for="err in notSuccess" :key="err">{{ err[0] }}</li>
            </div>

            <label for="title">Enter the task</label>
            <input class="form-control" type="text" id="title" v-model="formEdit.title" />

            <label for="details">Comment</label>
            <textarea class="form-control" id="details" v-model="formEdit.details"></textarea>

            <label for="status">Status</label>
            <select class="form-control" id="status" v-model="formEdit.status">
                <option value="pending">pending</option>
                <option value="doing">doing</option>
                <option value="done">done</option>
                <option value="cancel">cancel</option>
            </select>

          <button
            id="btn"
            v-on:click="updateTask"
            type="button"
            class="btn btn-primary"
          >
            Update task
          </button>
        </form>
        <br>
        <hr>
        <br>
        <div class="card">
            <div class="card-body">
                    <span v-if="this.formEdit.status === 'pending'" class="badge text-bg-warning">{{ this.formEdit.status }}</span>
                    <span v-else-if="this.formEdit.status === 'done'" class="badge text-bg-success">{{ this.formEdit.status }}</span>
                    <span v-else-if="this.formEdit.status === 'doing'" class="badge text-bg-primary">{{ this.formEdit.status }}</span>
                    <span v-else class="badge text-bg-danger">{{ this.formEdit.status }}</span>
                <br> <br>
                <h4>{{this.formEdit.title}}</h4>
                <h6>{{this.formEdit.details}}</h6>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Edit",
// props: ['nom'],
  data() {
    return {
      updatedId: "",
      success: '',
      notSuccess: '',
      formEdit: {
        title: "",
        details: "",
        status: "",
      },
    };
  },
  mounted() {
    this.updatedId = this.$route.params.id;
    this.editTask(this.$route.params.id);
  },
  methods: {
    editTask(id) {
      axios
        .get(`http://127.0.0.1:8000/api/tasks/${id}/edit`)
        .then((response) => {
          this.formEdit = response.data.message
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    updateTask() {
      axios.put(`http://127.0.0.1:8000/api/tasks/${this.updatedId}`, this.formEdit)
        .then((response) => {
          if (response.data.status == 500) {
            this.notSuccess = response.data.message;
          }else{
            this.success = response.data.message;
            this.$router.push(this.formEdit);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

</style>