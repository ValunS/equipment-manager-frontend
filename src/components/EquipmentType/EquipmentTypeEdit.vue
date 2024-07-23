<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 v-if="equipmentType">
          Редактировать тип оборудования (ID: {{ equipmentType.id }})
        </h2>

        <form @submit.prevent="updateEquipmentType" v-if="equipmentType">
          <div class="form-group">
            <label for="name">Наименование:</label>
            <input
              type="text"
              id="name"
              v-model="equipmentType.name"
              class="form-control"
              required
            />
            <div v-if="errors.name" class="text-danger">
              {{ errors.name }}
            </div>
          </div>

          <div class="form-group">
            <label for="mask">Маска серийного номера:</label>
            <input
              type="text"
              id="mask"
              v-model="equipmentType.mask"
              class="form-control"
              required
            />
            <div v-if="errors.mask" class="text-danger">
              {{ errors.mask }}
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
      equipmentType: null,
      errors: {},
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
    async updateEquipmentType() {
      this.errors = {};

      // Простая валидация на клиенте
      if (!this.equipmentType.name) {
        this.errors.name = "Введите наименование.";
      }
      if (!this.equipmentType.mask) {
        this.errors.mask = "Введите маску серийного номера.";
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        await axios.put(
          `/equipment-type/${this.equipmentType.id}`,
          this.equipmentType
        );
        this.$router.push({ name: "EquipmentTypeList" });
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Ошибка при обновлении типа оборудования:", error);
        }
      }
    },
  },
};
</script>
