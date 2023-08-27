<template>
  <div class="content">
    <div class="row">
      <div class="col-md-7" style="margin: 0 auto">
        <h1>Home</h1>
        <h6>Create a task</h6>
        <hr />
        <div class="formContent">
          
          <div v-if="successMsg">
            <div v-if="is_show" class="alert alert-success" role="alert">
              {{ successMsg }}
            </div>
          </div>

            <div v-if="errorMsgPost" class="alert alert-danger" role="alert">
              <li v-for="error in errorMsgPost" :key="error">
                {{ error[0] }}
              </li>
            </div>

          <div v-if="errorMsgGet" class="alert alert-danger" role="alert">
            {{ errorMsgGet }}
          </div>
          <form>
            <label for="title">Enter the task</label>
            <input
              class="form-control"
              type="text"
              placeholder="Enter task"
              id="title"
              v-model="formData.title"
            />

            <label for="details">Details</label>
            <textarea
              class="form-control"
              id="details"
              placeholder="Enter details"
              v-model="formData.details"
            ></textarea>

            <button
              id="btn"
              v-on:click="formSubmit"
              type="button"
              class="btn btn-primary"
            >
              <span v-if="loading">Adding task</span>
              <span v-else>Add task</span>
            </button>
          </form>
        </div>

        <h6>ToDo List</h6>

        <hr />
        <div class="list" v-if="typeof contents == 'object'">
          <div class="card" v-for="(content, index) in contents" :key="index">
            <div class="card-body">
              <div class="col-md-12">
                <div class="row">
                  <div v-if="content.id" class="col-md-8 col-sm-8">
                    <span class="key">{{ (index += 1) }}. </span>
                    <span
                      v-if="content.status === 'pending'"
                      class="badge text-bg-warning"
                      >{{ content.status }}</span
                    >
                    <span
                      v-else-if="content.status == 'done'"
                      class="badge text-bg-success"
                      >{{ content.status }}</span
                    >
                    <span
                      v-else-if="content.status == 'doing'"
                      class="badge text-bg-primary"
                      >{{ content.status }}</span
                    >
                    <span v-else class="badge text-bg-danger">{{
                      content.status
                    }}</span>

                    <span> - </span>

                    <router-link
                      :to="{ name: 'Task', params: { id: content.id } }"
                    >
                      <span class="link">
                        <text
                          v-if="content.status === 'done'"
                          style="text-decoration: line-through"
                        >
                          {{ content.title }}
                        </text>
                        <text v-else> {{ content.title }} </text>
                      </span>
                    </router-link>
                  </div>

                  <div class="col-md-4 col-sm-4">
                    <div class="taskbtn">
                      <router-link
                        :to="{ name: 'Edit', params: { id: content.id } }"
                      >
                        <button
                          type="button"
                          class="btn btn-primary"
                          style="
                            --bs-btn-padding-y: 0.25rem;
                            --bs-btn-padding-x: 0.5rem;
                            --bs-btn-font-size: 0.75rem;
                          "
                        >
                          Edit
                        </button>
                      </router-link>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteTask(content.id)"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span class="key" v-if="typeof contents == 'string'">{{
          contents
        }}</span>
      </div>

    </div>
  </div>
        <!-- <Edit nom="nom" /> -->

</template>

<script>
import axios from "axios";
export default {
  name: "Welcome",
  data() {
    return {
      is_show: false,
      successMsg: "",
      errorMsgGet: "",
      errorMsgPost: "",
      formData: {
        id: "",
        title: "",
        details: "",
        status: "Pending",
        created_at: "",
        updated_at: "",
      },
      contents: [],
      loading: false,
    };
  },
  created() {
    this.getTasks();
  },

  methods: {
    getTasks() {
      axios
        .get("http://127.0.0.1:8000/api/tasks")
        .then((response) => {
          this.contents = response.data.message;
        })
        .catch((error) => {
          this.errorMsgGet = "There is an error getting the data";
        });
    },

    sendData(){
      console.log('It works...')
    },

    formSubmit() {
      axios
        .post("http://127.0.0.1:8000/api/tasks", this.formData)
        .then((response) => {
          if (response.data.status == 201) {
            // this.loading = true
            this.successMsg = response.data.message;
            this.formData.title = "";
            this.formData.details = "";
            this.displayMessage();
            this.errorMsgPost = ""

          } else if (response.data.status == 500) {
            this.errorMsgPost = response.data.message;
          }
          this.getTasks();
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.errorMsgGet = error.message;
          }
        });
    },
    removeMessage() {
      let textElement = document.getElementById("myText");
      textElement.style.display = "none";
    },

    deleteTask(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/tasks/${id}`)
        .then((response) => {
          this.getTasks();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    displayMessage() {
      this.is_show = true;
      let intervalId = setTimeout(() => {
        this.is_show = false;
        clearInterval(intervalId);
      }, 1500);
    },
  },
};
</script>

<style scoped>
</style>
