<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Создать тип оборудования</h2>

        <form @submit.prevent="createEquipmentType">
          <div class="form-group">
            <label for="name">Наименование:</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
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
              v-model="form.mask"
              class="form-control"
              required
            />
            <div v-if="errors.mask" class="text-danger">
              {{ errors.mask }}
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Создать</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        mask: "",
      },
      errors: {},
    };
  },
  methods: {
    async createEquipmentType() {
      this.errors = {};

      // Простая валидация на клиенте
      if (!this.form.name) {
        this.errors.name = "Введите наименование.";
      }
      if (!this.form.mask) {
        this.errors.mask = "Введите маску серийного номера.";
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        await axios.post("/equipment-type", this.form);
        this.$router.push({ name: "EquipmentTypeList" });
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Ошибка при создании типа оборудования:", error);
        }
      }
    },
  },
};
</script>
