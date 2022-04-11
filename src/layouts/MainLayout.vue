<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img height='64' src="../assets/img/img_1.png">
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap my-header">
          <q-select
              v-model="locale"
              :options="langOptions"
              :label="t('lang')"
              dense
              borderless
              emit-value
              map-options
              options-dense
              label-color='white'
              style="min-width: 100px;"
          />
          <div>
            <q-badge>v0.0</q-badge>
          </div>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>{{t('notifications')}}</q-tooltip>
          </q-btn>
          <q-btn flat>
            <q-avatar size="26px">
              <q-icon name="account_circle" />
            </q-avatar>
            <q-item-label class='text-caption q-pa-sm'>{{authUser?.name}} {{authUser?.lastname}}</q-item-label>
            <q-menu auto-close fit>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>{{t('setting')}}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click="logout">{{t('logout')}}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        class="bg-white"
        :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <template v-for="(link, index) in navs" :key="index">
            <q-item class="GNL__drawer-item" v-ripple clickable active-class="my-menu-link"  :to="{name:link.url}">
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset class="q-my-sm" :key="'sep' + index"  v-if="link.separator" />
          </template>

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">{{t('privacy')}}</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">{{t('terms')}}</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">{{t('supports')}}</a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>


    <q-footer reveal elevated style='background-color: #34393A;'>
      <q-toolbar>
        <q-avatar square>
          <img src="../assets/img/img.png">
        </q-avatar>
        <q-space></q-space>
        <q-item-label class='text-right'>{{t('copyright')}}</q-item-label>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import {Cookies, LocalStorage, useQuasar} from 'quasar'
import { ref, watch,onMounted,computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {useStore} from "vuex";
import router from "../router";
const langOptions = [
  { value: 'es-ES', label: 'Español' },
  { value: 'en-US', label: 'English' }
]

export default {
  name: 'MainLayout',
  created(){
    const store = useStore();
    void store.dispatch('auth/handleSetUser',Cookies.get('userLogged'));
  },
  setup () {
    const store = useStore();
    const authUser = computed(()=>store.getters['auth/getUser']);
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const showAdvanced = ref(false)
    const showDateOptions = ref(false)
    const exactPhrase = ref('')
    const hasWords = ref('')
    const excludeWords = ref('')
    const byWebsite = ref('')
    const navs = ref([])

    const $q = useQuasar()

    let { t,locale } = useI18n({ useScope: 'global'})



    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    onMounted(()=>{
      navs.value = [
        { icon: 'home', text: t('menu.home'), separator: false, url: 'home' },
        { icon: 'assignment_ind', text: t('menu.createCase'), separator: false, url: 'createCase' },
        { icon: 'flag', text: t('menu.trackingCase'), separator: false, url: 'trackingCase' },
        { icon: 'hive', text: t('menu.solve'), separator: false, url: 'solveCase' },
        { icon: 'star_border', text: t('menu.myCases'), separator: true, url: 'myCases' },
        { icon: 'emoji_people', text: t('menu.opinionRequest'), separator: false, url: 'inicio' },
        { icon: 'psychology', text: t('menu.solveQuery'), separator: true, url: 'inicio' },
        { icon: 'save_alt', text: t('menu.baseDownload'), separator: false, url: 'inicio' },
        { icon: 'memory', text: t('menu.baseSigte'), separator: false, url: 'inicio' },
        { icon: 'stacked_bar_chart', text: t('menu.fallow'), separator: false, url: 'inicio' },
        { icon: 'stacked_bar_chart', text: t('menu.someFallow'), separator: false, url: 'inicio' },
        { icon: 'content_paste_search', text: t('menu.record'), separator: true, url: 'inicio' },
        { icon: 'domain', text: t('menu.associateEstablishment'), separator: false, url: 'inicio' },
        { icon: 'ballot', text: t('menu.projects'), separator: false, url: 'inicio' },
        { icon: 'maps_home_work', text: t('menu.derivationNetwork'), separator: false, url: 'inicio' },
        { icon: 'tune', text: t('menu.assignmentParameters'), separator: false, url: 'inicio' },
        { icon: 'av_timer', text: t('menu.specialistHour'), separator: false, url: 'inicio' },
        { icon: 'transfer_within_a_station', text: t('menu.changeAssignment'), separator: false, url: 'inicio' },
        { icon: 'toggle_off', text: t('menu.roles'), separator: false, url: 'inicio' },
        { icon: 'restart_alt', text: t('menu.privileges'), separator: true, url: 'inicio' }
      ]
    });

    watch(locale, val => {
      navs.value = [
        { icon: 'home', text: t('menu.home'), separator: false, url: 'home' },
        { icon: 'assignment_ind', text: t('menu.createCase'), separator: false, url: 'createCase' },
        { icon: 'flag', text: t('menu.trackingCase'), separator: false, url: 'trackingCase' },
        { icon: 'hive', text: t('menu.solve'), separator: false, url: 'solveCase' },
        { icon: 'star_border', text: t('menu.myCases'), separator: true, url: 'myCases' },
        { icon: 'emoji_people', text: t('menu.opinionRequest'), separator: false, url: 'inicio' },
        { icon: 'psychology', text: t('menu.solveQuery'), separator: true, url: 'inicio' },
        { icon: 'save_alt', text: t('menu.baseDownload'), separator: false, url: 'inicio' },
        { icon: 'memory', text: t('menu.baseSigte'), separator: false, url: 'inicio' },
        { icon: 'stacked_bar_chart', text: t('menu.fallow'), separator: false, url: 'inicio' },
        { icon: 'stacked_bar_chart', text: t('menu.someFallow'), separator: false, url: 'inicio' },
        { icon: 'content_paste_search', text: t('menu.record'), separator: true, url: 'inicio' },
        { icon: 'domain', text: t('menu.associateEstablishment'), separator: false, url: 'inicio' },
        { icon: 'ballot', text: t('menu.projects'), separator: false, url: 'inicio' },
        { icon: 'maps_home_work', text: t('menu.derivationNetwork'), separator: false, url: 'inicio' },
        { icon: 'tune', text: t('menu.assignmentParameters'), separator: false, url: 'inicio' },
        { icon: 'av_timer', text: t('menu.specialistHour'), separator: false, url: 'inicio' },
        { icon: 'transfer_within_a_station', text: t('menu.changeAssignment'), separator: false, url: 'inicio' },
        { icon: 'toggle_off', text: t('menu.roles'), separator: false, url: 'inicio' },
        { icon: 'restart_alt', text: t('menu.privileges'), separator: true, url: 'inicio' }
      ]
    })




    return {
      leftDrawerOpen,
      search,
      showAdvanced,
      showDateOptions,
      exactPhrase,
      hasWords,
      excludeWords,
      byWebsite,
      navs,
      toggleLeftDrawer,
      langOptions,
      locale,
      t,
      authUser,
      logout(){
        Cookies.remove("userLogged");
        router.push({ name: "login" });
      }
    }
  }
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #48646E
  .q-item__section--avatar
    .q-icon
      color: white !important
  .q-item__label
    color: white !important
.my-header
  .q-field__native
    color: white !important
  .q-field__marginal
    color: white !important
.GNL
  &__toolbar
    height: 64px
    background-color: #48646E
    color:#EAF7FC
  .q-field__native
    color: red !important
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    .q-field__native
      color: red !important
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
