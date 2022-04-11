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
void store.dispatch('questionnairePatient/setQuestionnaireAntecedentes',props.questionnaireId);
const questionnaireAntecedentes = computed(()=>store.getters['questionnairePatient/getQuestionnaireAntecedetes']);

const emit = defineEmits(['update:modelValue'])
const formData = ref({})

function component(text,valor,um,code,item){
  if(item.valueString != undefined ){
    const component = {
      "code" : {
        "coding" : [
          {
            "system" : "http://loinc.org",
            "code" : code,
            "display" : text
          }
        ],
        "text" : text
      },
      "valueString" : valor
    }
    return component
  }else if(item.valueInteger != undefined){
    const component = {
      "code" : {
        "coding" : [
          {
            "system" : "http://loinc.org",
            "code" : code,
            "display" : text
          }
        ],
        "text" : text
      },
      "valueQuantity" : {
        "value" : parse(valor),
        "unit" : um,
        "system" : "http://unitsofmeasure.org",
        "code" : um
      }
    }
    return component
  }else if(item.valueBoolean != undefined){
    const component = {
      "code" : {
        "coding" : [
          {
            "system" : "http://loinc.org",
            "code" : code,
            "display" : text
          }
        ],
        "text" : text
      },
      "valueBoolean" : valor
    }
    return component
  }else if(item.valueDecimal != undefined){
    const component = {
      "code" : {
        "coding" : [
          {
            "system" : "http://loinc.org",
            "code" : code,
            "display" : text
          }
        ],
        "text" : text
      },
      "valueQuantity" : {
        "value" : parse(valor),
        "unit" : um,
        "system" : "http://unitsofmeasure.org",
        "code" : um
      }
    }
    return component
  }else if(item.valueCoding != undefined){
    const component = {
      "code" : {
        "coding" : [
          {
            "system" : "http://loinc.org",
            "code" : code,
            "display" : text
          }
        ],
        "text" : text
      },
      "valueCodeableConcept" : {"coding": [item.valueCoding]}
    }
    return component
  }


}
function answer(a){
  if(a.valueString != undefined ){
    return a.valueString
  }else if(a.valueInteger != undefined){
    return parseInt(a.valueInteger)
  }else if(a.valueDecimal != undefined){
    return parseInt(a.valueDecimal)
  }else if(a.valueCoding != undefined){
    return a.valueCoding.code
  }
}
function createObject(currentValue){
  const objectComponent = []
  currentValue?.resource?.item.forEach(item=>{
    if(item.item){
      item.item.forEach(subItem=>{
        let itemExten = []
        let extension = null
        questionnaireAntecedentes.value.item.forEach(Qitem=>{
          if(Qitem.linkId === item.linkId){
            [itemExten] = Qitem.item.filter(QsubItem => QsubItem.linkId === subItem.linkId)
          }
        })
        extension = itemExten?.extension?.filter(extension => extension.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit')[0]?.valueCoding?.display

        objectComponent.push(component(subItem.text,answer(subItem.answer[0]),extension,subItem.linkId,subItem.answer[0]))
      })
    }else{
      let itemExten = []
      let extension = null
      questionnaireAntecedentes.value.item.forEach(Qitem=>{
        if(Qitem.linkId === item.linkId){
          [itemExten] = Qitem.item.filter(QsubItem => QsubItem.linkId === item.linkId)
        }
      })
      extension = itemExten?.extension?.filter(extension => extension.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit')[0].valueCoding.display


      objectComponent.push(component(item.text,answer(item.answer[0]),extension,item.linkId,item.answer[0]))
    }
  })
  const observation = {
    "resourceType": "Observation",
    "text": {
      "status": "generated",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n<h1>Observación</h1>\n<ul>\n<li>\n<strong>Panel de Signos vitales</strong> \n</li>\n</ul>\n</div>"
    },
    "status": "final",
    "category" : [
      {
        "coding" : [
          {
            "system" : "http://terminology.hl7.org/CodeSystem/observation-category",
            "code" : "social-history",
            "display" : "Social History"
          }
        ],
        "text" : "Antecedentes"
      }
    ],
    "code" : {
      "coding" : [
        {
          "system" : "http://loinc.org",
          "code" : '10166-7',
          "display" : 'History of Social function Narrative'
        }
      ],
      "text" : 'Antecedentes'
    },
    "subject" : {
      "reference" : props.patientId
    },
    "encounter" : {
      "display" : "Atención de Especialidades"
    },
    "effectiveDateTime" : new Date(),
    "component" : objectComponent
  }
  const object = {'Antecedentes':observation}
  Object.assign(currentValue,object)
  emit('update:modelValue',currentValue)
}

watch(formData, (currentValue, oldValue) => {
  createObject(currentValue)
});

</script>

<template>
  <q-card class="my-card q-mb-sm" flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label>Antecedentes</q-item-label>
        <q-item-label caption>
          Antecedentes relevantes y familiares
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-12">
        <Questionnaire :status="status"  :observationResource="observationResource"  :questionnaire="questionnaireAntecedentes" :modelValue="formData" @update:modelValue="newValue => formData = newValue" :questionnaireId="questionnaireId" :patientId="patientId" :questionnaireResponse="questionnaireResponse"/>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
</style>
