<template>
  <div class="content">
    <div class="row">
      <div class="col-md-7" style="margin: 0 auto">
        <h1>Task</h1>
        <h6>View task</h6>
        <router-link :to="{name: 'Welcome'}"><h6 class="link">Go back to Home page</h6></router-link>
        <hr />
            <span v-if="infos.status === 'pending'" class="badge text-bg-warning">{{ infos.status }}</span>
            <span v-else-if="infos.status === 'done'" class="badge text-bg-success">{{ infos.status }}</span>
            <span v-else-if="infos.status === 'doing'" class="badge text-bg-primary">{{ infos.status }}</span>
            <span v-else class="badge text-bg-danger">{{ infos.status }}</span>
            <br><br>

            <h4>{{infos.title}}</h4>
            <p>{{infos.details}}</p>
            <p>Created at: {{infos.created_at}}</p>
            <br>
            <router-link :to="{ name: 'Edit', params: { id: infos.id } }"><h6 class="link">Edit</h6></router-link>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Task",
  data(){
    return{
        infos:{},
        id: this.$route.params.id,
    }
  },
 
  mounted(){
    this.showTask()
  },
  methods:{
    showTask(){
        axios.get(`http://127.0.0.1:8000/api/tasks/${this.id}`)
        .then((response)=>{
            this.infos = response.data.message
        }).catch((error)=>{
            console.log(error.message)
        })
    }
  }
};
</script>

<style scoped>
</style>