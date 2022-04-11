<template>
  <Dermatologia url_to_props="trackingCase" ></Dermatologia>
</template>

<script>
import {computed, onBeforeMount, onMounted, onServerPrefetch, ref, watch, watchEffect} from 'vue';
import { useI18n } from 'vue-i18n'
import {useStore} from 'vuex'
import {Loading, LocalStorage, QSpinnerDots, uid, useQuasar} from "quasar";
import HeadPatient from "../components/HeadPatient.vue";
import ExamenFisico from "../components/ExamenFisico.vue";
import Antecedentes from "../components/Antecedentes.vue";
import InterconsultaDermatologia from "../components/InterconsultaDermatologia.vue";
import Anexos from "../components/Anexos.vue";
import {useRouter} from "vue-router";
import router from "../router";
import Dermatologia from "./Dermatologia.vue";
export default {
  components: {Dermatologia, InterconsultaDermatologia, Antecedentes, HeadPatient, ExamenFisico, Anexos},
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const route = useRouter();
    let {t} = useI18n({useScope: 'global'})
    const compositionID = ref((route?.currentRoute?._value?.params?.id) ? route.currentRoute._value.params.id : '')
    const celula = ref((route?.currentRoute?._value?.params?.celula) ? route.currentRoute._value.params.celula : '')
    const patientID = ref((route?.currentRoute?._value?.params?.paciente) ? route.currentRoute._value.params.paciente : '')
    LocalStorage.set('PatientID',patientID.value)
    return {
      t,
      celula,
      compositionID,
      patientID
    }
  }
}
</script>
