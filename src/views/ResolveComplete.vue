<template>
  <div class="q-pa-md">
    <HeadPatient url_to_return="myCases" :url_to_props="url_to_props" />
  </div>

  <div class="q-pa-md">
    <div class="row">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-list bordered padding>
          <q-item-label header
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Exámen Físico</q-chip
            ></q-item-label
          >

          <q-item class="no-padding no-border">
            <q-item-section class="no-border">
              <q-card
                style="width: 100%"
                class="no-border no-shadow no-box-shadow"
              >
                <q-card-section horizontal>
                  <q-card-section class="col-4">
                    <q-img width="110px" src="../assets/img/human.svg" />
                  </q-card-section>
                  <q-card-section
                    class="col-8"
                    style="color: rgba(0, 0, 0, 0.54)"
                  >
                    <div class="api-row__item col-xs-12 col-sm-12">
                      <div class="api-row__value"><b>Peso</b></div>
                    </div>
                    <sparkline
                      :data="weight_history.data ? weight_history.data : []"
                      largo="120"
                      :ancho="'25'"
                    ></sparkline>
                    {{
                      weight_history.data
                        ? weight_history.data[weight_history?.data.length - 1]
                        : ""
                    }}
                    Kg
                    <div class="api-row__item col-xs-12 col-sm-12 q-py-xs">
                      <div class="api-row__value row">
                        <strong class="col-6">Talla</strong
                        ><span class="col-6"
                          >{{
                            questionnaireExamenFisicoResponse?.item?.filter(
                              (item) => {
                                if (item.linkId === "grupoTalla") return item;
                              }
                            )[0]?.item[0]?.answer[0]?.valueInteger
                          }}
                          cm</span
                        >
                      </div>
                    </div>
                    <div class="api-row__item col-xs-12 col-sm-12 q-py-xs">
                      <div class="api-row__value row">
                        <strong class="col-6">IMC</strong
                        ><span class="col-6"
                          >{{
                            questionnaireExamenFisicoResponse?.item?.filter(
                              (item) => {
                                if (item.linkId === "grupoIMC") return item;
                              }
                            )[0]?.item[0]?.answer[0]?.valueDecimal
                          }}
                          Kg/m<sup>2</sup></span
                        >
                      </div>
                    </div>
                    <div class="api-row__item col-xs-12 col-sm-12 q-py-xs">
                      <div class="api-row__value row">
                        <strong class="col-6">Presión</strong
                        ><span class="col-6"
                          >{{
                            questionnaireExamenFisicoResponse?.item?.filter(
                              (item) => {
                                if (item.linkId === "grupoPresion") return item;
                              }
                            )[0]?.item[0]?.answer[0]?.valueDecimal
                          }}
                          -
                          {{
                            questionnaireExamenFisicoResponse?.item?.filter(
                              (item) => {
                                if (item.linkId === "grupoPresion") return item;
                              }
                            )[1]?.item[0]?.answer[0]?.valueDecimal
                          }}
                          mmHg</span
                        >
                      </div>
                    </div>
                    <div class="api-row__item col-xs-12 col-sm-12 q-py-xs">
                      <div class="api-row__value row">
                        <strong class="col-6">Frecuencia Cardiaca</strong
                        ><span class="col-6">-</span>
                      </div>
                    </div>
                    <div class="api-row__item col-xs-12 col-sm-12 q-py-xs">
                      <div class="api-row__value row">
                        <strong class="col-12">Hallazgos relevantes</strong>
                      </div>
                    </div>
                    <div class="api-row__item col-xs-12 col-sm-12 q-py-xs">
                      <div class="api-row__value row">
                        <q-chat-message
                          :text="[
                            questionnaireExamenFisicoResponse?.item?.filter(
                              (item) => {
                                if (item.linkId === 'hallazgosRelevantesText')
                                  return item;
                              }
                            )[0]?.item[0]?.answer[0]?.valueString,
                          ]"
                          text-html
                          size="12"
                          text-color="#676767"
                          bg-color="blue-grey-1"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Antecedentes Previos</q-chip
            ></q-item-label
          >

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Historial Procedimientos Quirurgicos</q-item-label>
              <q-item-label caption>
                <span
                  v-html="
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoAntecedentesQuirurgiosTexto')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString
                  "
                ></span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Antecedentes clínicos previos</q-item-label>
              <q-item-label caption>
                <span
                  v-html="
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoOtrosAntecedentes') return item;
                    })[0]?.item[0]?.answer[0]?.valueString
                  "
                ></span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Antecedentes Actuales</q-chip
            ></q-item-label
          >

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoHistorialMedicamentos') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Historial médicamentos actuales</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoHistorialMedicamentos')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoHistorialEnfermedades') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Historial enfermedades actuales</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoHistorialEnfermedades')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoMovilidadFisica') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Movilidad física</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoMovilidadFisica") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoTipoCuidador') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label
                >Tipo de asistente del cuidador principal</q-item-label
              >
              <q-item-label caption>
                {{
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoTipoCuidador") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoDiabetes') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Diabetes</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoDiabetes") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            tag="label"
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoHipoglicemia') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Sufre de Hipoglicemia</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-avatar
                size="24px"
                v-if="
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === 'grupoHipoglicemia') return item;
                  })[0]?.item[0]?.answer[0]?.valueBoolean
                "
                color="red"
                text-color="white"
                >SI</q-avatar
              >
              <q-avatar size="24px" v-else color="grey" text-color="white"
                >NO</q-avatar
              >
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoTabaco') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Estado del Tabaquismo</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoTabaco") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoTabaquismoTexto') return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoAlcohol') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label
                >Consumo de bebidas que contienen alcohol</q-item-label
              >
              <q-item-label caption>
                {{
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoAlcohol") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoAlcohol') return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            tag="label"
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoDrogas') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Consumo de Drogas</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-avatar
                size="24px"
                v-if="
                  questionnaireAntecedentesResponse?.item?.filter((item) => {
                    if (item.linkId === 'grupoDrogas') return item;
                  })[0]?.item[0]?.answer[0]?.valueBoolean
                "
                color="red"
                text-color="white"
                >SI</q-avatar
              >
              <q-avatar size="24px" v-else color="red" text-color="white"
                >SI</q-avatar
              >
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoAntecedentesDrogasTexto') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Detalles del consumo de drogas</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoAntecedentesDrogasTexto')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label
            header
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoOtrosAntecedentesFamiliares')
                  return item;
              }).length > 0
            "
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Antecedentes Familiares</q-chip
            ></q-item-label
          >

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireAntecedentesResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoOtrosAntecedentesFamiliares')
                  return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireAntecedentesResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoOtrosAntecedentesFamiliares')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-list bordered padding>
          <q-item-label header
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Respuesta Interconsulta</q-chip
            ></q-item-label
          >

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoSugerenciaTerapeutica') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Sugerencia Terapeutica</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireReferentResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoSugerenciaTerapeutica')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoEducacion') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Educación</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireReferentResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoEducacion') return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoSugerenciaDiagnostica') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Sugerencia Diagnóstica</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireReferentResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoSugerenciaDiagnostica')
                        return item;
                    })[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoDiagnostico') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Diagnostico</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoDiagnostico") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
              <q-item-label caption>
                ({{
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoDiagnosticoDetalle") return item;
                  })[0]?.item[2]?.answer[0]?.valueString
                }})
                {{
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoDiagnosticoDetalle") return item;
                  })[0]?.item[3]?.answer[0]?.valueString
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoDestino') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Destino</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoDestino") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>¿Hay Concordancia Diagnóstica?</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-avatar
                size="24px"
                v-if="
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === 'grupoConcorDia') return item;
                  })[0]?.item[0]?.answer[0]?.valueBoolean
                "
                color="green"
                text-color="white"
                >SI</q-avatar
              >
              <q-avatar size="24px" v-else color="red" text-color="white"
                >NO</q-avatar
              >
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                >¿La Información Recibida fue Suficiente para Resolver la
                IC?</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-avatar
                size="24px"
                v-if="
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === 'grupoInfResolIC') return item;
                  })[0]?.item[0]?.answer[0]?.valueBoolean
                "
                color="green"
                text-color="white"
                >SI</q-avatar
              >
              <q-avatar size="24px" v-else color="red" text-color="white"
                >NO</q-avatar
              >
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoPrioridad') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Prioridad</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === "grupoPrioridad") return item;
                  })[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoArchivo') return item;
              }).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Archivo (Receta/Orden)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            @click="anexo['Archivo (Receta/Orden)'] = true"
            v-ripple
            v-if="
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === 'grupoArchivo') return item;
              }).length > 0
            "
          >
            <q-item-section avatar>
              <q-icon
                v-if="
                  questionnaireReferentResponse?.item?.filter((item) => {
                    if (item.linkId === 'grupoArchivo') return item;
                  })[0]?.item[0]?.answer[0]?.valueAttachment.contentType ===
                  'application/pdf'
                "
                name="attach_file"
              />
              <q-avatar rounded size="48px" v-else>
                <img
                  :src="
                    'data:' +
                    questionnaireReferentResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoArchivo') return item;
                    })[0]?.item[0]?.answer[0]?.valueAttachment.contentType +
                    ';base64,' +
                    questionnaireReferentResponse?.item?.filter((item) => {
                      if (item.linkId === 'grupoArchivo') return item;
                    })[0]?.item[0]?.answer[0]?.valueAttachment.data
                  "
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{
              questionnaireReferentResponse?.item?.filter((item) => {
                if (item.linkId === "grupoArchivo") return item;
              })[0]?.item[0]?.answer[0]?.valueAttachment.title
            }}</q-item-section>

            <q-dialog v-model="anexo['Archivo (Receta/Orden)']">
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6">Archivo (Receta/Orden)</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <VuePdfEmbed
                    :source="
                      'data:' +
                      questionnaireReferentResponse?.item?.filter((item) => {
                        if (item.linkId === 'grupoArchivo') return item;
                      })[0]?.item[0]?.answer[0]?.valueAttachment.contentType +
                      ';base64,' +
                      questionnaireReferentResponse?.item?.filter((item) => {
                        if (item.linkId === 'grupoArchivo') return item;
                      })[0]?.item[0]?.answer[0]?.valueAttachment.data
                    "
                  ></VuePdfEmbed>
                  <q-img
                    :src="
                      'data:' +
                      questionnaireReferentResponse?.item?.filter((item) => {
                        if (item.linkId === 'grupoArchivo') return item;
                      })[0]?.item[0]?.answer[0]?.valueAttachment.contentType +
                      ';base64,' +
                      questionnaireReferentResponse?.item?.filter((item) => {
                        if (item.linkId === 'grupoArchivo') return item;
                      })[0]?.item[0]?.answer[0]?.valueAttachment.data
                    "
                  />
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-item>
        </q-list>
        <q-list bordered padding>
          <q-item-label header
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Anexos</q-chip
            ></q-item-label
          >

          <q-item
            clickable
            @click="anexo[item.text] = true"
            v-ripple
            v-for="(item, index) in questionnaireAnexosResponse?.item"
            :key="index"
          >
            <q-item-section avatar>
              <q-icon
                v-if="
                  item.item[0].answer[0].valueAttachment.contentType ===
                  'application/pdf'
                "
                name="attach_file"
              />
              <q-avatar rounded size="48px" v-else>
                <img
                  :src="
                    'data:' +
                    item.item[0].answer[0].valueAttachment.contentType +
                    ';base64,' +
                    item.item[0].answer[0].valueAttachment.data
                  "
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{
              item.item[0].answer[0].valueAttachment.title
            }}</q-item-section>

            <q-dialog v-model="anexo[item.text]">
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6">{{ item.text }}</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <VuePdfEmbed
                    :source="
                      'data:' +
                      item.item[0].answer[0].valueAttachment.contentType +
                      ';base64,' +
                      item.item[0].answer[0].valueAttachment.data
                    "
                  ></VuePdfEmbed>
                  <q-img
                    :src="
                      'data:' +
                      item.item[0].answer[0].valueAttachment.contentType +
                      ';base64,' +
                      item.item[0].answer[0].valueAttachment.data
                    "
                  />
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-separator spaced />
          </q-item>
        </q-list>
      </div>
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-list bordered padding>
          <q-item-label header
            ><q-chip style="background-color: #9cb1b9; color: #fff" size="14px"
              >Datos Interconsulta</q-chip
            ></q-item-label
          >

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoTipoConsulta') return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Tipo de consulta</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === "grupoTipoConsulta") return item;
                    }
                  )[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoPrioridad') return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Prioridad</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === "grupoPrioridad") return item;
                    }
                  )[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoMotivoConsulta') return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Motivo de consulta / Anamnesis</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                      (item) => {
                        if (item.linkId === 'grupoMotivoConsulta') return item;
                      }
                    )[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoDescripcionCaso') return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Descripción del Caso</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                      (item) => {
                        if (item.linkId === 'grupoDescripcionCaso') return item;
                      }
                    )[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoTipoAyuda') return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Se necesita</q-item-label>
              <q-item-label
                caption
                v-for="(
                  answer, index
                ) in questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                  (item) => {
                    if (item.linkId === 'grupoTipoAyuda') return item;
                  }
                )[0]?.item[0]?.answer"
                :key="index"
              >
                - {{ answer.valueCoding.display }}
              </q-item-label>
              <q-item-label
                caption
                v-if="
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === 'grupoDescripcionOtraAyuda')
                        return item;
                    }
                  ).length > 0
                "
              >
                <q-chat-message
                  :text="[
                    questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                      (item) => {
                        if (item.linkId === 'grupoDescripcionOtraAyuda')
                          return item;
                      }
                    )[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            tag="label"
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoAntecedentesCancer') return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Melanoma</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-avatar
                size="24px"
                v-if="
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === 'grupoAntecedentesCancer')
                        return item;
                    }
                  )[0]?.item[0]?.answer[0]?.valueBoolean
                "
                color="red"
                text-color="white"
                >SI</q-avatar
              >
              <q-avatar size="24px" v-else color="grey" text-color="white"
                >NO</q-avatar
              >
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="
              questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                (item) => {
                  if (item.linkId === 'grupoAntecedentesCancerText')
                    return item;
                }
              ).length > 0
            "
          >
            <q-item-section>
              <q-item-label>Detalle Melanoma</q-item-label>
              <q-item-label caption>
                <span
                  v-html="
                    questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                      (item) => {
                        if (item.linkId === 'grupoAntecedentesCancerText')
                          return item;
                      }
                    )[0]?.item[0]?.answer[0]?.valueString
                  "
                ></span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Diagnóstico</q-item-label>
              <q-item-label caption>
                {{
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === "grupoDiagnostico") return item;
                    }
                  )[0]?.item[0]?.answer[0]?.valueCoding.display
                }}
              </q-item-label>
              <q-item-label caption>
                ({{
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === "grupoDiagnosticoDetalle")
                        return item;
                    }
                  )[0]?.item[2]?.answer[0]?.valueString
                }})
                {{
                  questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                    (item) => {
                      if (item.linkId === "grupoDiagnosticoDetalle")
                        return item;
                    }
                  )[0]?.item[3]?.answer[0]?.valueString
                }}
              </q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                      (item) => {
                        if (item.linkId === 'grupoHipotesisDiagnostica')
                          return item;
                      }
                    )[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Tratamiento Farmacológico</q-item-label>
              <q-item-label caption>
                <q-chat-message
                  :text="[
                    questionnaireInterconsultaDermatologiaResponse?.item?.filter(
                      (item) => {
                        if (item.linkId === 'grupoTratamientoFarmacologico')
                          return item;
                      }
                    )[0]?.item[0]?.answer[0]?.valueString,
                  ]"
                  text-html
                  size="12"
                  text-color="#676767"
                  bg-color="blue-grey-1"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref, watchEffect, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { Loading, LocalStorage, QSpinnerDots, uid, useQuasar } from "quasar";
import HeadPatient from "../components/HeadPatient.vue";
import Sparkline from "../components/Sparkline.vue";
import Questionnaire from "../components/Questionnaire.vue";
import { useRouter } from "vue-router";
import router from "../router";
import VuePdfEmbed from "vue-pdf-embed";
/*Loading.show()
Loading.show({
  spinner: QSpinnerDots,
})*/
export default {
  components: { HeadPatient, Sparkline, VuePdfEmbed, Questionnaire },
  created() {
    const store = useStore();
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const route = useRouter();
    const patientString = ref("");
    const compositionID = ref(
      route?.currentRoute?._value?.params?.id
        ? route.currentRoute._value.params.id
        : ""
    );
    const url_to_props = ref(
      route?.currentRoute?._value?.params?.url
        ? route.currentRoute._value.params.url
        : undefined
    );
    const weight_history = ref([]);
    const questionnaireExamenFisicoResponse = ref("");
    const questionnaireAntecedentesResponse = ref("");
    const questionnaireInterconsultaDermatologiaResponse = ref("");
    const questionnaireAnexosResponse = ref("");
    const questionnaireReferentResponse = ref("");
    const anexo = ref([]);
    const notif1 = ref(false);
    const formData = ref({});
    const composition = ref({});
    const questionnaireId = ref(import.meta.env.VITE_RESPUESTA_DERMATOLOGIA);
    const questionnaireResponse = ref("");
    const status = ref("draft");

    let { t } = useI18n({ useScope: "global" });

    watchEffect(async () => {
      if (compositionID.value != "") {
        void (await store.dispatch(
          "composition/setComposition",
          compositionID.value
        ));
        composition.value = await computed(
          () => store.getters["composition/getComposition"]
        );
        patientString.value =
          composition.value.value.subject.reference.split("/")[1];

        if (composition.value) {
          void store.dispatch(
            "patient/setPatientID",
            composition.value.value.subject.reference.split("/")[1]
          );
          void store.dispatch(
            "alergyIntolerance/setAlergias",
            composition.value.value.subject.reference.split("/")[1]
          );

          for (const section of composition.value.value.section) {
            const index = composition.value.value.section.indexOf(section);
            switch (section.title) {
              case "Exámen Físico":
                for (const QuestionnaireResponse of section.entry) {
                  const index1 = section.entry.indexOf(QuestionnaireResponse);
                  questionnaireExamenFisicoResponse.value =
                    await store.dispatch(
                      "questionnaireResponse/getQuestionnaireResponse",
                      QuestionnaireResponse.reference.split("/")[1]
                    );
                }
                break;
              case "Antecedentes":
                for (const QuestionnaireResponse of section.entry) {
                  const index1 = section.entry.indexOf(QuestionnaireResponse);
                  questionnaireAntecedentesResponse.value =
                    await store.dispatch(
                      "questionnaireResponse/getQuestionnaireResponse",
                      QuestionnaireResponse.reference.split("/")[1]
                    );
                }
                break;
              case "Interconsulta":
                for (const QuestionnaireResponse of section.entry) {
                  const index1 = section.entry.indexOf(QuestionnaireResponse);
                  questionnaireInterconsultaDermatologiaResponse.value =
                    await store.dispatch(
                      "questionnaireResponse/getQuestionnaireResponse",
                      QuestionnaireResponse.reference.split("/")[1]
                    );
                }
                break;
              case "Anexos":
                for (const QuestionnaireResponse of section.entry) {
                  const index1 = section.entry.indexOf(QuestionnaireResponse);
                  questionnaireAnexosResponse.value = await store.dispatch(
                    "questionnaireResponse/getQuestionnaireResponse",
                    QuestionnaireResponse.reference.split("/")[1]
                  );
                }
                break;
              case "Respuesta Iterconsulta":
                for (const QuestionnaireResponse of section.entry) {
                  const index1 = section.entry.indexOf(QuestionnaireResponse);
                  questionnaireReferentResponse.value = await store.dispatch(
                    "questionnaireResponse/getQuestionnaireResponse",
                    QuestionnaireResponse.reference.split("/")[1]
                  );
                }
                break;
            }
          }
          weight_history.value = await store.dispatch(
            "observation/getObservationsWeigthHistoryByPatient",
            patientString.value
          );
        } else {
          questionnaireExamenFisicoResponse.value = "";
          questionnaireAntecedentesResponse.value = "";
          questionnaireInterconsultaDermatologiaResponse.value = "";
          questionnaireAnexosResponse.value = "";
          questionnaireReferentResponse.value = "";
        }
      } else {
        void store.dispatch("composition/setComposition", "");
        $q.notify({
          color: "negativa",
          textColor: "white",
          icon: "cloud_done",
          message: "Acceso Denegado",
        });
        router.push({ name: "solveCase" });
      }
    });

    onBeforeMount(() => {
      //Loading.hide()
    });

    async function bundle(
      questionnaire,
      questionnaireExamenFisicoResponse,
      questionnaireAntecedentesResponse,
      questionnaireInterconsultaDermatologiaResponse,
      questionnaireReferentResponse
    ) {
      const uuidQuestionnaire = "urn:uuid:" + uid();
      const uuidComposition = "urn:uuid:" + uid();
      const uuidServiceRequest = "urn:uuid:" + uid();
      const serviceRequestID =
        questionnaireInterconsultaDermatologiaResponse.basedOn[0].reference.split(
          "/"
        )[1];
      const serviceRequest = await store.dispatch(
        "questionnaireResponse/getQuestionnaireResponse",
        serviceRequestID
      );
      Object.assign(serviceRequest, { status: status.value });

      composition.value.value.section.push({
        title: "Respuesta Iterconsulta",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "81223-0",
              display: "Referral note - recommended ",
            },
          ],
        },
        entry: [
          {
            reference: uuidQuestionnaire,
          },
        ],
      });

      let object = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            fullUrl: uuidQuestionnaire,
            resource: formData.value.resource,
            request: {
              method: questionnaireReferentResponse ? "PUT" : "POST",
              url: questionnaireReferentResponse
                ? questionnaireReferentResponse
                : "QuestionnaireResponse",
            },
          },
          {
            fullUrl: uuidServiceRequest,
            resource: serviceRequest,
            request: {
              method: "PUT",
              url: serviceRequestID,
            },
          },
          {
            fullUrl: uuidComposition,
            resource: composition.value.value,
            request: {
              method: "PUT",
              url: "Composition/" + composition.value.value.id,
            },
          },
        ],
      };
      return object;
    }

    return {
      t,
      async onClick(acction) {
        $q.loading.show();
        status.value = acction === 2 ? "completed" : "draft";
        const response = await bundle(
          questionnaire.value,
          questionnaireExamenFisicoResponse.value,
          questionnaireAntecedentesResponse.value,
          questionnaireInterconsultaDermatologiaResponse.value,
          questionnaireReferentResponse.value,
          questionnaireReferentResponse.value
        );

        let postBundle = await store.dispatch("bundle/postBundle", response);
        if (postBundle.status == 200) {
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
      anexo,
      notif1,
      questionnaireExamenFisicoResponse,
      questionnaireAntecedentesResponse,
      questionnaireInterconsultaDermatologiaResponse,
      questionnaireAnexosResponse,
      questionnaireReferentResponse,
      formData,
      questionnaireId,
      questionnaireResponse,
      url_to_props,
      weight_history,
    };
  },
};
</script>
