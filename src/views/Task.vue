<template>
  <div class="home">
    <div class="container">
      <div>
        <div class="form-row align-items-center">
          <div class="col-sm-5 my-1">
            <label class="sr-only" for="title">Title</label>
            <input
              v-model="task.title"
              type="text"
              class="form-control"
              id="title"
              placeholder="Title"
            />
          </div>
          <div class="col-sm-5 my-1">
            <label class="sr-only" for="notes">Notes</label>
            <div class="input-group">
              <input
                type="text"
                v-model="task.notes"
                class="form-control"
                id="notes"
                placeholder="Notes"
              />
            </div>
          </div>
          <div class="col-2 my-1">
            <button
              class="btn btn-primary"
              @click="sendTask()"
              :disabled="loading"
            >
              {{ id ? "Update" : "Add" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: "title",
        notes: "notes",
      },
      id: null,
      loading: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    loadTask() {
      this.loading = true;
      let task_id = this.$route.params.id;
      if (task_id) {
        this.$api
          .get(`task`, {
            params: {
              id: task_id,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.id = task_id;
            this.task = response.data.data;
            this.loading = false;
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    sendTask() {
      this.loading = true;
      let url = `task/add/`;
      if (this.id) {
        url = url + this.id;
      }
      console.log(this.task);
      this.$api
        .post(url, {
          title: this.task.title,
          notes: this.task.notes,
        })
        .then((response) => {
          console.log(response.data);
          this.loading = false;
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
  },
  created() {
    this.loadTask();
  },
};
</script>
