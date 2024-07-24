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

        <div class="mb-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Поиск по всем полям..."
              v-model="filters.q"
              @input="onSearchInput"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="searchEquipment"
              >
                Поиск
              </button>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-4">
            <div class="form-group">
              <label for="serial-number">Серийный номер:</label>
              <input
                type="text"
                class="form-control"
                id="serial-number"
                v-model="filters.serial_number"
                @input="onSearchInput"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="equipment-type-id">Тип оборудования:</label>
              <select
                class="form-control"
                id="equipment-type-id"
                v-model.number="filters.equipment_type_id"
                @change="onSearchInput"
              >
                <option value="">Все типы</option>
                <option
                  v-for="type in equipmentTypes"
                  :key="type.id"
                  :value="type.id"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="description">Описание:</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="filters.desc"
                @input="onSearchInput"
              />
            </div>
          </div>
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
      filters: {
        q: "",
        serial_number: "",
        equipment_type_id: "",
        desc: "",
      },
      equipmentTypes: [],
    };
  },
  mounted() {
    this.fetchEquipmentList();
    this.fetchEquipmentTypes();
  },
  methods: {
    async fetchEquipmentList(page = 1) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get("/equipment", {
          params: {
            page,
            ...this.filters, // Передайте все фильтры в запросе
          },
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
    async fetchEquipmentTypes() {
      try {
        const response = await axios.get("/equipment-type");
        this.equipmentTypes = response.data.data;
      } catch (error) {
        console.error("Ошибка при загрузке типов оборудования:", error);
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
    onSearchInput() {
      // Необязательная задержка перед выполнением запроса
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.fetchEquipmentList();
      }, 300);
    },
    searchEquipment() {
      this.fetchEquipmentList(); // Загрузите данные с учетом строки поиска
    },
  },
};
</script>
