<template>
  <div class="q-pa-md q-col-gutter-y-sm">
    <q-card flat bordered class="my-card">
      <q-form @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md" >
        <q-card-section>
          <div class="text-h6">{{t('person.searchPatient')}}</div>
        </q-card-section>



        <q-separator inset />

        <q-card-section>

        </q-card-section>
      </q-form>
    </q-card>


  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n'

export default {
  setup () {
    const $q = useQuasar()
    const formPatient = ref(null)
    const create=ref(false)
    const documentType= ref(null)
    const documentTypeRef= ref(null)
    const document= ref(null)
    const documentRef= ref(null)
    const name= ref('')
    const surname= ref('')
    const secondSurname= ref('')
    const birthday= ref('')
    const date= ref('')
    const insurance= ref(null)
    const prais= ref(null)
    const gender= ref(null)
    const region= ref(null)
    const province= ref(null)
    const commune= ref(null)
    const address= ref('')
    const mail= ref('')
    const phone= ref('')

    let { t } = useI18n({ useScope: 'global'})

    const Fn = {
      validaRut : function (rutCompleto) {
        rutCompleto = rutCompleto.replace('‐','-');
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
          return false;
        var tmp 	= rutCompleto.split('-');
        var digv	= tmp[1];
        var rut 	= parseInt(tmp[0]);
        if ( digv == 'K' ) digv = 'k' ;

        return (Fn.dv(rut) == digv );
      },
      dv : function(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
      }
    }

    return {
      formPatient,
      create,
      documentType,
      documentTypeRef,
      documentTypeRules:[
        (val) => !!val || t('person.validate.documentTypeRequered')
      ],
      document,
      documentRef,
      documentRules:[
        (val) => !!val || t('person.validate.documentRequered'),
        (val) => (documentType?.value?.['code'] === 1)?Fn.validaRut(val) || t('person.validate.documentNoValidate'):true
      ],
      name,
      surname,
      secondSurname,
      birthday,
      date,
      insurance,
      prais,
      gender,
      region,
      province,
      commune,
      address,
      mail,
      phone,
      t,
      insurances: [
        { code: 1, text: 'ISAPRE' },
        { code: 2, text: 'FONASA A' },
        { code: 3, text: 'FONASA B' },
        { code: 4, text: 'FONASA C' },
        { code: 5, text: 'FONASA D' },
        { code: 7, text: t('person.document') },
        { code: 6, text: 'DESCONOCIDO' }
      ],
      listPrais: [
        { code: 0, text: 'SI' },
        { code: 1, text: 'NO' }
      ],
      listDocumentType: [
        { code: 1, text: 'RUN' },
        { code: 2, text: 'Pasaporte/DNI' }
      ],
      listGender: [
        { code: 1, text: 'HOMBRE' },
        { code: 2, text: 'MUJER' },
        { code: 3, text: 'INTERSEX' },
        { code: 4, text: 'DESCONOCIDO' }
      ],
      listRegion: [],
      listProvince: [],
      listCommune: [],
      onSubmit () {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      },

      onReset () {
        document.value = null
        birthday.value = ''
        documentType.value = null
      }
    }
  }
}
</script>
