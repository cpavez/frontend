<template>
  <q-layout>
    <q-page class="window-height window-width row justify-center items-center" style="background: linear-gradient(#FFFFFF, #FFFFFF);">
      <div class="column q-pa-lg">
        <div class="row ">
          <q-card square class="shadow-24 mainloginCU" style="width:400px;height:440px;">
            <div class="franja">
              <span class="franjaazul"></span>
              <span class="franjaroja"></span>
            </div>
            <q-card-section style="padding: 0px !important;">
              <img src="../assets/img/logo salud digital_sin franja.svg" >
            </q-card-section>
            <q-card-section style="padding-top: 0px !important;">
              <q-form class="q-px-sm q-pt-xs"  @submit.prevent="login">
                <q-input
                    ref="run"
                    clearable
                    v-model="run"
                    type="text"
                    lazy-rules
                    mask="########-X"
                    :rules="[this.required,this.short,this.runValido]"
                    label="Run">
                  <template v-slot:prepend>
                    <q-icon name="people" />
                  </template>
                </q-input>
                <q-input
                    ref="password"
                    clearable
                    v-model="password"
                    :type="passwordFieldType"
                    lazy-rules
                    :rules="[this.required,this.short]"
                    label="Contraseña">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                        name="visibility"
                        @click="switchVisibility"
                        class="cursor-pointer" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-lg">
              <p v-if="error" class="error">Has introducido mal el run o la contraseña.</p>
              <q-btn
                  unelevated
                  size="lg"
                  style="background-color: #48646E"
                  class="full-width text-white"
                  label="Acceder"
              @click="login"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>

</template>


<script>
import store from "../store";

export default {
  data () {
    const Fn = {
      validaRut : function (rutCompleto) {
        if(rutCompleto != '' && rutCompleto != undefined){
          rutCompleto = rutCompleto.replace('‐','-');
          if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
          var tmp 	= rutCompleto.split('-');
          var digv	= tmp[1];
          var rut 	= parseInt(tmp[0]);
          if ( digv == 'K' ) digv = 'k' ;
          return (Fn.dv(rut) == digv );
        }else{
          return false;
        }
      },
      dv : function(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
      }
    }
    return {
      run: '',
      password: '',
      register: false,
      passwordFieldType: 'password',
      visibility: false,
      error: false,
      visibilityIcon: 'visibility',
      Fn
    }

  },

  methods: {

    async login() {
      this.$refs.run.validate()
      this.$refs.password.validate()

      if (!this.$refs.run.hasError && (!this.$refs.password.hasError))
      {
        try {
          const payload = {
            run:this.run,
            password:this.password
          }

          const user = await store.dispatch('auth/handleSetAccessToken',payload)
          if(user.status === 201){
            await this.$router.push("/");
          }else{
            this.error = true
            this.$q.notify({
              icon: 'error',
              color: 'red',
              message: user.data.message
            })
          }
        }catch (e) {
          console.log(e)
          this.error = true
        }

      }

    },
    required (val) {
      return  (val && val.length > 0 || 'El campo debe ser llenado')
    },
    short(val) {
      return  (val && val.length > 3 || 'El valor es demasiado corto')
    },
    runValido(val) {
      return  (val && val.length > 3 && this.Fn.validaRut(val) || 'El run no es Valido')
    },
    switchVisibility() {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon =  this.visibility ? 'visibility_off' : 'visibility'
    }
  }
};
</script>
<style>
  .mainloginCU .franja {
    width: 168px;
    height: 8px;
    margin-left: 0.6rem;
  }
  .mainloginCU .franja .franjaazul {
    background-color: #0f69b4;
    height: 8px;
    width: 37%;
    display: block;
    float: left;
  }
  .mainloginCU .franja .franjaroja {
    background-color: #eb3c46;
    height: 8px;
    width: 63%;
    display: block;
    float: left;
  }
</style>