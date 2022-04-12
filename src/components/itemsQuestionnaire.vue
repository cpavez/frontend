<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelPatientVariable: Object,
  subitem: Object,
  camposVariable: Object,
  multiple: Boolean,
  index: Number,
});
const emit = defineEmits(["update:modelPatientVariable"]);

function equal(a, b) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
}
function exists(a) {
  if (a) {
    return true;
  } else {
    return false;
  }
}
function distint(a, b) {
  if (a != b) {
    return true;
  } else {
    return false;
  }
}
function higher(a, b) {
  if (a > b) {
    return true;
  } else {
    return false;
  }
}
function higherEqual(a, b) {
  if (a >= b) {
    return true;
  } else {
    return false;
  }
}
function less(a, b) {
  if (a < b) {
    return true;
  } else {
    return false;
  }
}
function lessEqual(a, b) {
  if (a <= b) {
    return true;
  } else {
    return false;
  }
}
function transformation(a, b, c, d) {
  if (a) {
    switch (d) {
      case "exists ":
        return exists(a);
        break;
      case "=":
        return equal(a, b);
        break;
      case "!=":
        return distint(a, b);
        break;
      case ">":
        return higher(a, b);
        break;
      case "<":
        return less(a, b);
        break;
      case ">=":
        return higherEqual(a, b);
        break;
      case "<=":
        return lessEqual(a, b);
        break;
    }
  }
}
function obtenerValue(a, index, valor = null) {
  if (props.modelPatientVariable[a] != undefined) {
    if (props.modelPatientVariable[a]?.valueAttachment != undefined) {
      return props.modelPatientVariable[a]?.valueAttachment.url;
    } else if (props.modelPatientVariable[a]?.valueCoding != undefined) {
      return props.modelPatientVariable[a]?.valueCoding.code;
    } else if (props.modelPatientVariable[a]?.valueQuantity != undefined) {
      return props.modelPatientVariable[a]?.valueQuantity.value;
    } else {
      return props.modelPatientVariable[a];
    }
  } else {
    if (
      props.modelPatientVariable[a + "|" + (index - 1) + valor] != undefined
    ) {
      if (
        typeof props.modelPatientVariable[a + "|" + (index - 1) + valor] ===
        "string"
      ) {
        if (
          JSON.parse(props.modelPatientVariable[a + "|" + (index - 1) + valor])
        ) {
          return JSON.parse(
            props.modelPatientVariable[a + "|" + (index - 1) + valor]
          )?.valueCoding.code;
        } else {
          if (
            props.modelPatientVariable[a + "|" + (index - 1) + valor]
              ?.valueAttachment != undefined
          ) {
            return props.modelPatientVariable[a + "|" + (index - 1) + valor]
              ?.valueAttachment.url;
          } else if (
            props.modelPatientVariable[a + "|" + (index - 1) + valor]
              ?.valueCoding != undefined
          ) {
            return props.modelPatientVariable[a + "|" + (index - 1) + valor]
              ?.valueCoding.code;
          } else if (
            props.modelPatientVariable[a + "|" + (index - 1) + valor]
              ?.valueQuantity != undefined
          ) {
            return props.modelPatientVariable[a + "|" + (index - 1) + valor]
              ?.valueQuantity.value;
          } else {
            return props.modelPatientVariable[a + "|" + (index - 1) + valor];
          }
        }
      } else {
        if (
          props.modelPatientVariable[a + "|" + (index - 1) + valor]
            ?.valueAttachment != undefined
        ) {
          return props.modelPatientVariable[a + "|" + (index - 1) + valor]
            ?.valueAttachment.url;
        } else if (
          props.modelPatientVariable[a + "|" + (index - 1) + valor]
            ?.valueCoding != undefined
        ) {
          return props.modelPatientVariable[a + "|" + (index - 1) + valor]
            ?.valueCoding.code;
        } else if (
          props.modelPatientVariable[a + "|" + (index - 1) + valor]
            ?.valueQuantity != undefined
        ) {
          return props.modelPatientVariable[a + "|" + (index - 1) + valor]
            ?.valueQuantity.value;
        } else {
          return props.modelPatientVariable[a + "|" + (index - 1) + valor];
        }
      }
    } else {
      return null;
    }
  }
}
function breach(info, campo, index) {
  if (info.type === "choice") {
    if (!props.camposVariable[info.linkId]) {
      let campoNuevo = {};
      campoNuevo[info.linkId] = info.answerOption;
      Object.assign(props.camposVariable, campoNuevo);
    }
  }
  if (info.type === "text") {
    if (!props.modelPatientVariable[info.linkId]) {
      props.modelPatientVariable[info.linkId] = "";
    }
  }

  if (info.enableWhen) {
    const element = info.enableWhen;
    let response = false;
    let _response = false;
    element.forEach(function (val, i) {
      if (element.length > 1) {
        if (i === 0) {
          if (val.answerCoding) {
            response = transformation(
              obtenerValue(val.question, index, val.answerCoding.code),
              val.answerCoding.code,
              campo,
              val.operator
            );
          } else if (val.answerQuantity) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerQuantity.code,
              campo,
              val.operator
            );
          } else if (val.answerBoolean) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerBoolean,
              campo,
              val.operator
            );
          } else if (val.answerDecimal) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerDecimal,
              campo,
              val.operator
            );
          } else if (val.answerInteger) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerInteger,
              campo,
              val.operator
            );
          } else if (val.answerDate) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerDate,
              campo,
              val.operator
            );
          } else if (val.answerDateTime) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerDateTime,
              campo,
              val.operator
            );
          } else if (val.answerTime) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerTime,
              campo,
              val.operator
            );
          } else if (val.answerString) {
            response = transformation(
              obtenerValue(val.question, index),
              val.answerString,
              campo,
              val.operator
            );
          }
        } else {
          const criterio = "any";
          if (val.answerCoding) {
            _response = transformation(
              obtenerValue(val.question, index, val.answerCoding.code),
              val.answerCoding.code,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerQuantity) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerQuantity.code,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerBoolean) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerBoolean,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerDecimal) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerDecimal,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerInteger) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerInteger,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerDate) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerDate,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerDateTime) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerDateTime,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerTime) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerTime,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          } else if (val.answerString) {
            _response = transformation(
              obtenerValue(val.question, index),
              val.answerString,
              campo,
              val.operator
            );
            response =
              info.enableBehavior === criterio
                ? response && _response
                : response || _response;
          }
        }
      } else {
        if (val.answerCoding) {
          response = transformation(
            obtenerValue(val.question, index, val.answerCoding.code),
            val.answerCoding.code,
            campo,
            val.operator
          );
        } else if (val.answerQuantity) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerQuantity.code,
            campo,
            val.operator
          );
        } else if (val.answerBoolean) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerBoolean,
            campo,
            val.operator
          );
        } else if (val.answerDecimal) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerDecimal,
            campo,
            val.operator
          );
        } else if (val.answerInteger) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerInteger,
            campo,
            val.operator
          );
        } else if (val.answerDate) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerDate,
            campo,
            val.operator
          );
        } else if (val.answerDateTime) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerDateTime,
            campo,
            val.operator
          );
        } else if (val.answerTime) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerTime,
            campo,
            val.operator
          );
        } else if (val.answerString) {
          response = transformation(
            obtenerValue(val.question, index),
            val.answerString,
            campo,
            val.operator
          );
        }
      }
    });
    return response;
  } else {
    return true;
  }
}
function filterFn(val, update, stringOptions, option) {
  if (val.length < 2) {
    return;
  }
  update(() => {
    const needle = val.toString().toUpperCase();
    props.camposVariable[option] = stringOptions.filter((v) => {
      return v.valueCoding.display.indexOf(needle) > -1;
    });
  });
}

watch(props.modelPatientVariable, (currentValue, oldValue) => {
  emit("update:modelPatientVariable", props.modelPatientVariable);
});
</script>
<template>
  <div v-if="subitem.type === 'display'">
    <div v-if="breach(subitem, subitem.linkId, index)" class="text-h6">
      {{ subitem.text }}
    </div>
  </div>
  <div v-else-if="subitem.type === 'boolean'">
    <q-toggle
      v-if="breach(subitem, subitem.linkId, index)"
      style="margin-bottom: 30px !important"
      :readonly="subitem.readOnly"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      :label="subitem.text"
      checked-icon="check"
      :indeterminate-value="false"
      unchecked-icon="clear"
    />
  </div>
  <div v-else-if="subitem.type === 'decimal'">
    <q-input
      dense
      stack-label
      :suffix="
        subitem?.extension?.filter(
          (extension) =>
            extension.url ===
            'http://hl7.org/fhir/StructureDefinition/questionnaire-unit'
        )[0]?.valueCoding?.display
      "
      v-if="breach(subitem, subitem.linkId, index)"
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      type="number"
      clearable
      outlined
      clear-icon="close"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      :label="subitem.text"
      :maxlength="subitem.maxLength ? subitem.maxLength : null"
    />
  </div>
  <div v-else-if="subitem.type === 'integer'">
    <q-input
      dense
      stack-label
      :suffix="
        subitem?.extension?.filter(
          (extension) =>
            extension.url ===
            'http://hl7.org/fhir/StructureDefinition/questionnaire-unit'
        )[0]?.valueCoding?.display
      "
      v-if="breach(subitem, subitem.linkId, index)"
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      type="number"
      clearable
      outlined
      clear-icon="close"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      :label="subitem.text"
      :maxlength="subitem.maxLength ? subitem.maxLength : null"
    />
  </div>
  <div v-else-if="subitem.type === 'date'">
    <q-input
      outlined
      v-if="breach(subitem, subitem.linkId, index)"
      :readonly="subitem.readOnly"
      :rules="[(val) => !!val || 'Campo es Requerido']"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      style="padding-bottom: 0px !important"
      :label="subitem.text"
      dense
      readonly
      mask="####-##-##"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="
                modelPatientVariable[
                  multiple || subitem.repeats
                    ? subitem.linkId + '|' + index
                    : subitem.linkId
                ]
              "
              mask="YYYY-MM-DD"
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="$q.lang.label.close"
                  color="primary"
                  flat
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
  <div v-else-if="subitem.type === 'dateTime'">
    <q-input
      filled
      v-if="breach(subitem, subitem.linkId, index)"
      :readonly="subitem.readOnly"
      :rules="[(val) => !!val || 'Campo es Requerido']"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="
                modelPatientVariable[
                  multiple || subitem.repeats
                    ? subitem.linkId + '|' + index
                    : subitem.linkId
                ]
              "
              mask="MM-DD-YYYY HH:mm"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time
              v-model="
                modelPatientVariable[
                  multiple || subitem.repeats
                    ? subitem.linkId + '|' + index
                    : subitem.linkId
                ]
              "
              mask="MM-DD-YYYY HH:mm"
              format24h
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
  <div v-else-if="subitem.type === 'time'">
    <q-time
      v-if="breach(subitem, subitem.linkId, index)"
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      format24h
    />
  </div>
  <div v-else-if="subitem.type === 'string'">
    <q-input
      stack-label
      :suffix="
        subitem?.extension?.filter(
          (extension) =>
            extension.url ===
            'http://hl7.org/fhir/StructureDefinition/questionnaire-unit'
        )[0]?.valueCoding?.display
      "
      clearable
      outlined
      clear-icon="close"
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      v-if="breach(subitem, subitem.linkId, index)"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      :label="subitem.text"
      :maxlength="subitem.maxLength ? subitem.maxLength : null"
      dense
    />
  </div>
  <div v-else-if="subitem.type === 'text'">
    <div
      class="row items-start"
      style="color: #828282"
      v-if="breach(subitem, subitem.linkId, index)"
    >
      <div class="col">
        <div>{{ subitem.text }}</div>
      </div>
    </div>
    <q-editor
      style="margin-bottom: 30px !important"
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      v-if="breach(subitem, subitem.linkId, index)"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      min-height="5rem"
      :placeholder="subitem.text"
    />
  </div>
  <div v-else-if="subitem.type === 'url'">
    <q-input
      type="url"
      clearable
      outlined
      clear-icon="close"
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      v-if="breach(subitem, subitem.linkId, index)"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      :label="subitem.text"
      :maxlength="subitem.maxLength ? subitem.maxLength : null"
    />
  </div>
  <div v-else-if="subitem.type === 'choice'">
    <div v-if="subitem.extension">
      <div
        v-if="
          subitem.extension
            .map(
              (extension) => extension.valueCodeableConcept.text === 'Drop down'
            )
            .toString() === 'true'
        "
      >
        <q-select
          clearable
          outlined
          v-if="breach(subitem, subitem.linkId, index)"
          :readonly="subitem.readOnly"
          :rules="[
            (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
          ]"
          clear-icon="close"
          v-model="
            modelPatientVariable[
              multiple || subitem.repeats
                ? subitem.linkId + '|' + index
                : subitem.linkId
            ]
          "
          :label="subitem.text"
          :options="subitem.answerOption"
          :option-value="
            (option) =>
              option.valueCoding === undefined ? null : option.valueCoding.code
          "
          :option-label="
            (option) =>
              option.valueCoding === undefined
                ? null
                : option.valueCoding.display
          "
          dense
          options-dense
          input-debounce="0"
          behavior="menu"
        >
        </q-select>
      </div>
      <div
        style="margin-bottom: 30px !important"
        v-if="
          subitem.extension
            .map(
              (extension) => extension.valueCodeableConcept.text === 'Check-box'
            )
            .toString() === 'true'
        "
      >
        <div v-for="option in subitem?.answerOption">
          <q-checkbox
            v-model="
              modelPatientVariable[
                multiple || subitem.repeats
                  ? subitem.linkId + '|' + index + option.valueCoding.code
                  : subitem.linkId
              ]
            "
            v-if="breach(subitem, subitem.linkId, index)"
            :true-value="JSON.stringify(option)"
            :false-value="false"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            :label="
              option.valueCoding === undefined
                ? false
                : option.valueCoding.display
            "
          />
        </div>
      </div>
    </div>
    <div v-else>
      <q-select
        clearable
        outlined
        v-if="breach(subitem, subitem.linkId, index)"
        :readonly="subitem.readOnly"
        :rules="[
          (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
        ]"
        clear-icon="close"
        v-model="
          modelPatientVariable[
            multiple || subitem.repeats
              ? subitem.linkId + '|' + index
              : subitem.linkId
          ]
        "
        :label="subitem.text"
        :options="subitem.answerOption"
        :option-value="
          (option) =>
            option.valueCoding === undefined ? null : option.valueCoding.code
        "
        :option-label="
          (option) =>
            option.valueCoding === undefined ? null : option.valueCoding.display
        "
        dense
        options-dense
        input-debounce="0"
        behavior="menu"
      >
      </q-select>
    </div>
  </div>
  <div v-else-if="subitem.type === 'attachment'">
    <q-file
      dense
      style="margin-bottom: 20px !important"
      outlined
      bottom-slots
      :readonly="subitem.readOnly"
      :rules="[
        (val) => (subitem.required ? !!val : true || 'Campo es Requerido'),
      ]"
      v-if="breach(subitem, subitem.linkId, index)"
      v-model="
        modelPatientVariable[
          multiple || subitem.repeats
            ? subitem.linkId + '|' + index
            : subitem.linkId
        ]
      "
      accept=".jpg, .pdf, .png, image/*"
      max-file-size="5048576"
      :label="subitem.text"
      counter
      max-files="1"
    >
      <template v-slot:before>
        <q-icon name="cloud_upload" />
      </template>

      <template v-slot:append>
        <q-icon
          v-if="
            modelPatientVariable[
              multiple || subitem.repeats
                ? subitem.linkId + '|' + index
                : subitem.linkId
            ] !== null
          "
          name="close"
          @click.stop="
            modelPatientVariable[
              multiple || subitem.repeats
                ? subitem.linkId + '|' + index
                : subitem.linkId
            ] = null
          "
          class="cursor-pointer"
        />
        <q-icon name="search" @click.stop />
      </template>
    </q-file>
  </div>
</template>

<style scoped></style>
