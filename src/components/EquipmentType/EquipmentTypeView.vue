<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 v-if="equipmentType">
          Просмотр типа оборудования (ID: {{ equipmentType.id }})
        </h2>

        <div v-if="equipmentType" class="card">
          <div class="card-body">
            <h5 class="card-title">
              {{ equipmentType.name }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Маска: {{ equipmentType.mask }}
            </h6>

            <router-link
              :to="{
                name: 'EquipmentTypeEdit',
                params: { id: equipmentType.id },
              }"
              class="btn btn-warning"
            >
              Редактировать
            </router-link>
          </div>
        </div>

        <div v-else-if="isLoading" class="alert alert-info">Загрузка...</div>
        <div v-else-if="error" class="alert alert-danger">
          Ошибка: {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      equipmentType: null,
      isLoading: false,
      error: null,
    };
  },
  async mounted() {
    this.fetchEquipmentType();
  },
  methods: {
    async fetchEquipmentType() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `/equipment-type/${this.$route.params.id}`
        );
        this.equipmentType = response.data.data;
      } catch (error) {
        this.error = "Ошибка при загрузке типа оборудования.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
