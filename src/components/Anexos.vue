<script setup>
import Questionnaire from "./Questionnaire.vue";
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";

components: {Questionnaire}

const props = defineProps({
  questionnaireId: String,
  patientId: String,
  questionnaireResponse: String,
  observationResource: String,
  modelValue: Object,
  status: String
})

const store = useStore();
void store.dispatch('questionnairePatient/setQuestionnaireAnexos',props.questionnaireId);
const questionnaireAnexos = computed(()=>store.getters['questionnairePatient/getQuestionnaireAnexos']);

const emit = defineEmits(['update:modelValue'])
const formData = ref({})

watch(formData, (currentValue, oldValue) => {
  emit('update:modelValue',currentValue)
});

</script>

<template>
  <q-card class="my-card q-mb-sm" flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label>Anexos</q-item-label>
        <q-item-label caption>
          Anexos para complementar la Interconsulta
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-section horizontal>
      <q-card-section class="col-12">
        <Questionnaire :status="status"  :observationResource="observationResource"  :questionnaire="questionnaireAnexos" :modelValue="formData" @update:modelValue="newValue => formData = newValue" :questionnaireId="questionnaireId" :patientId="patientId" :questionnaireResponse="questionnaireResponse"/>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
</style>
