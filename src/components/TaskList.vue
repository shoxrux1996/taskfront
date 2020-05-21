<template>
  <div class="content">
    <div class="row">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="10%">ID</th>
            <th scope="col" width="30%">Title</th>
            <th scope="col" width="40%">Notes</th>
            <th scope="col" width="10%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in defaultTaskList.tasks" :key="task.id">
            <th scope="row">{{ task.id }}</th>
            <td>{{ task.title }}</td>
            <td>
              {{ task.notes }}
            </td>
            <td>
              <div
                class="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  class="btn-group mr-2"
                  role="group"
                  aria-label="First group"
                >
                  <router-link :to="{ name: 'Task', params: { id: task.id } }">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      :disabled="loading"
                    >
                      Edit
                    </button>
                  </router-link>
                </div>
                <div
                  class="btn-group mr-2"
                  role="group"
                  aria-label="Second group"
                >
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="deleteTask(task.id)"
                    :disabled="loading"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <router-link to="/task/">
          <button
            class="btn btn-sm btn-primary float-right right-btn"
            :disabled="loading"
          >
            Add
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultTaskList: {},
      loading: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    deleteTask(task) {
      this.loading = true;
      if (confirm("Do you really want to delete?")) {
        this.$api
          .delete(`task/delete/` + task)
          .then((response) => {
            console.log(response.data);
            this.loading = false;
            this.loadTasks();
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    loadTasks() {
      this.loading = true;
      this.$api
        .get(`task`)
        .then((response) => {
          console.log(response.data);
          this.defaultTaskList = response.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
  },
  created() {
    this.loadTasks();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.right-btn {
  margin-right: 20px;
}
</style>
