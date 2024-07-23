<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>Оборудование</h2>
          <router-link
            :to="{ name: 'EquipmentCreate' }"
            class="btn btn-primary"
          >
            Создать
          </router-link>
        </div>

        <div v-if="isLoading">
          <div class="alert alert-info">Загрузка...</div>
        </div>
        <div v-else-if="error">
          <div class="alert alert-danger">Ошибка: {{ error }}</div>
        </div>
        <div v-else>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Тип оборудования</th>
                <th>Серийный номер</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="equipment in equipmentList" :key="equipment.id">
                <td>{{ equipment.id }}</td>
                <td>{{ equipment.equipment_type.name }}</td>
                <td>{{ equipment.serial_number }}</td>
                <td>{{ equipment.desc }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <router-link
                      :to="{
                        name: 'EquipmentView',
                        params: { id: equipment.id },
                      }"
                      class="btn btn-sm btn-info"
                    >
                      Просмотр
                    </router-link>
                    <router-link
                      :to="{
                        name: 'EquipmentEdit',
                        params: { id: equipment.id },
                      }"
                      class="btn btn-sm btn-warning"
                    >
                      Редактировать
                    </router-link>
                    <button
                      @click="deleteEquipment(equipment.id)"
                      class="btn btn-sm btn-danger"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <AppPagination
            v-if="totalPages > 1"
            :total-pages="totalPages"
            :current-page="currentPage"
            @page-changed="onPageChanged"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppPagination from "../AppPagination.vue";

export default {
  components: {
    AppPagination,
  },
  data() {
    return {
      equipmentList: [],
      totalPages: 1,
      currentPage: 1,
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchEquipmentList();
  },
  methods: {
    async fetchEquipmentList(page = 1) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get("/equipment", {
          params: { page },
        });

        this.equipmentList = response.data.data;
        this.totalPages = response.data.meta.last_page;
        this.currentPage = response.data.meta.current_page;
      } catch (error) {
        this.error = "Ошибка при загрузке оборудования.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteEquipment(id) {
      if (confirm("Вы уверены, что хотите удалить оборудование?")) {
        try {
          await axios.delete(`/equipment/${id}`);
          this.fetchEquipmentList();
        } catch (error) {
          console.error("Ошибка при удалении оборудования:", error);
        }
      }
    },
    onPageChanged(page) {
      this.fetchEquipmentList(page);
    },
  },
};
</script>
../AppPagination.vue
