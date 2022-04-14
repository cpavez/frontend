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
const solveCases = ref([]);
const store = useStore();
LocalStorage.set("PatientID", "");

async function compositions() {
  solveCases.value = await store.dispatch("cases/setCasesAll", props.category);
  visible.value = false;
}

function mapeoEspecialidad(codigo) {
  switch (codigo) {
    case "07-012":
      return "dermatologia";
    case "07-013":
      return "diabetes";
    case "07-021":
      return "geriatria";
    case "07-037":
      return "nefrologia";
    case "09-008":
      return "ortodoncia";
  }
}

watch(props, () => {
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
            name:
              solveCase.status === 'preliminary' &&
              solveCase.serviceRequest.status === 'draft'
                ? 'trackingCaseEdit'
                : solveCase.status === 'final' &&
                  solveCase.serviceRequest.status != 'completed'
                ? 'trackingCaseView'
                : 'trackingCaseView',
            params: {
              id: solveCase.id,
              celula: mapeoEspecialidad(solveCase.category[0].coding[0].code),
              paciente: solveCase.subject.reference,
              url: 'trackingCase',
            },
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

          <q-item-section side top>
            <q-badge
              :label="
                solveCase.status === 'preliminary' &&
                solveCase.serviceRequest.status === 'draft'
                  ? 'Borrador'
                  : solveCase.status === 'final' &&
                    solveCase.serviceRequest.status != 'completed'
                  ? 'Pendiente de Respuesta'
                  : 'Contestada'
              "
              :color="
                solveCase.status === 'preliminary' &&
                solveCase.serviceRequest.status === 'draft'
                  ? 'red'
                  : solveCase.status === 'final' &&
                    solveCase.serviceRequest.status != 'completed'
                  ? 'grey'
                  : 'green'
              "
            />
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
