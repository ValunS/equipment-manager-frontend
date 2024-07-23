<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>Типы оборудования</h2>
          <router-link
            :to="{ name: 'EquipmentTypeCreate' }"
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
                <th>Наименование</th>
                <th>Маска</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="type in equipmentTypes" :key="type.id">
                <td>{{ type.id }}</td>
                <td>{{ type.name }}</td>
                <td>{{ type.mask }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <router-link
                      :to="{
                        name: 'EquipmentTypeView',
                        params: { id: type.id },
                      }"
                      class="btn btn-sm btn-info"
                    >
                      Просмотр
                    </router-link>
                    <router-link
                      :to="{
                        name: 'EquipmentTypeEdit',
                        params: { id: type.id },
                      }"
                      class="btn btn-sm btn-warning"
                    >
                      Редактировать
                    </router-link>
                    <button
                      @click="deleteEquipmentType(type.id)"
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
      equipmentTypes: [],
      totalPages: 1,
      currentPage: 1,
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchEquipmentTypes();
  },
  methods: {
    async fetchEquipmentTypes(page = 1) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get("/equipment-type", {
          params: { page },
        });

        this.equipmentTypes = response.data.data;
        this.totalPages = response.data.meta.last_page;
        this.currentPage = response.data.meta.current_page;
      } catch (error) {
        this.error = "Ошибка при загрузке типов оборудования.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteEquipmentType(id) {
      if (confirm(`Вы уверены, что хотите удалить тип оборудования?`)) {
        try {
          await axios.delete(`/equipment-type/${id}`);
          this.fetchEquipmentTypes();
        } catch (error) {
          console.error("Ошибка при удалении типа оборудования:", error);
        }
      }
    },
    onPageChanged(page) {
      this.fetchEquipmentTypes(page);
    },
  },
};
</script>
