<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 v-if="equipment">Просмотр оборудования (ID: {{ equipment.id }})</h2>

        <div v-if="equipment" class="card">
          <div class="card-body">
            <h5 class="card-title">
              {{ equipment.serial_number }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ equipment.equipment_type.name }}
            </h6>
            <p class="card-text">{{ equipment.desc }}</p>

            <router-link
              :to="{ name: 'EquipmentEdit', params: { id: equipment.id } }"
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
      equipment: null,
      equipmentTypes: [],
      errors: {},
      isLoading: false,
      error: null,
    };
  },
  async mounted() {
    this.fetchEquipment();
    this.fetchEquipmentTypes();
  },
  methods: {
    async fetchEquipment() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`/equipment/${this.$route.params.id}`);
        this.equipment = response.data.data;
      } catch (error) {
        this.error = "Ошибка при загрузке оборудования.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchEquipmentTypes() {
      try {
        const response = await axios.get("/equipment-type");
        this.equipmentTypes = response.data.data;
      } catch (error) {
        console.error("Ошибка при загрузке типов оборудования:", error);
      }
    },
    async updateEquipment() {
      this.errors = {};

      // Простая валидация на клиенте
      if (!this.equipment.equipment_type_id) {
        this.errors.equipment_type_id = "Выберите тип оборудования.";
      }
      if (!this.equipment.serial_number) {
        this.errors.serial_number = "Введите серийный номер.";
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        await axios.put(`/equipment/${this.equipment.id}`, this.equipment);
        this.$router.push({ name: "EquipmentList" });
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Ошибка при обновлении оборудования:", error);
        }
      }
    },
  },
};
</script>
