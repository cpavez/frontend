<template>
  <div class="q-pa-md">
    <q-carousel
        swipeable
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        height="700px"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-img src="../assets/img/Slider1.png">
          <div class="absolute-full" style='padding: 48px 568px 0 207px;'>
            <q-item-label class='text-h3'>Capacitaciones en línea</q-item-label>
            <q-item-label class='text-subtitle1'>
              Ingresa al canal de Hospital Digital en YouTube y podrás actualizar tus conocimientos a través de cursos, charlas y seminarios a distancia, dirigidos a personal de salud.
            </q-item-label>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list >
                <q-item clickable v-ripple target='_blank'  href='https://www.youtube.com/HospitalDigitalChile'>
                  <q-item-section>
                    Accede a los videos
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-img src="../assets/img/Slider2.jpg">
          <div class="absolute-full"  style='padding: 48px 568px 0 207px;'>
            <q-item-label class='text-h3'>Hablemos de Salud</q-item-label>
            <q-item-label class='text-subtitle1'>
              Recomienda a tus pacientes este espacio de conversaciones con profesionales de salud, realizado por Hospital Digital para entregar recomendaciones de autocuidado. Todos los martes a las 14.00 hrs. vía Zoom.
            </q-item-label>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list >
                <q-item clickable v-ripple target='_blank'  href='http://bit.ly/HablemosdeSalud'>
                  <q-item-section>
                    Ingresar a la Plataforma
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-img src="../assets/img/Slider3.jpg">
          <div class="absolute-full" style='padding: 48px 568px 0 207px;'>
            <q-item-label class='text-h3'>Materia de Apoyo</q-item-label>
            <q-item-label class='text-subtitle1'>
              Aquí encontrara los Manuales para los distintos Perfiles del Sistema.
            </q-item-label>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list >
                <q-item clickable v-ripple target='_blank'  href='#'>
                  <q-item-section>
                    Flujo Modulo Ayuda
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple target='_blank'  href='#'>
                  <q-item-section>
                    Perfil Coordinador
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple target='_blank'  href='#'>
                  <q-item-section>
                    Perfil Especialista
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple target='_blank'  href='#'>
                  <q-item-section>
                    Perfil Médico Derivador
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple target='_blank'  href='#'>
                  <q-item-section>
                    Perfil SOME
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-img>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
});
</script>
