<script setup>
import {computed, ref, watch, watchEffect} from 'vue'
import {useStore} from 'vuex'
import {LocalStorage} from "quasar";
import router from "../router";
import moment from "moment";
import 'moment/locale/es'

const props = defineProps({
  category: String,
  title: String,
  criterio: String
})

const solveCase = ref([])
const solveCases = ref([])
const store = useStore()
LocalStorage.set('PatientID','')


async function compositions() {
  solveCase.value = await store.dispatch('questionnairePatient/getComposition', '_include=Composition:subject&category=' + props.category)
  const composition = solveCase.value.data?.entry?.filter(composition =>{
    if(composition.search.mode === 'match'){
      return composition
    }
  })

  const arr_service = []
  if(composition){
    for (const composition1 of composition) {
      const sections = composition1.resource.section
      for (const section of sections){
        if (section.title === 'Interconsulta') {
          const response = await store.dispatch('questionnairePatient/getQuestionnaireResponse', section.entry[0].reference);
          arr_service[composition1.resource.id] = response.data.basedOn[0].reference
        }
      }
    }
    const arr_pat = []
    solveCase.value.data?.entry?.filter(patient =>{
      if(patient.search.mode === 'include'){
        const index = 'Patient/'+patient.resource.id
        arr_pat[index] = patient.resource
      }
    })
    const compositionPatiente = composition?.map(composition => {
      return Object.assign(composition.resource, {'patient': arr_pat[composition.resource.subject.reference]})
    })

    for (const composition2 of compositionPatiente) {
      const id = composition2.id
      const serviceRequest = await store.dispatch('questionnairePatient/getQuestionnaireResponse', arr_service[id]);
      Object.assign(composition2,{'serviceRequest':serviceRequest.data})
    }

    solveCases.value = compositionPatiente.filter(composition => {
      return composition
    })

    console.log(solveCases.value)
  }
}

function mapeoEspecialidad(codigo) {
  switch (codigo) {
    case '07-012':
      return 'dermatologia'
    case '07-013':
      return 'diabetes'
    case '07-021':
      return 'geriatria'
    case '07-037':
      return 'nefrologia'
    case '09-008':
      return 'ortodoncia'
  }

}

watch(props, (currentValue, oldValue) => {
  if(props.category != ''){
    compositions()
  }
});


</script>

<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-item-label header><q-badge color="blue">{{solveCases.length}}</q-badge> {{title}}</q-item-label>
      <q-separator spaced />
      <div v-if="solveCases" v-for="(solveCase,i) in solveCases" :key="solveCase.id">
        <q-item  clickable :to="{ name: (solveCase.status === 'preliminary' && solveCase.serviceRequest.status === 'draft')?'trackingCaseEdit':(solveCase.status === 'final' && solveCase.serviceRequest.status != 'completed')?'trackingCaseView':'trackingCaseView', params: { id: solveCase.id, celula: mapeoEspecialidad(solveCase.category[0].coding[0].code),paciente:solveCase.subject.reference, url:'trackingCase'} }">
          <q-item-section avatar>
            <img src="../assets/img/icono_persona-05.svg">
          </q-item-section>

          <q-item-section>
            <q-item-label overline>{{solveCase.title}} #{{solveCase.id}}
              <q-item-label caption>Creación: {{moment(solveCase.date).format('D/M/YYYY HH:mm')}} </q-item-label>
              <q-item-label caption>Asignación:  </q-item-label>
            </q-item-label>
            <q-item-label>{{solveCase.patient?.name?.filter(name=>{return name.use === 'official'})[0]?.family}} {{solveCase.patient?.name?.filter(name=>{return name.use === 'official'})[0]?._family?.extension[0]?.valueString}}, {{solveCase.patient?.name?.filter(name=>{return name.use === 'official'})[0]?.given[0]}}</q-item-label>
            <q-item-label caption>Establecimiento</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge :label="(solveCase.status === 'preliminary' && solveCase.serviceRequest.status === 'draft')?'Borrador':(solveCase.status === 'final' && solveCase.serviceRequest.status != 'completed')?'Pendiente de Respuesta':'Contestada'" :color="(solveCase.status === 'preliminary' && solveCase.serviceRequest.status === 'draft')?'red':(solveCase.status === 'final' && solveCase.serviceRequest.status != 'completed')?'grey':'green'"/>


          </q-item-section>
        </q-item>
        <q-separator v-if="(i+1) < solveCases.length" spaced />
      </div>
    </q-list>
  </div>
</template>

<style scoped>

</style>
