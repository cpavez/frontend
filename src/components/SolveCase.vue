<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import { Loading, LocalStorage, QSpinnerDots } from "quasar";
import router from "../router";
import moment from "moment";
import "moment/locale/es";

const props = defineProps({
  category: String,
  title: String,
  criterio: String,
});
const visible = ref(false);
const solveCase = ref([]);
const solveCases = ref([]);
const store = useStore();

async function compositions() {
  if (props.criterio === "") {
    solveCases.value = await store.dispatch(
      "cases/setCasesPending",
      props.category
    );
  } else {
    solveCases.value = await store.dispatch(
      "cases/setCasesComplete",
      props.category
    );
  }
  visible.value = false;
}

watch(props, (currentValue, oldValue) => {
  if (props.category != "") {
    visible.value = true;
    compositions();
  }
});
</script>

<template>
  <div class="q-pa-md" v-if="solveCases?.length > 0">
    <q-list bordered class="rounded-borders">
      <q-item-label header
        ><q-badge color="blue">{{ solveCases.length }}</q-badge>
        {{ title }}</q-item-label
      >
      <q-separator spaced />
      <div v-for="(solveCase, i) in solveCases" :key="solveCase.id">
        <q-item
          clickable
          :to="{
            name: criterio === '' ? 'solveCaseId' : 'mySolveCaseId',
            params: { id: solveCase.id },
          }"
        >
          <q-item-section avatar>
            <img src="../assets/img/icono_persona-05.svg" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline
              >{{ solveCase.title }} #{{ solveCase.id }}
              <q-item-label caption
                >Creación: {{ moment(solveCase.date).format("D/M/YYYY HH:mm") }}
              </q-item-label>
              <q-item-label caption>Asignación: </q-item-label>
            </q-item-label>
            <q-item-label
              >{{
                solveCase.patient?.name?.filter((name) => {
                  return name.use === "official";
                })[0]?.family
              }}
              {{
                solveCase.patient?.name?.filter((name) => {
                  return name.use === "official";
                })[0]?._family?.extension[0]?.valueString
              }},
              {{
                solveCase.patient?.name?.filter((name) => {
                  return name.use === "official";
                })[0]?.given[0]
              }}</q-item-label
            >
            <q-item-label caption>Establecimiento</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="i + 1 < solveCases.length" spaced />
      </div>
    </q-list>
  </div>
  <q-inner-loading
    :showing="visible"
    label="Cargando..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<style scoped></style>
