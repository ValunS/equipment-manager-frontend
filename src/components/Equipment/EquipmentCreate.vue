<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h2>Создать оборудование</h2>
        <div v-for="error in errors" :key="error.id" class="text-danger">
          {{ errors }}
        </div>

        <form @submit.prevent="createEquipment">
          <div
            class="form-group"
            v-for="(equipment, index) in equipments"
            :key="index"
          >
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Оборудование {{ index + 1 }}</h5>
                <div v-if="serverErrors[index]" class="alert alert-danger mb-2">
                  {{ serverErrors[index].message }}
                </div>
                <button
                  v-if="equipments.length > 1"
                  @click.prevent="removeEquipment(index)"
                  type="button"
                  class="btn btn-sm btn-danger float-right"
                >
                  Удалить
                </button>

                <div class="form-group">
                  <label :for="`equipment-type-id-${index}`">
                    Тип оборудования:
                  </label>
                  <select
                    :id="`equipment-type-id-${index}`"
                    v-model.number="equipment.equipment_type_id"
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
                </div>

                <div class="form-group">
                  <label :for="`serial-number-${index}`">
                    Серийный номер:
                  </label>
                  <input
                    type="text"
                    :id="`serial-number-${index}`"
                    v-model="equipment.serial_number"
                    class="form-control"
                    required
                  />
                  <div
                    v-if="errors[`equipments.${index}.serial_number`]"
                    class="text-danger"
                  >
                    {{ errors[`equipments.${index}.serial_number`] }}
                  </div>
                </div>

                <div class="form-group">
                  <label :for="`desc-${index}`">Описание:</label>
                  <textarea
                    :id="`desc-${index}`"
                    v-model="equipment.desc"
                    class="form-control"
                  ></textarea>
                  <div
                    v-if="errors[`equipments.${index}.desc`]"
                    class="text-danger"
                  >
                    {{ errors[`equipments.${index}.desc`] }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary mr-2">Создать</button>
          <button
            type="button"
            @click.prevent="addEquipment"
            class="btn btn-secondary"
          >
            Добавить еще
          </button>
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
      equipmentTypes: [],
      equipments: [
        {
          equipment_type_id: "",
          serial_number: "",
          desc: "",
        },
      ],
      errors: [],
      serverErrors: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/equipment-type");
      this.equipmentTypes = response.data.data;
    } catch (error) {
      console.error("Ошибка при загрузке типов оборудования:", error);
    }
  },
  methods: {
    addEquipment() {
      this.equipments.push({
        equipment_type_id: "",
        serial_number: "",
        desc: "",
      });
    },
    removeEquipment(index) {
      this.equipments.splice(index, 1);
    },
    async createEquipment() {
      this.errors = [];
      this.serverErrors = [];

      // Валидация на стороне клиента
      this.equipments.forEach((equipment, index) => {
        if (!equipment.equipment_type_id) {
          this.errors[`equipments.${index}.equipment_type_id`] =
            "Выберите тип оборудования.";
        }
        if (!equipment.serial_number) {
          this.errors[`equipments.${index}.serial_number`] =
            "Введите серийный номер.";
        }
      });

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        const response = await axios.post("/equipment", this.equipments);

        // Обработка ответа от сервера
        if (response.data.errors) {
          this.serverErrors = response.data.errors;
        } else {
          this.$router.push({ name: "EquipmentList" });
        }
      } catch (error) {
        this.errors.push(error.message);
        console.error("Ошибка при создании оборудования:", error);
      }
    },
  },
};
</script>
