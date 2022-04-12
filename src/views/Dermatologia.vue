<template>
  <div class="q-pa-md">
    <HeadPatient url_to_return="createCase" :url_to_props="url_to_props" />
  </div>

  <div class="q-pa-md">
    <div class="row">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <ExamenFisico
          v-if="questionnaireExamenFisicoResponse || compositionID === ''"
          :status="status"
          :modelValue="questionnaireExamenFisico"
          @update:modelValue="
            (newValue) => (questionnaireExamenFisico = newValue)
          "
          questionnaireId="1353"
          :patientId="patientString"
          :questionnaireResponse="questionnaireExamenFisicoResponse"
        />
        <Antecedentes
          v-if="questionnaireAntecedentesResponse || compositionID === ''"
          :status="status"
          :modelValue="questionnaireAntecedentes"
          @update:modelValue="
            (newValue) => (questionnaireAntecedentes = newValue)
          "
          questionnaireId="1359"
          :patientId="patientString"
          :questionnaireResponse="questionnaireAntecedentesResponse"
        />
      </div>
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <InterconsultaDermatologia
          v-if="
            questionnaireInterconsultaDermatologiaResponse ||
            compositionID === ''
          "
          :status="status"
          :modelValue="questionnaireInterconsultaDermatologia"
          @update:modelValue="
            (newValue) => (questionnaireInterconsultaDermatologia = newValue)
          "
          questionnaireId="1360"
          :patientId="patientString"
          :questionnaireResponse="
            questionnaireInterconsultaDermatologiaResponse
          "
        />
      </div>
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <Anexos
          :status="status"
          v-if="questionnaireAnexosResponse || compositionID === ''"
          :modelValue="questionnaireAnexos"
          @update:modelValue="(newValue) => (questionnaireAnexos = newValue)"
          questionnaireId="1361"
          :patientId="patientString"
          :questionnaireResponse="questionnaireAnexosResponse"
        />
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab
            icon="add"
            direction="up"
            color="accent"
            unelevated
            padding="10px"
          >
            <q-fab-action
              padding="5px"
              label-class="bg-grey-3 text-grey-8"
              @click="onClick(2)"
              external-label
              label-position="left"
              label="Completo"
              unelevated
              color="secondary"
              icon="save"
            />
            <q-fab-action
              padding="5px"
              label-class="bg-grey-3 text-grey-8"
              @click="onClick(1)"
              external-label
              label-position="left"
              label="Borrador"
              unelevated
              color="orange"
              icon="save_as"
            />
          </q-fab>
        </q-page-sticky>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { Loading, LocalStorage, QSpinnerDots, uid, useQuasar } from "quasar";
import HeadPatient from "../components/HeadPatient.vue";
import ExamenFisico from "../components/ExamenFisico.vue";
import Antecedentes from "../components/Antecedentes.vue";
import InterconsultaDermatologia from "../components/InterconsultaDermatologia.vue";
import Anexos from "../components/Anexos.vue";
import { useRouter } from "vue-router";
import router from "../router";
Loading.show();
Loading.show({
  spinner: QSpinnerDots,
});
export default {
  components: {
    InterconsultaDermatologia,
    Antecedentes,
    HeadPatient,
    ExamenFisico,
    Anexos,
  },
  props: { url_to_props: String },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const route = useRouter();
    const patientString = ref(LocalStorage.getItem("PatientID"));
    const questionnaireExamenFisicoResponse = ref("");
    const questionnaireAntecedentesResponse = ref("");
    const questionnaireInterconsultaDermatologiaResponse = ref("");
    const questionnaireAnexosResponse = ref("");
    const questionnaireExamenFisico = ref({});
    const questionnaireAntecedentes = ref({});
    const questionnaireInterconsultaDermatologia = ref({});
    const questionnaireAnexos = ref({});
    const status = ref("draft");
    const compositionID = ref(
      route?.currentRoute?._value?.params?.id
        ? route.currentRoute._value.params.id
        : ""
    );

    let { t } = useI18n({ useScope: "global" });

    watchEffect(async () => {
      if (LocalStorage.getItem("PatientID") === "") {
        void store.dispatch("composition/setComposition", "");
        $q.notify({
          color: "negativa",
          textColor: "white",
          icon: "cloud_done",
          message: "Acceso Denegado",
        });
        router.push({ name: "createCase" });
      } else {
        void store.dispatch("patient/setPatientID", patientString.value);
        void store.dispatch(
          "alergyIntolerance/setAlergias",
          patientString.value.replace("Patient/", "")
        );
      }

      if (compositionID.value != "") {
        void (await store.dispatch(
          "composition/setComposition",
          compositionID.value
        ));
        const composition = await computed(
          () => store.getters["composition/getComposition"]
        );
        if (composition) {
          composition.value.section.forEach((section, index) => {
            switch (section.title) {
              case "Exámen Físico":
                section.entry.forEach((QuestionnaireResponse, index) => {
                  questionnaireExamenFisicoResponse.value =
                    QuestionnaireResponse.reference.split("/")[1];
                });
                break;
              case "Antecedentes":
                section.entry.forEach((QuestionnaireResponse, index) => {
                  questionnaireAntecedentesResponse.value =
                    QuestionnaireResponse.reference.split("/")[1];
                });
                break;
              case "Interconsulta":
                section.entry.forEach((QuestionnaireResponse, index) => {
                  questionnaireInterconsultaDermatologiaResponse.value =
                    QuestionnaireResponse.reference.split("/")[1];
                });
                break;
              case "Anexos":
                section.entry.forEach((QuestionnaireResponse, index) => {
                  questionnaireAnexosResponse.value =
                    QuestionnaireResponse.reference.split("/")[1];
                });
                break;
            }
          });
        } else {
          questionnaireExamenFisicoResponse.value = "";
          questionnaireAntecedentesResponse.value = "";
          questionnaireInterconsultaDermatologiaResponse.value = "";
          questionnaireAnexosResponse.value = "";
        }
      }
    });

    function bundle(
      examenFisico,
      examenFisicoResponse,
      antecedentes,
      antecedentesResponse,
      interconsulta,
      interconsultaResponse,
      anexos,
      anexosResponse
    ) {
      const uuidExamenFisico = "urn:uuid:" + uid();
      const uuidExamenFisicoResponse = "urn:uuid:" + uid();
      const uuidAntecedentes = "urn:uuid:" + uid();
      const uuidAntecedentesResponse = "urn:uuid:" + uid();
      const uuidIntercosulta = "urn:uuid:" + uid();
      const uuidIntercosultaResponse = "urn:uuid:" + uid();
      const uuidAnexosResponse = "urn:uuid:" + uid();
      const uuidComposition = "urn:uuid:" + uid();

      console.log(examenFisico.ExamenFisico);

      let object = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            fullUrl: uuidExamenFisico,
            resource: examenFisico.ExamenFisico,
            request: {
              method: "POST",
              url: "Observation",
            },
          },
          {
            fullUrl: uuidExamenFisicoResponse,
            resource: Object.assign(examenFisico.resource, {
              subject: { reference: uuidExamenFisico },
            }),
            request: {
              method: examenFisicoResponse ? "PUT" : "POST",
              url: examenFisicoResponse
                ? "QuestionnaireResponse/" + examenFisicoResponse
                : "QuestionnaireResponse",
            },
          },
          {
            fullUrl: uuidAntecedentes,
            resource: antecedentes.Antecedentes,
            request: {
              method: antecedentes.observationAntecedentes ? "PUT" : "POST",
              url: antecedentes.observationAntecedentes
                ? antecedentes.observationAntecedentes
                : "Observation",
            },
          },
          {
            fullUrl: uuidAntecedentesResponse,
            resource: Object.assign(antecedentes.resource, {
              subject: { reference: uuidAntecedentes },
            }),
            request: {
              method: antecedentesResponse ? "PUT" : "POST",
              url: antecedentesResponse
                ? "QuestionnaireResponse/" + antecedentesResponse
                : "QuestionnaireResponse",
            },
          },
          {
            fullUrl: uuidIntercosulta,
            resource: interconsulta.Interconsulta,
            request: {
              method: "POST",
              url: "ServiceRequest",
            },
          },
          {
            fullUrl: uuidIntercosultaResponse,
            resource: Object.assign(interconsulta.resource, {
              basedOn: [{ reference: uuidIntercosulta }],
            }),
            request: {
              method: interconsultaResponse ? "PUT" : "POST",
              url: interconsultaResponse
                ? "QuestionnaireResponse/" + interconsultaResponse
                : "QuestionnaireResponse",
            },
          },
          {
            fullUrl: uuidAnexosResponse,
            resource: anexos.resource,
            request: {
              method: anexosResponse ? "PUT" : "POST",
              url: anexosResponse
                ? "QuestionnaireResponse/" + anexosResponse
                : "QuestionnaireResponse",
            },
          },
          {
            fullUrl: uuidComposition,
            resource: {
              resourceType: "Composition",
              status: status.value === "completed" ? "final" : "preliminary",
              type: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "57133-1",
                    display: "Referral note",
                  },
                ],
              },
              category: [
                {
                  coding: [
                    {
                      system: "https://www.minsal.cl/",
                      code: "07-012",
                      display: "Dermatología",
                    },
                  ],
                },
              ],
              subject: {
                reference: "Patient/" + patientString.value,
              },
              date: new Date(),
              author: [
                {
                  display: "CRISTHIAN ANDRES PAVEZ FRANCO",
                },
              ],
              title: "Interconsulta de Dermatología",
              confidentiality: "N",
              section: [
                {
                  title: "Exámen Físico",
                  code: {
                    coding: [
                      {
                        system: "http://loinc.org",
                        code: "85353-1",
                        display:
                          "Vital signs, weight, height, head circumference, oxygen saturation & BMI panel",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: uuidExamenFisicoResponse,
                    },
                  ],
                },
                {
                  title: "Antecedentes",
                  code: {
                    coding: [
                      {
                        system: "http://loinc.org",
                        code: "10166-7",
                        display: "History of Social function Narrative",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: uuidAntecedentesResponse,
                    },
                  ],
                },
                {
                  title: "Interconsulta",
                  code: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "394582007",
                        display: "Dermatology",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: uuidIntercosultaResponse,
                    },
                  ],
                },
                {
                  title: "Anexos",
                  entry: [
                    {
                      reference: uuidAnexosResponse,
                    },
                  ],
                },
              ],
            },
            request: {
              method: compositionID.value != "" ? "PUT" : "POST",
              url:
                compositionID.value != ""
                  ? "Composition/" + compositionID.value
                  : "Composition",
            },
          },
        ],
      };
      return object;
    }

    onBeforeMount(() => {
      Loading.hide();
    });

    return {
      t,
      async onClick(acction) {
        $q.loading.show();
        status.value = acction === 2 ? "completed" : "draft";
        const response = bundle(
          questionnaireExamenFisico.value,
          questionnaireExamenFisicoResponse.value,
          questionnaireAntecedentes.value,
          questionnaireAntecedentesResponse.value,
          questionnaireInterconsultaDermatologia.value,
          questionnaireInterconsultaDermatologiaResponse.value,
          questionnaireAnexos.value,
          questionnaireAnexosResponse.value
        );

        let postBundle = await store.dispatch("bundle/postBundle", response);
        if (postBundle.status === 201) {
          $q.loading.hide();
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Creada",
          });
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Problem!",
          });
          console.log("ERROR", postBundle);
        }
      },
      patientString,
      compositionID,
      questionnaireExamenFisico,
      questionnaireExamenFisicoResponse,
      questionnaireAntecedentes,
      questionnaireAntecedentesResponse,
      questionnaireInterconsultaDermatologia,
      questionnaireInterconsultaDermatologiaResponse,
      questionnaireAnexos,
      questionnaireAnexosResponse,
      status,
    };
  },
};
</script>
