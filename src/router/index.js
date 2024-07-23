import { createRouter, createWebHistory } from "vue-router";
import EquipmentList from "../components/Equipment/EquipmentList.vue";
import EquipmentTypeList from "../components/EquipmentType/EquipmentTypeList.vue";
import EquipmentCreate from "../components/Equipment/EquipmentCreate.vue";
import EquipmentEdit from "../components/Equipment/EquipmentEdit.vue";
import EquipmentView from "../components/Equipment/EquipmentView.vue";
import EquipmentTypeCreate from "../components/EquipmentType/EquipmentTypeCreate.vue";
import EquipmentTypeEdit from "../components/EquipmentType/EquipmentTypeEdit.vue";
import EquipmentTypeView from "../components/EquipmentType/EquipmentTypeView.vue";

const routes = [
  {
    path: "/",
    name: "EquipmentList",
    component: EquipmentList,
  },
  {
    path: "/equipment-types",
    name: "EquipmentTypeList",
    component: EquipmentTypeList,
  },
  {
    path: "/equipment/create",
    name: "EquipmentCreate",
    component: EquipmentCreate,
  },
  {
    path: "/equipment/:id/edit",
    name: "EquipmentEdit",
    component: EquipmentEdit,
  },
  {
    path: "/equipment/:id",
    name: "EquipmentView",
    component: EquipmentView,
  },
  {
    path: "/equipment-type/create",
    name: "EquipmentTypeCreate",
    component: EquipmentTypeCreate,
  },
  {
    path: "/equipment-type/:id/edit",
    name: "EquipmentTypeEdit",
    component: EquipmentTypeEdit,
  },
  {
    path: "/equipment-type/:id",
    name: "EquipmentTypeView",
    component: EquipmentTypeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
