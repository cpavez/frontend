<script setup>
import Questionnaire from "./Questionnaire.vue";
import { computed, onMounted, ref, watch } from "vue";
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

const formData = ref({});
const store = useStore();
void store.dispatch(
  "questionnaire/setQuestionnaireExamenFisico",
  props.questionnaireId
);
const questionnaire = computed(
  () => store.getters["questionnaire/getQuestionnaireExamenFisico"]
);

const emit = defineEmits(["update:modelValue"]);

function component(text, valor, um, code) {
  if (um != null) {
    const component = {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: code,
            display: text,
          },
        ],
        text: text,
      },
      valueQuantity: {
        value: parseInt(valor),
        unit: um,
        system: "http://unitsofmeasure.org",
        code: um,
      },
    };
    return component;
  } else {
    const component = {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: code,
            display: text,
          },
        ],
        text: text,
      },
      valueString: valor,
    };
    return component;
  }
}
function answer(a) {
  if (a.valueString != undefined) {
    return a.valueString;
  } else if (a.valueInteger != undefined) {
    return parseInt(a.valueInteger);
  } else if (a.valueDecimal != undefined) {
    return parseInt(a.valueDecimal);
  }
}
function createObject(currentValue) {
  const objectComponent = [];
  currentValue?.resource?.item.forEach((item) => {
    if (item.item) {
      item.item.forEach((subItem) => {
        let itemExten = [];
        let extension = null;
        questionnaire.value.item.forEach((Qitem) => {
          if (Qitem.linkId === item.linkId) {
            [itemExten] = Qitem.item.filter(
              (QsubItem) => QsubItem.linkId === subItem.linkId
            );
          }
        });
        extension = itemExten?.extension?.filter(
          (extension) =>
            extension.url ===
            "http://hl7.org/fhir/StructureDefinition/questionnaire-unit"
        )[0].valueCoding.display;

        objectComponent.push(
          component(
            subItem.text,
            answer(subItem.answer[0]),
            extension,
            subItem.linkId
          )
        );
      });
    } else {
      let itemExten = [];
      let extension = null;
      questionnaire.value.item.forEach((Qitem) => {
        if (Qitem.linkId === item.linkId) {
          [itemExten] = Qitem.item.filter(
            (QsubItem) => QsubItem.linkId === item.linkId
          );
        }
      });
      extension = itemExten?.extension?.filter(
        (extension) =>
          extension.url ===
          "http://hl7.org/fhir/StructureDefinition/questionnaire-unit"
      )[0].valueCoding.display;

      objectComponent.push(
        component(item.text, answer(subItem.answer[0]), extension, item.linkId)
      );
    }
  });
  const observation = {
    resourceType: "Observation",
    text: {
      status: "generated",
      div: '<div xmlns="http://www.w3.org/1999/xhtml">\n<h1>Observación</h1>\n<ul>\n<li>\n<strong>Panel de Signos vitales</strong> \n</li>\n</ul>\n</div>',
    },
    status: "final",
    category: [
      {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
        ],
        text: "Exámen Físico",
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "85353-1",
          display:
            "Vital signs, weight, height, head circumference, oxygen saturation & BMI panel",
        },
      ],
      text: "Signos Vitales",
    },
    subject: {
      reference: "Patient/" + props.patientId,
    },
    encounter: {
      display: "Atención de Especialidades",
    },
    effectiveDateTime: new Date(),
    component: objectComponent,
  };
  const object = { ExamenFisico: observation };
  Object.assign(currentValue, object);
  emit("update:modelValue", currentValue);
}

watch(formData, (currentValue, oldValue) => {
  currentValue.data["39156-5"] =
    currentValue.data["29463-7"] && currentValue.data["8302-2"]
      ? currentValue.data["29463-7"] /
        Math.pow(currentValue.data["8302-2"] / 100, 2)
      : "";
  createObject(currentValue);
});
</script>

<template>
  <q-card class="my-card q-mb-sm" flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label>Exámen Físico</q-item-label>
        <q-item-label caption> Exámen físico al paciente </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-12">
        <Questionnaire
          :status="status"
          :observationResource="observationResource"
          :questionnaire="questionnaire"
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
