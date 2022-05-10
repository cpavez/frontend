<script setup>
import Questionnaire from "./Questionnaire.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

components: {
  Questionnaire;
}

const props = defineProps({
  questionnaireId: String,
  patientId: String,
  questionnaireResponse: String,
  observationResource: String,
  modelValue: Object,
  status: String,
});

const store = useStore();
void store.dispatch(
  "questionnaire/setQuestionnaireInterconsultaDermatologia",
  props.questionnaireId
);
const questionnaireInterconsultaDermatologia = computed(
  () => store.getters["questionnaire/getQuestionnaireInterconsultaDermatologia"]
);

const emit = defineEmits(["update:modelValue"]);
const formData = ref({});

function serviceRequest(currentValue) {
  const serviceRequest = {
    resourceType: "ServiceRequest",
    text: {
      status: "generated",
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Solicitud de Interconsulta Dermatología</b></p></div>',
    },
    identifier: [
      {
        system: "http://www.deis.cl/",
        value: "01-0001",
      },
    ],
    basedOn: [
      {
        display: "ServiceRequest para Dermatología",
      },
    ],
    status: props.status,
    intent: "order",
    category: [
      {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "103696004",
            display: "Patient referral to specialist",
          },
        ],
        text: "Paciente derivado a Especialista",
      },
    ],
    priority: currentValue.data.prioridad?.valueCoding?.code,
    code: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "394582007",
          display: "Dermatology",
        },
      ],
      text: "Dermatología",
    },
    subject: {
      reference: "Patient/" + props.patientId,
    },
    encounter: {
      display: "Atención de Especialidades",
    },
    authoredOn: new Date(),
    reasonCode: [
      {
        text: currentValue.data.motivoConsulta,
      },
    ],
    note: [
      {
        authorString: "Médico",
        time: new Date(),
        text: currentValue.data.descripcionCaso,
      },
    ],
  };
  const object = { Interconsulta: serviceRequest };
  Object.assign(currentValue, object);
  emit("update:modelValue", currentValue);
}

function encounter(currentValue) {
  const encounter = {
    resourceType: "Encounter",
    text: {
      status: "generated",
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Encuentro de Interconsulta Dermatología</b></p></div>',
    },
    identifier: [
      {
        system: "http://www.deis.cl/",
        value: "01-0001-001",
      },
    ],
    status: "in-progress",
    intent: "order",
    class: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: "AMB",
      display: "ambulatorio",
    },
    categotypery: [
      {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "11429006",
            display: "Consultation",
          },
        ],
        text: "Consulta Ambulatoria",
      },
    ],
    priority: currentValue.data.prioridad?.valueCoding?.code,
    subject: {
      reference: "Patient/" + props.patientId,
    },
    reasonCode: [
      {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "11429006",
            display: "Consultation",
          },
        ],
        text: "Consulta Ambulatoria",
      },
    ],
  };
  const object = { Encounter: encounter };
  Object.assign(currentValue, object);
  emit("update:modelValue", currentValue);
}

watch(formData, (currentValue, oldValue) => {
  serviceRequest(currentValue);
  encounter(currentValue);
});
</script>

<template>
  <q-card class="my-card q-mb-sm" flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label>Interconsulta</q-item-label>
        <q-item-label caption>
          Detalle lo mas posible todo los datos de la Interconsulta de
          Dermatología
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-12">
        <Questionnaire
          :status="status"
          :observationResource="observationResource"
          :questionnaire="questionnaireInterconsultaDermatologia"
          :modelValue="formData"
          @update:modelValue="(newValue) => (formData = newValue)"
          :questionnaireId="questionnaireId"
          :patientId="patientId"
          :questionnaireResponse="questionnaireResponse"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
