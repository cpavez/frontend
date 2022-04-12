<template>
  <div class="q-pa-md q-col-gutter-y-sm">
    <q-card flat bordered class="my-card">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">{{ t("person.searchPatient") }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <div v-for="item in questionnaire.item" :key="item.id">
              <div
                v-if="item.type === 'group'"
                class="row q-pb-xs"
                style="margin-bottom: -18px !important"
              >
                <div
                  v-for="subitem in item.item"
                  :key="subitem.id"
                  style="margin-bottom: 0px !important"
                  :class="
                    'col-xs-12  col-sm-' +
                    12 / item.item.length +
                    ' col-md-' +
                    12 / item.item.length
                  "
                >
                  <div v-if="subitem.type === 'display'">
                    <div v-if="breach(subitem, subitem.linkId)" class="text-h6">
                      {{ subitem.text }}
                    </div>
                  </div>
                  <div v-else-if="subitem.type === 'boolean'">
                    <q-toggle
                      v-if="breach(subitem, subitem.linkId)"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      checked-icon="check"
                      color="green"
                      unchecked-icon="clear"
                    />
                  </div>
                  <div v-else-if="subitem.type === 'decimal'">
                    <q-input
                      v-if="breach(subitem, subitem.linkId)"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      type="number"
                      mask="#.#"
                      fill-mask="0"
                      clearable
                      outlined
                      clear-icon="close"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      :maxlength="subitem.maxLength ? subitem.maxLength : null"
                    />
                  </div>
                  <div v-else-if="subitem.type === 'integer'">
                    <q-input
                      v-if="breach(subitem, subitem.linkId)"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      type="number"
                      clearable
                      outlined
                      clear-icon="close"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      :maxlength="subitem.maxLength ? subitem.maxLength : null"
                    />
                  </div>
                  <div v-else-if="subitem.type === 'date'">
                    <q-input
                      outlined
                      v-if="breach(subitem, subitem.linkId)"
                      :rules="[(val) => !!val || 'Campo es Requerido']"
                      v-model="modelPatientVariable[subitem.linkId]"
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
                              v-model="modelPatientVariable[subitem.linkId]"
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
                      v-if="breach(subitem, subitem.linkId)"
                      :rules="[(val) => !!val || 'Campo es Requerido']"
                      v-model="modelPatientVariable[subitem.linkId]"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="modelPatientVariable[subitem.linkId]"
                              mask="MM-DD-YYYY HH:mm"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="modelPatientVariable[subitem.linkId]"
                              mask="MM-DD-YYYY HH:mm"
                              format24h
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div v-else-if="subitem.type === 'time'">
                    <q-time
                      v-if="breach(subitem, subitem.linkId)"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      v-model="modelPatientVariable[subitem.linkId]"
                      format24h
                    />
                  </div>
                  <div v-else-if="subitem.type === 'string'">
                    <q-input
                      clearable
                      class="text-uppercase"
                      outlined
                      clear-icon="close"
                      @blur="handleBlur(subitem.linkId)"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      v-if="breach(subitem, subitem.linkId)"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      :maxlength="subitem.maxLength ? subitem.maxLength : null"
                      dense
                    />
                  </div>
                  <div v-else-if="subitem.type === 'text'">
                    <q-input
                      type="textarea"
                      class="text-uppercase"
                      clearable
                      outlined
                      clear-icon="close"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      v-if="breach(subitem, subitem.linkId)"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      :maxlength="subitem.maxLength ? subitem.maxLength : null"
                    />
                  </div>
                  <div v-else-if="subitem.type === 'url'">
                    <q-input
                      type="url"
                      clearable
                      outlined
                      clear-icon="close"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      v-if="breach(subitem, subitem.linkId)"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      :maxlength="subitem.maxLength ? subitem.maxLength : null"
                    />
                  </div>
                  <div v-else-if="subitem.type === 'choice'">
                    <q-select
                      clearable
                      outlined
                      v-if="breach(subitem, subitem.linkId)"
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      clear-icon="close"
                      v-model="modelPatientVariable[subitem.linkId]"
                      :label="subitem.text"
                      :options="camposVariable[subitem.linkId]"
                      :option-value="
                        (option) =>
                          option.valueCoding === undefined
                            ? null
                            : option.valueCoding.code
                      "
                      :option-label="
                        (option) =>
                          option.valueCoding === undefined
                            ? null
                            : option.valueCoding.display
                      "
                      dense
                      options-dense
                      use-input
                      input-debounce="0"
                      @filter="
                        (val, update) => {
                          filterFn(
                            val,
                            update,
                            subitem.answerOption,
                            subitem.linkId
                          );
                        }
                      "
                      behavior="menu"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No hay resultados
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div v-else-if="subitem.type === 'attachment'">
                    <q-file
                      rounded
                      outlined
                      bottom-slots
                      :rules="[
                        (val) =>
                          subitem.required
                            ? !!val
                            : true || 'Campo es Requerido',
                      ]"
                      v-if="breach(subitem, subitem.linkId)"
                      v-model="modelPatientVariable[subitem.linkId]"
                      accept=".jpg, image/*"
                      max-file-size="5048576"
                      :label="subitem.text"
                      counter
                      max-files="1"
                    >
                      <template v-slot:before>
                        <q-icon name="attachment" />
                      </template>

                      <template v-slot:append>
                        <q-icon
                          v-if="modelPatientVariable[subitem.linkId] !== null"
                          name="close"
                          @click.stop="
                            modelPatientVariable[subitem.linkId] = null
                          "
                          class="cursor-pointer"
                        />
                        <q-icon name="search" @click.stop />
                      </template>
                    </q-file>
                  </div>
                </div>
              </div>
              <div v-else-if="item.type === 'display'">
                <div v-if="breach(item, item.linkId)" class="text-h6">
                  {{ item.text }}
                </div>
              </div>
              <div v-else-if="item.type === 'boolean'">
                <q-toggle
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  checked-icon="check"
                  color="green"
                  unchecked-icon="clear"
                />
              </div>
              <div v-else-if="item.type === 'decimal'">
                <q-input
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  type="number"
                  mask="#.#"
                  fill-mask="0"
                  reverse-fill-mask
                  clearable
                  outlined
                  clear-icon="close"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  :maxlength="item.maxLength ? item.maxLength : null"
                />
              </div>
              <div v-else-if="item.type === 'integer'">
                <q-input
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  type="number"
                  clearable
                  outlined
                  clear-icon="close"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  :maxlength="item.maxLength ? item.maxLength : null"
                />
              </div>
              <div v-else-if="item.type === 'date'">
                <q-input
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  outlined
                  v-model="modelPatientVariable[item.linkId]"
                  style="padding-bottom: 0px !important"
                  :label="item.text"
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
                          v-model="modelPatientVariable[item.linkId]"
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
              <div v-else-if="item.type === 'dateTime'">
                <q-input
                  filled
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  v-model="modelPatientVariable[item.linkId]"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="modelPatientVariable[item.linkId]"
                          mask="MM-DD-YYYY HH:mm"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="modelPatientVariable[item.linkId]"
                          mask="MM-DD-YYYY HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div v-else-if="item.type === 'time'">
                <q-time
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  v-model="modelPatientVariable[item.linkId]"
                  format24h
                />
              </div>
              <div v-else-if="item.type === 'string'">
                <q-input
                  class="text-uppercase"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  v-if="breach(item, item.linkId)"
                  clearable
                  outlined
                  clear-icon="close"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  :maxlength="item.maxLength ? item.maxLength : null"
                  dense
                />
              </div>
              <div v-else-if="item.type === 'text'">
                <q-input
                  class="text-uppercase"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  v-if="breach(item, item.linkId)"
                  type="textarea"
                  clearable
                  outlined
                  clear-icon="close"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  :maxlength="item.maxLength ? item.maxLength : null"
                />
              </div>
              <div v-else-if="item.type === 'url'">
                <q-input
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  type="url"
                  clearable
                  outlined
                  clear-icon="close"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  :maxlength="item.maxLength ? item.maxLength : null"
                />
              </div>
              <div v-else-if="item.type === 'choice'">
                <q-select
                  clearable
                  outlined
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  clear-icon="close"
                  v-model="modelPatientVariable[item.linkId]"
                  :label="item.text"
                  :options="camposVariable[item.linkId]"
                  :option-value="
                    (option) =>
                      option.valueCoding === undefined
                        ? null
                        : option.valueCoding.code
                  "
                  :option-label="
                    (option) =>
                      option.valueCoding === undefined
                        ? null
                        : option.valueCoding.display
                  "
                  dense
                  options-dense
                  use-input
                  input-debounce="0"
                  @filter="
                    (val, update) => {
                      filterFn(val, update, item.answerOption, item.linkId);
                    }
                  "
                  behavior="menu"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div v-else-if="item.type === 'attachment'">
                <q-file
                  v-if="breach(item, item.linkId)"
                  :rules="[
                    (val) =>
                      item.required ? !!val : true || 'Campo es Requerido',
                  ]"
                  rounded
                  outlined
                  bottom-slots
                  v-model="modelPatientVariable[item.linkId]"
                  accept=".jpg, image/*"
                  max-file-size="5048576"
                  :label="item.text"
                  counter
                  max-files="1"
                >
                  <template v-slot:before>
                    <q-icon name="attachment" />
                  </template>

                  <template v-slot:append>
                    <q-icon
                      v-if="modelPatientVariable[item.linkId] !== null"
                      name="close"
                      @click.stop="modelPatientVariable[item.linkId] = null"
                      class="cursor-pointer"
                    />
                    <q-icon name="search" @click.stop />
                  </template>
                </q-file>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="text-right">
            <q-btn
              v-if="create"
              :label="t('LANG.LABEL.CREATE')"
              type="submit"
              color="primary"
            />
            <q-btn
              v-else
              type="submit"
              :label="t('LANG.LABEL.SEARCH')"
              color="primary"
            />
            <q-btn
              :label="t('LANG.LABEL.RESET')"
              type="reset"
              outline
              color="primary"
              class="q-ml-sm"
            />
          </div>
        </q-card-section>
      </q-form>
      <q-separator inset />

      <div class="row" v-if="showCelulas">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div class="q-pa-md" style="max-width: 450px">
            <q-list bordered padding>
              <q-item-label header>{{ t("project.cellList") }}</q-item-label>

              <q-item clickable to="/create-case/dermatologia">
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="../assets/img/Dermatologia-01.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ t("project.dermatology") }}</q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    color="info"
                    size="xs"
                    style="cursor: pointer"
                    icon="visibility"
                  />
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item clickable to="/create-case/nefrologia">
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="../assets/img/Nefrologia-01.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ t("project.nephrology") }}</q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    color="info"
                    size="xs"
                    style="cursor: pointer"
                    icon="visibility"
                  />
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item clickable to="/create-case/geriatria">
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="../assets/img/geriatria-01.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ t("project.geriatrics") }}</q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    color="info"
                    size="xs"
                    style="cursor: pointer"
                    icon="visibility"
                  />
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item clickable to="/create-case/diabetes">
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="../assets/img/Diabetes-01.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ t("project.diabetes") }}</q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    color="info"
                    size="xs"
                    style="cursor: pointer"
                    icon="visibility"
                  />
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item clickable to="/create-case/ortodoncia">
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="../assets/img/Icono odontologia-01.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ t("project.orthodontics") }}</q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    color="info"
                    size="xs"
                    style="cursor: pointer"
                    icon="visibility"
                  />
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item clickable to="/create-case/patologia-oral">
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="../assets/img/patologia oral-01.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{
                  t("project.oralPathology")
                }}</q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    color="info"
                    size="xs"
                    style="cursor: pointer"
                    icon="visibility"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div class="q-pa-md" style="max-width: 450px">
            <q-list bordered class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Historial Atenciones</q-item-label>

              <div
                v-for="entry in history?.data?.entry"
                :key="entry.resource.id"
              >
                <q-item
                  clickable
                  :to="{
                    name: mapeoEspecialidad(
                      entry.resource.category[0].coding[0].code
                    ),
                    params: { id: entry.resource.id },
                  }"
                >
                  <q-item-section avatar top>
                    <q-avatar
                      icon="folder"
                      color="primary"
                      text-color="white"
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{
                      entry.resource.title
                    }}</q-item-label>
                    <q-item-label caption
                      ><b>#{{ entry.resource.id }}</b>
                      {{
                        new Date(entry.resource.date).toLocaleString()
                      }}</q-item-label
                    >
                  </q-item-section>

                  <q-item-section side>
                    <q-icon
                      name="info"
                      :color="
                        entry.resource.status === 'preliminary'
                          ? 'amber'
                          : 'green'
                      "
                    />
                  </q-item-section>
                </q-item>

                <q-separator inset="item" />
              </div>
            </q-list>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { Loading, LocalStorage, QSpinnerDots, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
Loading.show();
Loading.show({
  spinner: QSpinnerDots,
});

export default {
  created() {
    const store = useStore();
    void store.dispatch("questionnaire/getQuestionnaireAdmision", null);
    LocalStorage.set("PatientID", "");
  },
  setup: function () {
    const questionnaire = computed(
      () => store.getters["questionnaire/getQuestionnaire"]
    );
    const questionnaireResponseID = ref("");
    const patientID = ref("");
    const $q = useQuasar();
    const formPatient = ref(null);
    const showCelulas = ref(false);
    const modelPatient = {};
    const modelPatientVariable = ref(modelPatient);
    const camposVariable = ref({});
    const history = ref({});

    const create = ref(true);
    const store = useStore();

    let { t } = useI18n({ useScope: "global" });

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
    function answer(a, b) {
      switch (a) {
        case "string":
          return [{ valueString: modelPatientVariable.value[b].toUpperCase() }];
          break;
        case "choice":
          return [modelPatientVariable.value[b]];
          break;
        case "date":
          return [{ valueDate: modelPatientVariable.value[b] }];
          break;
      }
    }
    function func_item(a) {
      if (modelPatientVariable.value[a.linkId]) {
        let objeto = {
          linkId: a.linkId,
          text: a.text,
          answer: answer(a.type, a.linkId),
        };
        return objeto;
      } else {
        return false;
      }
    }
    function patient() {
      let phone = {
        system: "phone",
        value:
          modelPatientVariable.value.telefono === "undefined"
            ? false
            : modelPatientVariable.value.telefono,
        use: "mobile",
      };
      let email = {
        system: "email",
        value:
          modelPatientVariable.value.email === "undefined"
            ? false
            : modelPatientVariable.value.email,
        use: "home",
      };
      let object = {
        resourceType: "Patient",
        id: "PacienteCL",
        /*'meta':{
          'profile':['https://hl7chile.cl/fhir/ig/CoreCL/StructureDefinition/CorePacienteCL']
        },*/
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generado</b></p></div>',
        },
        identifier: [
          {
            use: "official",
            /*'type':{
              'extension':[
                {
                  'url':'https://hl7chile.cl/fhir/ig/CoreCL/StructureDefinition/CodigoPaises',
                  'valueCodeableConcept':{
                    'coding':[{
                      'system':'urn:iso:std:iso:3166',
                      'code':'152',
                      'display':'Chile'
                    }]
                  }
                }
              ],
              'coding':[{
                'system':'https://hl7chile.cl/fhir/ig/CoreCL/CodeSystem/CSCodigoDNI',
                'code':'NNCHL',
                'display':'Chile'
              }]
            },*/
            system: "http://registrocivil.cl/Validacion/RUN",
            value: modelPatientVariable.value.numeroDocumento.toUpperCase(),
          },
        ],
        active: true,
        name: [
          {
            use: "official",
            family: modelPatientVariable.value.primerApellido,
            _family: {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/humanname-mothers-family",
                  valueString: modelPatientVariable.value.segundoApellido,
                },
              ],
            },
            given: [modelPatientVariable.value.nombres],
          },
        ],
        gender:
          modelPatientVariable.value.genero.valueCoding.code === "01"
            ? "male"
            : "female",
        birthDate: modelPatientVariable.value.fechaNacimiento,
        address: [
          {
            use: "home",
            city: modelPatientVariable.value.comuna.valueCoding.code,
            district: modelPatientVariable.value.provincia.valueCoding.code,
            state: modelPatientVariable.value.region.valueCoding.code,
            country: "152",
          },
        ],
      };
      if (
        modelPatientVariable.value.telefono != undefined ||
        modelPatientVariable.value.email != undefined
      ) {
        object.telecom = [
          modelPatientVariable.value.telefono === "undefined" ? false : phone,
          modelPatientVariable.value.email === "undefined" ? false : email,
        ];
      }
      if (modelPatientVariable.value.direccion != undefined) {
        object.address[0].line = [modelPatientVariable.value.direccion];
      }
      return object;
    }
    function bundle(patient, items) {
      let object = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            fullUrl: "urn:uuid:b7748984-4e13-44a3-84a9-07f824552d25",
            resource: patient,
            request: {
              method: patientID.value != "" ? "PUT" : "POST",
              url:
                patientID.value != ""
                  ? patientID.value
                  : "Patient?identifier=http://registrocivil.cl/Validacion/RUN|" +
                    modelPatientVariable.value.numeroDocumento.toUpperCase(),
            },
          },
          {
            fullUrl: "urn:uuid:9a652678-4616-475d-af12-aca21cfbe06d",
            resource: {
              resourceType: "QuestionnaireResponse",
              status: "completed",
              questionnaire:
                "http://192.168.60.123:8080/fhir/Questionnaire/1341",
              authored: new Date(),
              subject: {
                reference: "urn:uuid:b7748984-4e13-44a3-84a9-07f824552d25",
              },
              item: items,
            },
            request: {
              method: questionnaireResponseID.value != "" ? "PUT" : "POST",
              url:
                "QuestionnaireResponse" + questionnaireResponseID.value != ""
                  ? "/" + questionnaireResponseID.value
                  : "",
            },
          },
        ],
      };
      return object;
    }
    const Fn = {
      validaRut: function (rutCompleto) {
        if (rutCompleto != "" && rutCompleto != undefined) {
          rutCompleto = rutCompleto.replace("‐", "-");
          if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
          var tmp = rutCompleto.split("-");
          var digv = tmp[1];
          var rut = parseInt(tmp[0]);
          if (digv == "K") digv = "k";
          return Fn.dv(rut) == digv;
        } else {
          return false;
        }
      },
      dv: function (T) {
        var M = 0,
          S = 1;
        for (; T; T = Math.floor(T / 10))
          S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
        return S ? S - 1 : "k";
      },
    };

    Loading.hide();

    return {
      formPatient,
      create,
      questionnaire,
      t,
      modelPatientVariable,
      async handleBlur(e) {
        $q.loading.show();
        if (e === "numeroDocumento") {
          if (modelPatientVariable.value["tipoDocumento"]) {
            questionnaireResponseID.value = "";
            if (
              modelPatientVariable.value[e] != "" &&
              !Fn.validaRut(modelPatientVariable.value[e])
            ) {
              $q.notify({
                color: "negative",
                position: "center",
                textColor: "white",
                icon: "report_problem",
                message: "El run no es Valido",
              });
            } else {
              const arrQuestionnaireResponse = await store.dispatch(
                "questionnaireResponse/findQuestionnaireResponseAdmisionByPatientIdentifir",
                modelPatientVariable.value[e].toUpperCase()
              );

              if (arrQuestionnaireResponse.data?.entry) {
                const questionnaireResponse =
                  arrQuestionnaireResponse.data.entry[
                    arrQuestionnaireResponse.data.entry.length - 1
                  ];
                questionnaireResponseID.value =
                  questionnaireResponse.resource.id;
                patientID.value =
                  questionnaireResponse.resource.subject.reference;
                questionnaireResponse.resource.item.forEach(function (val, i) {
                  if (val.item) {
                    const subitem = val.item;
                    subitem.forEach((item) => {
                      if (item.answer[0].valueString) {
                        modelPatientVariable.value[item.linkId] =
                          item.answer[0].valueString;
                      } else if (item.answer[0].valueDate) {
                        modelPatientVariable.value[item.linkId] =
                          item.answer[0].valueDate;
                      } else {
                        modelPatientVariable.value[item.linkId] =
                          item.answer[0];
                      }
                    });
                  } else {
                    void store.dispatch(
                      "questionnaireResponse/setQuestionnaireRespoonse",
                      ""
                    );
                    const item = val.item;
                    if (item.answer[0].valueString) {
                      modelPatientVariable.value[item.linkId] =
                        item.answer[0].valueString;
                    } else if (item.answer[0].valueDate) {
                      modelPatientVariable.value[item.linkId] =
                        item.answer[0].valueDate;
                    } else {
                      modelPatientVariable.value[item.linkId] = item.answer[0];
                    }
                  }
                });
                create.value = false;
              }
              if (patientID.value != "") {
                history.value = await store.dispatch(
                  "composition/getCompositionByPatient",
                  patientID.value.split("/")[1]
                );
              }
            }
          } else {
            void store.dispatch("partient/setPatientID", "");
            void store.dispatch(
              "questionnaireResponse/setQuestionnaireRespoonse",
              ""
            );
            void store.dispatch("alergyIntolerance/setAlergias", "");
            LocalStorage.set("PatientID", "");
            $q.notify({
              color: "negative",
              position: "center",
              textColor: "white",
              icon: "report_problem",
              message: "El tipo Documento es requerido",
            });
          }
        }
        $q.loading.hide();
      },
      breach(info, campo) {
        if (info.type === "choice") {
          if (!camposVariable.value[info.linkId]) {
            let campoNuevo = {};
            campoNuevo[info.linkId] = info.answerOption;
            Object.assign(camposVariable.value, campoNuevo);
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerCoding.code,
                    campo,
                    val.operator
                  );
                } else if (val.answerQuantity) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerQuantity.code,
                    campo,
                    val.operator
                  );
                } else if (val.answerBoolean) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerBoolean,
                    campo,
                    val.operator
                  );
                } else if (val.answerDecimal) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerDecimal,
                    campo,
                    val.operator
                  );
                } else if (val.answerInteger) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerInteger,
                    campo,
                    val.operator
                  );
                } else if (val.answerDate) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerDate,
                    campo,
                    val.operator
                  );
                } else if (val.answerDateTime) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerDateTime,
                    campo,
                    val.operator
                  );
                } else if (val.answerTime) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerTime,
                    campo,
                    val.operator
                  );
                } else if (val.answerString) {
                  response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
                    val.answerString,
                    campo,
                    val.operator
                  );
                }
              } else {
                const criterio = "any";
                if (val.answerCoding) {
                  _response = transformation(
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                    modelPatientVariable?.value[val.question]?.valueCoding
                      ?.code,
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
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerCoding.code,
                  campo,
                  val.operator
                );
              } else if (val.answerQuantity) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerQuantity.code,
                  campo,
                  val.operator
                );
              } else if (val.answerBoolean) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerBoolean,
                  campo,
                  val.operator
                );
              } else if (val.answerDecimal) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerDecimal,
                  campo,
                  val.operator
                );
              } else if (val.answerInteger) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerInteger,
                  campo,
                  val.operator
                );
              } else if (val.answerDate) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerDate,
                  campo,
                  val.operator
                );
              } else if (val.answerDateTime) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerDateTime,
                  campo,
                  val.operator
                );
              } else if (val.answerTime) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
                  val.answerTime,
                  campo,
                  val.operator
                );
              } else if (val.answerString) {
                response = transformation(
                  modelPatientVariable?.value[val.question]?.valueCoding?.code,
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
      },
      filterFn(val, update, stringOptions, option) {
        update(() => {
          const needle = val.toString().toUpperCase();
          camposVariable.value[option] = stringOptions.filter((v) => {
            return v.valueCoding.display.indexOf(needle) > -1;
          });
        });
      },
      async onSubmit() {
        $q.loading.show();
        let items = [];
        questionnaire.value.item.forEach((item) => {
          if (item.type === "group") {
            let objectItem = [];
            item.item.forEach((subItem) => {
              let object = func_item(subItem);
              if (object) objectItem.push(object);
            });
            if (objectItem.length > 0) {
              let object = {
                linkId: item.linkId,
                text: item.text,
                item: objectItem,
              };
              items.push(object);
            }
          } else {
            let object = func_item(item);
            items.push(object);
          }
        });
        let postBundle = await store.dispatch(
          "bundle/postBundle",
          bundle(patient(), items)
        );
        if (postBundle.status > 400) {
          LocalStorage.set("PatientID", "");
          $q.loading.hide();
          showCelulas.value = false;
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Problem!",
          });
        } else {
          $q.loading.hide();
          showCelulas.value = true;
          console.log(postBundle);
          void store.dispatch(
            "patient/setPatientID",
            postBundle.data.data.entry[0].response.location.split("/")[1]
          );
          void store.dispatch(
            "alergyIntolerance/setAlergias",
            postBundle.data.data.entry[0].response.location.split("/")[1]
          );
          void store.dispatch(
            "questionnaireResponse/setQuestionnaireRespoonse",
            postBundle.data.data.entry[1].response.location.split("/")[1]
          );

          LocalStorage.set(
            "PatientID",
            postBundle.data.data.entry[0].response.location.split("/")[1]
          );

          patientID.value =
            postBundle.data.data.entry[0].response.location.split("/")[1];
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },
      mapeoEspecialidad(codigo) {
        switch (codigo) {
          case "07-012":
            return "dermatologia";
          case "07-013":
            return "diabetes";
          case "07-021":
            return "geriatria";
          case "07-037":
            return "nefrologia";
          case "09-008":
            return "ortodoncia";
        }
      },
      onReset() {
        void store.dispatch("patient/setPatientID", "");
        void store.dispatch(
          "questionnaireResponse/setQuestionnaireRespoonse",
          ""
        );
        void store.dispatch("alergyIntolerance/setAlergias", "");
        showCelulas.value = false;
        modelPatientVariable.value = {};
        questionnaireResponseID.value = "";
        LocalStorage.set("PatientID", "");
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Restablecido",
        });
      },
      showCelulas,
      camposVariable,
      history,
    };
  },
};
</script>
