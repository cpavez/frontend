<template>
  <div class="q-pa-md q-col-gutter-y-sm">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">{{t('person.solveCase')}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div class="q-pa-md" style="max-width: 450px" >
              <q-list bordered padding>

                <q-item-label header>{{t('project.cellList')}}</q-item-label>

                <q-item clickable @click="category='07-012'">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img src="../assets/img/Dermatologia-01.svg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{t('project.dermatology')}}</q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item clickable @click="category='07-013'">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img src="../assets/img/Nefrologia-01.svg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{t('project.nephrology')}}</q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item clickable @click="category='07-014'">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img src="../assets/img/geriatria-01.svg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{t('project.geriatrics')}}</q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item clickable @click="category='07-015'">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img src="../assets/img/Diabetes-01.svg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{t('project.diabetes')}}</q-item-section>
                </q-item>

                <q-separator spaced/>

                <q-item clickable @click="category='07-015'">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img src="../assets/img/Icono odontologia-01.svg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{t('project.orthodontics')}}</q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item clickable @click="category='07-015'">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img src="../assets/img/patologia oral-01.svg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{t('project.oralPathology')}}</q-item-section>
                </q-item>


              </q-list>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <SolveCase :category="category" :criterio="criterio" :title="t('person.solveCase')"></SolveCase>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {computed, onBeforeMount, onMounted, ref} from 'vue';
import {Loading, LocalStorage, QSpinnerDots, useQuasar} from 'quasar';
import { useI18n } from 'vue-i18n'
import {useStore} from 'vuex'
import SolveCase from "../components/SolveCase.vue";
Loading.show()
Loading.show({
  spinner: QSpinnerDots,
})

export default {
  components:{SolveCase},
  setup: function() {
    const category = ref('');
    const criterio = ref('');
    const $q = useQuasar();
    const store = useStore();

    let { t } = useI18n({ useScope: 'global' });

    onMounted(() => {
      Loading.hide()
    })



    return {
      t,
      category,
      criterio
    };
  }
}

</script>
