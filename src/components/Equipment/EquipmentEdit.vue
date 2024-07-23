<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 v-if="localEquipment">
          Редактировать оборудование (ID: {{ localEquipment.id }})
        </h2>

        <form @submit.prevent="onSubmit" v-if="localEquipment">
          <div class="form-group">
            <label for="equipment-type-id">Тип оборудования:</label>
            <select
              id="equipment-type-id"
              v-model.number="localEquipment.equipment_type_id"
              class="form-control"
              required
            >
              <option value="">Выберите тип</option>
              <option
                v-for="type in equipmentTypes"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
            <div v-if="errors.equipment_type_id" class="text-danger">
              {{ errors.equipment_type_id }}
            </div>
          </div>

          <div class="form-group">
            <label for="serial-number">Серийный номер:</label>
            <input
              type="text"
              id="serial-number"
              v-model="localEquipment.serial_number"
              class="form-control"
              required
            />
            <div v-if="errors.serial_number" class="text-danger">
              {{ errors.serial_number }}
            </div>
          </div>

          <div class="form-group">
            <label for="desc">Описание:</label>
            <textarea
              id="desc"
              v-model="localEquipment.desc"
              class="form-control"
            ></textarea>
            <div v-if="errors.desc" class="text-danger">
              {{ errors.desc }}
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>

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
      localEquipment: null,
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
        this.localEquipment = response.data.data;
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
    async onSubmit() {
      this.errors = {};

      // Валидация на клиенте
      if (!this.localEquipment.equipment_type_id) {
        this.errors.equipment_type_id = "Выберите тип оборудования.";
      }
      if (!this.localEquipment.serial_number) {
        this.errors.serial_number = "Введите серийный номер.";
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        await axios.put(
          `/equipment/${this.localEquipment.id}`,
          this.localEquipment
        );
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
