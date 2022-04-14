<script setup>
import {
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { uid } from "quasar";
import ItemsQuestionnaire from "./itemsQuestionnaire.vue";
import { useStore } from "vuex";

components: {
  ItemsQuestionnaire;
}

const props = defineProps({
  questionnaireId: String,
  patientId: String,
  questionnaireResponse: String,
  observationResource: String,
  modelValue: Object,
  questionnaire: Object,
  status: String,
});
const emit = defineEmits(["update:modelValue"]);

const store = useStore();
const camposVariable = ref({});
const modelPatientVariable = ref({});
const newObservation = ref("");

onMounted(async () => {
  if (props.questionnaireResponse != "") {
    const questionnaireResponse = await store.dispatch(
      "questionnaireResponse/getQuestionnaireResponse",
      props.questionnaireResponse
    );
    if (
      questionnaireResponse.questionnaire ===
      "https://qa-cdr.minsal.cl/Questionnaire/1359"
    ) {
      newObservation.value = questionnaireResponse.subject.reference;
    }

    let linkId = "";
    let repeat = false;
    for (const val of questionnaireResponse.item) {
      const i = questionnaireResponse.item.indexOf(val);
      if (val.item) {
        const subitem = val.item;
        if (linkId === val.linkId) {
          repeat = true;
          addGroup(
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0],
            val.linkId
          );
        } else {
          linkId = val.linkId;
          repeat = false;
        }
        for (const item of subitem) {
          if (item.answer[0].valueString) {
            if (
              props?.questionnaire?.item?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]?.repeats
            ) {
              modelPatientVariable.value[item.linkId + "|" + i] =
                item.answer[0].valueString;
            } else {
              modelPatientVariable.value[item.linkId] =
                item.answer[0].valueString;
            }
          } else if (item.answer[0].valueDate) {
            modelPatientVariable.value[item.linkId] = item.answer[0].valueDate;
          } else if (item.answer[0].valueBoolean) {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueBoolean;
          } else if (item.answer[0].valueInteger) {
            if (
              props?.questionnaire?.item?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]?.repeats
            ) {
              modelPatientVariable.value[item.linkId + "|" + i] =
                item.answer[0].valueInteger;
            } else {
              modelPatientVariable.value[item.linkId] =
                item.answer[0].valueInteger;
            }
          } else if (item.answer[0].valueDecimal) {
            if (
              props?.questionnaire?.item?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]?.repeats
            ) {
              modelPatientVariable.value[item.linkId + "|" + i] =
                item.answer[0].valueDecimal;
            } else {
              modelPatientVariable.value[item.linkId] =
                item.answer[0].valueDecimal;
            }
          } else if (item.answer[0].valueAttachment) {
            const url =
              "data:" +
              item.answer[0].valueAttachment.contentType +
              ";base64," +
              item.answer[0].valueAttachment.data;
            const b64toBlob = await fetch(url).then(function (res) {
              return res.arrayBuffer();
            });
            modelPatientVariable.value[item.linkId] = new File(
              [await b64toBlob],
              item.answer[0].valueAttachment.title,
              {
                type: item.answer[0].valueAttachment.contentType,
                lastModified: item.answer[0].valueAttachment.creation,
              }
            );
          } else {
            let checkBox = props?.questionnaire?.item
              ?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]
              .item.filter((item) => {
                if (
                  item.extension[0].valueCodeableConcept.text === "Check-box"
                ) {
                  return item;
                }
              });

            if (item.answer.length > 1) {
              item.answer.forEach((answer, index) => {
                modelPatientVariable.value[
                  item.linkId + "|" + i + answer.valueCoding.code
                ] = JSON.stringify(answer);
              });
            } else {
              if (checkBox?.length > 0) {
                modelPatientVariable.value[
                  item.linkId + "|" + i + item.answer[0].valueCoding.code
                ] = JSON.stringify(item.answer[0]);
              } else {
                modelPatientVariable.value[item.linkId] = item.answer[0];
              }
            }
          }
        }
      } else {
        const item = val.item;
        if (item.answer[0].valueString) {
          if (
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0].repeats
          ) {
            modelPatientVariable.value[item.linkId + "|" + i] =
              item.answer[0].valueString;
          } else {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueString;
          }
        } else if (item.answer[0].valueDate) {
          modelPatientVariable.value[item.linkId] = item.answer[0].valueDate;
        } else if (item.answer[0].valueBoolean) {
          modelPatientVariable.value[item.linkId] = item.answer[0].valueBoolean;
        } else if (item.answer[0].valueInteger) {
          if (
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0].repeats
          ) {
            modelPatientVariable.value[item.linkId + "|" + i] =
              item.answer[0].valueInteger;
          } else {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueInteger;
          }
        } else if (item.answer[0].valueDecimal) {
          if (
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0].repeats
          ) {
            modelPatientVariable.value[item.linkId + "|" + i] =
              item.answer[0].valueDecimal;
          } else {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueDecimal;
          }
        } else if (item.answer[0].valueAttachment) {
          const url =
            "data:" +
            item.answer[0].valueAttachment.contentType +
            ";base64," +
            item.answer[0].valueAttachment.data;
          const b64toBlob = await fetch(url).then(function (res) {
            return res.arrayBuffer();
          });
          modelPatientVariable.value[item.linkId] = new File(
            [await b64toBlob],
            item.answer[0].valueAttachment.title,
            {
              type: item.answer[0].valueAttachment.contentType,
              lastModified: item.answer[0].valueAttachment.creation,
            }
          );
        } else {
          if (item.answer.length > 1) {
            item.answer.forEach((answer, index) => {
              modelPatientVariable.value[
                item.linkId + "|" + i + answer.valueCoding.code
              ] = JSON.stringify(answer);
            });
          } else {
            modelPatientVariable.value[item.linkId] = item.answer[0];
          }
        }
      }
    }
  } else {
    if (props.patientId != "") {
      const obsevation = await store.dispatch(
        "observation/getObservationsSocialHistoryByPatient",
        props.patientId
      );
      if (obsevation.data.entry) {
        const arr_observation =
          obsevation?.data?.entry[obsevation?.data?.entry?.length - 1].resource
            .component;
        newObservation.value =
          "Observation/" +
          obsevation.data.entry[obsevation.data.entry.length - 1].resource.id;
        arr_observation.forEach((observation) => {
          if (observation.valueString != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueString;
          } else if (observation.valueDate != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueDate;
          } else if (observation.valueDecimal != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueDecimal;
          } else if (observation.valueInteger != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueInteger;
          } else if (observation.valueCodeableConcept != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] = {
              valueCoding: observation.valueCodeableConcept.coding[0],
            };
          }
        });
      }
    }
  }
});
watchEffect(async () => {
  if (props.questionnaireResponse != "") {
    const questionnaireResponse = await store.dispatch(
      "questionnaireResponse/getQuestionnaireResponse",
      props.questionnaireResponse
    );
    if (
      questionnaireResponse.questionnaire ===
      "https://qa-cdr.minsal.cl/Questionnaire/1359"
    ) {
      newObservation.value = questionnaireResponse.subject.reference;
    }

    let linkId = "";
    let repeat = false;
    for (const val of questionnaireResponse.item) {
      const i = questionnaireResponse.item.indexOf(val);
      if (val.item) {
        const subitem = val.item;
        if (linkId === val.linkId) {
          repeat = true;
          addGroup(
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0],
            val.linkId
          );
        } else {
          linkId = val.linkId;
          repeat = false;
        }
        for (const item of subitem) {
          if (item.answer[0].valueString) {
            if (
              props?.questionnaire?.item?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]?.repeats
            ) {
              modelPatientVariable.value[item.linkId + "|" + i] =
                item.answer[0].valueString;
            } else {
              modelPatientVariable.value[item.linkId] =
                item.answer[0].valueString;
            }
          } else if (item.answer[0].valueDate) {
            modelPatientVariable.value[item.linkId] = item.answer[0].valueDate;
          } else if (item.answer[0].valueBoolean) {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueBoolean;
          } else if (item.answer[0].valueInteger) {
            if (
              props?.questionnaire?.item?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]?.repeats
            ) {
              modelPatientVariable.value[item.linkId + "|" + i] =
                item.answer[0].valueInteger;
            } else {
              modelPatientVariable.value[item.linkId] =
                item.answer[0].valueInteger;
            }
          } else if (item.answer[0].valueDecimal) {
            if (
              props?.questionnaire?.item?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]?.repeats
            ) {
              modelPatientVariable.value[item.linkId + "|" + i] =
                item.answer[0].valueDecimal;
            } else {
              modelPatientVariable.value[item.linkId] =
                item.answer[0].valueDecimal;
            }
          } else if (item.answer[0].valueAttachment) {
            const url =
              "data:" +
              item.answer[0].valueAttachment.contentType +
              ";base64," +
              item.answer[0].valueAttachment.data;
            const b64toBlob = await fetch(url).then(function (res) {
              return res.arrayBuffer();
            });
            modelPatientVariable.value[item.linkId] = new File(
              [await b64toBlob],
              item.answer[0].valueAttachment.title,
              {
                type: item.answer[0].valueAttachment.contentType,
                lastModified: item.answer[0].valueAttachment.creation,
              }
            );
          } else {
            let checkBox = props?.questionnaire?.item
              ?.filter((a) => {
                if (a.linkId === val.linkId) {
                  return a;
                }
              })[0]
              .item.filter((item) => {
                if (
                  item.extension[0].valueCodeableConcept.text === "Check-box"
                ) {
                  return item;
                }
              });

            if (item.answer.length > 1) {
              item.answer.forEach((answer, index) => {
                modelPatientVariable.value[
                  item.linkId + "|" + i + answer.valueCoding.code
                ] = JSON.stringify(answer);
              });
            } else {
              if (checkBox.length > 0) {
                modelPatientVariable.value[
                  item.linkId + "|" + i + item.answer[0].valueCoding.code
                ] = JSON.stringify(item.answer[0]);
              } else {
                modelPatientVariable.value[item.linkId] = item.answer[0];
              }
            }
          }
        }
      } else {
        const item = val.item;
        if (item.answer[0].valueString) {
          if (
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0].repeats
          ) {
            modelPatientVariable.value[item.linkId + "|" + i] =
              item.answer[0].valueString;
          } else {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueString;
          }
        } else if (item.answer[0].valueDate) {
          modelPatientVariable.value[item.linkId] = item.answer[0].valueDate;
        } else if (item.answer[0].valueBoolean) {
          modelPatientVariable.value[item.linkId] = item.answer[0].valueBoolean;
        } else if (item.answer[0].valueInteger) {
          if (
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0].repeats
          ) {
            modelPatientVariable.value[item.linkId + "|" + i] =
              item.answer[0].valueInteger;
          } else {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueInteger;
          }
        } else if (item.answer[0].valueDecimal) {
          if (
            props?.questionnaire?.item?.filter((a) => {
              if (a.linkId === val.linkId) {
                return a;
              }
            })[0].repeats
          ) {
            modelPatientVariable.value[item.linkId + "|" + i] =
              item.answer[0].valueDecimal;
          } else {
            modelPatientVariable.value[item.linkId] =
              item.answer[0].valueDecimal;
          }
        } else if (item.answer[0].valueAttachment) {
          const url =
            "data:" +
            item.answer[0].valueAttachment.contentType +
            ";base64," +
            item.answer[0].valueAttachment.data;
          const b64toBlob = await fetch(url).then(function (res) {
            return res.arrayBuffer();
          });
          modelPatientVariable.value[item.linkId] = new File(
            [await b64toBlob],
            item.answer[0].valueAttachment.title,
            {
              type: item.answer[0].valueAttachment.contentType,
              lastModified: item.answer[0].valueAttachment.creation,
            }
          );
        } else {
          if (item.answer.length > 1) {
            item.answer.forEach((answer, index) => {
              modelPatientVariable.value[
                item.linkId + "|" + i + answer.valueCoding.code
              ] = JSON.stringify(answer);
            });
          } else {
            modelPatientVariable.value[item.linkId] = item.answer[0];
          }
        }
      }
    }
  } else {
    if (props.patientId != "") {
      const obsevation = await store.dispatch(
        "observation/getObservationsSocialHistoryByPatient",
        props.patientId
      );
      if (obsevation.data.entry) {
        const arr_observation =
          obsevation?.data?.entry[obsevation?.data?.entry?.length - 1].resource
            .component;
        newObservation.value =
          "Observation/" +
          obsevation.data.entry[obsevation.data.entry.length - 1].resource.id;
        arr_observation.forEach((observation) => {
          if (observation.valueString != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueString;
          } else if (observation.valueDate != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueDate;
          } else if (observation.valueDecimal != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueDecimal;
          } else if (observation.valueInteger != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] =
              observation.valueInteger;
          } else if (observation.valueCodeableConcept != undefined) {
            modelPatientVariable.value[observation.code.coding[0].code] = {
              valueCoding: observation.valueCodeableConcept.coding[0],
            };
          }
        });
      }
    }
  }
});

async function answer(a, b) {
  switch (a) {
    case "string":
      return { valueString: modelPatientVariable.value[b] };
      break;
    case "integer":
      return { valueInteger: parseInt(modelPatientVariable.value[b]) };
      break;
    case "decimal":
      return { valueDecimal: parseInt(modelPatientVariable.value[b]) };
      break;
    case "boolean":
      return { valueBoolean: modelPatientVariable.value[b] };
      break;
    case "text":
      return { valueString: modelPatientVariable.value[b] };
      break;
    case "choice":
      if (typeof modelPatientVariable.value[b] === "string") {
        if (modelPatientVariable.value[b]) {
          return JSON.parse(modelPatientVariable.value[b]);
        }
      } else {
        if (modelPatientVariable.value[b]) {
          return modelPatientVariable.value[b];
        }
      }

      break;
    case "date":
      return { valueDate: modelPatientVariable.value[b] };
      break;
    case "attachment":
      if (modelPatientVariable.value[b]) {
        return {
          valueAttachment: {
            title: modelPatientVariable.value[b].name,
            contentType: modelPatientVariable.value[b].type,
            creation: modelPatientVariable.value[b].lastModifiedDate,
            data: await getBase64(modelPatientVariable.value[b]),
          },
        };
      }
      break;
  }
}
async function func_item(a, b) {
  if (
    a.answerOption &&
    Array.isArray(a.answerOption.map((code) => code.valueCoding.code))
  ) {
    let subobjeto = [];
    for (const option of a.answerOption.map((code) => code.valueCoding.code)) {
      if (modelPatientVariable.value[a.linkId + "|" + b + option]) {
        if (answer(a.type, a.linkId + "|" + b + option) != null) {
          const resp = await answer(a.type, a.linkId + "|" + b + option);
          if (resp) subobjeto.push(resp);
        }
      }
    }

    if (subobjeto.length > 0) {
      let objeto = {
        linkId: a.linkId,
        text: a.text,
        answer: subobjeto,
      };
      return objeto;
    }
  }

  if (modelPatientVariable.value[a.linkId + "|" + b]) {
    let objeto = {
      linkId: a.linkId,
      text: a.text,
      answer: [await answer(a.type, a.linkId + "|" + b)],
    };
    return objeto;
  } else {
    if (modelPatientVariable.value[a.linkId]) {
      let objeto = {
        linkId: a.linkId,
        text: a.text,
        answer: [await answer(a.type, a.linkId)],
      };
      return objeto;
    } else {
      return false;
    }
  }
}
async function createObject() {
  let items = [];
  let count = 0;
  for (const item of await props?.questionnaire?.item) {
    let index = count++;
    if (item.type === "group") {
      let objectItem = [];
      for (const subItem of item.item) {
        await func_item(subItem, index).then((object) => {
          if (object) objectItem.push(object);
        });
      }
      if (objectItem.length > 0) {
        let object = {
          linkId: item.linkId,
          text: item.text,
          item: objectItem,
        };
        items.push(object);
      }
    } else {
      await func_item(item).then(items.push(object));
    }
  }
  let object = {
    resource: {
      resourceType: "QuestionnaireResponse",
      status: props.status === "completed" ? "completed" : "in-progress",
      questionnaire:
        "https://qa-cdr.minsal.cl/Questionnaire/" + props.questionnaireId,
      authored: new Date(),
      subject: {
        reference: "Patient/" + props.patientId,
      },
      item: items,
    },
    data: modelPatientVariable.value,
    observationAntecedentes: newObservation.value,
  };

  emit("update:modelValue", object);
}
function addGroup(items, linkId) {
  Object.assign(items, { multiple: true });
  const index = props?.questionnaire?.item?.findIndex(
    (item) => item.linkId === linkId
  );
  props.questionnaire.item.splice(index, 0, items);
}
async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}

watch(modelPatientVariable.value, (currentValue, oldValue) => {
  createObject();
});
</script>

<template>
  <div v-for="(item, index) in questionnaire.item" :key="item.id">
    <div
      v-if="item.type === 'group'"
      class="row q-pb-xs"
      style="margin-bottom: -16px !important"
    >
      <div
        v-for="subitem in item.item"
        :key="subitem.id"
        :class="'col-' + (item.repeats ? 10 : 12) / item.item.length"
      >
        <ItemsQuestionnaire
          style="margin-bottom: 5px !important"
          v-if="
            subitem.extension
              ?.map(
                (extension) =>
                  extension.url ===
                  'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden'
              )
              .toString() != 'true'
          "
          :multiple="item.repeats"
          :index="index"
          :camposVariable="camposVariable"
          :modelPatientVariable="modelPatientVariable"
          @update:modelPatientVariable="
            (newValue) => (modelPatientVariable = newValue)
          "
          :subitem="subitem"
        />
      </div>
      <div v-if="item.repeats === true" class="col-2">
        <q-btn
          color="primary"
          size="md"
          class="float-right"
          icon="add"
          @click="addGroup(item, item.linkId)"
        />
      </div>
    </div>
    <div v-else>
      <ItemsQuestionnaire
        :camposVariable="camposVariable"
        :modelPatientVariable="modelPatientVariable"
        @update:modelPatientVariable="
          (newValue) => (modelPatientVariable = newValue)
        "
        :subitem="item"
      />
    </div>
  </div>
</template>

<style scoped></style>
