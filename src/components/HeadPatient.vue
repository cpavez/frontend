<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { LocalStorage, useQuasar } from "quasar";
import router from "../router";

const props = defineProps({
  url_to_return: String,
  url_to_props: String,
});

const $q = useQuasar();
const store = useStore();
const patient = computed(() => store.getters["patient/getObjectPatient"]);
const alergias = computed(() => store.getters["alergyIntolerance/getAlergias"]);
const persistent = ref(false);
const step = ref(false);
const sabeSustancia = ref(0);
const type = ref("allergy");
const edad = ref("");
const descripcion = ref(null);
const category = ref([]);
const stringOptions = [
  {
    system: "http://snomed.info/sct",
    code: "102002",
    display: "Hemoglobina Okaloosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "120006",
    display: "racemasa de ornitina",
  },
  {
    system: "http://snomed.info/sct",
    code: "125001",
    display: "Sulfato ferroso Fe^59^",
  },
  {
    system: "http://snomed.info/sct",
    code: "126000",
    display:
      "Galactosil-N-acetilglucosaminilgalactosilglucosilceramida alfa-galactosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "130002",
    display: "Hemoglobina Hopkins-II",
  },
  {
    system: "http://snomed.info/sct",
    code: "131003",
    display: "Dolichyl-fosfato manosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "159002",
    display: "sal de ferrocianuro",
  },
  {
    system: "http://snomed.info/sct",
    code: "164003",
    display: "Fosfoenolpiruvato-proteína fosfotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "178002",
    display: "Uridil difosfato galactosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "186002",
    display: "antígeno HLA-Cw9",
  },
  {
    system: "http://snomed.info/sct",
    code: "187006",
    display: "Cianocobalamina Co^57^",
  },
  { system: "http://snomed.info/sct", code: "200001", display: "Berberina" },
  {
    system: "http://snomed.info/sct",
    code: "217008",
    display: "Antígeno del grupo sanguíneo IH",
  },
  {
    system: "http://snomed.info/sct",
    code: "231008",
    display: "3-hidroxiisobutirato deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "238002", display: "heptacloro" },
  {
    system: "http://snomed.info/sct",
    code: "261000",
    display: "fosfato de codeína",
  },
  { system: "http://snomed.info/sct", code: "296000", display: "cumacloro" },
  {
    system: "http://snomed.info/sct",
    code: "322006",
    display: "octilfenoxi PH etanol",
  },
  { system: "http://snomed.info/sct", code: "327000", display: "^76^Arsénico" },
  {
    system: "http://snomed.info/sct",
    code: "329002",
    display: "^127^Antimonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "336001",
    display: "Fibrinógeno Tokio II",
  },
  {
    system: "http://snomed.info/sct",
    code: "340005",
    display: "variante enzimática",
  },
  {
    system: "http://snomed.info/sct",
    code: "363000",
    display: "Fibrinógeno San Juan",
  },
  {
    system: "http://snomed.info/sct",
    code: "370000",
    display: "beta>2S< glicoproteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "371001",
    display: "Acilcarnitina hidrolasa",
  },
  { system: "http://snomed.info/sct", code: "377002", display: "Esparteína" },
  {
    system: "http://snomed.info/sct",
    code: "392001",
    display: "^151^Gadolinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "395004",
    display: "pentámero de inmunoglobulina",
  },
  {
    system: "http://snomed.info/sct",
    code: "412004",
    display: "Ribosa-5-fosfato isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "424006",
    display: "Citramalil-CoA liasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "425007",
    display: "Hemoglobina Nagoya",
  },
  {
    system: "http://snomed.info/sct",
    code: "432003",
    display: "ácido carmínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "438004",
    display: "2-hidroxiglutarato deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "462009",
    display: "Ureasa (ATP-hidrolizante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "472007",
    display: "Fibra textil vegetal",
  },
  {
    system: "http://snomed.info/sct",
    code: "476005",
    display: "CD1b - Grupo de antígeno de diferenciación 1b",
  },
  { system: "http://snomed.info/sct", code: "498001", display: "Nitrilasa" },
  {
    system: "http://snomed.info/sct",
    code: "501001",
    display: "Anticuerpo de grupo sanguíneo Sf^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "505005",
    display: "Anticuerpo de grupo sanguíneo M",
  },
  {
    system: "http://snomed.info/sct",
    code: "506006",
    display: "3-oxoesteroide delta^1^-deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "515004",
    display: "Antígeno del grupo sanguíneo Giaigue",
  },
  {
    system: "http://snomed.info/sct",
    code: "519005",
    display: "Proteína S libre",
  },
  {
    system: "http://snomed.info/sct",
    code: "521000",
    display: "^197^mercurio",
  },
  { system: "http://snomed.info/sct", code: "529003", display: "guanosina" },
  {
    system: "http://snomed.info/sct",
    code: "538001",
    display: "2,3-Dihidroxibenzoato 3,4-dioxigenasa",
  },
  { system: "http://snomed.info/sct", code: "566009", display: "acrosina" },
  {
    system: "http://snomed.info/sct",
    code: "576007",
    display: "Anticuerpo del grupo sanguíneo Pato",
  },
  {
    system: "http://snomed.info/sct",
    code: "578008",
    display: "Hemoglobina Jianghua",
  },
  {
    system: "http://snomed.info/sct",
    code: "584006",
    display: "Anticuerpo de grupo sanguíneo Wr^b^",
  },
  {
    system: "http://snomed.info/sct",
    code: "585007",
    display: "SP - Sustancia P",
  },
  {
    system: "http://snomed.info/sct",
    code: "591009",
    display: "2-Oxoisovalerato deshidrogenasa (acilante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "593007",
    display: "Anticuerpo de grupo sanguíneo Holmes",
  },
  {
    system: "http://snomed.info/sct",
    code: "594001",
    display: "2-oxoglutarato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "597008",
    display: "^247^Californio",
  },
  {
    system: "http://snomed.info/sct",
    code: "604000",
    display: "Glucósido de sapogenina vegetal",
  },
  {
    system: "http://snomed.info/sct",
    code: "611001",
    display: "Hipurato hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "620005",
    display: "Triclorofenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "648005",
    display: "aceite de cálamo",
  },
  {
    system: "http://snomed.info/sct",
    code: "662003",
    display: "Aeromonas proteolytica aminopeptidasa",
  },
  { system: "http://snomed.info/sct", code: "668004", display: "^185^Osmio" },
  {
    system: "http://snomed.info/sct",
    code: "683009",
    display: "acetato de mercurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "686001",
    display: "Plastoquinol-plastocianina reductasa",
  },
  { system: "http://snomed.info/sct", code: "693002", display: "tricoteceno" },
  {
    system: "http://snomed.info/sct",
    code: "698006",
    display: "lactobionato de eritromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "699003",
    display: "Extracto de alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "704006",
    display: "Antígeno de grupo sanguíneo Rx",
  },
  {
    system: "http://snomed.info/sct",
    code: "732002",
    display: "N-valaldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "735000",
    display: "Antígeno del grupo sanguíneo Jobbins",
  },
  { system: "http://snomed.info/sct", code: "747006", display: "Oxamniquina" },
  {
    system: "http://snomed.info/sct",
    code: "773001",
    display: "Hemoglobina M-Iwate",
  },
  { system: "http://snomed.info/sct", code: "785009", display: "dextranasa" },
  {
    system: "http://snomed.info/sct",
    code: "804003",
    display: "ácido creosótico",
  },
  {
    system: "http://snomed.info/sct",
    code: "819002",
    display: "anticuerpo lítico",
  },
  {
    system: "http://snomed.info/sct",
    code: "850000",
    display: "Stizolobato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "859004",
    display: "Péptido-N^4^-(N-acetil-b-glucosaminil) asparagina amidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "860009",
    display: "Inmunoglobulina, agregada",
  },
  { system: "http://snomed.info/sct", code: "873008", display: "uretano" },
  { system: "http://snomed.info/sct", code: "876000", display: "antígeno D" },
  {
    system: "http://snomed.info/sct",
    code: "877009",
    display: "Carboxipeptidasa A",
  },
  {
    system: "http://snomed.info/sct",
    code: "889006",
    display: "[Acetil-CoA carboxilasa] quinasa",
  },
  { system: "http://snomed.info/sct", code: "896008", display: "Hielo" },
  {
    system: "http://snomed.info/sct",
    code: "905001",
    display: "o-dihidroxicumarina O^7^-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "923009",
    display: "Complemento componente 2",
  },
  {
    system: "http://snomed.info/sct",
    code: "925002",
    display: "Yodipamida de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "963005",
    display: "Piridoxina 4-deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "974001",
    display: "Adenosilmetionina descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "979006",
    display: "Carbamato quinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "993004",
    display: "compuesto de paladio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1002007",
    display: "Manonotetraosa 2-alfa-N-acetilglucosaminiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1010008",
    display: "N-acetilneuraminato monooxigenasa",
  },
  { system: "http://snomed.info/sct", code: "1018001", display: "nornicotina" },
  {
    system: "http://snomed.info/sct",
    code: "1025008",
    display: "^93^Molibdeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "1047008",
    display: "Guanina desaminasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1050006",
    display: "Melilotato 3-monooxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1057009",
    display: "sal de fosfato",
  },
  {
    system: "http://snomed.info/sct",
    code: "1065007",
    display: "Proteinasa periplásmica de E. coli",
  },
  { system: "http://snomed.info/sct", code: "1080001", display: "^202^Talio" },
  {
    system: "http://snomed.info/sct",
    code: "1091008",
    display: "Inhibidor del factor de coagulación",
  },
  {
    system: "http://snomed.info/sct",
    code: "1097007",
    display: "Antígeno del grupo sanguíneo M^A^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1105007",
    display: "Isocorismato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1113008",
    display: "Ribonucleasa pancreática",
  },
  { system: "http://snomed.info/sct", code: "1137008", display: "^240^Uranio" },
  {
    system: "http://snomed.info/sct",
    code: "1149009",
    display: "Hemoglobina Barcelona",
  },
  {
    system: "http://snomed.info/sct",
    code: "1160000",
    display: "Anticuerpo contra antígeno en sistema ISBT LU",
  },
  {
    system: "http://snomed.info/sct",
    code: "1166006",
    display: "Ti - Titanio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1169004",
    display: "Hemoglobina Gower-2",
  },
  {
    system: "http://snomed.info/sct",
    code: "1171004",
    display: "Fibrinógeno Kawaguchi",
  },
  {
    system: "http://snomed.info/sct",
    code: "1185009",
    display: "Hemoglobina Roseau-Pointe à Pitre",
  },
  {
    system: "http://snomed.info/sct",
    code: "1189003",
    display: "Hemoglobina FM-Osaka",
  },
  {
    system: "http://snomed.info/sct",
    code: "1190007",
    display: "mefenoxalona",
  },
  {
    system: "http://snomed.info/sct",
    code: "1219001",
    display: "Disulfuro de dietil xantógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "1223009",
    display: "Antígeno del grupo sanguíneo Marcas",
  },
  {
    system: "http://snomed.info/sct",
    code: "1244009",
    display: "Fibrinógeno Madrid I",
  },
  {
    system: "http://snomed.info/sct",
    code: "1248007",
    display: "Proteinasa neutra de leucostoma",
  },
  {
    system: "http://snomed.info/sct",
    code: "1269009",
    display: "Sulfato de amikacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1272002",
    display: "Pteridina oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1273007",
    display: "Anticuerpo del grupo sanguíneo Evelyn",
  },
  {
    system: "http://snomed.info/sct",
    code: "1313002",
    display: "Nitrato reductasa (citocromo)",
  },
  {
    system: "http://snomed.info/sct",
    code: "1319003",
    display: "Anticuerpo de grupo sanguíneo K18",
  },
  {
    system: "http://snomed.info/sct",
    code: "1320009",
    display: "Hemoglobina Manitoba",
  },
  {
    system: "http://snomed.info/sct",
    code: "1325004",
    display: "yoduro de metocurina",
  },
  { system: "http://snomed.info/sct", code: "1331001", display: "metamidofos" },
  {
    system: "http://snomed.info/sct",
    code: "1334009",
    display: "receptor de estradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "1336006",
    display: "desoxicortona",
  },
  {
    system: "http://snomed.info/sct",
    code: "1341003",
    display: "Hemoglobina Ta-li",
  },
  {
    system: "http://snomed.info/sct",
    code: "1346008",
    display: "Tinción de eosina con tono azul",
  },
  {
    system: "http://snomed.info/sct",
    code: "1355006",
    display: "Factor de coagulación IX Oxford 3 variante",
  },
  { system: "http://snomed.info/sct", code: "1368003", display: "yodo 131" },
  {
    system: "http://snomed.info/sct",
    code: "1371006",
    display: "Antígeno del grupo sanguíneo Grande",
  },
  {
    system: "http://snomed.info/sct",
    code: "1373009",
    display: "^93^Zirconio",
  },
  { system: "http://snomed.info/sct", code: "1381005", display: "^126^Yodo" },
  {
    system: "http://snomed.info/sct",
    code: "1394007",
    display: "Pentacarbonilo de hierro",
  },
  { system: "http://snomed.info/sct", code: "1396009", display: "Actinio" },
  {
    system: "http://snomed.info/sct",
    code: "1405004",
    display: "Anticuerpo de grupo sanguíneo M^e^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1408002",
    display: "Anticuerpo de grupo sanguíneo 1123K",
  },
  {
    system: "http://snomed.info/sct",
    code: "1416006",
    display: "compuesto de radio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1450002",
    display: "Metilpentinol",
  },
  {
    system: "http://snomed.info/sct",
    code: "1466000",
    display: "ciclomaltodextrinasa",
  },
  { system: "http://snomed.info/sct", code: "1471007", display: "Elastina" },
  {
    system: "http://snomed.info/sct",
    code: "1472000",
    display: "Adenosina-fosfato desaminasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1476002",
    display: "sulfato de codeína",
  },
  {
    system: "http://snomed.info/sct",
    code: "1477006",
    display: "Hemoglobina Yatsushiro",
  },
  {
    system: "http://snomed.info/sct",
    code: "1496005",
    display: "Proto-oncogén",
  },
  {
    system: "http://snomed.info/sct",
    code: "1506001",
    display: "CH1 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "1517000",
    display: "HLA - Antígeno leucocitario humano B21",
  },
  {
    system: "http://snomed.info/sct",
    code: "1530004",
    display: "6-carboxihexanoato-coenzima A ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1535009",
    display: "fluoruro de nitrógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "1536005",
    display: "clorhidrato de pargilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1540001",
    display: "radioisótopo de telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1545006",
    display: "Uridina fosforilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1557002",
    display: "polvo de talco",
  },
  {
    system: "http://snomed.info/sct",
    code: "1565004",
    display: "Anticuerpo de grupo sanguíneo Buckalew",
  },
  {
    system: "http://snomed.info/sct",
    code: "1575001",
    display: "tetrapalmitato de maltosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1603001",
    display: "Isótopo de cobalto",
  },
  {
    system: "http://snomed.info/sct",
    code: "1607000",
    display: "Homoserina quinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1609002",
    display: "Sulfóxido de isosafrol de N-octilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "1634002",
    display: "Antígeno del grupo sanguíneo Ven",
  },
  {
    system: "http://snomed.info/sct",
    code: "1649005",
    display: "Antígeno del grupo sanguíneo Sul",
  },
  {
    system: "http://snomed.info/sct",
    code: "1656004",
    display: "Hemoglobina Shaare Zedek",
  },
  {
    system: "http://snomed.info/sct",
    code: "1660001",
    display: "Semillas de planta",
  },
  { system: "http://snomed.info/sct", code: "1668008", display: "ceforanida" },
  { system: "http://snomed.info/sct", code: "1672007", display: "ligasa" },
  { system: "http://snomed.info/sct", code: "1673002", display: "xilenol" },
  { system: "http://snomed.info/sct", code: "1675009", display: "^86^rubidio" },
  {
    system: "http://snomed.info/sct",
    code: "1676005",
    display: "Anticuerpo de grupo sanguíneo LW^ab^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1681001",
    display: "Anticuerpo de grupo sanguíneo BLe^b^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1696002",
    display: "Ácido 12-hidroxieicosatetraenoico",
  },
  { system: "http://snomed.info/sct", code: "1701009", display: "^191^Oro" },
  {
    system: "http://snomed.info/sct",
    code: "1710001",
    display: "AU - Ácido úrico",
  },
  { system: "http://snomed.info/sct", code: "1726000", display: "Diamante" },
  {
    system: "http://snomed.info/sct",
    code: "1727009",
    display: "Desoxilimonato A-anillo-lactonasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1740004",
    display: "Trifosfato de desoxicitidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1764003",
    display:
      "Sacaropina deshidrogenasa (nicotinamida adenina dinucleótido fosfato ^+^, formador de L-glutamato)",
  },
  {
    system: "http://snomed.info/sct",
    code: "1768000",
    display: "sacarosa fosforilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1786002",
    display: "Ligasa de ácido ribonucleico de transferencia de leucina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1793003",
    display: "Tricloroacetato de sodio",
  },
  { system: "http://snomed.info/sct", code: "1795005", display: "Gliodina" },
  {
    system: "http://snomed.info/sct",
    code: "1798007",
    display: "Hemoglobina Hammersmith",
  },
  {
    system: "http://snomed.info/sct",
    code: "1799004",
    display: "L-lisina oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1823002",
    display: "Hemoglobina Tochigi",
  },
  {
    system: "http://snomed.info/sct",
    code: "1827001",
    display: "Ribonucleasa T>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "1886008",
    display: "Verdoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1904005",
    display: "Galactósido 3-fucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1914001",
    display: "anticuerpo del factor de von Willebrand",
  },
  {
    system: "http://snomed.info/sct",
    code: "1916004",
    display: "boroglicerina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1940007",
    display: "Inmunoglobulina, alotipo GM>21<",
  },
  {
    system: "http://snomed.info/sct",
    code: "1944003",
    display: "Factor de coagulación X Variante del paciente",
  },
  {
    system: "http://snomed.info/sct",
    code: "1956002",
    display: "clorhidrato de buclizina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1971003",
    display: "clorhidrato de loxapina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1975007",
    display: "Anticuerpo de grupo sanguíneo Niemetz",
  },
  {
    system: "http://snomed.info/sct",
    code: "1978009",
    display:
      "Metiltransferasa específica del sitio (específica de la citosina)",
  },
  { system: "http://snomed.info/sct", code: "1985008", display: "vómito" },
  { system: "http://snomed.info/sct", code: "1991005", display: "Lignina" },
  {
    system: "http://snomed.info/sct",
    code: "2000001",
    display: "Nitrógeno pesado",
  },
  {
    system: "http://snomed.info/sct",
    code: "2006007",
    display: "difosfato de inosina",
  },
  { system: "http://snomed.info/sct", code: "2008008", display: "^67^Galio" },
  {
    system: "http://snomed.info/sct",
    code: "2009000",
    display: "carbonilo de cobalto",
  },
  {
    system: "http://snomed.info/sct",
    code: "2017008",
    display: "topoisomerasa del ácido desoxirribonucleico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2027002",
    display: "Serina proteinasa de Alternaria",
  },
  {
    system: "http://snomed.info/sct",
    code: "2029004",
    display: "Fibrinógeno Oslo II",
  },
  {
    system: "http://snomed.info/sct",
    code: "2038002",
    display: "Anticuerpo de grupo sanguíneo Bg^b^",
  },
  {
    system: "http://snomed.info/sct",
    code: "2039005",
    display: "sim-norspermidina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2050008",
    display: "Clooilglicina hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2064008",
    display: "L-Xiluloquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2082006",
    display: "Cadena alfa del receptor de vitronectina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2085008",
    display: "Proteína oncogen TCL",
  },
  {
    system: "http://snomed.info/sct",
    code: "2088005",
    display: "Página azul G-90 mancha",
  },
  {
    system: "http://snomed.info/sct",
    code: "2096000",
    display:
      "Nicotinamida adenina dinucleótido ^+^ adenosina difosfato-ribosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2100004",
    display: "sulfonetilmetano",
  },
  {
    system: "http://snomed.info/sct",
    code: "2101000",
    display: "Proteinasa B de levadura",
  },
  { system: "http://snomed.info/sct", code: "2125008", display: "Betazol" },
  {
    system: "http://snomed.info/sct",
    code: "2130007",
    display: "Ciclohexano-1,2-diol deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "2141009", display: "Hidrógeno" },
  {
    system: "http://snomed.info/sct",
    code: "2147008",
    display: "Antígeno del grupo sanguíneo Paular",
  },
  {
    system: "http://snomed.info/sct",
    code: "2151005",
    display: "Piridoxamina-piruvato aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2154002",
    display: "tagaturonato reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2159007",
    display: "Rojo ácido 27",
  },
  { system: "http://snomed.info/sct", code: "2163000", display: "dicofol" },
  {
    system: "http://snomed.info/sct",
    code: "2168009",
    display: "Bisfosfoglicerato mutasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2179004",
    display: "Malonato-semialdehído deshidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2189000",
    display: "Hemoglobina F-Dammam",
  },
  { system: "http://snomed.info/sct", code: "2194000", display: "^101^Rodio" },
  {
    system: "http://snomed.info/sct",
    code: "2195004",
    display: "clorhidrato de tocainida",
  },
  {
    system: "http://snomed.info/sct",
    code: "2197007",
    display: "Agente tópico de ácido bórico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2201007",
    display: "Bacteriopurpurina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2208001",
    display: "Fenilserina aldolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2212007",
    display: "Fibrinógeno Bethesda II",
  },
  { system: "http://snomed.info/sct", code: "2215009", display: "Azuresin" },
  {
    system: "http://snomed.info/sct",
    code: "2240002",
    display: "guanidinobutirasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2249001",
    display: "sulfato de gentamicina",
  },
  { system: "http://snomed.info/sct", code: "2254005", display: "Orotato" },
  {
    system: "http://snomed.info/sct",
    code: "2260005",
    display: "Antígeno leucocitario humano DRw18",
  },
  {
    system: "http://snomed.info/sct",
    code: "2262002",
    display: "Polisulfatasa de celulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2264001",
    display: "Isótopo de selenio",
  },
  { system: "http://snomed.info/sct", code: "2309006", display: "Au - Oro" },
  {
    system: "http://snomed.info/sct",
    code: "2311002",
    display: "Prostaciclina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2329007",
    display: "Anticuerpo de grupo sanguíneo Vel",
  },
  { system: "http://snomed.info/sct", code: "2331003", display: "sacárido" },
  { system: "http://snomed.info/sct", code: "2338009", display: "Raíz" },
  { system: "http://snomed.info/sct", code: "2343002", display: "gutión" },
  { system: "http://snomed.info/sct", code: "2346005", display: "Vascormone" },
  {
    system: "http://snomed.info/sct",
    code: "2354007",
    display: "3-Nucleotidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2358005",
    display: "Fragmento de vidrio, dispositivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "2369008",
    display: "Indol-3-acetato beta-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2370009",
    display: "Uridina difosfato-N-acetilmuramato-alanina ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2376003",
    display: "compuesto de mercurio",
  },
  { system: "http://snomed.info/sct", code: "2384004", display: "^230^Uranio" },
  {
    system: "http://snomed.info/sct",
    code: "2404002",
    display: "Anticuerpo de grupo sanguíneo St^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "2405001",
    display: "b- Propiolactona",
  },
  {
    system: "http://snomed.info/sct",
    code: "2414006",
    display: "receptor de prolactina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2430003",
    display: "radioisótopo de silicio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2431004",
    display: "Anticuerpo de grupo sanguíneo Friedberg",
  },
  {
    system: "http://snomed.info/sct",
    code: "2441001",
    display: "Radioisótopo de mercurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2444009",
    display: "Antígeno leucocitario humano Dw25",
  },
  { system: "http://snomed.info/sct", code: "2450004", display: "manosamina" },
  {
    system: "http://snomed.info/sct",
    code: "2462000",
    display:
      "Glucosa deshidrogenasa (nicotinamida adenina dinucleótido fosfato ^+^)",
  },
  {
    system: "http://snomed.info/sct",
    code: "2466002",
    display: "Cloruro peroxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2500009",
    display: "Antígeno linfocitario CDw41b",
  },
  {
    system: "http://snomed.info/sct",
    code: "2509005",
    display: "D-Glutamato oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2516006",
    display: "Compuesto de sulfuro metálico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2522002",
    display: "Sangre extravascular",
  },
  {
    system: "http://snomed.info/sct",
    code: "2529006",
    display: "Hemoglobina Madera",
  },
  {
    system: "http://snomed.info/sct",
    code: "2537003",
    display: "Agente antituberculoso",
  },
  {
    system: "http://snomed.info/sct",
    code: "2568004",
    display: "Antígeno del grupo sanguíneo McAuley",
  },
  {
    system: "http://snomed.info/sct",
    code: "2573005",
    display: "Inmunoglobulina, alotipo GM>13<",
  },
  {
    system: "http://snomed.info/sct",
    code: "2575003",
    display: "Glicoproteína alfa-2 de zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "2595009",
    display: "^119m^Telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2597001",
    display: "Globulina alfa-1",
  },
  {
    system: "http://snomed.info/sct",
    code: "2611008",
    display: "Anticuerpo de grupo sanguíneo La Fave",
  },
  {
    system: "http://snomed.info/sct",
    code: "2637006",
    display: "isótopo de indio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2648004",
    display: "bilis vomito",
  },
  {
    system: "http://snomed.info/sct",
    code: "2649007",
    display: "Azo-colorante",
  },
  {
    system: "http://snomed.info/sct",
    code: "2660003",
    display: "deshidrocolato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2671002",
    display: "3-metil-2-oxobutanoato hidroxi-metiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "2674005", display: "^128^Cesio" },
  { system: "http://snomed.info/sct", code: "2676007", display: "C3(H20)" },
  {
    system: "http://snomed.info/sct",
    code: "2678008",
    display: "Hemoglobina Nuevo México",
  },
  {
    system: "http://snomed.info/sct",
    code: "2680002",
    display: "Anticuerpo del factor XIII",
  },
  { system: "http://snomed.info/sct", code: "2698003", display: "Gas natural" },
  {
    system: "http://snomed.info/sct",
    code: "2705002",
    display: "^72^Arsénico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2706001",
    display: "Antígeno del grupo sanguíneo Vennera",
  },
  {
    system: "http://snomed.info/sct",
    code: "2719002",
    display: "tartrato deshidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2721007",
    display: "Antígeno del grupo sanguíneo McC^f^",
  },
  {
    system: "http://snomed.info/sct",
    code: "2728001",
    display: "antígeno del sistema de Lewis",
  },
  {
    system: "http://snomed.info/sct",
    code: "2753003",
    display: "Anticuerpo de grupo sanguíneo M>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "2754009",
    display: "Hemoglobina F-Kennestone",
  },
  {
    system: "http://snomed.info/sct",
    code: "2765004",
    display: "SC3 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "2778004",
    display: "Líquido pleural",
  },
  {
    system: "http://snomed.info/sct",
    code: "2796008",
    display: "Metantelinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2799001",
    display: "Metilbencetonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2823004",
    display: "Hemoglobina Brístol",
  },
  {
    system: "http://snomed.info/sct",
    code: "2832002",
    display: "compuesto de molibdeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "2846002",
    display: "Hemoglobina Saitama",
  },
  {
    system: "http://snomed.info/sct",
    code: "2869004",
    display: "Ácido etanoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2878005",
    display: "clorhidrato de petidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2880004",
    display: "Sulfato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2883002",
    display: "Exopoligalacturonato liasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2913009",
    display: "Cadena epsilon de inmunoglobulina",
  },
  { system: "http://snomed.info/sct", code: "2916001", display: "^22^Neón" },
  {
    system: "http://snomed.info/sct",
    code: "2925007",
    display: "Fluorometalona",
  },
  { system: "http://snomed.info/sct", code: "2927004", display: "rescinamina" },
  { system: "http://snomed.info/sct", code: "2938004", display: "pirazol" },
  {
    system: "http://snomed.info/sct",
    code: "2942001",
    display: "Carbono^14^ D-xilosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2950005",
    display: "Hemoglobina L-Golfo Pérsico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2958003",
    display: "caprilato de zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "2964005",
    display: "dimetoxianfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2974008",
    display: "Trichophyton schoenleinii colagenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2988007",
    display: "Antígeno leucocitario humano Aw",
  },
  {
    system: "http://snomed.info/sct",
    code: "2991007",
    display: "clorhidrato de mecamilamina",
  },
  { system: "http://snomed.info/sct", code: "2995003", display: "arecolina" },
  { system: "http://snomed.info/sct", code: "3027009", display: "^133^Bario" },
  {
    system: "http://snomed.info/sct",
    code: "3031003",
    display: "Carbonato de sodio dihidroxialuminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3040004",
    display: "Tecnecio Tc^99m^ disofenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3045009",
    display: "nitroclorobenceno",
  },
  {
    system: "http://snomed.info/sct",
    code: "3052006",
    display: "Ornitina cetoácido aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3066001",
    display: "Ácido triyodotiroacético",
  },
  {
    system: "http://snomed.info/sct",
    code: "3070009",
    display: "Aspartato-amoníaco ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3087006",
    display: "Aceite de helecho macho",
  },
  {
    system: "http://snomed.info/sct",
    code: "3107005",
    display: "Hemoglobina Shuangfeng",
  },
  {
    system: "http://snomed.info/sct",
    code: "3108000",
    display: "Aspergillus desoxirribonucleasa K>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "3131000",
    display: "Antígeno de grupo sanguíneo Middel",
  },
  {
    system: "http://snomed.info/sct",
    code: "3136005",
    display: "cefoperazona sódica",
  },
  { system: "http://snomed.info/sct", code: "3142009", display: "azaciclonol" },
  {
    system: "http://snomed.info/sct",
    code: "3145006",
    display: "ácido penicílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3150000",
    display: "Sialato O-acetilesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3151001",
    display: "Mucosidad del lóbulo superior izquierdo",
  },
  {
    system: "http://snomed.info/sct",
    code: "3155005",
    display: "3-fosfogliceroil-fosfato-polifosfato fosfotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3161008",
    display: "3-metilhistidina",
  },
  { system: "http://snomed.info/sct", code: "3167007", display: "carbón duro" },
  {
    system: "http://snomed.info/sct",
    code: "3187008",
    display: "Antígeno del grupo sanguíneo Nielsen",
  },
  {
    system: "http://snomed.info/sct",
    code: "3193000",
    display:
      "alfa-1,4-glucano-proteína sintasa (formadora de difosfato de uridina)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3197004",
    display: "Monofosfato de inosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3209002",
    display: "pancuronio sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3212004",
    display: "sulfato de manganeso",
  },
  {
    system: "http://snomed.info/sct",
    code: "3225007",
    display: "Fibrinógeno Seattle I",
  },
  {
    system: "http://snomed.info/sct",
    code: "3232003",
    display: "o-bencil-paraclorofenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "3271000",
    display: "Hemoglobina Southampton",
  },
  {
    system: "http://snomed.info/sct",
    code: "3273002",
    display: "Tirosina-éster sulfotransferasa",
  },
  { system: "http://snomed.info/sct", code: "3300001", display: "Euforbaína" },
  {
    system: "http://snomed.info/sct",
    code: "3318003",
    display: "secreciones vaginales",
  },
  {
    system: "http://snomed.info/sct",
    code: "3325005",
    display: "lipopolisacárido",
  },
  {
    system: "http://snomed.info/sct",
    code: "3339005",
    display: "(R)-20-hidroxiesteroide deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "3340007", display: "diastasa" },
  {
    system: "http://snomed.info/sct",
    code: "3342004",
    display: "Isótopo de cobre",
  },
  {
    system: "http://snomed.info/sct",
    code: "3346001",
    display: "Hemoglobina Brest",
  },
  {
    system: "http://snomed.info/sct",
    code: "3378009",
    display: "clorhidrato de imipramina",
  },
  { system: "http://snomed.info/sct", code: "3379001", display: "mertiolato" },
  {
    system: "http://snomed.info/sct",
    code: "3392003",
    display: "Aldehído deshidrogenasa (aceptor)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3405005",
    display: "2-hidroxi-3-oxoadipato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3411008",
    display: "disulfuro de bis-(dimetiltiocarbamil)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3437006",
    display: "Hidroximetilglutaril-coenzima A hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3440006",
    display: "biotina carboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3455002",
    display: "pesticida descontinuado",
  },
  {
    system: "http://snomed.info/sct",
    code: "3463001",
    display: "L-aminoácido deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3465008",
    display:
      "Topoisomerasa del ácido desoxirribonucleico (trifosfato de adenosina [ATP]-hidrolizante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3466009",
    display: "dimetilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3492002",
    display: "Galactinol-sacarosa galactosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3493007",
    display: "Esmegma clítoris",
  },
  {
    system: "http://snomed.info/sct",
    code: "3495000",
    display: "Cistina aminopeptidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3501003",
    display: "Clorhidrato de isoxsuprina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3523004",
    display: "Hemoglobina Q-India",
  },
  {
    system: "http://snomed.info/sct",
    code: "3532002",
    display: "moco laríngeo",
  },
  {
    system: "http://snomed.info/sct",
    code: "3555004",
    display: "Antígeno del grupo sanguíneo Morrison",
  },
  { system: "http://snomed.info/sct", code: "3579002", display: "^129^Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "3581000",
    display: "Glucosa-6-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3587001",
    display: "Malato deshidrogenasa (descarboxilante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3588006",
    display: "Enzima del complemento",
  },
  {
    system: "http://snomed.info/sct",
    code: "3592004",
    display: "Estimulador de tiroides de acción corta",
  },
  {
    system: "http://snomed.info/sct",
    code: "3597005",
    display: "clorhidrato de acebutolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "3601005",
    display: "Disolvente de éter",
  },
  {
    system: "http://snomed.info/sct",
    code: "3602003",
    display: "Anticuerpo tibio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3610002",
    display: "Epóxido hidrolasa",
  },
  { system: "http://snomed.info/sct", code: "3617004", display: "^79^Selenio" },
  {
    system: "http://snomed.info/sct",
    code: "3648007",
    display: "receptor de glucocorticoides",
  },
  {
    system: "http://snomed.info/sct",
    code: "3655009",
    display: "Hb - Resorte constante de hemoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3672002",
    display: "Fibrinógeno Caracas",
  },
  {
    system: "http://snomed.info/sct",
    code: "3684000",
    display: "ácido fenilacético",
  },
  {
    system: "http://snomed.info/sct",
    code: "3689005",
    display: "Hemoglobina Mizushi",
  },
  {
    system: "http://snomed.info/sct",
    code: "3692009",
    display: "Sulfito de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3693004",
    display: "Fibrinógeno Dusart",
  },
  {
    system: "http://snomed.info/sct",
    code: "3702007",
    display: "Citidina difosfato (CDP) glicerol glicerofosfotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3710008",
    display: "Prostaglandina-endoperóxido sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3718001",
    display: "Leche de vaca",
  },
  {
    system: "http://snomed.info/sct",
    code: "3726009",
    display: "Ligasa de ácido ribonucleico de transferencia de valina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3727000",
    display: "Hemoglobina F-Port Royal",
  },
  {
    system: "http://snomed.info/sct",
    code: "3730007",
    display: "Antígeno del grupo sanguíneo Lanthois",
  },
  {
    system: "http://snomed.info/sct",
    code: "3737005",
    display:
      "Nitrato reductasa (dinucleótido de nicotinamida y adenina reducido)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3742002",
    display: "cristal extracelular",
  },
  { system: "http://snomed.info/sct", code: "3757009", display: "Gosipol" },
  {
    system: "http://snomed.info/sct",
    code: "3771001",
    display: "neuromelanina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3775005",
    display: "Colina deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3776006",
    display: "Xantina deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3792001",
    display: "AA - Ácido araquidónico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3793006",
    display: "Compuesto de bario soluble",
  },
  {
    system: "http://snomed.info/sct",
    code: "3800009",
    display: "Acetato quinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3807007",
    display: "RH4 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3811001",
    display: "Magnesio-protoporfirina metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3812008",
    display: "Isótopo de berilio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3816006",
    display: "isótopo de vanadio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3823007",
    display: "Edisilato de proclorperazina",
  },
  { system: "http://snomed.info/sct", code: "3829006", display: "Fe - Hierro" },
  {
    system: "http://snomed.info/sct",
    code: "3834005",
    display:
      "CMP-N-acetilneuraminato-(alfa-N-acetil-neuraminil-2,3-beta-galactosil-1,3)-N-acetil-galactosaminida alfa-2,6-sialiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "3836007", display: "glutaminasa" },
  {
    system: "http://snomed.info/sct",
    code: "3844007",
    display: "Protoafina-aglucona deshidratasa (ciclización)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3848005",
    display: "nitrotolueno",
  },
  {
    system: "http://snomed.info/sct",
    code: "3849002",
    display: "Negro carbón",
  },
  {
    system: "http://snomed.info/sct",
    code: "3854006",
    display: "éter metílico de bis-cloro",
  },
  {
    system: "http://snomed.info/sct",
    code: "3874004",
    display: "bitartrato de hidrocodona",
  },
  { system: "http://snomed.info/sct", code: "3892007", display: "timidina" },
  {
    system: "http://snomed.info/sct",
    code: "3896005",
    display: "éster de p-hidroxibenzoato",
  },
  {
    system: "http://snomed.info/sct",
    code: "3897001",
    display: "MNS30 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3906002",
    display: "Aceite de alquitrán de abedul rectificado",
  },
  {
    system: "http://snomed.info/sct",
    code: "3920009",
    display: "Atago de hemoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3930000",
    display: "gas manufacturado",
  },
  { system: "http://snomed.info/sct", code: "3932008", display: "^64^Cobre" },
  {
    system: "http://snomed.info/sct",
    code: "3941003",
    display: "clorhidrato de metronidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "3945007",
    display: "isótopo de estaño",
  },
  {
    system: "http://snomed.info/sct",
    code: "3958008",
    display: "^245^Californio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3961009",
    display: "Antígeno del grupo sanguíneo Ritherford",
  },
  {
    system: "http://snomed.info/sct",
    code: "3976001",
    display: "Antígeno de grupo sanguíneo HEMPAS",
  },
  {
    system: "http://snomed.info/sct",
    code: "3982003",
    display: "Oxaloacetato descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3983008",
    display: "N,-N-dimetiltriptamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3990003",
    display: "Isoenzima ósea de fosfatasa alcalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3994007",
    display: "hemoglobina tampa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4014000",
    display: "sulfisomidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4024008",
    display: "metal blando",
  },
  { system: "http://snomed.info/sct", code: "4025009", display: "captodiamo" },
  {
    system: "http://snomed.info/sct",
    code: "4043008",
    display: "Clorhidrato de etidocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "4047009",
    display: "cis-1,2-dihidrobenceno-1,2-diol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4048004",
    display: "1,1,2,2-tetracloro-1,2- difluoroetano",
  },
  {
    system: "http://snomed.info/sct",
    code: "4067000",
    display: "Corismato mutasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4076007",
    display: "PTH - Hormona paratiroidea",
  },
  {
    system: "http://snomed.info/sct",
    code: "4077003",
    display: "Dihidrolipoamida succiniltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4080002",
    display: "Hemoglobina Grady, Dakar",
  },
  {
    system: "http://snomed.info/sct",
    code: "4091009",
    display: "Enteropeptidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4097008",
    display: "complejo Apo-SAA",
  },
  {
    system: "http://snomed.info/sct",
    code: "4104007",
    display: "Sulfato de condroitina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4105008",
    display: "Adenilato ciclasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4115002",
    display: "Anticuerpo del grupo sanguíneo Norlander",
  },
  {
    system: "http://snomed.info/sct",
    code: "4137009",
    display: "Acetato de sec-butilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4153007",
    display: "Enoil-coenzima A de cadena larga hidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4167003",
    display:
      "PECAM-1 - Molécula de adhesión de células endoteliales de plaquetas-1",
  },
  {
    system: "http://snomed.info/sct",
    code: "4169000",
    display: "Anticuerpo del grupo sanguíneo Le^bH^",
  },
  {
    system: "http://snomed.info/sct",
    code: "4177001",
    display: "Hemoglobina Long Island-Marsella",
  },
  {
    system: "http://snomed.info/sct",
    code: "4182008",
    display:
      "Citidina difosfato (CDP) diacilglicerol-serina O-fosfatidil-transferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4188007",
    display: "Fibrinógeno Sídney II",
  },
  { system: "http://snomed.info/sct", code: "4200007", display: "neriifolina" },
  {
    system: "http://snomed.info/sct",
    code: "4201006",
    display: "6-aminohexanoato-dímero hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4203009",
    display: "pamoato de imipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4207005",
    display: "Cortisona beta-reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4217000",
    display: "sal de fluorosilicato",
  },
  {
    system: "http://snomed.info/sct",
    code: "4218005",
    display: "Inmunoglobulina, alotipo GM>23<",
  },
  {
    system: "http://snomed.info/sct",
    code: "4231000",
    display: "isótopo de galio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4239003",
    display: "Glicerol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4255005",
    display: "Americio 241",
  },
  {
    system: "http://snomed.info/sct",
    code: "4289006",
    display: "Hemocianina de lapa ojo de cerradura",
  },
  {
    system: "http://snomed.info/sct",
    code: "4290002",
    display: "Linamarina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4314009",
    display: "Anticuerpo de grupo sanguíneo Allchurch",
  },
  {
    system: "http://snomed.info/sct",
    code: "4334005",
    display: "aceite de alquitrán",
  },
  {
    system: "http://snomed.info/sct",
    code: "4342006",
    display: "2-aminopiridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4353000",
    display: "ftalato de di-n-butilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4355007",
    display: "Factor de coagulación IX variante San Dimas",
  },
  {
    system: "http://snomed.info/sct",
    code: "4362003",
    display: "4-Cumarato-coenzima A ligasa",
  },
  { system: "http://snomed.info/sct", code: "4370008", display: "Acetona" },
  {
    system: "http://snomed.info/sct",
    code: "4393002",
    display: "Antígeno del grupo sanguíneo Fedor",
  },
  {
    system: "http://snomed.info/sct",
    code: "4401009",
    display: "Anticuerpo de grupo sanguíneo H>T<",
  },
  {
    system: "http://snomed.info/sct",
    code: "4413004",
    display: "bencipirinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4422003",
    display: "Antígeno del grupo sanguíneo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4423008",
    display: "Fibrinógeno Nueva York II",
  },
  {
    system: "http://snomed.info/sct",
    code: "4425001",
    display: "Atracón de anticuerpos del grupo sanguíneo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4435007",
    display: "fluoruro de sulfurilo",
  },
  { system: "http://snomed.info/sct", code: "4437004", display: "^127^Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "4471008",
    display: "^244^Californio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4479005",
    display: "Hemoglobina Brockton",
  },
  { system: "http://snomed.info/sct", code: "4480008", display: "sulfaetidol" },
  {
    system: "http://snomed.info/sct",
    code: "4509009",
    display: "Toxina de fenantreno vegetal",
  },
  { system: "http://snomed.info/sct", code: "4518006", display: "Buthenal" },
  {
    system: "http://snomed.info/sct",
    code: "4534009",
    display: "^208^bismuto",
  },
  {
    system: "http://snomed.info/sct",
    code: "4540002",
    display: "Adenosina difosfato (ADP) desaminasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4546008",
    display: "ácido tetradecanoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "4555006",
    display: "Anticuerpo de grupo sanguíneo Rils",
  },
  {
    system: "http://snomed.info/sct",
    code: "4560005",
    display: "Hemoglobina Mizuho",
  },
  {
    system: "http://snomed.info/sct",
    code: "4561009",
    display: "Arginina descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4564001",
    display: "Anticuerpo de grupo sanguíneo Sisson",
  },
  {
    system: "http://snomed.info/sct",
    code: "4567008",
    display: "Galactosa-1-fosfato timidililtransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4582003",
    display: "Antígeno del grupo sanguíneo N^A^",
  },
  {
    system: "http://snomed.info/sct",
    code: "4591004",
    display: "MNS22 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "4610008",
    display: "Proteína cardiaca senil",
  },
  {
    system: "http://snomed.info/sct",
    code: "4616002",
    display: "Cloruro de triclobisonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4629002",
    display: "Hipoglicina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "4635002",
    display: "Sangre arterial",
  },
  {
    system: "http://snomed.info/sct",
    code: "4643007",
    display: "Ribonucleasa H del timo de ternero",
  },
  {
    system: "http://snomed.info/sct",
    code: "4656000",
    display: "Tinción azul alcián 8GX",
  },
  {
    system: "http://snomed.info/sct",
    code: "4674009",
    display: "2,3-dihidroxibenzoato serina ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4681002",
    display: "Permanganato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4693006",
    display: "Cromo^51^ albúmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4700006",
    display: "insulina bovina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4706000",
    display: "Monóxido de cloro",
  },
  { system: "http://snomed.info/sct", code: "4714006", display: "^183m^Osmio" },
  {
    system: "http://snomed.info/sct",
    code: "4728000",
    display: "Proteinasa de Scopulariopsis",
  },
  {
    system: "http://snomed.info/sct",
    code: "4731004",
    display: "Polvo pirotécnico de aluminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4732006",
    display: "Oncogén proteína P55, V-MYC",
  },
  {
    system: "http://snomed.info/sct",
    code: "4746006",
    display: "Hemoglobina Mito",
  },
  {
    system: "http://snomed.info/sct",
    code: "4761007",
    display: "CD30 - Grupo de antígeno de diferenciación 30",
  },
  {
    system: "http://snomed.info/sct",
    code: "4762000",
    display: "Antígeno plaquetario HPA-3b",
  },
  { system: "http://snomed.info/sct", code: "4777008", display: "fluroxeno" },
  {
    system: "http://snomed.info/sct",
    code: "4780009",
    display: "Secbutabarbital sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "4786003",
    display:
      "beta-1,4-manosil-glucoproteína beta-1,4-N-acetilglucosaminiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4789005",
    display: "Anticuerpo de grupo sanguíneo bultar",
  },
  {
    system: "http://snomed.info/sct",
    code: "4793004",
    display: "Azobenceno reductasa",
  },
  { system: "http://snomed.info/sct", code: "4814001", display: "valetamato" },
  {
    system: "http://snomed.info/sct",
    code: "4824009",
    display: "MAO - Monoamino oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4825005",
    display: "Peptidil-glicinamidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4831008",
    display: "Arabinosa-5-fosfato isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4832001",
    display: "Tecnecio Tc^99m^ mebrofenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4833006",
    display: "Glucano endo-1,3-alfa-glucosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4844003",
    display: "3,3 Diyodotironina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4864008",
    display: "AMP - Monofosfato de adenosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4872005",
    display: "Glucosulfona",
  },
  {
    system: "http://snomed.info/sct",
    code: "4878009",
    display: "Antígeno leucocitario humano Dw3",
  },
  {
    system: "http://snomed.info/sct",
    code: "4882006",
    display: "ictioalieinotoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4889002",
    display: "xiluloquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4901003",
    display: "Piruvato oxidasa (coenzima A-acetilante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "4925006",
    display: "Oncogén proteína V-ABC",
  },
  {
    system: "http://snomed.info/sct",
    code: "4933007",
    display: "Leucocito M1",
  },
  {
    system: "http://snomed.info/sct",
    code: "4940008",
    display: "Tinte para tatuajes",
  },
  {
    system: "http://snomed.info/sct",
    code: "4955004",
    display: "Gen estructural neoplásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "4962008",
    display: "Corteza de árbol",
  },
  {
    system: "http://snomed.info/sct",
    code: "4963003",
    display: "aminoácido neutro",
  },
  {
    system: "http://snomed.info/sct",
    code: "4965005",
    display: "Glutatión reductasa",
  },
  { system: "http://snomed.info/sct", code: "4968007", display: "acumentina" },
  {
    system: "http://snomed.info/sct",
    code: "4986005",
    display: "Borato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5003005",
    display: "La hemoglobina del río cisne",
  },
  {
    system: "http://snomed.info/sct",
    code: "5004004",
    display: "Anticuerpo de grupo sanguíneo Panzar",
  },
  { system: "http://snomed.info/sct", code: "5007006", display: "Papaína" },
  { system: "http://snomed.info/sct", code: "5024000", display: "Agua dulce" },
  {
    system: "http://snomed.info/sct",
    code: "5031001",
    display: "3-3 diclorobencidina",
  },
  { system: "http://snomed.info/sct", code: "5040002", display: "Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "5043000",
    display: "Tinción de eritrosina Y",
  },
  {
    system: "http://snomed.info/sct",
    code: "5045007",
    display: "Proteína oncogen TCL4",
  },
  {
    system: "http://snomed.info/sct",
    code: "5059000",
    display: "^97^Tecnecio",
  },
  { system: "http://snomed.info/sct", code: "5060005", display: "^132^Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "5061009",
    display: "Proteína-metionina-S-óxido reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5064001",
    display: "Anticuerpo del grupo sanguíneo D 1276",
  },
  {
    system: "http://snomed.info/sct",
    code: "5081005",
    display: "RH31 (símbolo ISBT)",
  },
  { system: "http://snomed.info/sct", code: "5086000", display: "Gelsolina" },
  {
    system: "http://snomed.info/sct",
    code: "5094007",
    display: "Antígeno del grupo sanguíneo Ríos",
  },
  {
    system: "http://snomed.info/sct",
    code: "5098005",
    display: "aceite de hinojo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5109006",
    display:
      "Ácido desoxirribonucleico metilado-proteína-cisteína metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5142007",
    display: "Factor de coagulación II variante de Houston",
  },
  {
    system: "http://snomed.info/sct",
    code: "5160007",
    display: "Compuesto metálico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5163009",
    display: "escombrotoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5167005",
    display: "Humos de cloruro de zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "5172001",
    display: "Factor de coagulación Xa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5179005",
    display: "Fibra de tejido conectivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5200001",
    display: "trans-epoxisuccinato hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5206007",
    display: "compuesto de cianato",
  },
  { system: "http://snomed.info/sct", code: "5220000", display: "Bacitracina" },
  {
    system: "http://snomed.info/sct",
    code: "5226006",
    display: "Flavona O^7^-beta-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5250008",
    display: "Antígeno independiente del timo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5252000",
    display: "radioisótopo de hafnio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5253005",
    display: "Hemoglobina Woodville",
  },
  {
    system: "http://snomed.info/sct",
    code: "5259009",
    display: "Antígeno del grupo sanguíneo Braden",
  },
  {
    system: "http://snomed.info/sct",
    code: "5289002",
    display: "escilirosida",
  },
  {
    system: "http://snomed.info/sct",
    code: "5303002",
    display: "Hemoglobina Hoshida",
  },
  {
    system: "http://snomed.info/sct",
    code: "5305009",
    display: "polinucleótido",
  },
  {
    system: "http://snomed.info/sct",
    code: "5307001",
    display: "Antígeno del grupo sanguíneo Hamet",
  },
  { system: "http://snomed.info/sct", code: "5312000", display: "^65^Zinc" },
  {
    system: "http://snomed.info/sct",
    code: "5323001",
    display: "Ácido glucurónico de difosfato de uridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5330007",
    display: "Proteína de unión a actina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5339008",
    display: "L-glicol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5340005",
    display: "Antígeno del grupo sanguíneo Swietlik",
  },
  {
    system: "http://snomed.info/sct",
    code: "5392001",
    display: "Éter monometílico de propilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "5395004",
    display: "Piridoxamina-fosfato oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5404007",
    display: "Antígeno linfocitario CD45RA",
  },
  { system: "http://snomed.info/sct", code: "5405008", display: "^60^Cobalto" },
  {
    system: "http://snomed.info/sct",
    code: "5406009",
    display: "beta-L-arabinosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5420002",
    display: "Mucosidad sinusal accesoria",
  },
  {
    system: "http://snomed.info/sct",
    code: "5439007",
    display: "Anticuerpo del grupo sanguíneo Do^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "5442001",
    display: "Pagina azul 83",
  },
  {
    system: "http://snomed.info/sct",
    code: "5453007",
    display: "Isótopo de iridio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5471000",
    display: "Hemoglobina G-Coushatta",
  },
  {
    system: "http://snomed.info/sct",
    code: "5474008",
    display: "Propionato-CoA ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5477001",
    display: "subsulfato férrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5483003",
    display: "Oxalato CoA-transferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5504009",
    display: "Antígeno del grupo sanguíneo Fuerhart",
  },
  {
    system: "http://snomed.info/sct",
    code: "5511008",
    display: "Inosinato nucleosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5513006",
    display: "Inmunoglobulina, cadena alfa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5515004",
    display: "vapores de rodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5533005",
    display: "Anticuerpo de grupo sanguíneo Kp^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "5537006",
    display: "Inmunoglobulina, cadena delta",
  },
  { system: "http://snomed.info/sct", code: "5540006", display: "Calcio" },
  {
    system: "http://snomed.info/sct",
    code: "5547009",
    display: "^233^Plutonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5548004",
    display: "2-Deshidro-3-desoxi-D-pentonato aldolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5568005",
    display: "Hemoglobina Hijiyama",
  },
  {
    system: "http://snomed.info/sct",
    code: "5573004",
    display: "Antígeno del grupo sanguíneo Oca",
  },
  {
    system: "http://snomed.info/sct",
    code: "5589001",
    display: "Licodiona O^2^-metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5590005",
    display: "radioisótopo de berilio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5628003",
    display: "Hemoglobina I-High Wycombe",
  },
  {
    system: "http://snomed.info/sct",
    code: "5629006",
    display: "ácido citidílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5637003",
    display: "antígeno HLA-DQw6",
  },
  {
    system: "http://snomed.info/sct",
    code: "5641004",
    display: "Valproato semisódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5647000",
    display: "Griseofulvina ultramicrométrica",
  },
  {
    system: "http://snomed.info/sct",
    code: "5656008",
    display: "^116m^antimonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5657004",
    display: "Solución tópica de alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "5659001",
    display: "Hemoglobina J-Tongariki",
  },
  {
    system: "http://snomed.info/sct",
    code: "5670008",
    display: "Isótopo de oro",
  },
  {
    system: "http://snomed.info/sct",
    code: "5681006",
    display: "Ceftizoxima sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "5691000",
    display: "Esponja de gelatina absorbible",
  },
  {
    system: "http://snomed.info/sct",
    code: "5692007",
    display: "Cianocobalamina Co^58^",
  },
  {
    system: "http://snomed.info/sct",
    code: "5699003",
    display: "Somatomedina C",
  },
  {
    system: "http://snomed.info/sct",
    code: "5700002",
    display: "Anticuerpo de grupo sanguíneo Gómez",
  },
  { system: "http://snomed.info/sct", code: "5702005", display: "^106m^Plata" },
  {
    system: "http://snomed.info/sct",
    code: "5704006",
    display: "Galactoquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5705007",
    display: "1,3-propanodiol deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "5739006", display: "Estramonio" },
  {
    system: "http://snomed.info/sct",
    code: "5746002",
    display: "^118m^antimonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5757007",
    display: "antígeno HLA-Cw8",
  },
  {
    system: "http://snomed.info/sct",
    code: "5762008",
    display: "ARN nuclear heterogéneo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5764009",
    display: "^242^Plutonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5767002",
    display: "sulfamerazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5774007",
    display: "Vaselina blanca",
  },
  {
    system: "http://snomed.info/sct",
    code: "5800007",
    display: "ARNt (5-metilaminometil-2-tiouridilato)-metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5813001",
    display: "Malato deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5826002",
    display: "Etil-4-bis-(hidroxipropil)-1-aminobenzoato",
  },
  {
    system: "http://snomed.info/sct",
    code: "5827006",
    display: "crotonaldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "5829009",
    display: "Hemoglobina Vaasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5830004",
    display: "Hemoglobina Bart",
  },
  {
    system: "http://snomed.info/sct",
    code: "5840001",
    display: "Anticuerpo de grupo sanguíneo Wj",
  },
  { system: "http://snomed.info/sct", code: "5858007", display: "^110m^Indio" },
  {
    system: "http://snomed.info/sct",
    code: "5863006",
    display: "Vitexina beta-glucosiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "5896008", display: "helebrín" },
  {
    system: "http://snomed.info/sct",
    code: "5899001",
    display: "Gen estructural bacteriano",
  },
  {
    system: "http://snomed.info/sct",
    code: "5907009",
    display: "Poligalacturonato de quinidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5910002",
    display: "Oncogen proteína PP60, V-SRC",
  },
  {
    system: "http://snomed.info/sct",
    code: "5915007",
    display: "Antígeno del grupo sanguíneo Gladding",
  },
  {
    system: "http://snomed.info/sct",
    code: "5927005",
    display: "Lactoaldehído deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5931004",
    display: "Tecnecio Tc^99m^ coloide de azufre",
  },
  { system: "http://snomed.info/sct", code: "5932006", display: "cisteína" },
  {
    system: "http://snomed.info/sct",
    code: "5950004",
    display: "3,5-Nucleótido cíclico fosfodiesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5955009",
    display: "Dietilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "5977008",
    display: "Antígeno del grupo sanguíneo Bullock",
  },
  {
    system: "http://snomed.info/sct",
    code: "5989005",
    display: "Inmunoglobulina, alotipo GM>17<",
  },
  {
    system: "http://snomed.info/sct",
    code: "5991002",
    display: "D-fuconato deshidratasa",
  },
  { system: "http://snomed.info/sct", code: "6021003", display: "^88^Itrio" },
  {
    system: "http://snomed.info/sct",
    code: "6038004",
    display: "radioisótopo de oxígeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "6043006",
    display: "cemento óseo",
  },
  {
    system: "http://snomed.info/sct",
    code: "6044000",
    display: "Disulfuro de carbono",
  },
  {
    system: "http://snomed.info/sct",
    code: "6054001",
    display: "Succinato de doxilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6056004",
    display: "Anticuerpo de grupo sanguíneo Wk^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "6068008",
    display: "Antígeno del grupo sanguíneo Mil",
  },
  {
    system: "http://snomed.info/sct",
    code: "6083003",
    display: "Hidroxilisina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6085005",
    display: "Líquido sinovial",
  },
  {
    system: "http://snomed.info/sct",
    code: "6088007",
    display: "clorhidrato de benzfetamina",
  },
  { system: "http://snomed.info/sct", code: "6089004", display: "Loquia alba" },
  {
    system: "http://snomed.info/sct",
    code: "6091007",
    display: "Anticuerpo del grupo sanguíneo L Harris",
  },
  {
    system: "http://snomed.info/sct",
    code: "6107003",
    display: "Asparagusato reductasa (NADH)",
  },
  {
    system: "http://snomed.info/sct",
    code: "6109000",
    display: "Aminoácido aromático aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6115000",
    display: "Anticuerpo del grupo sanguíneo Anuszewska",
  },
  {
    system: "http://snomed.info/sct",
    code: "6135004",
    display: "Antígeno del grupo sanguíneo Pato",
  },
  {
    system: "http://snomed.info/sct",
    code: "6138002",
    display: "Antígeno del grupo sanguíneo Le Provost",
  },
  {
    system: "http://snomed.info/sct",
    code: "6162007",
    display: "meclociclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6170002",
    display: "Anticuerpo lábil al calor",
  },
  {
    system: "http://snomed.info/sct",
    code: "6172005",
    display: "Metiltransferasa de ácidos grasos",
  },
  {
    system: "http://snomed.info/sct",
    code: "6178009",
    display: "Antígeno linfocitario CD63",
  },
  {
    system: "http://snomed.info/sct",
    code: "6179001",
    display: "o-metil-bufotenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6182006",
    display: "cloroacetona",
  },
  {
    system: "http://snomed.info/sct",
    code: "6197009",
    display: "Antígeno del grupo sanguíneo Zd",
  },
  { system: "http://snomed.info/sct", code: "6237004", display: "bemegride" },
  {
    system: "http://snomed.info/sct",
    code: "6249003",
    display: "metabisulfito de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6256009",
    display: "ribosa isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6257000",
    display: "Cloruro de sodio Na^22^",
  },
  { system: "http://snomed.info/sct", code: "6260007", display: "protoquilol" },
  { system: "http://snomed.info/sct", code: "6261006", display: "Indoklon" },
  {
    system: "http://snomed.info/sct",
    code: "6263009",
    display: "Residuos vegetales",
  },
  { system: "http://snomed.info/sct", code: "6264003", display: "diazinón" },
  { system: "http://snomed.info/sct", code: "6287006", display: "metidatión" },
  {
    system: "http://snomed.info/sct",
    code: "6291001",
    display: "N-acetilglucosamina-1-fosfodiéster N-acetilglucosaminidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6301006",
    display: "^178^Tantalio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6310003",
    display: "antígeno de partículas",
  },
  {
    system: "http://snomed.info/sct",
    code: "6314007",
    display: "Fenol beta-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6333002",
    display: "extracto de escila",
  },
  {
    system: "http://snomed.info/sct",
    code: "6338006",
    display: "Imidazolonapropionasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6356006",
    display: "clorodialilacetamida",
  },
  { system: "http://snomed.info/sct", code: "6360009", display: "Calidina II" },
  {
    system: "http://snomed.info/sct",
    code: "6367007",
    display: "^95m^Tecnecio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6386004",
    display: "N-acetilneuraminato O^4^-acetiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6394006",
    display: "clorhidrato de fentermina",
  },
  { system: "http://snomed.info/sct", code: "6401007", display: "Liquenasa" },
  { system: "http://snomed.info/sct", code: "6409009", display: "Morfolina" },
  {
    system: "http://snomed.info/sct",
    code: "6411000",
    display: "interleucina-12",
  },
  {
    system: "http://snomed.info/sct",
    code: "6422001",
    display: "antígeno HLA-DRw14",
  },
  {
    system: "http://snomed.info/sct",
    code: "6451002",
    display: "clorobencilato",
  },
  { system: "http://snomed.info/sct", code: "6455006", display: "cloropreno" },
  {
    system: "http://snomed.info/sct",
    code: "6469006",
    display: "delta^1^-Piperideína-2-carboxilato reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6478000",
    display: "6-fosfofructoquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6495008",
    display: "Fibrinógeno Montreal II",
  },
  {
    system: "http://snomed.info/sct",
    code: "6507009",
    display: "Antígeno del grupo sanguíneo Mucho",
  },
  {
    system: "http://snomed.info/sct",
    code: "6513000",
    display: "flumetiazida",
  },
  {
    system: "http://snomed.info/sct",
    code: "6516008",
    display: "Indio^111^-Fe(OH)>3<",
  },
  {
    system: "http://snomed.info/sct",
    code: "6524003",
    display: "Espíritus destilados",
  },
  {
    system: "http://snomed.info/sct",
    code: "6529008",
    display: "Antígeno del grupo sanguíneo Cl^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "6532006",
    display: "Factor activador de macrófagos",
  },
  {
    system: "http://snomed.info/sct",
    code: "6590001",
    display: "Galactosilceramidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6592009",
    display: "antígeno HLA-Dw12",
  },
  {
    system: "http://snomed.info/sct",
    code: "6602005",
    display: "Aminoacridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6611005",
    display: "dietilaminoetanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "6612003",
    display: "Succinato de cloranfenicol sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6619007",
    display: "Proteína transportadora de bilirrubina Y",
  },
  { system: "http://snomed.info/sct", code: "6642000", display: "opsonina" },
  {
    system: "http://snomed.info/sct",
    code: "6644004",
    display: "Homoserina deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6671004",
    display: "Antígeno del grupo sanguíneo Caw",
  },
  {
    system: "http://snomed.info/sct",
    code: "6672006",
    display: "Fosfoadenilato 3-nucleotidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6699008",
    display: "Radioisótopo de titanio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6701008",
    display: "Lisamina rápido rojo B",
  },
  {
    system: "http://snomed.info/sct",
    code: "6702001",
    display: "Etil mercaptoetil dietil tiofosfato",
  },
  {
    system: "http://snomed.info/sct",
    code: "6709005",
    display: "Gentamicina 2-nucleotidiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6710000",
    display: "Óxido nítrico",
  },
  { system: "http://snomed.info/sct", code: "6713003", display: "^91^Itrio" },
  { system: "http://snomed.info/sct", code: "6717002", display: "nifuroxima" },
  {
    system: "http://snomed.info/sct",
    code: "6725000",
    display: "Azul de metileno",
  },
  { system: "http://snomed.info/sct", code: "6730001", display: "^234^Uranio" },
  {
    system: "http://snomed.info/sct",
    code: "6741004",
    display: "Anticuerpo anti ADN",
  },
  { system: "http://snomed.info/sct", code: "6755007", display: "antígeno TL" },
  {
    system: "http://snomed.info/sct",
    code: "6786001",
    display: "difluoruro de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "6790004",
    display: "aminopterina",
  },
  { system: "http://snomed.info/sct", code: "6792007", display: "veratrina" },
  {
    system: "http://snomed.info/sct",
    code: "6808006",
    display: "Compuesto de hierro ferroso",
  },
  { system: "http://snomed.info/sct", code: "6809003", display: "fomopsina" },
  {
    system: "http://snomed.info/sct",
    code: "6814004",
    display: "Discadenina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6817006",
    display: "glutatión oxidado",
  },
  {
    system: "http://snomed.info/sct",
    code: "6826009",
    display: "hormona esterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "6837005",
    display: "napsilato de dextropropoxifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "6854002",
    display: "^188^Platino",
  },
  {
    system: "http://snomed.info/sct",
    code: "6865007",
    display: "Salicilato de calcio de teofilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6873003",
    display: "Cefapirina sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "6879004",
    display: "Ácido 5,8,11-eicosatrienoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6881002",
    display: "vapores de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6884005",
    display: "(S)-3-Amino-2-metilpropionato aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6890009",
    display: "3-desoxi-mano-octulosonato-8-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6896003",
    display: "Tiopurina metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6910009",
    display: "Fluoruro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6911008",
    display: "Desoxicitidilato metiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "6916003", display: "Bowieine" },
  {
    system: "http://snomed.info/sct",
    code: "6924008",
    display: "exopolifosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6925009",
    display: "Leucina acetiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "6927001", display: "^121^Estaño" },
  {
    system: "http://snomed.info/sct",
    code: "6937006",
    display: "timidilato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6945001",
    display: "Antígeno del grupo sanguíneo Le^bH^",
  },
  {
    system: "http://snomed.info/sct",
    code: "6952004",
    display: "^121m^Estaño",
  },
  {
    system: "http://snomed.info/sct",
    code: "6958000",
    display: "Anticuerpo del grupo sanguíneo Frando",
  },
  {
    system: "http://snomed.info/sct",
    code: "6961004",
    display: "Lisolecitina acilmutasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6970001",
    display: "4-hidroxiprolina epimerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6973004",
    display: "Cloruro de cromo^51^",
  },
  { system: "http://snomed.info/sct", code: "6983000", display: "acrilamida" },
  {
    system: "http://snomed.info/sct",
    code: "6992002",
    display: "Clorhidrato de triflupromazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6993007",
    display: "Fluido seminal",
  },
  {
    system: "http://snomed.info/sct",
    code: "6999006",
    display: "compuesto de amonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7008002",
    display: "beta-caroteno 15,15-dioxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7018007",
    display: "Malato-CoA ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7029006",
    display: "Antígeno del grupo sanguíneo Greenlee",
  },
  { system: "http://snomed.info/sct", code: "7030001", display: "Globosido" },
  { system: "http://snomed.info/sct", code: "7034005", display: "diclofenaco" },
  { system: "http://snomed.info/sct", code: "7045008", display: "licorina" },
  {
    system: "http://snomed.info/sct",
    code: "7047000",
    display: "Atmósfera asfixiante",
  },
  {
    system: "http://snomed.info/sct",
    code: "7049002",
    display: "Piruvato carboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7054006",
    display: "Hemoglobina Poissy",
  },
  {
    system: "http://snomed.info/sct",
    code: "7056008",
    display: "3-propilmalato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7059001",
    display: "N-acilneuraminato-9-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7061005",
    display: "Antocianidina O^3^-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7070008",
    display: "Convallamarin",
  },
  {
    system: "http://snomed.info/sct",
    code: "7084003",
    display: "Fibrinógeno Buenos Aires II",
  },
  {
    system: "http://snomed.info/sct",
    code: "7110002",
    display: "^69^germanio",
  },
  { system: "http://snomed.info/sct", code: "7120007", display: "Antígeno" },
  { system: "http://snomed.info/sct", code: "7132006", display: "^73^Galio" },
  {
    system: "http://snomed.info/sct",
    code: "7139002",
    display: "Ácido-CoA ligasa (formadora de PIB)",
  },
  {
    system: "http://snomed.info/sct",
    code: "7146006",
    display: "Óxido de ciclohexeno",
  },
  { system: "http://snomed.info/sct", code: "7152007", display: "clortión" },
  {
    system: "http://snomed.info/sct",
    code: "7156005",
    display: "Isótopo de fósforo",
  },
  {
    system: "http://snomed.info/sct",
    code: "7158006",
    display: "Antígeno HLA-Dw19",
  },
  {
    system: "http://snomed.info/sct",
    code: "7161007",
    display: "Complemento componente C2a",
  },
  {
    system: "http://snomed.info/sct",
    code: "7179006",
    display: "precalicreína",
  },
  {
    system: "http://snomed.info/sct",
    code: "7191002",
    display: "Meteniltetrahidrofolato ciclohidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7208009",
    display: "tiol oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7211005",
    display: "Anticuerpo de grupo sanguíneo Haakestad",
  },
  {
    system: "http://snomed.info/sct",
    code: "7237008",
    display: "Galactonato deshidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7243005",
    display: "isocianato de metilo",
  },
  { system: "http://snomed.info/sct", code: "7269004", display: "Th - torio" },
  { system: "http://snomed.info/sct", code: "7271004", display: "polvo mixto" },
  {
    system: "http://snomed.info/sct",
    code: "7280004",
    display: "dTDP4-deshidroramnosa reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7281000",
    display: "tecnecio Tc^99m^ lidofenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7284008",
    display: "compuesto de mercaptano",
  },
  {
    system: "http://snomed.info/sct",
    code: "7294003",
    display: "Acetato de terc-butilo",
  },
  { system: "http://snomed.info/sct", code: "7302008", display: "ambufilina" },
  {
    system: "http://snomed.info/sct",
    code: "7318002",
    display: "bacterioclorofila",
  },
  { system: "http://snomed.info/sct", code: "7321000", display: "pirimidina" },
  {
    system: "http://snomed.info/sct",
    code: "7325009",
    display: "Hidróxido de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7327001",
    display: "Ácido sulfúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "7328006",
    display: "Vaselina roja",
  },
  { system: "http://snomed.info/sct", code: "7330008", display: "Goma laca" },
  {
    system: "http://snomed.info/sct",
    code: "7337006",
    display: "Anticuerpo de grupo sanguíneo Tr^a^",
  },
  { system: "http://snomed.info/sct", code: "7348004", display: "Factor II" },
  {
    system: "http://snomed.info/sct",
    code: "7382005",
    display: "éster de aminoalcohol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7401000",
    display: "complejo hemo-hemopexina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7411007",
    display: "Anticuerpo de grupo sanguíneo HLA-B8",
  },
  {
    system: "http://snomed.info/sct",
    code: "7427000",
    display: "sepiapterina reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7434003",
    display: "eritrosina B",
  },
  { system: "http://snomed.info/sct", code: "7446004", display: "Rutenio" },
  {
    system: "http://snomed.info/sct",
    code: "7451005",
    display: "Agente oftálmico de tobramicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7460002",
    display: "^127^Telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7470000",
    display: "p-terc-butiltolueno",
  },
  {
    system: "http://snomed.info/sct",
    code: "7489000",
    display: "Anticuerpo homocitotrópico",
  },
  { system: "http://snomed.info/sct", code: "7503004", display: "^72^Galio" },
  {
    system: "http://snomed.info/sct",
    code: "7509000",
    display: "Hexanitrato de manitol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7515000",
    display: "Micotoxina hepatotóxica",
  },
  {
    system: "http://snomed.info/sct",
    code: "7537007",
    display: "Stizolobinato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7547005",
    display: "Hemoglobina Lincoln Park",
  },
  {
    system: "http://snomed.info/sct",
    code: "7549008",
    display: "Fibrinógeno Bethesda I",
  },
  {
    system: "http://snomed.info/sct",
    code: "7588005",
    display: "Anticuerpo de grupo sanguíneo Sk^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "7608003",
    display: "trietilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7616007",
    display: "Anticuerpo del grupo sanguíneo Pruitt",
  },
  {
    system: "http://snomed.info/sct",
    code: "7648006",
    display: "Antígeno HLA-Bw70",
  },
  {
    system: "http://snomed.info/sct",
    code: "7661006",
    display: "hueso de pescado",
  },
  {
    system: "http://snomed.info/sct",
    code: "7670009",
    display: "Aminobutiraldehído deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7675004",
    display: "Antígeno del grupo sanguíneo Towey",
  },
  {
    system: "http://snomed.info/sct",
    code: "7679005",
    display: "Compuesto oxidante fuerte",
  },
  {
    system: "http://snomed.info/sct",
    code: "7685003",
    display: "Anticuerpo de grupo sanguíneo Bg^c^",
  },
  {
    system: "http://snomed.info/sct",
    code: "7696006",
    display: "polvo de ferrovanadio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7716001",
    display: "Isovaleril coenzima A deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7737009",
    display: "clorhidrato de clortetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7738004",
    display: "antígeno HLA-B49",
  },
  { system: "http://snomed.info/sct", code: "7761002", display: "^111^Plata" },
  {
    system: "http://snomed.info/sct",
    code: "7770004",
    display: "^89^Estroncio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7774008",
    display: "Neo-b-vitamina A>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "7779003",
    display: "^103^Rutenio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7785005",
    display: "Esfingomielina fosfodiesterasa D",
  },
  {
    system: "http://snomed.info/sct",
    code: "7790008",
    display: "1-monoacilglicerol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7791007",
    display: "Proteína de soya",
  },
  {
    system: "http://snomed.info/sct",
    code: "7795003",
    display: "Oxalato oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7801007",
    display: "Tetrahidroxipteridina cicloisomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7816005",
    display: "clorhidrato de antazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7834009",
    display: "acetil digitoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7846008",
    display: "Esfingomielina fosfodiesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7848009",
    display: "1-fosfatidilinositol fosfodiesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7868003",
    display: "beta-ciclopiazonato deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "7879008", display: "^218^Radón" },
  {
    system: "http://snomed.info/sct",
    code: "7900007",
    display: "Presbiteriana de hemoglobina",
  },
  { system: "http://snomed.info/sct", code: "7904003", display: "Deanol" },
  {
    system: "http://snomed.info/sct",
    code: "7909008",
    display: "Arginina carboxipeptidasa",
  },
  { system: "http://snomed.info/sct", code: "7924004", display: "diflorasona" },
  {
    system: "http://snomed.info/sct",
    code: "7938006",
    display: "D-arabitol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7945006",
    display: "Orsellinate-depside hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7948008",
    display: "Anticuerpo de Reed-Sternberg",
  },
  { system: "http://snomed.info/sct", code: "7953003", display: "Thioneb" },
  {
    system: "http://snomed.info/sct",
    code: "7957002",
    display: "Fosfatidato citidililtransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7961008",
    display: "Hemoglobina F-Shanghai",
  },
  { system: "http://snomed.info/sct", code: "7970006", display: "aloinjerto" },
  {
    system: "http://snomed.info/sct",
    code: "7974002",
    display: "Anticuerpo de grupo sanguíneo Dalman",
  },
  { system: "http://snomed.info/sct", code: "7975001", display: "amifenazol" },
  {
    system: "http://snomed.info/sct",
    code: "7979007",
    display: "3-fosfoadenililsulfato 3-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7983007",
    display: "rodanuro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7985000",
    display: "isótopo de azufre",
  },
  {
    system: "http://snomed.info/sct",
    code: "7997004",
    display: "butil mercaptano",
  },
  {
    system: "http://snomed.info/sct",
    code: "8000007",
    display: "Cucurbitacina delta^23^-reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8002004",
    display: "Anticuerpo de grupo sanguíneo Fleming",
  },
  {
    system: "http://snomed.info/sct",
    code: "8025003",
    display: "Anticuerpo de grupo sanguíneo Gibson",
  },
  {
    system: "http://snomed.info/sct",
    code: "8029009",
    display: "Alil glicidil éter",
  },
  {
    system: "http://snomed.info/sct",
    code: "8030004",
    display: "PEG - Polietilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "8035009",
    display: "Colestenol delta-isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8048008",
    display: "Antígeno del grupo sanguíneo Th",
  },
  {
    system: "http://snomed.info/sct",
    code: "8054009",
    display: "Orotato reductasa (NADPH)",
  },
  {
    system: "http://snomed.info/sct",
    code: "8055005",
    display: "Galactósido acetiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8105004",
    display: "Hemoglobina Leiden",
  },
  {
    system: "http://snomed.info/sct",
    code: "8108002",
    display: "Undecaprenil-difosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8123007",
    display: "Anticuerpo de grupo sanguíneo Schuppenhauer",
  },
  {
    system: "http://snomed.info/sct",
    code: "8132009",
    display: "acetilsalicilato de magnesio",
  },
  { system: "http://snomed.info/sct", code: "8143001", display: "diosmin" },
  { system: "http://snomed.info/sct", code: "8153000", display: "homoprolina" },
  {
    system: "http://snomed.info/sct",
    code: "8156008",
    display: "Inmunoglobulina, fragmento Fd",
  },
  {
    system: "http://snomed.info/sct",
    code: "8164002",
    display: "Grupo de antígeno de diferenciación 67",
  },
  {
    system: "http://snomed.info/sct",
    code: "8168004",
    display: "Uracil-5-carboxilato descarboxilasa",
  },
  { system: "http://snomed.info/sct", code: "8179009", display: "Cevadilina" },
  {
    system: "http://snomed.info/sct",
    code: "8184003",
    display: "convallamarogenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8190004",
    display: "Diaminopimelato epimerasa",
  },
  { system: "http://snomed.info/sct", code: "8202008", display: "^43^Potasio" },
  {
    system: "http://snomed.info/sct",
    code: "8203003",
    display: "Gonadotropina menopáusica humana",
  },
  { system: "http://snomed.info/sct", code: "8204009", display: "Poliéster" },
  {
    system: "http://snomed.info/sct",
    code: "8222007",
    display: "Factor de coagulación II variante Padua",
  },
  {
    system: "http://snomed.info/sct",
    code: "8227001",
    display: "^106^Rutenio",
  },
  {
    system: "http://snomed.info/sct",
    code: "8230008",
    display: "cisteína proteinasa estreptocócica",
  },
  { system: "http://snomed.info/sct", code: "8237006", display: "Estrobano" },
  {
    system: "http://snomed.info/sct",
    code: "8252004",
    display: "clorotiazida sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "8257005",
    display: "Hemoglobina anormal",
  },
  {
    system: "http://snomed.info/sct",
    code: "8261004",
    display: "tiosulfato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "8268005",
    display: "Anticuerpo de grupo sanguíneo Hildebrandt",
  },
  {
    system: "http://snomed.info/sct",
    code: "8270001",
    display: "ARNt adenililtransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8275006",
    display: "Metionina-S-óxido reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8295000",
    display: "Proteína uromucoide",
  },
  {
    system: "http://snomed.info/sct",
    code: "8300003",
    display: "ciclohexanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "8310007",
    display: "Hemoglobina Madrid",
  },
  {
    system: "http://snomed.info/sct",
    code: "8313009",
    display: "ADN polimerasa dirigida por ARN",
  },
  {
    system: "http://snomed.info/sct",
    code: "8340009",
    display: "Procolágeno-lisina,2-oxoglutarato 5-dioxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8342001",
    display: "azul cresilo brillante",
  },
  {
    system: "http://snomed.info/sct",
    code: "8343006",
    display: "Anticuerpo del grupo sanguíneo Re^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "8354001",
    display: "Bis-ditiocarbamato de etileno de manganeso",
  },
  {
    system: "http://snomed.info/sct",
    code: "8355000",
    display: "isótopo de hafnio",
  },
  { system: "http://snomed.info/sct", code: "8362009", display: "contra c" },
  {
    system: "http://snomed.info/sct",
    code: "8365006",
    display: "Aceite de poleo-europeo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8368008",
    display: "Xilano 1,44-beta-xilosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8376005",
    display: "Anticuerpo del grupo sanguíneo Duffy",
  },
  {
    system: "http://snomed.info/sct",
    code: "8385005",
    display: "Ácido alfa-glucosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8397006",
    display: "Complejo de resina de nicotina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8406008",
    display: "Nitroetano oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8429000",
    display: "naranja brillante",
  },
  {
    system: "http://snomed.info/sct",
    code: "8450009",
    display: "Aceite de hierba de limón",
  },
  {
    system: "http://snomed.info/sct",
    code: "8452001",
    display: "Antígeno del grupo sanguíneo Sisson",
  },
  {
    system: "http://snomed.info/sct",
    code: "8456003",
    display: "Peróxido de metiletilcetona",
  },
  {
    system: "http://snomed.info/sct",
    code: "8460000",
    display: "Anticuerpo de grupo sanguíneo Vg^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "8473001",
    display: "Homocisteína metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8474007",
    display: "oleato de plomo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8484008",
    display: "Antígeno del grupo sanguíneo Mur",
  },
  {
    system: "http://snomed.info/sct",
    code: "8485009",
    display: "Oncogén proteína P210, BCR-ABL",
  },
  {
    system: "http://snomed.info/sct",
    code: "8486005",
    display: "Antígeno HLA-DRw15",
  },
  { system: "http://snomed.info/sct", code: "8487001", display: "^48^vanadio" },
  {
    system: "http://snomed.info/sct",
    code: "8491006",
    display: "inhibidor del complemento",
  },
  { system: "http://snomed.info/sct", code: "8492004", display: "alantoicasa" },
  {
    system: "http://snomed.info/sct",
    code: "8498000",
    display: "Veneno corto de neurotoxina",
  },
  { system: "http://snomed.info/sct", code: "8507001", display: "ciclohexano" },
  { system: "http://snomed.info/sct", code: "8514004", display: "ornitina" },
  {
    system: "http://snomed.info/sct",
    code: "8520003",
    display: "Hemoglobina Machida",
  },
  { system: "http://snomed.info/sct", code: "8525008", display: "^183^Osmio" },
  {
    system: "http://snomed.info/sct",
    code: "8529002",
    display: "Proteína urinaria de bajo peso molecular",
  },
  { system: "http://snomed.info/sct", code: "8534003", display: "^110^Estaño" },
  { system: "http://snomed.info/sct", code: "8537005", display: "Solución" },
  {
    system: "http://snomed.info/sct",
    code: "8578007",
    display: "cianato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "8591008",
    display: "diclorodifluorometano",
  },
  {
    system: "http://snomed.info/sct",
    code: "8612007",
    display: "Factor de necrosis tumoral",
  },
  {
    system: "http://snomed.info/sct",
    code: "8620009",
    display: "Proteína oncogen TCL6",
  },
  {
    system: "http://snomed.info/sct",
    code: "8631001",
    display: "Cloruro de potasio",
  },
  { system: "http://snomed.info/sct", code: "8653004", display: "Rubijervine" },
  {
    system: "http://snomed.info/sct",
    code: "8660005",
    display: "Complemento componente C3c",
  },
  {
    system: "http://snomed.info/sct",
    code: "8687009",
    display: "Goma arábiga",
  },
  {
    system: "http://snomed.info/sct",
    code: "8689007",
    display: "Sulfato de kanamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8701002",
    display: "Sulfaclorpiridazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8705006",
    display: "4-hidroxibenzoato descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8731008",
    display: "Anticuerpo de grupo sanguíneo Austin",
  },
  { system: "http://snomed.info/sct", code: "8740007", display: "C3(H20)Bb" },
  {
    system: "http://snomed.info/sct",
    code: "8761000",
    display: "Adenililsulfato quinasa",
  },
  { system: "http://snomed.info/sct", code: "8767001", display: "Santonín" },
  {
    system: "http://snomed.info/sct",
    code: "8785008",
    display: "Dioxido de cloro",
  },
  {
    system: "http://snomed.info/sct",
    code: "8786009",
    display: "Antígeno del grupo sanguíneo Wd^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "8795001",
    display: "Hb F - Hemoglobina F",
  },
  {
    system: "http://snomed.info/sct",
    code: "8817004",
    display: "sitio del receptor de LH",
  },
  {
    system: "http://snomed.info/sct",
    code: "8818009",
    display: "Anticuerpo de grupo sanguíneo Tri W",
  },
  {
    system: "http://snomed.info/sct",
    code: "8822004",
    display: "Ácido linoleico",
  },
  {
    system: "http://snomed.info/sct",
    code: "8830003",
    display: "Nitrato reductasa (NAD(P)H)",
  },
  { system: "http://snomed.info/sct", code: "8836009", display: "galocianina" },
  {
    system: "http://snomed.info/sct",
    code: "8844009",
    display: "Hidroxibutirato-dímero hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8858006",
    display: "Nitrato de estroncio Sr^85^",
  },
  { system: "http://snomed.info/sct", code: "8865003", display: "Grafito" },
  {
    system: "http://snomed.info/sct",
    code: "8878003",
    display: "Antígeno del grupo sanguíneo Evelyn",
  },
  {
    system: "http://snomed.info/sct",
    code: "8882001",
    display: "3-hidroxibenzoato 6-monooxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8886003",
    display: "Acetato de flecainida",
  },
  {
    system: "http://snomed.info/sct",
    code: "8908003",
    display: "Anticuerpo de grupo sanguíneo I^T^",
  },
  { system: "http://snomed.info/sct", code: "8914005", display: "endolinfa" },
  { system: "http://snomed.info/sct", code: "8919000", display: "biotina" },
  { system: "http://snomed.info/sct", code: "8926000", display: "Azur B" },
  {
    system: "http://snomed.info/sct",
    code: "8945009",
    display: "Fosfopantotenato-cisteína ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8953001",
    display: "2,3-dihidroxiindol 2,3-dioxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8963009",
    display: "N-acetilmuramoil-L-alanina amidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8969008",
    display: "Secreciones bulbouretrales",
  },
  {
    system: "http://snomed.info/sct",
    code: "8977007",
    display: "Anticuerpo de grupo sanguíneo Tarplee",
  },
  {
    system: "http://snomed.info/sct",
    code: "8982000",
    display: "Oleato hidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8987006",
    display: "Agente específico de la fase del ciclo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8991001",
    display: "ribuloquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9010006",
    display: "azul de metilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "9013008",
    display: "Defosfo-CoA quinasa",
  },
  { system: "http://snomed.info/sct", code: "9021002", display: "carbarilo" },
  {
    system: "http://snomed.info/sct",
    code: "9024005",
    display: "G6PD - Glucosa-6-fosfato deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9045003",
    display: "radioisótopo de radón",
  },
  {
    system: "http://snomed.info/sct",
    code: "9052001",
    display: "aceite de pimienta de Jamaica",
  },
  {
    system: "http://snomed.info/sct",
    code: "9054000",
    display: "Antígeno leucocitario humano B15",
  },
  {
    system: "http://snomed.info/sct",
    code: "9103003",
    display: "Retinol graso-aciltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9110009",
    display: "compuesto mercúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "9125009",
    display: "sempervirina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9159008",
    display: "Triacetato-lactonasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9172009",
    display: "Anticuerpo del grupo sanguíneo Alda",
  },
  {
    system: "http://snomed.info/sct",
    code: "9174005",
    display: "Poitiers de fibrinógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "9183000",
    display: "beta-N-acetilgalactosaminidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9189001",
    display:
      "CMP-N-acetilneuraminato-lactosilceramida alfa-2,3-sialiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9195000",
    display: "Alotipo INV del gen de la inmunoglobulina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9197008",
    display: "Apiosa reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9205004",
    display: "Tarrant de hemoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9220005",
    display: "aceite de fenol vegetal",
  },
  {
    system: "http://snomed.info/sct",
    code: "9223007",
    display: "Deshidrogenasa de borneol",
  },
  {
    system: "http://snomed.info/sct",
    code: "9234005",
    display: "clorobutanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "9246009",
    display: "^118^Telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "9253000",
    display: "antígeno HLA-DRw16",
  },
  {
    system: "http://snomed.info/sct",
    code: "9270008",
    display: "receptor de catecolaminas",
  },
  {
    system: "http://snomed.info/sct",
    code: "9271007",
    display: "Pontoise de fibrinógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "169008",
    display: "Preparación del factor liberador hipotalámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "211009",
    display: "Preparación de noretandrolona",
  },
  { system: "http://snomed.info/sct", code: "302007", display: "espiramicina" },
  {
    system: "http://snomed.info/sct",
    code: "439007",
    display: "Radiofármacos terapéuticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "449005",
    display: "penicilina procaína",
  },
  { system: "http://snomed.info/sct", code: "544002", display: "melfalán" },
  {
    system: "http://snomed.info/sct",
    code: "669007",
    display: "vacuna contra el virus vaccinia",
  },
  {
    system: "http://snomed.info/sct",
    code: "716000",
    display: "Agentes hematológicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "796001",
    display: "producto de digoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "847003",
    display: "preparación de D-tiroxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "902003",
    display: "droga experimental",
  },
  { system: "http://snomed.info/sct", code: "922004", display: "pralidoxima" },
  {
    system: "http://snomed.info/sct",
    code: "1039008",
    display: "6MP - Mercaptopurina",
  },
  { system: "http://snomed.info/sct", code: "1148001", display: "ticarcilina" },
  {
    system: "http://snomed.info/sct",
    code: "1182007",
    display: "agente hipotensor",
  },
  {
    system: "http://snomed.info/sct",
    code: "1206000",
    display: "Bloqueador alfa 2 adrenérgico",
  },
  {
    system: "http://snomed.info/sct",
    code: "1222004",
    display: "metronidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "1389007",
    display: "beclometasona",
  },
  { system: "http://snomed.info/sct", code: "1434005", display: "calamina" },
  {
    system: "http://snomed.info/sct",
    code: "1528001",
    display: "Producto de ácido folínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "1552008",
    display: "Droga salurética",
  },
  { system: "http://snomed.info/sct", code: "1594006", display: "azatadina" },
  {
    system: "http://snomed.info/sct",
    code: "1613009",
    display: "maleato de dexbromfeniramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1756009",
    display: "Anestésico tópico antipruriginoso",
  },
  {
    system: "http://snomed.info/sct",
    code: "1758005",
    display: "preparación de motilina",
  },
  { system: "http://snomed.info/sct", code: "1842003", display: "Difemanilo" },
  {
    system: "http://snomed.info/sct",
    code: "1878008",
    display: "Producto de hexaclorofano",
  },
  { system: "http://snomed.info/sct", code: "1887004", display: "permetrina" },
  {
    system: "http://snomed.info/sct",
    code: "1982006",
    display: "Preparación oftálmica de bacitracina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2016004",
    display: "dextrometorfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "2037007",
    display: "Preparación antiinflamatoria ótica",
  },
  { system: "http://snomed.info/sct", code: "2183004", display: "tetrizolina" },
  { system: "http://snomed.info/sct", code: "2190009", display: "Benzhexol" },
  { system: "http://snomed.info/sct", code: "2497003", display: "Hexetidina" },
  { system: "http://snomed.info/sct", code: "2571007", display: "busulfán" },
  { system: "http://snomed.info/sct", code: "2596005", display: "lincomicina" },
  { system: "http://snomed.info/sct", code: "2679000", display: "Oxandrolona" },
  {
    system: "http://snomed.info/sct",
    code: "2944000",
    display: "agente depilatorio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2949005",
    display: "Agentes de diagnóstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3037004",
    display: "Preparación de flumetasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "3046005",
    display: "maleato de enalapril",
  },
  {
    system: "http://snomed.info/sct",
    code: "3127006",
    display: "5FU - Fluorouracilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "3221003",
    display: "Solución de timbre",
  },
  { system: "http://snomed.info/sct", code: "3334000", display: "cefotaxima" },
  {
    system: "http://snomed.info/sct",
    code: "3361000",
    display: "Agente anti-heparina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3526007",
    display: "Vacuna antirrábica humana",
  },
  {
    system: "http://snomed.info/sct",
    code: "3593009",
    display: "Preparación antiinfecciosa ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "3814009",
    display: "Producto de propiltiouracilo",
  },
  { system: "http://snomed.info/sct", code: "3822002", display: "suxametonio" },
  {
    system: "http://snomed.info/sct",
    code: "4126008",
    display: "Preparación de fluprednisolona",
  },
  { system: "http://snomed.info/sct", code: "4194004", display: "mazindol" },
  {
    system: "http://snomed.info/sct",
    code: "4219002",
    display: "penicilamina",
  },
  { system: "http://snomed.info/sct", code: "4220008", display: "tolazolina" },
  {
    system: "http://snomed.info/sct",
    code: "4382004",
    display: "Agente antihipertensivo de acción central",
  },
  {
    system: "http://snomed.info/sct",
    code: "4704002",
    display: "iotiouracilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4741001",
    display: "Preparación de folato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4753002",
    display: "Pasta dental de triamcinolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "4865009",
    display: "Preparación del factor liberador de prolactina",
  },
  { system: "http://snomed.info/sct", code: "4937008", display: "Cefaclor" },
  {
    system: "http://snomed.info/sct",
    code: "5067008",
    display: "Medicamentos antitiroideos",
  },
  {
    system: "http://snomed.info/sct",
    code: "5465006",
    display: "Clorhidrato de propitocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "5478006",
    display: "trifluperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "5487002",
    display: "agente terapéutico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5606003",
    display: "Preparado nasal de dexametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "5720001",
    display: "Antiveneno Latrodectus mactans",
  },
  {
    system: "http://snomed.info/sct",
    code: "5737008",
    display: "demeclociclina",
  },
  { system: "http://snomed.info/sct", code: "5776009", display: "Anestésico" },
  {
    system: "http://snomed.info/sct",
    code: "5786005",
    display: "clorotiazida",
  },
  { system: "http://snomed.info/sct", code: "5797005", display: "clotrimazol" },
  {
    system: "http://snomed.info/sct",
    code: "5924003",
    display: "dinitrato de isosorbida",
  },
  { system: "http://snomed.info/sct", code: "5975000", display: "niclosamida" },
  {
    system: "http://snomed.info/sct",
    code: "6028009",
    display: "Preparación de triamcinolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "6067003",
    display: "orciprenalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6071000",
    display: "Preparación de alquitrán de hulla",
  },
  { system: "http://snomed.info/sct", code: "6102009", display: "baclofeno" },
  {
    system: "http://snomed.info/sct",
    code: "6116004",
    display: "preparación de oximetolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "6122008",
    display: "Fármaco antiarrítmico de clase Ia",
  },
  { system: "http://snomed.info/sct", code: "6232005", display: "nafazolina" },
  {
    system: "http://snomed.info/sct",
    code: "6247001",
    display: "preparación de ácido fólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6259002",
    display: "Solución de peróxido de hidrógeno al 3%",
  },
  {
    system: "http://snomed.info/sct",
    code: "6369005",
    display: "Penicilina -clase de antibiótico-",
  },
  {
    system: "http://snomed.info/sct",
    code: "6425004",
    display: "Antihistamínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6517004",
    display: "Agente antipsicótico derivado de butirofenona",
  },
  { system: "http://snomed.info/sct", code: "6526001", display: "nalorfina" },
  {
    system: "http://snomed.info/sct",
    code: "6625006",
    display: "Sulfato de cinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "6652001",
    display: "Preparación de pantotenato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6716006",
    display: "agente abortivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "6960003",
    display: "Polimixina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "6985007",
    display: "preparación de opio",
  },
  { system: "http://snomed.info/sct", code: "7092007", display: "metoprolol" },
  {
    system: "http://snomed.info/sct",
    code: "7140000",
    display: "Medios de contraste radiográfico",
  },
  {
    system: "http://snomed.info/sct",
    code: "7168001",
    display: "Carbonato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7230005",
    display: "vacuna contra la brucela",
  },
  {
    system: "http://snomed.info/sct",
    code: "7235000",
    display: "Antihistamínico derivado de etilendiamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7292004",
    display: "Verde de indocianina",
  },
  { system: "http://snomed.info/sct", code: "7336002", display: "trazodona" },
  {
    system: "http://snomed.info/sct",
    code: "7561000",
    display: "Preparación de dexametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "7577004",
    display: "Ciprofloxacino",
  },
  {
    system: "http://snomed.info/sct",
    code: "7624002",
    display: "Producto de perborato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7836006",
    display: "expectorantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "7947003",
    display: "Ácido acetilsalicílico",
  },
  { system: "http://snomed.info/sct", code: "7959004", display: "tenipósido" },
  {
    system: "http://snomed.info/sct",
    code: "7982002",
    display: "clorhidrato de fenmetrazina",
  },
  { system: "http://snomed.info/sct", code: "8028001", display: "Butacaína" },
  { system: "http://snomed.info/sct", code: "8109005", display: "alimemazina" },
  {
    system: "http://snomed.info/sct",
    code: "8163008",
    display: "nitroprusiato",
  },
  {
    system: "http://snomed.info/sct",
    code: "8348002",
    display: "ciclopentolato",
  },
  { system: "http://snomed.info/sct", code: "8372007", display: "prometazina" },
  {
    system: "http://snomed.info/sct",
    code: "8416000",
    display: "dicloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8571001",
    display: "vasoconstrictor",
  },
  {
    system: "http://snomed.info/sct",
    code: "8658008",
    display: "Preparación de albúmina de suero humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "8661009",
    display: "Preparación de reemplazo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8692006",
    display: "metanfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8696009",
    display: "Antiespasmódico",
  },
  { system: "http://snomed.info/sct", code: "9190005", display: "tropicamida" },
  {
    system: "http://snomed.info/sct",
    code: "9268004",
    display: "butabarbitona",
  },
  {
    system: "http://snomed.info/sct",
    code: "9307009",
    display: "Preparación de globulina de suero animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "9500005",
    display: "IMAO - Fenelzina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9542007",
    display: "Inmunoglobulina antihepatitis B",
  },
  { system: "http://snomed.info/sct", code: "9690006", display: "niquetamida" },
  {
    system: "http://snomed.info/sct",
    code: "9745007",
    display: "producto sacarosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9778000",
    display: "Inmunoglobulina de citomegalovirus",
  },
  {
    system: "http://snomed.info/sct",
    code: "9944001",
    display: "clorfenamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "10099000",
    display: "ketoprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "10135005",
    display: "Alcaloide de cinchona",
  },
  {
    system: "http://snomed.info/sct",
    code: "10243007",
    display: "Ungüento de ácido benzoico y salicílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "10312003",
    display: "preparación de prednisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "10332002",
    display: "Vacuna - bacterina - toxoide",
  },
  {
    system: "http://snomed.info/sct",
    code: "10355004",
    display: "Preparado vitamínico inyectable",
  },
  {
    system: "http://snomed.info/sct",
    code: "10356003",
    display: "Ácido undecilénico y sal de undecilenato",
  },
  {
    system: "http://snomed.info/sct",
    code: "10368007",
    display: "polvo de avena coloidal",
  },
  {
    system: "http://snomed.info/sct",
    code: "10422008",
    display: "nitropentaeritrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "10504007",
    display: "doxiciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "10515002",
    display: "Preparación de lututrina",
  },
  { system: "http://snomed.info/sct", code: "10555000", display: "tocainida" },
  {
    system: "http://snomed.info/sct",
    code: "10632007",
    display: "Preparación multivitamínica",
  },
  {
    system: "http://snomed.info/sct",
    code: "10668002",
    display: "Antiinfeccioso para la piel",
  },
  {
    system: "http://snomed.info/sct",
    code: "10712001",
    display: "producto de glucagón",
  },
  {
    system: "http://snomed.info/sct",
    code: "10756001",
    display: "haloperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "10784006",
    display: "Agente antipsicótico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11185009",
    display: "Vacuna autógena - bacterina autógena",
  },
  {
    system: "http://snomed.info/sct",
    code: "11260008",
    display: "Preparado antiinfeccioso oftálmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11402001",
    display: "enzima medicinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "11430001",
    display: "Fármaco antidepresivo tetracíclico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11563006",
    display: "preparación de vitamina D",
  },
  {
    system: "http://snomed.info/sct",
    code: "11719000",
    display: "cetilpiridinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "11777007",
    display: "antibiótico oftálmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11783005",
    display: "Ablandador fecal",
  },
  {
    system: "http://snomed.info/sct",
    code: "11796006",
    display: "metisergida",
  },
  { system: "http://snomed.info/sct", code: "11841005", display: "doxepina" },
  { system: "http://snomed.info/sct", code: "11847009", display: "naproxeno" },
  {
    system: "http://snomed.info/sct",
    code: "11866009",
    display: "vacuna contra la peste",
  },
  {
    system: "http://snomed.info/sct",
    code: "11959009",
    display: "procainamida",
  },
  { system: "http://snomed.info/sct", code: "12096000", display: "nistatina" },
  {
    system: "http://snomed.info/sct",
    code: "12236006",
    display: "producto de pancreatina",
  },
  {
    system: "http://snomed.info/sct",
    code: "12289007",
    display: "producto de sangre entera",
  },
  {
    system: "http://snomed.info/sct",
    code: "12335007",
    display: "diatrizoato",
  },
  {
    system: "http://snomed.info/sct",
    code: "12369008",
    display: "producto de oxitocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "12425002",
    display: "Producto de glóbulos blancos humanos",
  },
  {
    system: "http://snomed.info/sct",
    code: "12436009",
    display: "Vinblastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "12495006",
    display: "Citrato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "12512008",
    display: "triamtereno",
  },
  { system: "http://snomed.info/sct", code: "12559001", display: "Emetina" },
  {
    system: "http://snomed.info/sct",
    code: "12657005",
    display: "Preparación de acetato de fludrocortisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "12839006",
    display: "producto de estradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "12968008",
    display: "productos vitamínicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "13132007",
    display: "producto de dextrano",
  },
  { system: "http://snomed.info/sct", code: "13154009", display: "clormetina" },
  {
    system: "http://snomed.info/sct",
    code: "13178004",
    display: "Vacuna Rickettsial",
  },
  { system: "http://snomed.info/sct", code: "13252002", display: "salsalato" },
  {
    system: "http://snomed.info/sct",
    code: "13414000",
    display: "cefadroxilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "13432000",
    display: "nortriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "13512003",
    display: "minociclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "13525006",
    display: "preparación de acetilcolina",
  },
  { system: "http://snomed.info/sct", code: "13565005", display: "bisacodilo" },
  {
    system: "http://snomed.info/sct",
    code: "13592004",
    display: "pirazinamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "13664004",
    display: "BAL - Anti-Lewisita británica",
  },
  {
    system: "http://snomed.info/sct",
    code: "13790009",
    display: "Preparación de hierro en forma oral",
  },
  { system: "http://snomed.info/sct", code: "13800009", display: "naftifina" },
  {
    system: "http://snomed.info/sct",
    code: "13813003",
    display: "Preparación de biotina",
  },
  {
    system: "http://snomed.info/sct",
    code: "13929005",
    display: "espironolactona",
  },
  { system: "http://snomed.info/sct", code: "13936006", display: "butorfanol" },
  {
    system: "http://snomed.info/sct",
    code: "13965000",
    display: "Ácido valproico",
  },
  {
    system: "http://snomed.info/sct",
    code: "14054003",
    display: "Preparaciones del complejo de vitamina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "14103001",
    display: "Antagonista de opiáceos",
  },
  {
    system: "http://snomed.info/sct",
    code: "14170004",
    display: "capreomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "14542005",
    display: "Vial de solución inyectable de cafeína y benzoato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "14601000",
    display: "Agente anticolinérgico",
  },
  {
    system: "http://snomed.info/sct",
    code: "14706000",
    display: "feneticilina",
  },
  { system: "http://snomed.info/sct", code: "14728000", display: "cloroquina" },
  {
    system: "http://snomed.info/sct",
    code: "14745005",
    display: "Vacuna contra la hepatitis A",
  },
  {
    system: "http://snomed.info/sct",
    code: "14814001",
    display: "trimetobenzamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "14816004",
    display: "Producto de cocaína",
  },
  { system: "http://snomed.info/sct", code: "15117003", display: "Coagulante" },
  { system: "http://snomed.info/sct", code: "15222008", display: "enalapril" },
  {
    system: "http://snomed.info/sct",
    code: "15375005",
    display: "Derivado de fenantreno",
  },
  { system: "http://snomed.info/sct", code: "15383004", display: "levodopa" },
  {
    system: "http://snomed.info/sct",
    code: "15389000",
    display: "Anticonvulsivo derivado de la hidantoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "15432003",
    display: "Etinilestradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "15772006",
    display: "Producto bloqueador beta 1",
  },
  {
    system: "http://snomed.info/sct",
    code: "15857002",
    display: "Antihistamínico derivado de etanolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16031005",
    display: "Dexclorfeniramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16037009",
    display: "Producto de terfenadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16047007",
    display: "Benzodiazepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16131008",
    display: "antisuero animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "16403005",
    display: "Agente antiinflamatorio no esteroideo",
  },
  {
    system: "http://snomed.info/sct",
    code: "16602005",
    display: "preparación de hidrocortisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "16787005",
    display: "Streptococcus equisimilis - suis antisuero",
  },
  { system: "http://snomed.info/sct", code: "16791000", display: "cefradina" },
  {
    system: "http://snomed.info/sct",
    code: "16832004",
    display: "Estrógenos conjugados",
  },
  { system: "http://snomed.info/sct", code: "16858004", display: "Urea" },
  {
    system: "http://snomed.info/sct",
    code: "16867004",
    display: "Sulfatiazol",
  },
  { system: "http://snomed.info/sct", code: "16970001", display: "Proguanil" },
  {
    system: "http://snomed.info/sct",
    code: "16977003",
    display: "carbonato de litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "17016006",
    display: "gammaglobulina animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "17055007",
    display: "acidulante sistémico",
  },
  { system: "http://snomed.info/sct", code: "17308007", display: "dapsona" },
  {
    system: "http://snomed.info/sct",
    code: "17386008",
    display: "Agente antiinfeccioso",
  },
  {
    system: "http://snomed.info/sct",
    code: "17502009",
    display: "trietioduro de galamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "17554004",
    display: "Preparación de parametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "17558001",
    display: "Aceite de maíz",
  },
  {
    system: "http://snomed.info/sct",
    code: "17600005",
    display: "Radiofármacos de diagnóstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "17805003",
    display: "citrato de litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "17859000",
    display: "Antiveneno polivalente para crotalidae",
  },
  {
    system: "http://snomed.info/sct",
    code: "17893001",
    display: "Relajante del músculo esquelético",
  },
  { system: "http://snomed.info/sct", code: "18002004", display: "auranofina" },
  {
    system: "http://snomed.info/sct",
    code: "18125000",
    display: "fluocinonida",
  },
  {
    system: "http://snomed.info/sct",
    code: "18335001",
    display: "Ácido aureólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "18340009",
    display: "oxicloroseno",
  },
  { system: "http://snomed.info/sct", code: "18381001", display: "Prindolol" },
  {
    system: "http://snomed.info/sct",
    code: "18511007",
    display: "Droga generica",
  },
  {
    system: "http://snomed.info/sct",
    code: "18548003",
    display: "Metilfenidato",
  },
  {
    system: "http://snomed.info/sct",
    code: "18679008",
    display: "Resina eliminadora de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "18811003",
    display: "Preparación de L-asparaginasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "18914005",
    display: "hidroflumetiazida",
  },
  { system: "http://snomed.info/sct", code: "18952006", display: "econazol" },
  { system: "http://snomed.info/sct", code: "19194001", display: "ddl" },
  { system: "http://snomed.info/sct", code: "19225000", display: "Lorazepam" },
  { system: "http://snomed.info/sct", code: "19232009", display: "prilocaína" },
  {
    system: "http://snomed.info/sct",
    code: "19261005",
    display: "Sulfinpirazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "19315007",
    display: "Preparación de clorhidrato de piridoxina",
  },
  { system: "http://snomed.info/sct", code: "19403009", display: "flurazepam" },
  {
    system: "http://snomed.info/sct",
    code: "19405002",
    display: "netilmicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "19581007",
    display: "Agente parasimpaticomimético",
  },
  {
    system: "http://snomed.info/sct",
    code: "19583005",
    display: "diclofenamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "19630009",
    display: "Sulfadiazina de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "19768003",
    display: "Drogas alquilantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "19841008",
    display: "ceftriaxona",
  },
  {
    system: "http://snomed.info/sct",
    code: "20091003",
    display: "Preparación del factor liberador de somatotropina",
  },
  { system: "http://snomed.info/sct", code: "20201001", display: "nafoxidina" },
  {
    system: "http://snomed.info/sct",
    code: "20237006",
    display: "Preparación de dihidrotaquisterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "20249007",
    display: "Preparación de progestina",
  },
  {
    system: "http://snomed.info/sct",
    code: "20303001",
    display: "sulfato de vinblastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "20320002",
    display: "hidrocodona",
  },
  {
    system: "http://snomed.info/sct",
    code: "20577002",
    display: "HCG - Producto de gonadotropina coriónica humana",
  },
  { system: "http://snomed.info/sct", code: "20865003", display: "diflunisal" },
  {
    system: "http://snomed.info/sct",
    code: "20969008",
    display: "Antiveneno de serpiente polivalente",
  },
  {
    system: "http://snomed.info/sct",
    code: "21069002",
    display: "agente lipotrópico",
  },
  { system: "http://snomed.info/sct", code: "21159006", display: "Pargyline" },
  {
    system: "http://snomed.info/sct",
    code: "21451004",
    display: "Cloruro de indio-113m",
  },
  {
    system: "http://snomed.info/sct",
    code: "21691008",
    display: "trisilicato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "21701005",
    display: "ácido cromoglicico",
  },
  {
    system: "http://snomed.info/sct",
    code: "21767006",
    display: "complejo de hierro dextrano",
  },
  {
    system: "http://snomed.info/sct",
    code: "21788002",
    display: "Clorhidrato de fenazopiridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "21986005",
    display: "Antisuero de Erysipelothrix rhusiopathiae",
  },
  {
    system: "http://snomed.info/sct",
    code: "22091006",
    display: "Preparación de hormonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "22168005",
    display: "glicopirronio",
  },
  { system: "http://snomed.info/sct", code: "22198003", display: "metolazona" },
  {
    system: "http://snomed.info/sct",
    code: "22274004",
    display: "Preparación de metandriol",
  },
  {
    system: "http://snomed.info/sct",
    code: "22474002",
    display: "Preparación de aldosterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "22587006",
    display: "Relajante muscular despolarizante",
  },
  {
    system: "http://snomed.info/sct",
    code: "22657006",
    display: "producto de calcitonina",
  },
  {
    system: "http://snomed.info/sct",
    code: "22672005",
    display: "grupo de anfetaminas",
  },
  {
    system: "http://snomed.info/sct",
    code: "22696000",
    display: "hidralazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "22801004",
    display: "Solución de agua estéril",
  },
  {
    system: "http://snomed.info/sct",
    code: "22826008",
    display: "Desintoxicante de amoníaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "22969001",
    display: "Oxitetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "23079006",
    display: "vincristina",
  },
  { system: "http://snomed.info/sct", code: "23222006", display: "antisueros" },
  {
    system: "http://snomed.info/sct",
    code: "23343005",
    display: "producto de plaquetas humanas",
  },
  {
    system: "http://snomed.info/sct",
    code: "23532003",
    display: "fenmetrazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "23822003",
    display: "fracción de plasma humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "23827009",
    display: "Sulfacetamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "23838009",
    display: "Agente bloqueador alfa-adrenérgico no específico",
  },
  { system: "http://snomed.info/sct", code: "23888001", display: "cascara" },
  {
    system: "http://snomed.info/sct",
    code: "24036003",
    display: "Medicamento antianemia",
  },
  {
    system: "http://snomed.info/sct",
    code: "24450004",
    display: "etambutolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "24504000",
    display: "Metilcelulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "24866006",
    display: "Antisuero de Salmonella typhimurium",
  },
  {
    system: "http://snomed.info/sct",
    code: "24891006",
    display: "amidotrizoato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "25014009",
    display: "Tripelennamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "25057004",
    display: "Producto diurético mercurial",
  },
  {
    system: "http://snomed.info/sct",
    code: "25076002",
    display: "carisoprodol",
  },
  {
    system: "http://snomed.info/sct",
    code: "25085002",
    display: "Preparación de colecistoquinina",
  },
  { system: "http://snomed.info/sct", code: "25142008", display: "trilostano" },
  { system: "http://snomed.info/sct", code: "25246002", display: "alopurinol" },
  { system: "http://snomed.info/sct", code: "25398003", display: "Ichthammol" },
  {
    system: "http://snomed.info/sct",
    code: "25419009",
    display: "Sulfato de bario",
  },
  {
    system: "http://snomed.info/sct",
    code: "25465007",
    display: "Anticuerpo monoclonal de Escherichia coli",
  },
  { system: "http://snomed.info/sct", code: "25673006", display: "omeprazol" },
  {
    system: "http://snomed.info/sct",
    code: "25716001",
    display: "Toxoide tetánico, humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "25849001",
    display: "SNP - Nitroprusiato de sodio",
  },
  { system: "http://snomed.info/sct", code: "25860005", display: "Terconazol" },
  {
    system: "http://snomed.info/sct",
    code: "25912006",
    display: "Preparación de difosfato sódico de menadiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "25995007",
    display: "triprolidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "26122009",
    display: "dimetindeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "26124005",
    display: "producto de glipizida",
  },
  {
    system: "http://snomed.info/sct",
    code: "26244009",
    display: "Antimuscarínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "26303005",
    display: "Preparación de hexestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "26370007",
    display: "agente hemostático",
  },
  {
    system: "http://snomed.info/sct",
    code: "26456008",
    display: "Preparación de levotiroxina sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "26458009",
    display: "difenhidramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "26462003",
    display: "Ciproheptadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "26503009",
    display: "Deserpidina",
  },
  { system: "http://snomed.info/sct", code: "26523005", display: "dobutamina" },
  {
    system: "http://snomed.info/sct",
    code: "26548008",
    display: "Producto de hormona pancreática",
  },
  { system: "http://snomed.info/sct", code: "26574002", display: "droperidol" },
  { system: "http://snomed.info/sct", code: "26580005", display: "Digestivo" },
  {
    system: "http://snomed.info/sct",
    code: "26736008",
    display: "Gluconato ferroso",
  },
  { system: "http://snomed.info/sct", code: "26800000", display: "midazolam" },
  {
    system: "http://snomed.info/sct",
    code: "26842003",
    display: "Preparación de aceite de hígado de lota",
  },
  {
    system: "http://snomed.info/sct",
    code: "27035007",
    display: "Antagonista de metales pesados",
  },
  {
    system: "http://snomed.info/sct",
    code: "27085003",
    display: "Sulfonato de poliestireno de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "27196008",
    display: "bupivacaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "27242001",
    display: "Preparación de metilprednisolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "27479000",
    display: "AZT - Azidotimidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "27518004",
    display: "Hormona paratiroidea",
  },
  {
    system: "http://snomed.info/sct",
    code: "27548001",
    display: "LA - Fármaco anestésico local",
  },
  {
    system: "http://snomed.info/sct",
    code: "27566006",
    display: "conservante de vehículo de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "27638005",
    display: "T-PA - activador del plasminógeno de tipo tisular",
  },
  {
    system: "http://snomed.info/sct",
    code: "27658006",
    display: "amoxicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "27707001",
    display: "Preparación de acetato de medroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "27754002",
    display: "pirazinobutazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "27867009",
    display: "antineoplásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "28028002",
    display: "Preparación de hormonas sintéticas",
  },
  {
    system: "http://snomed.info/sct",
    code: "28149003",
    display: "pentostatina",
  },
  { system: "http://snomed.info/sct", code: "28235004", display: "doxapram" },
  {
    system: "http://snomed.info/sct",
    code: "28240007",
    display: "cosmético de ojos",
  },
  {
    system: "http://snomed.info/sct",
    code: "28410007",
    display: "alfa-carboxipenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "28415002",
    display: "metescopolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "28426008",
    display: "fluocinolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "28506006",
    display: "flucitosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "28748001",
    display: "Hidrato de cloral",
  },
  {
    system: "http://snomed.info/sct",
    code: "28841002",
    display: "anhidrohidroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "28906000",
    display: "Preparación de aceite de hígado percoide",
  },
  {
    system: "http://snomed.info/sct",
    code: "29051009",
    display: "Producto diurético de asa",
  },
  {
    system: "http://snomed.info/sct",
    code: "29058003",
    display: "Halcinonida",
  },
  {
    system: "http://snomed.info/sct",
    code: "29089004",
    display: "dibromomanitol",
  },
  { system: "http://snomed.info/sct", code: "29121001", display: "Mersalilo" },
  {
    system: "http://snomed.info/sct",
    code: "29129004",
    display: "oximetazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "29156002",
    display: "mecloretamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "29175007",
    display: "producto de rifampicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "29237004",
    display: "antiveneno para arácnidos",
  },
  { system: "http://snomed.info/sct", code: "29439004", display: "captopril" },
  {
    system: "http://snomed.info/sct",
    code: "29620001",
    display: "preparación de beta-tocoferol",
  },
  { system: "http://snomed.info/sct", code: "29840005", display: "amoxapina" },
  {
    system: "http://snomed.info/sct",
    code: "29877002",
    display: "IMAO - Isocarboxazida",
  },
  {
    system: "http://snomed.info/sct",
    code: "29883004",
    display: "Antiarrítmico clase IV",
  },
  {
    system: "http://snomed.info/sct",
    code: "29896003",
    display: "betametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "29987004",
    display: "Preparación de vitaminas A y D",
  },
  {
    system: "http://snomed.info/sct",
    code: "30010009",
    display: "Producto de cianocobalamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "30125007",
    display: "producto de sen",
  },
  {
    system: "http://snomed.info/sct",
    code: "30306003",
    display: "Preparación de vitamina B1",
  },
  { system: "http://snomed.info/sct", code: "30317002", display: "cisaprida" },
  {
    system: "http://snomed.info/sct",
    code: "30427009",
    display: "producto de eritromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "30466001",
    display: "cloramifeno",
  },
  { system: "http://snomed.info/sct", code: "30492008", display: "Diurético" },
  {
    system: "http://snomed.info/sct",
    code: "30666008",
    display: "Toxoide (humano)",
  },
  {
    system: "http://snomed.info/sct",
    code: "30729008",
    display: "preparación de hierro",
  },
  {
    system: "http://snomed.info/sct",
    code: "30761007",
    display: "Producto de manitol",
  },
  {
    system: "http://snomed.info/sct",
    code: "30964009",
    display: "Metiprilona",
  },
  {
    system: "http://snomed.info/sct",
    code: "30988006",
    display: "Preparación de dienestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "31025003",
    display: "Agente antipsicótico derivado de la dibenzoxazepina",
  },
  { system: "http://snomed.info/sct", code: "31087008", display: "ampicilina" },
  {
    system: "http://snomed.info/sct",
    code: "31181006",
    display: "Preparado de testosterona inyectable",
  },
  {
    system: "http://snomed.info/sct",
    code: "31231007",
    display: "H2O2 - Peróxido de hidrógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "31305008",
    display: "Streptococcus equisimilis antisuero",
  },
  { system: "http://snomed.info/sct", code: "31306009", display: "quinidina" },
  {
    system: "http://snomed.info/sct",
    code: "31352002",
    display: "Suero de calostro normal",
  },
  {
    system: "http://snomed.info/sct",
    code: "31587003",
    display: "Líquido de aceite de almendras",
  },
  {
    system: "http://snomed.info/sct",
    code: "31684002",
    display: "buprenorfina",
  },
  { system: "http://snomed.info/sct", code: "31690003", display: "Betanecol" },
  {
    system: "http://snomed.info/sct",
    code: "31692006",
    display: "pentamidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "31716004",
    display: "Producto de plasma congelado, humano",
  },
  { system: "http://snomed.info/sct", code: "31865003", display: "fluconazol" },
  { system: "http://snomed.info/sct", code: "31872002", display: "pramocaína" },
  {
    system: "http://snomed.info/sct",
    code: "31970009",
    display: "vasodilatador de nitrato",
  },
  {
    system: "http://snomed.info/sct",
    code: "32249005",
    display: "Medicamentos antivirales",
  },
  { system: "http://snomed.info/sct", code: "32313007", display: "enflurano" },
  {
    system: "http://snomed.info/sct",
    code: "32460003",
    display: "Preparación nasal de dipropionato de beclometasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "32462006",
    display:
      "Preparación de factor liberador de hormona estimulante de melanocitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "32473004",
    display: "antiveneno de araña",
  },
  { system: "http://snomed.info/sct", code: "32474005", display: "Probucol" },
  {
    system: "http://snomed.info/sct",
    code: "32583002",
    display: "Medicamento antiseborreico",
  },
  { system: "http://snomed.info/sct", code: "32647002", display: "Ergotamina" },
  {
    system: "http://snomed.info/sct",
    code: "32653002",
    display: "Preparación de ergosterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "32792001",
    display: "trimetoprima",
  },
  {
    system: "http://snomed.info/sct",
    code: "32823007",
    display: "maprotilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "32841004",
    display: "NaCl - Solución de cloruro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "32955006",
    display: "domperidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "32960005",
    display: "tiosalicilato",
  },
  { system: "http://snomed.info/sct", code: "33124007", display: "Butamidum" },
  {
    system: "http://snomed.info/sct",
    code: "33133009",
    display: "Preparado antiinflamatorio oftálmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "33219003",
    display: "Antidepresivo tricíclico",
  },
  {
    system: "http://snomed.info/sct",
    code: "33231001",
    display: "pentobarbital",
  },
  { system: "http://snomed.info/sct", code: "33234009", display: "Var/Vac" },
  {
    system: "http://snomed.info/sct",
    code: "33236006",
    display: "Preparación de acetato de cortisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "33252009",
    display: "fármaco bloqueador de los receptores beta-adrenérgicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "33378002",
    display: "desipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "33484000",
    display: "Medicamento patentado",
  },
  {
    system: "http://snomed.info/sct",
    code: "33588000",
    display: "tioridazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "33589008",
    display: "glucósido cardíaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "33664007",
    display: "Acetazolamida",
  },
  { system: "http://snomed.info/sct", code: "33675006", display: "carbacol" },
  { system: "http://snomed.info/sct", code: "33682005", display: "midriático" },
  {
    system: "http://snomed.info/sct",
    code: "33815001",
    display: "Streptococcus suis antisuero",
  },
  {
    system: "http://snomed.info/sct",
    code: "34012005",
    display: "Producto de sulfonilurea",
  },
  {
    system: "http://snomed.info/sct",
    code: "34217006",
    display: "Oxiquinolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34364009",
    display: "Ácido mefenámico",
  },
  { system: "http://snomed.info/sct", code: "34393009", display: "tolazamida" },
  { system: "http://snomed.info/sct", code: "34462007", display: "natamicina" },
  {
    system: "http://snomed.info/sct",
    code: "34598001",
    display:
      "Agente inmunobiológico disponible en los Centros para el Control y la Prevención de Enfermedades",
  },
  {
    system: "http://snomed.info/sct",
    code: "34599009",
    display: "Preparación de tiroglobulina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34689006",
    display: "vacuna contra la hepatitis B",
  },
  {
    system: "http://snomed.info/sct",
    code: "34693000",
    display: "Zalcitabina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34696008",
    display: "Preparación de ascorbato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "34731007",
    display: "carbenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34816007",
    display: "aceite de hígado de bacalao",
  },
  {
    system: "http://snomed.info/sct",
    code: "34833000",
    display: "Preparación oftálmica de hidrocortisona",
  },
  { system: "http://snomed.info/sct", code: "34929006", display: "bencetonio" },
  {
    system: "http://snomed.info/sct",
    code: "35035001",
    display: "orfenadrina",
  },
  { system: "http://snomed.info/sct", code: "35063004", display: "ribavirina" },
  {
    system: "http://snomed.info/sct",
    code: "35097006",
    display: "antígeno de pulgas",
  },
  {
    system: "http://snomed.info/sct",
    code: "35282000",
    display: "gemfibrozilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "35300007",
    display: "daunorrubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "35324004",
    display: "Producto de paraldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "35392005",
    display: "Resina eliminadora de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "35476001",
    display: "Producto de nitrato de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "35531004",
    display: "Preparación de hidrocortamato",
  },
  {
    system: "http://snomed.info/sct",
    code: "35736007",
    display: "Vacunas contra el cólera",
  },
  {
    system: "http://snomed.info/sct",
    code: "35768004",
    display: "Oxibutinina",
  },
  {
    system: "http://snomed.info/sct",
    code: "35792007",
    display: "solución de diálisis peritoneal",
  },
  { system: "http://snomed.info/sct", code: "35967000", display: "medazepam" },
  {
    system: "http://snomed.info/sct",
    code: "35983000",
    display: "Producto de sangre celular, humano",
  },
  { system: "http://snomed.info/sct", code: "36068003", display: "pirantel" },
  { system: "http://snomed.info/sct", code: "36113004", display: "imipramina" },
  {
    system: "http://snomed.info/sct",
    code: "36168000",
    display: "Preparaciones nasales antiinfecciosas",
  },
  {
    system: "http://snomed.info/sct",
    code: "36218003",
    display: "tietilperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36236003",
    display: "antidepresivo",
  },
  { system: "http://snomed.info/sct", code: "36391008", display: "primaquina" },
  { system: "http://snomed.info/sct", code: "36537006", display: "ambenonio" },
  {
    system: "http://snomed.info/sct",
    code: "36594001",
    display: "tiabendazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "36621009",
    display: "medroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "36642006",
    display: "propantelina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36763003",
    display: "Inmunoglobulina IM",
  },
  {
    system: "http://snomed.info/sct",
    code: "36795002",
    display: "Sulfato de estrona de piperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36893000",
    display: "ceftazidima",
  },
  {
    system: "http://snomed.info/sct",
    code: "36909007",
    display: "Fenindamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36940000",
    display: "Agente antipsicótico derivado del tioxanteno",
  },
  {
    system: "http://snomed.info/sct",
    code: "36944009",
    display: "Preparación de vitamina B6",
  },
  {
    system: "http://snomed.info/sct",
    code: "37084008",
    display: "4-quinolonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "37146000",
    display: "vacuna contra el tifus",
  },
  { system: "http://snomed.info/sct", code: "37306000", display: "Vidarabina" },
  {
    system: "http://snomed.info/sct",
    code: "37400007",
    display: "Sulfato de magnesio",
  },
  { system: "http://snomed.info/sct", code: "37628007", display: "cefalotina" },
  {
    system: "http://snomed.info/sct",
    code: "37643009",
    display: "bacterina autógena",
  },
  {
    system: "http://snomed.info/sct",
    code: "37773009",
    display: "Agente antipsicótico derivado de la difenilbutilpiperidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "37803001",
    display: "d-TC - Tubocurarina",
  },
  {
    system: "http://snomed.info/sct",
    code: "38076006",
    display: "tiroxina de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "38131009",
    display: "Droga sintética",
  },
  { system: "http://snomed.info/sct", code: "38166006", display: "tolnaftato" },
  {
    system: "http://snomed.info/sct",
    code: "38181000",
    display: "Antibiótico antineoplásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "38231004",
    display: "complejo de polisacárido de hierro",
  },
  {
    system: "http://snomed.info/sct",
    code: "38268001",
    display: "Ácido propiónico-ibuprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "38314008",
    display: "isotretinoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "38413003",
    display: "Producto en forma de dosificación ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "38578004",
    display: "Preparación de megestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "38828006",
    display: "Tiosulfato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "38900001",
    display: "agente proliferante",
  },
  {
    system: "http://snomed.info/sct",
    code: "39064002",
    display: "Acetohexamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "39124003",
    display: "metohexital",
  },
  { system: "http://snomed.info/sct", code: "39128000", display: "famotidina" },
  {
    system: "http://snomed.info/sct",
    code: "39142008",
    display: "Fendimetrazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "39252001",
    display: "Agente de balance de agua",
  },
  {
    system: "http://snomed.info/sct",
    code: "39359008",
    display: "Penicilina V",
  },
  {
    system: "http://snomed.info/sct",
    code: "39432004",
    display: "Desodorante",
  },
  {
    system: "http://snomed.info/sct",
    code: "39487003",
    display: "producto de insulina regular",
  },
  {
    system: "http://snomed.info/sct",
    code: "39516004",
    display: "producto de disulfiram",
  },
  {
    system: "http://snomed.info/sct",
    code: "39598004",
    display: "derivado de la marihuana",
  },
  {
    system: "http://snomed.info/sct",
    code: "39608003",
    display: "pentazocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "39707000",
    display: "Ácido aminobenzoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "39741008",
    display:
      "Grupos de fármacos que afectan principalmente al sistema gastrointestinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "39860005",
    display: "producto de fructosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "39939003",
    display: "Feniltoloxamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40162007",
    display: "Laxantes formadores de volumen",
  },
  {
    system: "http://snomed.info/sct",
    code: "40232005",
    display: "ketoconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "40339003",
    display: "Lactato de calcio",
  },
  { system: "http://snomed.info/sct", code: "40429005", display: "etomidato" },
  { system: "http://snomed.info/sct", code: "40430000", display: "bromelinas" },
  {
    system: "http://snomed.info/sct",
    code: "40556005",
    display: "producto de fenitoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "40562000",
    display: "Preparación de metilergonovina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40589005",
    display: "amitriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40606008",
    display: "Medicamento huérfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "40648001",
    display: "Producto de fentanilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "40652001",
    display: "cromoglicato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "40820003",
    display: "Producto de carbamazepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40877002",
    display: "Estreptomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40901001",
    display: "mesilato de deferoxamina",
  },
  { system: "http://snomed.info/sct", code: "40905005", display: "Beractante" },
  {
    system: "http://snomed.info/sct",
    code: "40974005",
    display: "Fenilpiperona",
  },
  {
    system: "http://snomed.info/sct",
    code: "40999006",
    display: "CCNU - Lomustina",
  },
  { system: "http://snomed.info/sct", code: "41001009", display: "Dinoprost" },
  {
    system: "http://snomed.info/sct",
    code: "41015006",
    display: "Metaraminol",
  },
  {
    system: "http://snomed.info/sct",
    code: "41147003",
    display: "perfenazina",
  },
  { system: "http://snomed.info/sct", code: "41193000", display: "aciclovir" },
  {
    system: "http://snomed.info/sct",
    code: "41324009",
    display: "propiomazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "41365009",
    display: "flufenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "41367001",
    display: "preparación de enterogastron",
  },
  {
    system: "http://snomed.info/sct",
    code: "41399007",
    display: "Oxazolidinediona",
  },
  { system: "http://snomed.info/sct", code: "41470001", display: "corbadrina" },
  {
    system: "http://snomed.info/sct",
    code: "41493007",
    display: "dicicloverina",
  },
  {
    system: "http://snomed.info/sct",
    code: "41549009",
    display: "Inhibidor de la enzima convertidora de angiotensina",
  },
  { system: "http://snomed.info/sct", code: "41985001", display: "bitolterol" },
  {
    system: "http://snomed.info/sct",
    code: "42082003",
    display: "vancomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "42098005",
    display: "Preparación oftálmica de dexametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "42271003",
    display: "Producto de ácido glutámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "42348003",
    display: "Metiltestosterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "42374009",
    display: "bromhidrato de dextrometorfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "42444000",
    display: "secobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "42514000",
    display: "producto de procaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "42638008",
    display: "Cloruro de metilrosanilio",
  },
  {
    system: "http://snomed.info/sct",
    code: "42714002",
    display: "Antisuero de Escherichia coli",
  },
  { system: "http://snomed.info/sct", code: "42720001", display: "miconazol" },
  {
    system: "http://snomed.info/sct",
    code: "42863006",
    display: "Preparación de acetato de desmopresina",
  },
  { system: "http://snomed.info/sct", code: "43343000", display: "Magaldrato" },
  {
    system: "http://snomed.info/sct",
    code: "43499003",
    display: "Interferón inyectable",
  },
  {
    system: "http://snomed.info/sct",
    code: "43533002",
    display: "Preparación oftálmica de cloranfenicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "43594006",
    display: "Preparaciones para blanquear la piel",
  },
  {
    system: "http://snomed.info/sct",
    code: "43684009",
    display: "producto de misoprostol",
  },
  {
    system: "http://snomed.info/sct",
    code: "43747001",
    display: "excipiente de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "43753001",
    display: "didrogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "43879000",
    display: "flunisolida",
  },
  {
    system: "http://snomed.info/sct",
    code: "43927002",
    display: "Agente analéptico",
  },
  { system: "http://snomed.info/sct", code: "44175000", display: "Diperodón" },
  {
    system: "http://snomed.info/sct",
    code: "44418001",
    display: "Preparación de aceite de hígado de percomorfo",
  },
  { system: "http://snomed.info/sct", code: "44658005", display: "promazina" },
  {
    system: "http://snomed.info/sct",
    code: "44731005",
    display: "Hidrocortisona de forma ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "44790008",
    display: "etosuximida",
  },
  {
    system: "http://snomed.info/sct",
    code: "44798001",
    display: "producto de dinoprostona",
  },
  {
    system: "http://snomed.info/sct",
    code: "44938006",
    display: "cefoperazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "44990002",
    display: "prociclidina",
  },
  { system: "http://snomed.info/sct", code: "45218006", display: "meclastina" },
  {
    system: "http://snomed.info/sct",
    code: "45311002",
    display: "terbutalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "45313004",
    display: "Propilpiperazina derivado de fenotiazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "45355008",
    display: "Vacuna contra la fiebre maculosa de las Montañas Rocosas",
  },
  {
    system: "http://snomed.info/sct",
    code: "45518007",
    display: "Producto diurético tiazídico",
  },
  { system: "http://snomed.info/sct", code: "45680002", display: "tolmetín" },
  {
    system: "http://snomed.info/sct",
    code: "45844004",
    display: "Sulfasalazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "45888006",
    display: "preparación de gamma-tocoferol",
  },
  {
    system: "http://snomed.info/sct",
    code: "45923000",
    display: "E331 - Citrato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "46009007",
    display: "clorambucilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "46063005",
    display: "Agente psicoterapéutico",
  },
  {
    system: "http://snomed.info/sct",
    code: "46123006",
    display: "Producto de ácido ascórbico",
  },
  {
    system: "http://snomed.info/sct",
    code: "46233009",
    display: "GRIPE - Vacuna contra la influenza",
  },
  {
    system: "http://snomed.info/sct",
    code: "46436003",
    display: "haloprogina",
  },
  { system: "http://snomed.info/sct", code: "46479001", display: "encainida" },
  {
    system: "http://snomed.info/sct",
    code: "46532003",
    display: "Verde brillante",
  },
  { system: "http://snomed.info/sct", code: "46547007", display: "Labetalol" },
  { system: "http://snomed.info/sct", code: "46576005", display: "flecainida" },
  {
    system: "http://snomed.info/sct",
    code: "46709004",
    display: "Metilfenobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "46741005",
    display: "SA - Ácido salicílico",
  },
  { system: "http://snomed.info/sct", code: "46913003", display: "edrofonio" },
  { system: "http://snomed.info/sct", code: "47065008", display: "Quinina" },
  {
    system: "http://snomed.info/sct",
    code: "47120002",
    display: "hexamidinum",
  },
  {
    system: "http://snomed.info/sct",
    code: "47124006",
    display: "Aminoglutetimida",
  },
  { system: "http://snomed.info/sct", code: "47140009", display: "medrisona" },
  {
    system: "http://snomed.info/sct",
    code: "47331002",
    display: "CPZ - Clorpromazina",
  },
  { system: "http://snomed.info/sct", code: "47527007", display: "fenindiona" },
  {
    system: "http://snomed.info/sct",
    code: "47602007",
    display: "Ácido nalidíxico",
  },
  {
    system: "http://snomed.info/sct",
    code: "47755009",
    display: "Diurético ahorrador de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "47772002",
    display: "clorhidrato de fenfluramina",
  },
  { system: "http://snomed.info/sct", code: "47898004", display: "verapamilo" },
  {
    system: "http://snomed.info/sct",
    code: "48028008",
    display:
      "Vacuna contra Haemophilus influenzae tipo b (Hib)/difteria/tétanos/tos ferina",
  },
  { system: "http://snomed.info/sct", code: "48174005", display: "ranitidina" },
  {
    system: "http://snomed.info/sct",
    code: "48256008",
    display: "Benzoato de bencilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "48279009",
    display: "Producto emoliente",
  },
  { system: "http://snomed.info/sct", code: "48351000", display: "butadiona" },
  {
    system: "http://snomed.info/sct",
    code: "48546005",
    display: "Producto de diazepam",
  },
  { system: "http://snomed.info/sct", code: "48603004", display: "warfarina" },
  { system: "http://snomed.info/sct", code: "48614001", display: "clobetasol" },
  {
    system: "http://snomed.info/sct",
    code: "48647005",
    display: "pancrelipasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "48698004",
    display: "Bloqueador de canales de calcio",
  },
  { system: "http://snomed.info/sct", code: "48836000", display: "amikacina" },
  {
    system: "http://snomed.info/sct",
    code: "48875009",
    display: "Producto de dihidroergotamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "48899009",
    display: "hiosciamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "49019002",
    display: "Preparación oftálmica de prednisolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "49157004",
    display: "Producto uricosúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "49192007",
    display: "agente antiflatulento",
  },
  {
    system: "http://snomed.info/sct",
    code: "49267000",
    display: "Hidroxifenilbutazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "49299006",
    display: "protriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "49485009",
    display: "norfloxacina",
  },
  { system: "http://snomed.info/sct", code: "49577002", display: "minoxidil" },
  {
    system: "http://snomed.info/sct",
    code: "49590009",
    display: "Antiarrítmico clase I",
  },
  {
    system: "http://snomed.info/sct",
    code: "49600008",
    display: "Plasma animal normal",
  },
  {
    system: "http://snomed.info/sct",
    code: "49617001",
    display: "enoxolona disódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "49663007",
    display: "Preparaciones de protección solar",
  },
  {
    system: "http://snomed.info/sct",
    code: "49669006",
    display:
      "Escherichia coli - pasteurella multocida - antisuero de salmonella typhimurium",
  },
  { system: "http://snomed.info/sct", code: "49688004", display: "Hexociclio" },
  {
    system: "http://snomed.info/sct",
    code: "49694007",
    display: "mucolíticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "49705006",
    display: "idoxuridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "49802003",
    display: "Inmunoglobulina anti-D (Rh)",
  },
  {
    system: "http://snomed.info/sct",
    code: "49860008",
    display: "producto de oro",
  },
  { system: "http://snomed.info/sct", code: "49953001", display: "feniramina" },
  {
    system: "http://snomed.info/sct",
    code: "49992008",
    display: "Fosfato de sodio de dexametasona",
  },
  { system: "http://snomed.info/sct", code: "50094009", display: "Hetalmidón" },
  {
    system: "http://snomed.info/sct",
    code: "50137001",
    display: "solución de glicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "50182002",
    display: "líquido de hemodiálisis",
  },
  {
    system: "http://snomed.info/sct",
    code: "50244000",
    display: "anestésico intravenoso",
  },
  {
    system: "http://snomed.info/sct",
    code: "50256004",
    display: "Agente antitricomonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "50318003",
    display: "hormona lútea",
  },
  { system: "http://snomed.info/sct", code: "50335004", display: "Levorfanol" },
  {
    system: "http://snomed.info/sct",
    code: "50520001",
    display: "Neomicina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "50841004",
    display: "Cloranfenicol forma ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "50868004",
    display: "dexanfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51013009",
    display: "Sulfadimetoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51073002",
    display: "Producto de fenobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "51103004",
    display: "solución salina hipertónica",
  },
  {
    system: "http://snomed.info/sct",
    code: "51126006",
    display: "Preparación de benzestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "51132001",
    display: "Producto de hialuronidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "51326002",
    display: "BCNU - Carmustina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51334008",
    display: "cicloserina",
  },
  { system: "http://snomed.info/sct", code: "51361008", display: "amantadina" },
  {
    system: "http://snomed.info/sct",
    code: "51425004",
    display: "antiveneno de escorpión",
  },
  {
    system: "http://snomed.info/sct",
    code: "51555009",
    display: "Preparación de hígado desecado",
  },
  { system: "http://snomed.info/sct", code: "51752005", display: "Chologon" },
  { system: "http://snomed.info/sct", code: "51758009", display: "Amidina" },
  {
    system: "http://snomed.info/sct",
    code: "51779009",
    display: "Cefalosporina -clase de antibiótico-",
  },
  {
    system: "http://snomed.info/sct",
    code: "51908007",
    display: "prenilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51992002",
    display: "Preparación de gastrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "52017007",
    display: "Antiemético",
  },
  {
    system: "http://snomed.info/sct",
    code: "52108005",
    display: "Fumarato ferroso",
  },
  { system: "http://snomed.info/sct", code: "52215008", display: "desonida" },
  {
    system: "http://snomed.info/sct",
    code: "52388000",
    display: "prednisolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "52412009",
    display: "Preparación de maleato de metilergonovina",
  },
  {
    system: "http://snomed.info/sct",
    code: "52423008",
    display: "preparación de alquitrán",
  },
  {
    system: "http://snomed.info/sct",
    code: "52451004",
    display: "Agente antipsicótico derivado de la dihidroindolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "52489009",
    display: "Preparación de tanato de vasopresina",
  },
  {
    system: "http://snomed.info/sct",
    code: "52628005",
    display: "Vacuna contra la fiebre tifoidea y la paratifoidea",
  },
  {
    system: "http://snomed.info/sct",
    code: "52761007",
    display: "Parasimpaticomimético anticolinesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "52883001",
    display: "para-hidroxianfetamina",
  },
  { system: "http://snomed.info/sct", code: "52896000", display: "Chinoforma" },
  { system: "http://snomed.info/sct", code: "53009005", display: "Analgésico" },
  { system: "http://snomed.info/sct", code: "53480001", display: "fentermina" },
  { system: "http://snomed.info/sct", code: "53584007", display: "metacolina" },
  { system: "http://snomed.info/sct", code: "53640004", display: "fluoxetina" },
  { system: "http://snomed.info/sct", code: "53641000", display: "flavoxato" },
  {
    system: "http://snomed.info/sct",
    code: "53691001",
    display: "Gluconato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "53793005",
    display: "anticuerpo de Escherichia coli",
  },
  { system: "http://snomed.info/sct", code: "53800008", display: "ditranol" },
  { system: "http://snomed.info/sct", code: "53848009", display: "metirapona" },
  {
    system: "http://snomed.info/sct",
    code: "53855006",
    display: "bromuro de neostigmina",
  },
  { system: "http://snomed.info/sct", code: "54142000", display: "domifeno" },
  {
    system: "http://snomed.info/sct",
    code: "54344006",
    display: "flurbiprofeno",
  },
  { system: "http://snomed.info/sct", code: "54391004", display: "Levamisol" },
  { system: "http://snomed.info/sct", code: "54406003", display: "metoxamina" },
  {
    system: "http://snomed.info/sct",
    code: "54541002",
    display: "Preparación de ergometrina",
  },
  { system: "http://snomed.info/sct", code: "54544005", display: "petidina" },
  {
    system: "http://snomed.info/sct",
    code: "54577009",
    display: "ceftizoxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "54659006",
    display: "Preparación de clorhidrato de tiamina",
  },
  { system: "http://snomed.info/sct", code: "54705000", display: "Temazepam" },
  {
    system: "http://snomed.info/sct",
    code: "54765002",
    display: "Fenilefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "54824008",
    display: "isometepteno",
  },
  {
    system: "http://snomed.info/sct",
    code: "54882005",
    display: "anfepramona",
  },
  { system: "http://snomed.info/sct", code: "54887004", display: "cefalexina" },
  { system: "http://snomed.info/sct", code: "54972005", display: "tretinoína" },
  {
    system: "http://snomed.info/sct",
    code: "54982006",
    display: "preparación de promethestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "55015008",
    display: "E325 - Lactato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "55217007",
    display: "Carbonato de calcio",
  },
  { system: "http://snomed.info/sct", code: "55432002", display: "Azlocilina" },
  { system: "http://snomed.info/sct", code: "55556000", display: "tetracaína" },
  {
    system: "http://snomed.info/sct",
    code: "55673009",
    display: "Iotalato de sodio I^125^",
  },
  {
    system: "http://snomed.info/sct",
    code: "55745002",
    display: "propranolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "55782006",
    display: "Anestésico de tipo amida",
  },
  {
    system: "http://snomed.info/sct",
    code: "55784007",
    display: "Preparación de hormonas naturales",
  },
  {
    system: "http://snomed.info/sct",
    code: "55830003",
    display: "menotrofina",
  },
  {
    system: "http://snomed.info/sct",
    code: "55867006",
    display: "aminofilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "55889005",
    display: "Praziquantel",
  },
  {
    system: "http://snomed.info/sct",
    code: "56011005",
    display: "Extracto de inmunoterapia contra insectos que pican",
  },
  {
    system: "http://snomed.info/sct",
    code: "56014002",
    display: "Hidroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "56032002",
    display: "androstanolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "56059005",
    display: "Producto de mebendazol",
  },
  { system: "http://snomed.info/sct", code: "56123002", display: "hexamina" },
  { system: "http://snomed.info/sct", code: "56230001", display: "bretilio" },
  {
    system: "http://snomed.info/sct",
    code: "56234005",
    display: "producto de la hormona del crecimiento",
  },
  {
    system: "http://snomed.info/sct",
    code: "56240003",
    display: "Preparación de acetato de parametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "56281006",
    display: "Éter anestésico",
  },
  {
    system: "http://snomed.info/sct",
    code: "56480005",
    display: "parabromdilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "56549003",
    display: "metoclopramida",
  },
  {
    system: "http://snomed.info/sct",
    code: "56602009",
    display: "Hidroxicarbamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "56615000",
    display: "Preparación de fosfato de poliestradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "56656002",
    display: "Antiácido a base de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "56844000",
    display: "Producto de vacuna contra la fiebre amarilla",
  },
  {
    system: "http://snomed.info/sct",
    code: "56928005",
    display: "producto de etopósido",
  },
  {
    system: "http://snomed.info/sct",
    code: "56934003",
    display: "PVP - Polivinilpirrolidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "57002000",
    display: "clorprotixeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "57066004",
    display: "producto de cisplatino",
  },
  {
    system: "http://snomed.info/sct",
    code: "57123008",
    display: "acidulante urinario",
  },
  {
    system: "http://snomed.info/sct",
    code: "57191001",
    display: "Producto de cloranfenicol",
  },
  { system: "http://snomed.info/sct", code: "57263002", display: "Oxiconazol" },
  {
    system: "http://snomed.info/sct",
    code: "57376006",
    display: "Carbonato monosódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "57538001",
    display: "clortetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "57616006",
    display: "STD - Tetradecilo sulfato de sodio",
  },
  { system: "http://snomed.info/sct", code: "57670008", display: "cefoxitina" },
  {
    system: "http://snomed.info/sct",
    code: "57752001",
    display: "producto de gentamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "57811004",
    display: "dihidrocodeína",
  },
  {
    system: "http://snomed.info/sct",
    code: "57819002",
    display: "Preparación del factor inhibidor de la somatotropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "57845006",
    display: "isoprenalina",
  },
  { system: "http://snomed.info/sct", code: "57853003", display: "clidinio" },
  {
    system: "http://snomed.info/sct",
    code: "57893000",
    display: "clortalidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "57952007",
    display: "Fármaco reductor de lípidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "58050004",
    display: "agente antiparkinsoniano",
  },
  {
    system: "http://snomed.info/sct",
    code: "58098008",
    display: "Toxoide tetánico adsorbido",
  },
  { system: "http://snomed.info/sct", code: "58360000", display: "Fenazocina" },
  { system: "http://snomed.info/sct", code: "58467001", display: "Papaverina" },
  {
    system: "http://snomed.info/sct",
    code: "58502006",
    display: "Antihistamínico derivado de la propilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "58760003",
    display: "Antimetabolitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "58805000",
    display: "Preparación de hormonas hipofisarias",
  },
  {
    system: "http://snomed.info/sct",
    code: "58883005",
    display: "clindamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "58892008",
    display: "F3T - trifluorotimidina",
  },
  { system: "http://snomed.info/sct", code: "58905004", display: "diazóxido" },
  {
    system: "http://snomed.info/sct",
    code: "58944007",
    display: "vasodilatador",
  },
  {
    system: "http://snomed.info/sct",
    code: "59057006",
    display: "Preparación de factor antihemofílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "59187003",
    display: "producto de dopamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "59240002",
    display: "MMC-Mitomicina-C",
  },
  {
    system: "http://snomed.info/sct",
    code: "59245007",
    display: "Preparación de factor hipofisiostático",
  },
  {
    system: "http://snomed.info/sct",
    code: "59255006",
    display: "Sulfonamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "59261009",
    display: "Preparación anticonceptiva oral",
  },
  { system: "http://snomed.info/sct", code: "59270007", display: "loxapina" },
  { system: "http://snomed.info/sct", code: "59456005", display: "astemizol" },
  {
    system: "http://snomed.info/sct",
    code: "59589008",
    display: "Producto de pirimetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "59594008",
    display: "Agente no despolarizante",
  },
  {
    system: "http://snomed.info/sct",
    code: "59751001",
    display: "Supresor de la tos",
  },
  {
    system: "http://snomed.info/sct",
    code: "59799001",
    display: "Producto diurético osmótico",
  },
  { system: "http://snomed.info/sct", code: "59941008", display: "diltiazem" },
  {
    system: "http://snomed.info/sct",
    code: "59953007",
    display: "piridostigmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "59999009",
    display: "Toxoide tetánico y diftérico adsorbido para uso en adultos",
  },
  {
    system: "http://snomed.info/sct",
    code: "60090003",
    display: "droga blanda",
  },
  {
    system: "http://snomed.info/sct",
    code: "60093001",
    display: "Clorhidrato de fenilpropanolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60149003",
    display: "indometacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60169008",
    display: "Neutralizador de acidez",
  },
  {
    system: "http://snomed.info/sct",
    code: "60468008",
    display: "Hidróxido de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "60520004",
    display: "Preparación de mononitrato de tiamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60533005",
    display: "droga astringente",
  },
  {
    system: "http://snomed.info/sct",
    code: "60541005",
    display: "Lanatosido C",
  },
  { system: "http://snomed.info/sct", code: "60682004", display: "ecotiofato" },
  {
    system: "http://snomed.info/sct",
    code: "60731009",
    display: "dietilcarbamazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60767002",
    display: "Suero animal normal",
  },
  { system: "http://snomed.info/sct", code: "60881009", display: "Heroína" },
  {
    system: "http://snomed.info/sct",
    code: "60972002",
    display: "Solución de irrigación",
  },
  {
    system: "http://snomed.info/sct",
    code: "60978003",
    display: "Barbitúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "61020000",
    display: "preparación de tiroides",
  },
  {
    system: "http://snomed.info/sct",
    code: "61093008",
    display: "Preparación del factor inhibidor de la prolactina",
  },
  {
    system: "http://snomed.info/sct",
    code: "61123001",
    display: "Amobarbital sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "61132004",
    display: "Antitoxina de gangrena gaseosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "61153008",
    display: "Vacuna contra sarampión, paperas y rubéola",
  },
  {
    system: "http://snomed.info/sct",
    code: "61181002",
    display: "Preparación de meprednisona",
  },
  { system: "http://snomed.info/sct", code: "61408004", display: "molindona" },
  {
    system: "http://snomed.info/sct",
    code: "61457001",
    display: "Preparación de hormonas suprarrenales",
  },
  {
    system: "http://snomed.info/sct",
    code: "61602008",
    display: "vacuna contra la tos ferina",
  },
  { system: "http://snomed.info/sct", code: "61621000", display: "Laxante" },
  { system: "http://snomed.info/sct", code: "61623002", display: "buclizina" },
  {
    system: "http://snomed.info/sct",
    code: "61650007",
    display: "Preparación de niacinamida",
  },
  { system: "http://snomed.info/sct", code: "61651006", display: "Cefamandol" },
  { system: "http://snomed.info/sct", code: "61862008", display: "meticilina" },
  {
    system: "http://snomed.info/sct",
    code: "61939007",
    display: "laxante de difenilmetano",
  },
  {
    system: "http://snomed.info/sct",
    code: "61946003",
    display: "preparación estrogénica",
  },
  {
    system: "http://snomed.info/sct",
    code: "62051009",
    display: "Preparación de diclorosona",
  },
  {
    system: "http://snomed.info/sct",
    code: "62063004",
    display: "Preparado antiinflamatorio nasal",
  },
  {
    system: "http://snomed.info/sct",
    code: "62191005",
    display: "Preparado de hígado inyectable",
  },
  { system: "http://snomed.info/sct", code: "62288001", display: "Vermífugo" },
  {
    system: "http://snomed.info/sct",
    code: "62294009",
    display: "Inmunoglobulina contra la varicela-zóster",
  },
  {
    system: "http://snomed.info/sct",
    code: "62353003",
    display: "Citrato de clomifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "62354009",
    display: "vacuna contra la bronquitis",
  },
  { system: "http://snomed.info/sct", code: "62529008", display: "tiotixeno" },
  {
    system: "http://snomed.info/sct",
    code: "62560008",
    display: "Preparación oftálmica de fluorometolona",
  },
  { system: "http://snomed.info/sct", code: "62782004", display: "clonidina" },
  {
    system: "http://snomed.info/sct",
    code: "63094006",
    display: "anticonvulsivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "63136007",
    display: "preparación de fitonadiona",
  },
  {
    system: "http://snomed.info/sct",
    code: "63318000",
    display: "Ácido benzoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "63338004",
    display: "saborizante de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "63470003",
    display: "Preparación de fluoximesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "63639004",
    display: "preparación de niacina",
  },
  { system: "http://snomed.info/sct", code: "63682003", display: "halotano" },
  {
    system: "http://snomed.info/sct",
    code: "63758001",
    display: "Preparación de noretindrona",
  },
  {
    system: "http://snomed.info/sct",
    code: "63822004",
    display: "preparación de vitamina E",
  },
  {
    system: "http://snomed.info/sct",
    code: "64083002",
    display: "Relajante del músculo liso genitourinario",
  },
  {
    system: "http://snomed.info/sct",
    code: "64115004",
    display: "amodiaquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "64127001",
    display: "dactinomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "64240003",
    display: "Preparación de metandrostenolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "64296005",
    display: "Toxoide estafilococo",
  },
  {
    system: "http://snomed.info/sct",
    code: "64349004",
    display: "griseofulvina",
  },
  { system: "http://snomed.info/sct", code: "64462001", display: "Terpin" },
  { system: "http://snomed.info/sct", code: "64558005", display: "metixeno" },
  {
    system: "http://snomed.info/sct",
    code: "64851009",
    display: "diyodohidroxiquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "64878006",
    display: "Metiltiouracilo",
  },
  { system: "http://snomed.info/sct", code: "65020006", display: "Benzocaína" },
  { system: "http://snomed.info/sct", code: "65026000", display: "efedrina" },
  { system: "http://snomed.info/sct", code: "65041000", display: "Biperideno" },
  {
    system: "http://snomed.info/sct",
    code: "65092008",
    display: "cloropirileno",
  },
  {
    system: "http://snomed.info/sct",
    code: "65265006",
    display: "tromboplastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "65461004",
    display: "Extracto de corteza suprarrenal",
  },
  {
    system: "http://snomed.info/sct",
    code: "65484006",
    display: "Preparación de prostaciclina PGI>2<",
  },
  {
    system: "http://snomed.info/sct",
    code: "65502005",
    display: "Preparación de epinefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "65505007",
    display: "Relajante del músculo liso gastrointestinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "65627005",
    display: "Preparación de hidrato de 4-amino-2-metil-1-naftol",
  },
  {
    system: "http://snomed.info/sct",
    code: "65628000",
    display: "agente de la piel",
  },
  {
    system: "http://snomed.info/sct",
    code: "65638005",
    display: "Preparación de hidróxido de zinc con corticotropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "65695006",
    display: "Anestésico general por inhalación",
  },
  {
    system: "http://snomed.info/sct",
    code: "65823007",
    display: "agente protector",
  },
  { system: "http://snomed.info/sct", code: "65884003", display: "antrapurol" },
  {
    system: "http://snomed.info/sct",
    code: "65965000",
    display: "Micrurus fulvius antiveneno",
  },
  {
    system: "http://snomed.info/sct",
    code: "66065008",
    display: "laxante salino",
  },
  { system: "http://snomed.info/sct", code: "66094001", display: "probenecid" },
  {
    system: "http://snomed.info/sct",
    code: "66125007",
    display: "Preparación nasal de flunisolida",
  },
  {
    system: "http://snomed.info/sct",
    code: "66243004",
    display: "Preparación de acetato de noretindrona",
  },
  {
    system: "http://snomed.info/sct",
    code: "66261008",
    display: "tetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "66349002",
    display: "preparación androgénica",
  },
  {
    system: "http://snomed.info/sct",
    code: "66441000",
    display: "preparación de ácido pantoténico",
  },
  { system: "http://snomed.info/sct", code: "66492008", display: "isoflurano" },
  { system: "http://snomed.info/sct", code: "66493003", display: "teofilina" },
  {
    system: "http://snomed.info/sct",
    code: "66602007",
    display: "Preparación de estanozolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "66672008",
    display: "Anestésico local tipo éster",
  },
  {
    system: "http://snomed.info/sct",
    code: "66742008",
    display: "Agente de pigmentación",
  },
  {
    system: "http://snomed.info/sct",
    code: "66854004",
    display: "Valerato de betametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "66859009",
    display: "dipiridamol",
  },
  {
    system: "http://snomed.info/sct",
    code: "66860004",
    display: "Cloruro de aluminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "66919007",
    display: "metilclotiazida",
  },
  { system: "http://snomed.info/sct", code: "66971004", display: "Colestipol" },
  {
    system: "http://snomed.info/sct",
    code: "67213005",
    display: "Inmunoglobulina de linfocitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "67423003",
    display: "acilaminopenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "67440007",
    display: "Agente bloqueador alfa-adrenérgico",
  },
  { system: "http://snomed.info/sct", code: "67477004", display: "Valproato" },
  {
    system: "http://snomed.info/sct",
    code: "67507000",
    display: "Fármaco antiarrítmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "67585005",
    display: "anestésico tópico",
  },
  { system: "http://snomed.info/sct", code: "67735003", display: "paclitaxel" },
  {
    system: "http://snomed.info/sct",
    code: "67891001",
    display: "Cefalosporina de segunda generación",
  },
  { system: "http://snomed.info/sct", code: "67939000", display: "apomorfina" },
  { system: "http://snomed.info/sct", code: "68088000", display: "Acebutolol" },
  {
    system: "http://snomed.info/sct",
    code: "68113000",
    display:
      "Vacuna de conjugado de oligosacárido de Hib (conjugado de proteína de difteria CRM>197<)",
  },
  {
    system: "http://snomed.info/sct",
    code: "68206008",
    display: "preparación de calcitriol",
  },
  {
    system: "http://snomed.info/sct",
    code: "68208009",
    display: "Toxoide diftérico y tetánico adsorbido",
  },
  {
    system: "http://snomed.info/sct",
    code: "68395000",
    display: "Cloruro de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "68398003",
    display: "Preparación de somatomedina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68402007",
    display: "Inhibidor de la anhidrasa carbónica",
  },
  {
    system: "http://snomed.info/sct",
    code: "68407001",
    display: "Solución de peróxido de hidrógeno al 30%",
  },
  {
    system: "http://snomed.info/sct",
    code: "68422006",
    display: "cloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68424007",
    display: "isoflurofato",
  },
  {
    system: "http://snomed.info/sct",
    code: "68444001",
    display: "doxorrubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68461003",
    display: "Jalea quirúrgica",
  },
  {
    system: "http://snomed.info/sct",
    code: "68490009",
    display: "propionato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "68622003",
    display: "preparación de secretina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68702006",
    display: "aurotiomalato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "68774008",
    display: "isoxsuprina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68864001",
    display: "Antiveneno polivalente para reptiles",
  },
  {
    system: "http://snomed.info/sct",
    code: "68887009",
    display: "metotrexato",
  },
  {
    system: "http://snomed.info/sct",
    code: "68892006",
    display: "Penicilina resistente a la penicilinasa",
  },
  { system: "http://snomed.info/sct", code: "69107004", display: "dantroleno" },
  { system: "http://snomed.info/sct", code: "69204002", display: "guanadrel" },
  {
    system: "http://snomed.info/sct",
    code: "69227005",
    display: "Fármaco antiarrítmico de clase II",
  },
  { system: "http://snomed.info/sct", code: "69236009", display: "amiodarona" },
  { system: "http://snomed.info/sct", code: "69242008", display: "miótico" },
  {
    system: "http://snomed.info/sct",
    code: "69331001",
    display: "Aminociclohexilpenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "69431002",
    display: "inmunosupresor",
  },
  {
    system: "http://snomed.info/sct",
    code: "69509008",
    display: "Agente biológico",
  },
  {
    system: "http://snomed.info/sct",
    code: "69576000",
    display: "preparación de menadiona",
  },
  { system: "http://snomed.info/sct", code: "69708003", display: "Clonazepam" },
  {
    system: "http://snomed.info/sct",
    code: "69801001",
    display: "Preparación de sulfato de estrona de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "69879000",
    display: "altretamina",
  },
  { system: "http://snomed.info/sct", code: "69918003", display: "aztreonam" },
  { system: "http://snomed.info/sct", code: "69967001", display: "sucralfato" },
  {
    system: "http://snomed.info/sct",
    code: "70047000",
    display: "Sulfametoxazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "70216000",
    display: "sal undecilenato",
  },
  {
    system: "http://snomed.info/sct",
    code: "70254000",
    display: "Sulfametizol",
  },
  {
    system: "http://snomed.info/sct",
    code: "70343008",
    display: "Antihistamínico derivado de la piperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "70379000",
    display: "Cloruro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "70447008",
    display: "Vacuna antineumocócica polivalente",
  },
  {
    system: "http://snomed.info/sct",
    code: "70460002",
    display: "Preparación de aceite de hígado de pescado",
  },
  {
    system: "http://snomed.info/sct",
    code: "70702006",
    display: "deferoxamina",
  },
  { system: "http://snomed.info/sct", code: "70776005", display: "pemolina" },
  {
    system: "http://snomed.info/sct",
    code: "70841003",
    display: "Preparación de quimotripsina",
  },
  {
    system: "http://snomed.info/sct",
    code: "70864001",
    display: "meprobamato",
  },
  { system: "http://snomed.info/sct", code: "70934008", display: "Demecario" },
  { system: "http://snomed.info/sct", code: "71181003", display: "Vacuna" },
  {
    system: "http://snomed.info/sct",
    code: "71289008",
    display: "antiveneno de serpiente",
  },
  {
    system: "http://snomed.info/sct",
    code: "71338005",
    display: "Preparación de vasopresina",
  },
  { system: "http://snomed.info/sct", code: "71451001", display: "kanamicina" },
  { system: "http://snomed.info/sct", code: "71453003", display: "mupirocina" },
  {
    system: "http://snomed.info/sct",
    code: "71455005",
    display: "Preparación de flurandrenolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "71462001",
    display: "resina de podófilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "71516007",
    display: "Preparación de ergocalciferol",
  },
  {
    system: "http://snomed.info/sct",
    code: "71584004",
    display: "Fosfato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "71634000",
    display: "clormezanona",
  },
  {
    system: "http://snomed.info/sct",
    code: "71699007",
    display: "trifluoperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "71724000",
    display: "Sulfato de hierro",
  },
  {
    system: "http://snomed.info/sct",
    code: "71731001",
    display: "Preparación oftálmica de medrisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "71759000",
    display: "nitroglicerina",
  },
  {
    system: "http://snomed.info/sct",
    code: "71770007",
    display: "Inhibidor de la monoaminooxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "71798005",
    display: "fenoprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "71837009",
    display: "Agente citotóxico",
  },
  {
    system: "http://snomed.info/sct",
    code: "72312007",
    display: "ciclandelato",
  },
  {
    system: "http://snomed.info/sct",
    code: "72398005",
    display: "Preparación de sulfonamida oftálmica",
  },
  {
    system: "http://snomed.info/sct",
    code: "72416006",
    display: "Metaciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72623000",
    display: "2-Amino-6-mercaptopurina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72824008",
    display: "colestiramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72870001",
    display: "Escopolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72924009",
    display: "clofazimina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72968006",
    display: "Salicilato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "72996000",
    display: "constructor de drogas",
  },
  { system: "http://snomed.info/sct", code: "73074003", display: "colistina" },
  { system: "http://snomed.info/sct", code: "73093001", display: "Neomicina" },
  { system: "http://snomed.info/sct", code: "73133000", display: "colchicina" },
  { system: "http://snomed.info/sct", code: "73170009", display: "Mentol" },
  { system: "http://snomed.info/sct", code: "73212002", display: "Adipiodona" },
  {
    system: "http://snomed.info/sct",
    code: "73228007",
    display: "Preparación de estrógenos no esteroideos",
  },
  {
    system: "http://snomed.info/sct",
    code: "73274006",
    display: "Crioprecipitado de plasma humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "73277004",
    display: "mecamilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "73454001",
    display: "Preparación de desmopresina",
  },
  { system: "http://snomed.info/sct", code: "73572009", display: "Morfina" },
  {
    system: "http://snomed.info/sct",
    code: "73585007",
    display: "Fenitoína sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "73627008",
    display: "agente calórico",
  },
  {
    system: "http://snomed.info/sct",
    code: "73639000",
    display: "Medicamento con receta médica",
  },
  {
    system: "http://snomed.info/sct",
    code: "73647000",
    display: "dipivefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "73756003",
    display: "amobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "73763003",
    display: "penicilina de espectro extendido",
  },
  {
    system: "http://snomed.info/sct",
    code: "73805002",
    display: "Preparación de la hormona liberadora de tirotropina",
  },
  { system: "http://snomed.info/sct", code: "73949004", display: "Atropina" },
  { system: "http://snomed.info/sct", code: "73986003", display: "cefuroxima" },
  {
    system: "http://snomed.info/sct",
    code: "74022005",
    display: "mepenzolato",
  },
  { system: "http://snomed.info/sct", code: "74065006", display: "prazepam" },
  { system: "http://snomed.info/sct", code: "74074008", display: "atracurio" },
  {
    system: "http://snomed.info/sct",
    code: "74147005",
    display: "Edetato disódico",
  },
  { system: "http://snomed.info/sct", code: "74213004", display: "indapamida" },
  {
    system: "http://snomed.info/sct",
    code: "74226000",
    display: "preparación de vitamina k",
  },
  {
    system: "http://snomed.info/sct",
    code: "74470007",
    display: "ciclofosfamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "74480006",
    display: "suplemento de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "74575000",
    display: "piperacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "74583006",
    display: "producto de hidroquinona",
  },
  {
    system: "http://snomed.info/sct",
    code: "74626007",
    display: "diluyente de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "74632002",
    display: "succinimida",
  },
  { system: "http://snomed.info/sct", code: "74674007", display: "Propofol" },
  {
    system: "http://snomed.info/sct",
    code: "74771007",
    display: "Fenoxibenzamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "74780007",
    display: "Laxantes de antraquinona",
  },
  {
    system: "http://snomed.info/sct",
    code: "74782004",
    display: "Alcaloide natural",
  },
  {
    system: "http://snomed.info/sct",
    code: "74798006",
    display: "pipenzolato",
  },
  {
    system: "http://snomed.info/sct",
    code: "74819009",
    display: "ácido acetohidroxámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "75029008",
    display: "Preparación de desoxicorticosterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "75201000",
    display: "Bacterina - toxoide",
  },
  { system: "http://snomed.info/sct", code: "75203002", display: "mometasona" },
  {
    system: "http://snomed.info/sct",
    code: "75292001",
    display: "sulfato de vincristina",
  },
  {
    system: "http://snomed.info/sct",
    code: "75366006",
    display: "edetato de calcio de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "75429004",
    display: "Dexbromfeniramina",
  },
  { system: "http://snomed.info/sct", code: "75501004", display: "bromazina" },
  {
    system: "http://snomed.info/sct",
    code: "75661008",
    display: "preparación delta-tocoferol",
  },
  {
    system: "http://snomed.info/sct",
    code: "75748004",
    display: "teofilina glicinato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "75770001",
    display: "Preparación tópica de urea",
  },
  {
    system: "http://snomed.info/sct",
    code: "75927008",
    display: "floxuridina",
  },
  { system: "http://snomed.info/sct", code: "75959001", display: "tamoxifeno" },
  {
    system: "http://snomed.info/sct",
    code: "75969007",
    display: "Preparación del factor liberador de gonadotropina",
  },
  { system: "http://snomed.info/sct", code: "76058001", display: "prazosina" },
  {
    system: "http://snomed.info/sct",
    code: "76155001",
    display: "ácido iopanoico",
  },
  { system: "http://snomed.info/sct", code: "76286000", display: "galamina" },
  {
    system: "http://snomed.info/sct",
    code: "76289007",
    display: "xilometazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "76385003",
    display: "Agente bloqueador adrenérgico alfa 1",
  },
  { system: "http://snomed.info/sct", code: "76390000", display: "Practolol" },
  { system: "http://snomed.info/sct", code: "76591000", display: "bleomicina" },
  { system: "http://snomed.info/sct", code: "76696004", display: "noscapina" },
  {
    system: "http://snomed.info/sct",
    code: "76759004",
    display: "producto de disopiramida",
  },
  {
    system: "http://snomed.info/sct",
    code: "76962009",
    display: "Iproniazida",
  },
  { system: "http://snomed.info/sct", code: "77035009", display: "clofibrato" },
  {
    system: "http://snomed.info/sct",
    code: "77048008",
    display: "sumergir/ser",
  },
  { system: "http://snomed.info/sct", code: "77237006", display: "Emético" },
  {
    system: "http://snomed.info/sct",
    code: "77331005",
    display: "Concentrado normal de globulina animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "77390008",
    display: "Benzatropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "77398001",
    display: "agente antidiarreico",
  },
  { system: "http://snomed.info/sct", code: "77549006", display: "Terpeno" },
  {
    system: "http://snomed.info/sct",
    code: "77657003",
    display: "Droga ilegal",
  },
  {
    system: "http://snomed.info/sct",
    code: "77731008",
    display: "N-acetilcisteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "77750008",
    display: "dacarbazina",
  },
  { system: "http://snomed.info/sct", code: "77856005", display: "esmolol" },
  {
    system: "http://snomed.info/sct",
    code: "77885004",
    display: "producto mestranol",
  },
  { system: "http://snomed.info/sct", code: "77898008", display: "simeticona" },
  {
    system: "http://snomed.info/sct",
    code: "78025001",
    display: "producto de ganciclovir",
  },
  {
    system: "http://snomed.info/sct",
    code: "78057000",
    display: "Solución tópica de carbol-fucsina",
  },
  {
    system: "http://snomed.info/sct",
    code: "78174002",
    display: "Mezlocilina",
  },
  { system: "http://snomed.info/sct", code: "78379001", display: "reserpina" },
  {
    system: "http://snomed.info/sct",
    code: "78411008",
    display: "tiopental sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "78439009",
    display: "sal de citrato",
  },
  { system: "http://snomed.info/sct", code: "78449007", display: "nitrazepam" },
  {
    system: "http://snomed.info/sct",
    code: "78507004",
    display: "bencilpenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "78542000",
    display: "Producto de citrato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "15911003",
    display: "Sensibilidad a la proteína de la leche de vaca",
  },
  {
    system: "http://snomed.info/sct",
    code: "25868003",
    display: "Sensibilidad a la proteína de soja",
  },
  {
    system: "http://snomed.info/sct",
    code: "59037007",
    display: "intolerancia a las drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "61712006",
    display: "Sensibilidad transitoria al gluten",
  },
  {
    system: "http://snomed.info/sct",
    code: "72354005",
    display: "Intolerancia a los anticonceptivos orales",
  },
  {
    system: "http://snomed.info/sct",
    code: "91929009",
    display: "Alergia a los antiinfecciosos",
  },
  {
    system: "http://snomed.info/sct",
    code: "91930004",
    display: "Alergia a los huevos",
  },
  {
    system: "http://snomed.info/sct",
    code: "91931000",
    display: "alergia a la eritromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "91932007",
    display: "Alergia a la fruta",
  },
  {
    system: "http://snomed.info/sct",
    code: "91933002",
    display: "Alergia a los macrólidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "91934008",
    display: "Alergia a las nueces",
  },
  {
    system: "http://snomed.info/sct",
    code: "91935009",
    display: "Alergia a los cacahuetes",
  },
  {
    system: "http://snomed.info/sct",
    code: "91936005",
    display: "alergia a la penicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "91937001",
    display: "Alergia a los mariscos",
  },
  {
    system: "http://snomed.info/sct",
    code: "91938006",
    display: "Alergia a las fresas",
  },
  {
    system: "http://snomed.info/sct",
    code: "91939003",
    display: "Alergia a las sulfonamidas",
  },
  {
    system: "http://snomed.info/sct",
    code: "91940001",
    display: "Alergia a la nuez",
  },
  {
    system: "http://snomed.info/sct",
    code: "188336009",
    display: "Alergia a la caspa de animales de laboratorio",
  },
  {
    system: "http://snomed.info/sct",
    code: "197493001",
    display: "Malabsorción por intolerancia a la proteína de soja",
  },
  {
    system: "http://snomed.info/sct",
    code: "197494007",
    display: "Malabsorción intestinal de grasas",
  },
  {
    system: "http://snomed.info/sct",
    code: "200848004",
    display: "Dermatitis alérgica de contacto por plantas, excepto alimentos",
  },
  {
    system: "http://snomed.info/sct",
    code: "213020009",
    display: "Alergia a la proteína del huevo",
  },
  {
    system: "http://snomed.info/sct",
    code: "232346004",
    display: "Alergia a la caspa de gato",
  },
  {
    system: "http://snomed.info/sct",
    code: "232347008",
    display: "Alergia a la caspa de animales",
  },
  {
    system: "http://snomed.info/sct",
    code: "232348003",
    display: "Alergia a las plumas",
  },
  {
    system: "http://snomed.info/sct",
    code: "232349006",
    display: "Alergia al polvo doméstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "232350006",
    display: "Alergia a los ácaros del polvo doméstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "235719002",
    display: "Intolerancia a la comida",
  },
  {
    system: "http://snomed.info/sct",
    code: "235720008",
    display: "Malabsorción causada por intolerancia a los carbohidratos",
  },
  {
    system: "http://snomed.info/sct",
    code: "292545003",
    display: "Reacción adversa al oxitropio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293580007",
    display: "Alergia a medicamentos de venta libre",
  },
  {
    system: "http://snomed.info/sct",
    code: "293582004",
    display: "Alergia analgésica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293583009",
    display: "Alergia a los analgésicos no opioides",
  },
  {
    system: "http://snomed.info/sct",
    code: "293584003",
    display: "Alergia al paracetamol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293585002",
    display: "Alergia a los salicilatos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293586001",
    display: "alergia a la aspirina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293587005",
    display: "Alergia a los analgésicos opioides",
  },
  {
    system: "http://snomed.info/sct",
    code: "293588000",
    display: "Alergia a la pentazocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293589008",
    display: "Alergia a la fenazocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293590004",
    display: "Alergia a los análogos de la metadona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293591000",
    display: "Alergia a la dextromoramida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293592007",
    display: "Alergia al dextropropoxifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293593002",
    display: "Alergia a la dipipanona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293594008",
    display: "alergia a la metadona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293595009",
    display: "Alergia a los opioides morfinanos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293596005",
    display: "Alergia a la buprenorfina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293597001",
    display: "alergia a la codeína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293598006",
    display: "Alergia a la diamorfina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293599003",
    display: "Alergia a la dihidrocodeína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293600000",
    display: "Alergia a la nalbufina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293601001",
    display: "Alergia a la morfina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293602008",
    display: "Alergia a los alcaloides del opio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293603003",
    display: "Alergia a los análogos de petidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293604009",
    display: "alergia alfentanilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293605005",
    display: "Alergia al fentanilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293606006",
    display: "alergia a la petidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293607002",
    display: "Alergia a la fenoperidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293608007",
    display: "Alergia al meptazinol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293609004",
    display: "Alergia al levorfanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293610009",
    display: "Alergia a los medicamentos antiinflamatorios no esteroideos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293611008",
    display: "alergia a la acemetacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293612001",
    display: "Alergia a azapropazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293613006",
    display: "Alergia al diclofenaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "293614000",
    display: "Alergia al etodolaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "293615004",
    display: "Alergia al felbinaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "293616003",
    display: "Alergia al fenbufeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293617007",
    display: "Alergia al fenoprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293618002",
    display: "Alergia al flurbiprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293619005",
    display: "alergia al ibuprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293620004",
    display: "Alergia a la indometacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293621000",
    display: "alergia al ketoprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293622007",
    display: "Alergia al ketorolaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "293623002",
    display: "Alergia al ácido mefenámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293624008",
    display: "Alergia a la nabumetona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293625009",
    display: "Alergia al naproxeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293626005",
    display: "Alergia al nefopam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293627001",
    display: "Alergia a la oxifenbutazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293628006",
    display: "Alergia a la fenilbutazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293629003",
    display: "alergia al piroxicam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293630008",
    display: "alergia al sulindaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "293631007",
    display: "Alergia al tenoxicam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293632000",
    display: "Alergia al ácido tiaprofénico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293633005",
    display: "Alergia a la tolmetina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293634004",
    display: "Alergia a agentes de diagnóstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293635003",
    display: "alergia a la tuberculina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293636002",
    display: "Alergia radiofarmacéutica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293637006",
    display: "Alergia a los medios de contraste",
  },
  {
    system: "http://snomed.info/sct",
    code: "293638001",
    display: "Alergia a los medios de contraste de rayos X",
  },
  {
    system: "http://snomed.info/sct",
    code: "293639009",
    display: "Alergia a los medios de contraste por resonancia magnética",
  },
  {
    system: "http://snomed.info/sct",
    code: "293640006",
    display: "Alergia a la vacuna con extracto de alérgeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293641005",
    display: "Alergia a los colorantes de diagnóstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293643008",
    display:
      "Grupos de fármacos que afectan principalmente a la alergia del sistema gastrointestinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "293644002",
    display: "Alergia a medicamentos para curar úlceras",
  },
  {
    system: "http://snomed.info/sct",
    code: "293645001",
    display: "Alergia al quelato de bismuto",
  },
  {
    system: "http://snomed.info/sct",
    code: "293646000",
    display: "alergia al sucralfato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293647009",
    display: "alergia al regaliz",
  },
  {
    system: "http://snomed.info/sct",
    code: "293648004",
    display: "alergia al misoprostol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293649007",
    display: "Alergia al antagonista del receptor H2",
  },
  {
    system: "http://snomed.info/sct",
    code: "293650007",
    display: "Alergia a la cimetidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293651006",
    display: "Alergia a la famotidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293652004",
    display: "Alergia a la nizatidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293653009",
    display: "Alergia a la ranitidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293654003",
    display: "Alergia a los inhibidores de la bomba de protones",
  },
  {
    system: "http://snomed.info/sct",
    code: "293655002",
    display: "alergia al omeprazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293656001",
    display: "Alergia a lansoprazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293657005",
    display: "Alergia a la carbenoxolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293658000",
    display: "Alergia a la pirenzepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293659008",
    display: "Alergia a la pancreatina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293660003",
    display: "Alergia a la mesalazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293662006",
    display: "Alergia a la olsalazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293663001",
    display: "Alergia a la sulfasalazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293664007",
    display: "Alergia a los antiácidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293665008",
    display: "Alergia al trisilicato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293666009",
    display: "Alergia al hidróxido de aluminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293667000",
    display: "Alergia a medicamentos antidiarreicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293668005",
    display: "Alergia a la loperamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293669002",
    display: "Alergia al caolín",
  },
  {
    system: "http://snomed.info/sct",
    code: "293670001",
    display: "Alergia a estimulantes de la motilidad",
  },
  {
    system: "http://snomed.info/sct",
    code: "293671002",
    display: "Alergia a la cisaprida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293672009",
    display: "Alergia antiemética",
  },
  {
    system: "http://snomed.info/sct",
    code: "293673004",
    display: "Alergia a la nabilona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293674005",
    display: "Alergia a la domperidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293675006",
    display: "Alergia a la metoclopramida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293676007",
    display: "Alergia al antagonista del receptor 5-hidroxitriptamina-3",
  },
  {
    system: "http://snomed.info/sct",
    code: "293677003",
    display: "Alergia a los laxantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "293678008",
    display: "Alergia al bisacodilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293679000",
    display: "alergia al dantrón",
  },
  {
    system: "http://snomed.info/sct",
    code: "293680002",
    display: "Alergia al picosulfato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293681003",
    display: "alergia a la lactulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293682005",
    display: "Alergia al sulfato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293683000",
    display: "Alergia a los laxantes formadores de masa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293684006",
    display: "Alergia a los laxantes de antraquinona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293685007",
    display: "Alergia a la cáscara",
  },
  {
    system: "http://snomed.info/sct",
    code: "293686008",
    display: "Alergia al sen",
  },
  {
    system: "http://snomed.info/sct",
    code: "293687004",
    display: "alergia al docusato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293688009",
    display: "Alergia antiespasmódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293689001",
    display: "Alergia al butilbromuro de hioscina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293690005",
    display: "Alergia al aceite de menta",
  },
  {
    system: "http://snomed.info/sct",
    code: "293691009",
    display: "Alergia alverina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293692002",
    display: "Alergia a la mebeverina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293693007",
    display: "Alergia a la dicicloverina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293694001",
    display: "Alergia al mepenzolato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293695000",
    display: "Alergia al pipenzolato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293696004",
    display: "Alergia a la poldina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293697008",
    display: "alergia a la propantelina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293698003",
    display: "Alergia a los agentes biliares",
  },
  {
    system: "http://snomed.info/sct",
    code: "293699006",
    display: "Alergia al ácido quenodesoxicólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293700007",
    display: "Alergia al ácido dehidrocólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293701006",
    display: "Alergia al ácido ursodesoxicólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293702004",
    display: "Alergia al ácido quenodesoxicólico y ursodesoxicólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293703009",
    display: "Alergia a los anestésicos y gases medicinales",
  },
  {
    system: "http://snomed.info/sct",
    code: "293704003",
    display: "Alergia a los anestésicos generales",
  },
  {
    system: "http://snomed.info/sct",
    code: "293705002",
    display: "Alergia a los anestésicos intravenosos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293706001",
    display: "Alergia al etomidato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293707005",
    display: "Alergia a la ketamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293708000",
    display: "alergia al propofol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293709008",
    display: "Alergia al tiopental",
  },
  {
    system: "http://snomed.info/sct",
    code: "293710003",
    display: "Alergia a la metohexitona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293711004",
    display: "Alergia a los anestésicos inhalatorios",
  },
  {
    system: "http://snomed.info/sct",
    code: "293712006",
    display: "Alergia al enflurano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293713001",
    display: "Éter, alergia a los anestésicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293714007",
    display: "Alergia al halotano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293715008",
    display: "Alergia al isoflurano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293716009",
    display: "Alergia al tricloroetileno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293717000",
    display: "Alergia al desflurano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293718005",
    display: "Alergia a anestésicos locales",
  },
  {
    system: "http://snomed.info/sct",
    code: "293719002",
    display: "Alergia a la bupivacaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293720008",
    display: "Alergia a la cincocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293721007",
    display: "Alergia a la prilocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293722000",
    display: "Alergia a la lidocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293723005",
    display: "Alergia a la cocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293724004",
    display: "Alergia a la benzocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293725003",
    display: "alergia a la tetracaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293726002",
    display: "Alergia a la oxibuprocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293727006",
    display: "Alergia a la procaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293728001",
    display: "Alergia a la proximetacaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293730004",
    display: "Alergia inmunoestimulante",
  },
  {
    system: "http://snomed.info/sct",
    code: "293732007",
    display: "Alergia a la amifostina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293733002",
    display: "Alergia a la aldesleucina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293734008",
    display: "Alergia a factores estimulantes de colonias",
  },
  {
    system: "http://snomed.info/sct",
    code: "293735009",
    display: "Alergia al molgramostim",
  },
  {
    system: "http://snomed.info/sct",
    code: "293736005",
    display: "Alergia a lenograstim",
  },
  {
    system: "http://snomed.info/sct",
    code: "293737001",
    display: "Alergia al filgrastim",
  },
  {
    system: "http://snomed.info/sct",
    code: "293738006",
    display: "Alergia al levamisol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293739003",
    display: "Alergia antineoplásica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293740001",
    display: "Alergia a medicamentos alquilantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "293741002",
    display: "Alergia al mitobronitol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293742009",
    display: "Alergia al busulfán",
  },
  {
    system: "http://snomed.info/sct",
    code: "293743004",
    display: "Alergia al treosulfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293745006",
    display: "Alergia a la tiotepa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293746007",
    display: "Alergia al derivado de la mostaza nitrogenada",
  },
  {
    system: "http://snomed.info/sct",
    code: "293747003",
    display: "Alergia al clorambucilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293748008",
    display: "Alergia a la ciclofosfamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293749000",
    display: "Alergia a los etoglucidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293750000",
    display: "Alergia a la ifosfamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293751001",
    display: "Alergia al melfalán",
  },
  {
    system: "http://snomed.info/sct",
    code: "293752008",
    display: "Alergia a la estramustina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293753003",
    display: "alergia a la clormetina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293754009",
    display: "Alergia a la nitrosurea",
  },
  {
    system: "http://snomed.info/sct",
    code: "293755005",
    display: "Alergia a la carmustina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293756006",
    display: "Alergia a la lomustina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293757002",
    display: "Alergia a los antineoplásicos triacenos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293758007",
    display: "Alergia a la dacarbazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293759004",
    display: "Alergia a antibióticos citotóxicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293760009",
    display: "Alergia a la dactinomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293761008",
    display: "alergia a la bleomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293762001",
    display: "alergia a la mitomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293763006",
    display: "Alergia a la plicamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293764000",
    display: "alergia a la aclarubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293765004",
    display: "Alergia a la mitoxantrona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293766003",
    display: "Alergia a la doxorrubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293767007",
    display: "alergia a la epirubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293768002",
    display: "alergia a la idarubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293769005",
    display: "Alergia a los antimetabolitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293770006",
    display: "Alergia al óxido de mercurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293771005",
    display: "Alergia al metotrexato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293772003",
    display: "Alergia a la mercaptopurina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293773008",
    display: "Alergia a la tioguanina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293774002",
    display: "alergia a la pentostatina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293775001",
    display: "Alergia a la citarabina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293776000",
    display: "Alergia al fluorouracilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293777009",
    display: "Alergia al etopósido",
  },
  {
    system: "http://snomed.info/sct",
    code: "293778004",
    display: "alergia a la amsacrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293779007",
    display: "Alergia al carboplatino",
  },
  {
    system: "http://snomed.info/sct",
    code: "293780005",
    display: "Alergia al cisplatino",
  },
  {
    system: "http://snomed.info/sct",
    code: "293781009",
    display: "Alergia a la hidroxicarbamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293782002",
    display: "Alergia a la procarbazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293783007",
    display: "Alergia al razoxano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293784001",
    display: "Alergia a la crisantapasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293785000",
    display: "alergia al paclitaxel",
  },
  {
    system: "http://snomed.info/sct",
    code: "293786004",
    display: "Alergia a la fludarabina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293787008",
    display: "Alergia a la aminoglutetimida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293788003",
    display: "Alergia a los antagonistas de los estrógenos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293789006",
    display: "Alergia al trilostano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293790002",
    display: "Alergia al tamoxifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293791003",
    display: "Alergia al formestano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293792005",
    display: "Alergia a los alcaloides de la vinca",
  },
  {
    system: "http://snomed.info/sct",
    code: "293793000",
    display: "Alergia a la vinblastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293794006",
    display: "alergia a la vincristina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293795007",
    display: "alergia a la vindesina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293796008",
    display: "Alergia al dimetilsulfóxido",
  },
  {
    system: "http://snomed.info/sct",
    code: "293797004",
    display: "Alergia inmunosupresora",
  },
  {
    system: "http://snomed.info/sct",
    code: "293798009",
    display: "Alergia a la ciclosporina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293799001",
    display: "Alergia a la azatioprina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293800002",
    display:
      "Grupos de fármacos que afectan principalmente a la alergia del sistema nervioso central",
  },
  {
    system: "http://snomed.info/sct",
    code: "293801003",
    display: "Alergia supresora del apetito de acción central",
  },
  {
    system: "http://snomed.info/sct",
    code: "293802005",
    display: "alergia al mazindol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293803000",
    display: "alergia a la fentermina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293804006",
    display: "alergia a la dexfenfluramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293805007",
    display: "Alergia al dietilpropión",
  },
  {
    system: "http://snomed.info/sct",
    code: "293806008",
    display: "Alergia a la fenfluramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293807004",
    display: "Fármaco dopaminérgico utilizado en la alergia al parkinsonismo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293808009",
    display: "alergia a la levodopa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293809001",
    display: "Alergia a benserazida + levodopa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293810006",
    display: "Alergia a carbidopa + levodopa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293811005",
    display: "Alergia a la amantadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293812003",
    display: "Alergia a la apomorfina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293813008",
    display: "Alergia a la lisurida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293814002",
    display: "Alergia a la pergolida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293815001",
    display: "Alergia a la bromocriptina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293816000",
    display: "Alergia a medicamentos antidepresivos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293817009",
    display: "alergia al litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293818004",
    display: "Alergia al carbonato de litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293819007",
    display: "Alergia al citrato de litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293821002",
    display: "Alergia a los antidepresivos tricíclicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293822009",
    display: "Alergia a la butriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293823004",
    display: "Alergia a la doxepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293824005",
    display: "Alergia al iprindol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293825006",
    display: "alergia a la lofepramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293826007",
    display: "Alergia a la nortriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293827003",
    display: "Alergia a la trimipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293828008",
    display: "Alergia a la amoxapina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293829000",
    display: "Alergia a la amitriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293830005",
    display: "Alergia a la clomipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293831009",
    display: "alergia a la desipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293832002",
    display: "Alergia a la dosulepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293833007",
    display: "Alergia a la imipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293834001",
    display: "Alergia a la protriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293835000",
    display: "Alergia a los inhibidores de la monoaminooxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293836004",
    display: "alergia a la fenelzina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293837008",
    display: "Alergia a la iproniazida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293838003",
    display: "Alergia a la isocarboxazida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293839006",
    display: "Alergia a la tranilcipromina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293840008",
    display: "Alergia a la moclobemida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293841007",
    display: "Alergia a los antidepresivos compuestos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293842000",
    display: "Alergia al triptófano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293843005",
    display: "Alergia a la venlafaxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293844004",
    display:
      "Alergia a los inhibidores selectivos de la recaptación de serotonina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293845003",
    display: "alergia a la sertralina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293847006",
    display: "alergia a la paroxetina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293848001",
    display: "Alergia a la nefazodona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293849009",
    display: "alergia al citalopram",
  },
  {
    system: "http://snomed.info/sct",
    code: "293850009",
    display: "Alergia a la fluoxetina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293851008",
    display: "Alergia a la fluvoxamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293852001",
    display: "Alergia a antidepresivos tetracíclicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293853006",
    display: "alergia a la maprotilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293854000",
    display: "Alergia a la mianserina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293855004",
    display: "Alergia a la trazodona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293856003",
    display: "Alergia a la viloxazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293857007",
    display: "Alergia antiepiléptica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293858002",
    display: "Alergia a la beclamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293859005",
    display: "Alergia a lamotrigina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293860000",
    display: "Alergia al piracetam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293861001",
    display: "Alergia a la gabapentina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293862008",
    display: "Alergia al valproato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293863003",
    display: "Alergia antiepiléptica barbitúrica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293864009",
    display: "Alergia al metilfenobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "293865005",
    display: "Alergia al fenobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "293866006",
    display: "Alergia a la primidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293867002",
    display: "Alergia a la carbamazepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293868007",
    display: "Alergia a la vigabatrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293869004",
    display: "alergia a la fenitoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "293870003",
    display: "Alergia a la etosuximida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293871004",
    display: "Alergia al clonazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293873001",
    display: "Alergia a los sedantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "293874007",
    display: "Alergia a la zopiclona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293875008",
    display: "Alergia al zolpidem",
  },
  {
    system: "http://snomed.info/sct",
    code: "293876009",
    display: "alergia a la clormezanona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293877000",
    display: "Alergia a la metilprilona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293878005",
    display: "Alergia al paraldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "293879002",
    display: "Alergia a los sedantes barbitúricos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293880004",
    display: "Alergia al amobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "293881000",
    display: "alergia al butobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "293882007",
    display: "Alergia al ciclobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "293883002",
    display: "Alergia al amobarbital sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293884008",
    display: "Alergia al secobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "293885009",
    display: "Alergia a los sedantes de benzodiacepinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "293886005",
    display: "Alergia al flunitrazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293887001",
    display: "Alergia al flurazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293888006",
    display: "Alergia al loprazolam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293889003",
    display: "Alergia a lormetazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293890007",
    display: "Alergia al nitrazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293891006",
    display: "Alergia al triazolam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293892004",
    display: "Alergia al alprazolam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293893009",
    display: "Alergia al bromazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293894003",
    display: "Alergia al clordiazepóxido",
  },
  {
    system: "http://snomed.info/sct",
    code: "293895002",
    display: "Alergia al clobazam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293896001",
    display: "Alergia al clorazepato dipotásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293897005",
    display: "Alergia al ketazolam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293898000",
    display: "Alergia al medazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293899008",
    display: "Alergia al oxazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293900003",
    display: "alergia al prazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293901004",
    display: "Alergia al midazolam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293902006",
    display: "Alergia al diazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293903001",
    display: "alergia al lorazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293904007",
    display: "Alergia al temazepam",
  },
  {
    system: "http://snomed.info/sct",
    code: "293905008",
    display: "Alergia a los sedantes carbamato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293906009",
    display: "Alergia al meprobamato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293907000",
    display: "Alergia al sedante cloral",
  },
  {
    system: "http://snomed.info/sct",
    code: "293908005",
    display: "Alergia al hidrato de cloral",
  },
  {
    system: "http://snomed.info/sct",
    code: "293909002",
    display: "Alergia a la dicloralfenazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293910007",
    display: "Alergia al triclofos sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "293911006",
    display: "Alergia a la buspirona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293912004",
    display: "Alergia al clometiazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293913009",
    display: "Alergia neuroléptica",
  },
  {
    system: "http://snomed.info/sct",
    code: "293914003",
    display: "alergia a la sulpirida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293915002",
    display: "Alergia a la loxapina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293916001",
    display: "Alergia a la clozapina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293917005",
    display: "Alergia a la risperidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293918000",
    display: "alergia a la tetrabenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293919008",
    display: "Alergia a la butirofenona",
  },
  {
    system: "http://snomed.info/sct",
    code: "293920002",
    display: "Alergia al benperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293921003",
    display: "Alergia al trifluperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293922005",
    display: "Alergia al decanoato de haloperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293923000",
    display: "Alergia al droperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293924006",
    display: "Alergia al haloperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293925007",
    display: "Alergia a la difenilbutilpiperidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293926008",
    display: "Alergia a la pimozida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293927004",
    display: "Alergia al fluspirileno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293928009",
    display: "Alergia a la fenotiazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293929001",
    display: "Alergia a la levomepromazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293930006",
    display: "Alergia a la periciazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293931005",
    display: "Alergia al decanoato de flufenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293932003",
    display: "Alergia al enantato de flufenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293933008",
    display: "Alergia a la tietilperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293934002",
    display: "Alergia a la flufenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293935001",
    display: "Alergia a la clorpromazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293936000",
    display: "Alergia a la pipotiazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293937009",
    display: "Alergia a la promazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293938004",
    display: "Alergia a la tioridazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293939007",
    display: "Alergia a la perfenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293940009",
    display: "Alergia a la proclorperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293941008",
    display: "Alergia a la trifluoperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293942001",
    display: "Alergia al tioxanteno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293943006",
    display: "Alergia al clorprotixeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "293944000",
    display: "Alergia al decanoato de flupentixol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293945004",
    display: "Alergia al decanoato de zuclopentixol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293946003",
    display: "Alergia al zuclopentixol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293948002",
    display: "Alergia al flupentixol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293949005",
    display: "Alergia a la oxipertina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293950005",
    display: "Alergia a la remoxiprida",
  },
  {
    system: "http://snomed.info/sct",
    code: "293951009",
    display: "Alergia al inhibidor de la descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "293952002",
    display: "alergia a la selegilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293953007",
    display: "Alergia a estimulantes centrales",
  },
  {
    system: "http://snomed.info/sct",
    code: "293954001",
    display: "Alergia a la pemolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293955000",
    display: "Alergia al metilfenidato",
  },
  {
    system: "http://snomed.info/sct",
    code: "293956004",
    display: "Alergia al prolintano",
  },
  {
    system: "http://snomed.info/sct",
    code: "293957008",
    display: "Alergia al grupo de las anfetaminas",
  },
  {
    system: "http://snomed.info/sct",
    code: "293958003",
    display: "Alergia a la dexanfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293959006",
    display: "Alergia al modificador del metabolismo del alcohol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293960001",
    display: "Alergia al disulfiram",
  },
  {
    system: "http://snomed.info/sct",
    code: "293961002",
    display:
      "Grupos de fármacos que afectan principalmente a la alergia del sistema nervioso autónomo",
  },
  {
    system: "http://snomed.info/sct",
    code: "293962009",
    display: "Alergia a fármacos bloqueadores de beta-adrenoceptores",
  },
  {
    system: "http://snomed.info/sct",
    code: "293963004",
    display: "Alergia a los bloqueadores beta cardioselectivos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293964005",
    display: "Alergia al acebutolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293965006",
    display: "alergia al atenolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293966007",
    display: "Alergia al betaxolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293967003",
    display: "Alergia al bisoprolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293968008",
    display: "Alergia al celiprolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293969000",
    display: "Alergia al esmolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293970004",
    display: "Alergia al metoprolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293971000",
    display: "Alergia a los betabloqueantes no cardioselectivos",
  },
  {
    system: "http://snomed.info/sct",
    code: "293972007",
    display: "Alergia al nadolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293973002",
    display: "Alergia al pindolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293974008",
    display: "alergia al carvedilol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293975009",
    display: "Alergia al metipranolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293976005",
    display: "Alergia al carteolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293977001",
    display: "Alergia al labetalol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293978006",
    display: "Alergia a levobunolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293979003",
    display: "Alergia al oxprenolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293980000",
    display: "Alergia al penbutolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293981001",
    display: "Alergia al practilol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293982008",
    display: "alergia al propranolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293983003",
    display: "Alergia al sotalol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293984009",
    display: "alergia al timolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "293985005",
    display: "Alergia al fármaco bloqueador alfa-adrenoceptor",
  },
  {
    system: "http://snomed.info/sct",
    code: "293986006",
    display: "Alergia a la alfuzosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293987002",
    display: "Alergia a la doxazosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293988007",
    display: "Alergia a la indoramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293989004",
    display: "Alergia a la fenoxibenzamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293990008",
    display: "Alergia a la fentolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293991007",
    display: "Alergia a la prazosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293992000",
    display: "alergia a la terazosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293993005",
    display: "alergia a la nicotina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293994004",
    display: "Alergia al bloqueador de los canales de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "293995003",
    display: "Alergia a la lidoflazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293996002",
    display: "Alergia a la nifedipina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293997006",
    display: "Alergia a la prenilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293998001",
    display: "Alergia a la isradipina",
  },
  {
    system: "http://snomed.info/sct",
    code: "293999009",
    display: "Alergia a la felodipina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294000006",
    display: "Alergia a lacidipino",
  },
  {
    system: "http://snomed.info/sct",
    code: "294001005",
    display: "Alergia a la nimodipina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294002003",
    display: "Alergia a la amlodipina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294003008",
    display: "alergia al diltiazem",
  },
  {
    system: "http://snomed.info/sct",
    code: "294004002",
    display: "Alergia a la nicardipina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294005001",
    display: "Alergia al verapamilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294006000",
    display: "Alergia parasimpaticomimética",
  },
  {
    system: "http://snomed.info/sct",
    code: "294007009",
    display: "Alergia a la pilocarpina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294008004",
    display: "Alergia al cloruro de acetilcolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294009007",
    display: "alergia a la metacolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294010002",
    display: "Alergia anticolinesterasa parasimpaticomimética",
  },
  {
    system: "http://snomed.info/sct",
    code: "294011003",
    display: "Alergia a la fisostigmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294012005",
    display: "Alergia al demecarium",
  },
  {
    system: "http://snomed.info/sct",
    code: "294013000",
    display: "Alergia a la distigmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294014006",
    display: "Alergia al ecotiopato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294015007",
    display: "Alergia al edrofonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294016008",
    display: "Alergia a la piridostigmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294017004",
    display: "Alergia a la neostigmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294018009",
    display: "Alergia al betanecol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294019001",
    display: "Alergia al carbacol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294020007",
    display: "Alergia simpaticomimética",
  },
  {
    system: "http://snomed.info/sct",
    code: "294021006",
    display: "Alergia al clorhidrato de isoetarina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294022004",
    display: "Alergia al clorhidrato de fenilpropanolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294023009",
    display: "Alergia a la pseudoefedrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294024003",
    display: "Alergia a los agonistas alfa-adrenérgicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294025002",
    display: "Alergia al tartrato de oxedrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294026001",
    display: "Alergia al metaraminol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294027005",
    display: "alergia a la metoxamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294028000",
    display: "Alergia a la nafazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294029008",
    display: "Alergia a la norepinefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294030003",
    display: "Alergia a la fenilefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294031004",
    display: "Alergia a xilometazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294032006",
    display: "Alergia a los agonistas beta-adrenérgicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294033001",
    display:
      "Alergia selectiva a los estimulantes de los receptores adrenérgicos beta-2",
  },
  {
    system: "http://snomed.info/sct",
    code: "294035008",
    display: "Alergia al pirbuterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294036009",
    display: "Alergia al salmeterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294037000",
    display: "alergia al salbutamol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294038005",
    display: "Alergia al bambuterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294039002",
    display: "Alergia al fenoterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294040000",
    display: "Alergia a la orciprenalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294041001",
    display: "Alergia al reproterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294042008",
    display: "Alergia al rimiterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294043003",
    display: "alergia a la ritodrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294044009",
    display: "Alergia a la terbutalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294045005",
    display: "Alergia al tulobuterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294046006",
    display:
      "Alergia selectiva a los estimulantes de los receptores adrenérgicos beta-1",
  },
  {
    system: "http://snomed.info/sct",
    code: "294047002",
    display: "Alergia a la dobutamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294048007",
    display: "Alergia a la dopexamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294050004",
    display: "Alergia a la isoprenalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294051000",
    display: "Alergia a la isoprenalina oral",
  },
  {
    system: "http://snomed.info/sct",
    code: "294052007",
    display: "Alergia a la isoprenalina inhalada",
  },
  {
    system: "http://snomed.info/sct",
    code: "294053002",
    display: "Alergia a la isoprenalina parenteral",
  },
  {
    system: "http://snomed.info/sct",
    code: "294054008",
    display:
      "Alergia a los agonistas de los receptores alfa adrenérgicos centrales",
  },
  {
    system: "http://snomed.info/sct",
    code: "294055009",
    display: "alergia a la metildopa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294056005",
    display: "Metildopa y alergia a los diuréticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294057001",
    display: "Alergia a la apraclonidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294058006",
    display: "Alergia a la clonidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294059003",
    display: "Alergia a la lofexidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294060008",
    display: "Alergia a la dipivefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294061007",
    display: "Alergia a la dopamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294062000",
    display: "alergia a la efedrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294063005",
    display: "Alergia a la oximetazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294064004",
    display: "Alergia al xamoterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294065003",
    display: "Alergia anticolinérgica",
  },
  {
    system: "http://snomed.info/sct",
    code: "294066002",
    display: "Alergia antimuscarínica",
  },
  {
    system: "http://snomed.info/sct",
    code: "294067006",
    display: "Alergia a los alcaloides de la belladona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294068001",
    display: "Alergia al clorhidrato de piperidolato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294069009",
    display: "Alergia al biperideno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294070005",
    display: "Alergia al bromuro de emepronio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294071009",
    display: "Alergia al clorhidrato de terodilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294072002",
    display: "Alergia al cloruro de lachesina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294073007",
    display: "Alergia a la tropicamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294074001",
    display: "alergia a la hioscina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294075000",
    display: "Alergia al bromhidrato de hioscina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294076004",
    display: "alergia a la atropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294077008",
    display: "Alergia al trihexifenidilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294078003",
    display: "Alergia a la benzatropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294079006",
    display: "alergia al ciclopentolato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294080009",
    display: "Alergia al glicopirronio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294081008",
    display: "Alergia a la homatropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294082001",
    display: "Alergia al ipratropio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294083006",
    display: "alergia al metixeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294084000",
    display: "Alergia a la orfenadrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294085004",
    display: "Alergia al clorhidrato de orfenadrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294086003",
    display: "Alergia al citrato de orfenadrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294087007",
    display: "Alergia al oxitropio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294088002",
    display: "Alergia a la oxibutinina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294089005",
    display: "Alergia a la prociclidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294090001",
    display:
      "Grupos de fármacos que afectan principalmente a la alergia del sistema respiratorio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294091002",
    display: "alergia a la dornasa alfa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294092009",
    display: "Alergia a los mucolíticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294093004",
    display: "Alergia al tiloxapol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294094005",
    display: "Alergia al clorhidrato de bromhexina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294095006",
    display: "Alergia a la carbocisteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294096007",
    display: "Alergia a la metilcisteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294097003",
    display: "Alergia a la acetilcisteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294098008",
    display: "Alergia a estimulantes respiratorios",
  },
  {
    system: "http://snomed.info/sct",
    code: "294099000",
    display: "Alergia a la niquetamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294100008",
    display: "Alergia al etamivan",
  },
  {
    system: "http://snomed.info/sct",
    code: "294101007",
    display: "Alergia al doxapram",
  },
  {
    system: "http://snomed.info/sct",
    code: "294102000",
    display: "Alergia al surfactante respiratorio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294103005",
    display: "Alergia a los beractantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294104004",
    display: "Alergia a la fracción de fosfolípidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294105003",
    display: "Alergia a los pumantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294106002",
    display: "Alergia al colfoscerilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294107006",
    display: "Alergia a medicamentos antialergénicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294108001",
    display: "Alergia antihistamínica tópica",
  },
  {
    system: "http://snomed.info/sct",
    code: "294109009",
    display: "Alergia antihistamínica H1",
  },
  {
    system: "http://snomed.info/sct",
    code: "294110004",
    display: "Alergia antihistamínica no sedante",
  },
  {
    system: "http://snomed.info/sct",
    code: "294111000",
    display: "Alergia al astemizol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294112007",
    display: "Alergia a la terfenadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294113002",
    display: "Alergia a la acrivastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294114008",
    display: "alergia a la loratadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294115009",
    display: "Alergia a la azelastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294116005",
    display: "Alergia a la cetirizina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294117001",
    display: "Alergia a los antihistamínicos sedantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294118006",
    display: "Alergia a la clemastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294119003",
    display: "Alergia a la mebhidrolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294120009",
    display: "Alergia a la mequitazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294121008",
    display: "Alergia a la oxatomida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294122001",
    display: "Alergia a la ciclizina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294123006",
    display: "Alergia al dimenhidrinato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294124000",
    display: "Alergia al clorhidrato de meclozina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294125004",
    display: "Alergia a la antazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294126003",
    display: "Alergia a la prometazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294127007",
    display: "Alergia a la azatadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294128002",
    display: "Alergia a la bromfeniramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294129005",
    display: "alergia a la clorfenamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294130000",
    display: "Alergia a la cinarizina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294131001",
    display: "Alergia a la ciproheptadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294132008",
    display: "Alergia al dimetindeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294133003",
    display: "Alergia a la difenhidramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294134009",
    display: "Alergia a la difenilpiralina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294135005",
    display: "Alergia a la hidroxizina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294136006",
    display: "Alergia a la mepiramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294137002",
    display: "Alergia a la fenindamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294138007",
    display: "alergia a la feniramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294139004",
    display: "Alergia a la triprolidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294140002",
    display: "alergia a la alimemazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294141003",
    display: "Alergia al cromoglicato y antialergénicos relacionados",
  },
  {
    system: "http://snomed.info/sct",
    code: "294142005",
    display: "Alergia al nedocromil",
  },
  {
    system: "http://snomed.info/sct",
    code: "294143000",
    display: "Alergia al cromoglicato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294144006",
    display: "alergia al ketotifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294145007",
    display: "Alergia a la lodoxamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294146008",
    display: "Tos/alergia a preparados descongestionantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294147004",
    display: "Alergia a los supresores de la tos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294148009",
    display: "alergia al isoaminilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294149001",
    display: "Alergia a los supresores de la tos morphinan",
  },
  {
    system: "http://snomed.info/sct",
    code: "294151002",
    display: "Alergia al bromhidrato de dextrometorfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "294152009",
    display: "Alergia a la noscapina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294153004",
    display: "alergia a la folcodina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294154005",
    display: "Alergia a los supresores de la tos compuestos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294155006",
    display: "Alergia descongestionante patentada",
  },
  {
    system: "http://snomed.info/sct",
    code: "294156007",
    display: "Alergia expectorante",
  },
  {
    system: "http://snomed.info/sct",
    code: "294157003",
    display: "Alergia a la xantina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294158008",
    display: "Alergia a la aminofilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294159000",
    display: "Alergia al teofilinato de colina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294160005",
    display: "alergia a la teofilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294161009",
    display: "Alergia a los preparados broncodilatadores",
  },
  {
    system: "http://snomed.info/sct",
    code: "294162002",
    display: "Alergia a los corticoides inhalados",
  },
  {
    system: "http://snomed.info/sct",
    code: "294163007",
    display:
      "Grupos de fármacos y agentes que actúan principalmente sobre la alergia cutánea.",
  },
  {
    system: "http://snomed.info/sct",
    code: "294164001",
    display: "Alergia a preparados dermatológicos tópicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294165000",
    display: "Alergia a las cremas de urea",
  },
  {
    system: "http://snomed.info/sct",
    code: "294166004",
    display: "Alergia a los aditivos de baño emolientes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294167008",
    display: "Alergia a los polvos para espolvorear",
  },
  {
    system: "http://snomed.info/sct",
    code: "294168003",
    display: "alergia a la calamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294169006",
    display: "Alergia al alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "294170007",
    display:
      "Alergia a las preparaciones para el cuero cabelludo con alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "294171006",
    display: "Alergia a las preparaciones de baño de alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "294172004",
    display: "Alergia al bufexamaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "294173009",
    display: "Alergia al ditranol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294174003",
    display: "Alergia al ungüento de ditranol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294175002",
    display: "Alergia a la crema de ditranol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294176001",
    display: "Alergia a la pasta de ditranol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294177005",
    display: "Alergia al ictamamol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294178000",
    display: "Alergia al calcipotriol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294179008",
    display: "alergia al azufre",
  },
  {
    system: "http://snomed.info/sct",
    code: "294180006",
    display: "Alergia al ácido azelaico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294181005",
    display: "Alergia a los complejos de bromo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294182003",
    display: "Alergia a la resina de podófilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294183008",
    display: "Alergia a la podofilotoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294184002",
    display: "Alergia a los preparados de protección solar",
  },
  {
    system: "http://snomed.info/sct",
    code: "294185001",
    display: "Alergia a los preparados de camuflaje",
  },
  {
    system: "http://snomed.info/sct",
    code: "294187009",
    display: "Alergia a los agentes descamantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294188004",
    display: "alergia a la aserbina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294189007",
    display: "Alergia al adhesivo de tejidos quirúrgicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294190003",
    display: "Alergia al enbucrilato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294191004",
    display: "Alergia al colodión",
  },
  {
    system: "http://snomed.info/sct",
    code: "294192006",
    display: "Contra la alergia a los irritantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294193001",
    display: "Alergia a emolientes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294194007",
    display: "Alergia a las cataplasmas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294195008",
    display: "Alergia a los tensioactivos aniónicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294196009",
    display: "Alergia al jabón de metales alcalinos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294197000",
    display: "Alergia astringente",
  },
  {
    system: "http://snomed.info/sct",
    code: "294198005",
    display: "Alergia astringente de aluminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294199002",
    display: "Alergia al selenio tópico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294200004",
    display: "Alergia al crotamitón",
  },
  {
    system: "http://snomed.info/sct",
    code: "294201000",
    display: "Alergia al ácido salicílico tópico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294202007",
    display: "Alergia a agentes abrasivos tópicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294203002",
    display: "Alergia al peróxido de benzoilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294204008",
    display: "Alergia al nitrato de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "294206005",
    display: "Alergia al ácido gamolénico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294207001",
    display: "alergia a los retinoides",
  },
  {
    system: "http://snomed.info/sct",
    code: "294208006",
    display: "Alergia al etretinato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294209003",
    display: "alergia a la acitretina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294210008",
    display: "Alergia a la tretinoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294211007",
    display: "Alergia a la isotretinoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294212000",
    display:
      "Grupos de fármacos que afectan principalmente a la alergia del sistema musculoesquelético",
  },
  {
    system: "http://snomed.info/sct",
    code: "294213005",
    display: "Medicamento para el tratamiento de la alergia a la gota.",
  },
  {
    system: "http://snomed.info/sct",
    code: "294214004",
    display: "Alergia a los alcaloides del colchicum",
  },
  {
    system: "http://snomed.info/sct",
    code: "294215003",
    display: "Alergia a la colchicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294216002",
    display: "Alergia a agentes uricosúricos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294217006",
    display: "alergia al probenecid",
  },
  {
    system: "http://snomed.info/sct",
    code: "294218001",
    display: "Alergia a la sulfinpirazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294219009",
    display: "Alergia al inhibidor de la xantina oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294220003",
    display: "alergia al alopurinol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294221004",
    display: "Alergia a los relajantes del músculo esquelético",
  },
  {
    system: "http://snomed.info/sct",
    code: "294222006",
    display: "Alergia a fármacos de transmisión neuromuscular",
  },
  {
    system: "http://snomed.info/sct",
    code: "294223001",
    display: "Alergia a los relajantes musculares despolarizantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294224007",
    display: "Alergia al suxametonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294225008",
    display: "Alergia a los relajantes musculares no despolarizantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294226009",
    display: "Alergia al mivacurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294227000",
    display: "Alergia al alcuronio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294228005",
    display: "Alergia al atracurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294229002",
    display: "Alergia a la galamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294230007",
    display: "Alergia al pancuronio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294231006",
    display: "Alergia a la tubocurarina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294232004",
    display: "alergia al vecuronio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294233009",
    display: "Alergia al rocuronio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294234003",
    display: "alergia al baclofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294235002",
    display: "Alergia al carisoprodol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294236001",
    display: "Alergia al metocarbamol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294237005",
    display: "alergia al dantroleno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294238000",
    display: "alergia al oro",
  },
  {
    system: "http://snomed.info/sct",
    code: "294239008",
    display: "Alergia al aurotiomalato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294240005",
    display: "Alergia a la auranofina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294241009",
    display: "Alergia a los relajantes del músculo liso",
  },
  {
    system: "http://snomed.info/sct",
    code: "294242002",
    display: "Alergia a la papaverina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294243007",
    display: "Alergia a los flavoxato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294244001",
    display:
      "Grupos de fármacos usados ​​principalmente en obstetricia, ginecología y trastornos del tracto urinario alergia",
  },
  {
    system: "http://snomed.info/sct",
    code: "294245000",
    display: "Alergia a la mifepristona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294246004",
    display: "Alergia a los tensioactivos no iónicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294247008",
    display: "alergia al nonoxinol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294248003",
    display: "Alergia al octoxinol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294249006",
    display: "Alergia a las prostaglandinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294250006",
    display: "Una serie de alergia a las prostaglandinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294252003",
    display: "Alergia a las prostaglandinas serie E",
  },
  {
    system: "http://snomed.info/sct",
    code: "294253008",
    display: "Alergia a la dinoprostona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294254002",
    display: "alergia al gemeprost",
  },
  {
    system: "http://snomed.info/sct",
    code: "294255001",
    display: "Alergia alprostadil",
  },
  {
    system: "http://snomed.info/sct",
    code: "294256000",
    display: "Alergia a las prostaglandinas serie F",
  },
  {
    system: "http://snomed.info/sct",
    code: "294257009",
    display: "alergia al dinoprost",
  },
  {
    system: "http://snomed.info/sct",
    code: "294258004",
    display: "Alergia al carboprost",
  },
  {
    system: "http://snomed.info/sct",
    code: "294259007",
    display: "Serie I alergia a las prostaglandinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294260002",
    display: "Alergia al epoprostenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294261003",
    display: "Alergia a los terpenos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294262005",
    display: "Alergia a agentes quelantes y antídotos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294263000",
    display: "Alergia al antídoto",
  },
  {
    system: "http://snomed.info/sct",
    code: "294264006",
    display: "Alergia a la ipecacuana",
  },
  {
    system: "http://snomed.info/sct",
    code: "294265007",
    display: "Alergia al carbón activado",
  },
  {
    system: "http://snomed.info/sct",
    code: "294266008",
    display: "Alergia al nitrito de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294268009",
    display: "Alergia a anticuerpos específicos de digoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294269001",
    display: "alergia a la mesna",
  },
  {
    system: "http://snomed.info/sct",
    code: "294270000",
    display: "Alergia al antagonista de las benzodiazepinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294271001",
    display: "Alergia al flumazenilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294272008",
    display: "Alergia al reactivador de colinesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294273003",
    display: "Alergia a la pralidoxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294274009",
    display: "Alergia al antídoto para quemaduras con ácido fluorhídrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294275005",
    display: "Alergia a los antagonistas de los opioides",
  },
  {
    system: "http://snomed.info/sct",
    code: "294276006",
    display: "alergia a la naltrexona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294277002",
    display: "Alergia a la naloxona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294278007",
    display: "alergia a la protamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294279004",
    display: "Antídotos para la alergia a los pesticidas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294280001",
    display: "Alergia al polvo de tierra de batán",
  },
  {
    system: "http://snomed.info/sct",
    code: "294281002",
    display: "Alergia al polvo de bentonita",
  },
  {
    system: "http://snomed.info/sct",
    code: "294282009",
    display: "Alergia a agentes quelantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294283004",
    display: "Alergia al dimercaprol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294284005",
    display: "Alergia a la deferoxamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294285006",
    display: "alergia al edetato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294286007",
    display: "Alergia al edetato de dicobalto",
  },
  {
    system: "http://snomed.info/sct",
    code: "294287003",
    display: "Alergia al edetato de sodio y calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294288008",
    display: "Alergia al edetato trisódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294289000",
    display: "Alergia al edetato de disodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294290009",
    display: "Alergia a la trientina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294291008",
    display: "Alergia a la penicilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294293006",
    display: "Alergia a medicamentos homeopáticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294295004",
    display: "Alergia a las hierbas medicinales",
  },
  {
    system: "http://snomed.info/sct",
    code: "294297007",
    display: "Alergia al hialuronato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294298002",
    display: "alergia a la glicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294299005",
    display: "Alergia al líquido de diálisis",
  },
  {
    system: "http://snomed.info/sct",
    code: "294300002",
    display: "Alergia a la solución de diálisis peritoneal",
  },
  {
    system: "http://snomed.info/sct",
    code: "294301003",
    display: "Alergia al líquido de hemodiálisis",
  },
  {
    system: "http://snomed.info/sct",
    code: "294302005",
    display: "Alergia a la solución de hemofiltración",
  },
  {
    system: "http://snomed.info/sct",
    code: "294304006",
    display: "Alergia a la solución de cardioplejia",
  },
  {
    system: "http://snomed.info/sct",
    code: "294306008",
    display: "Alergia al dimetiléter propano",
  },
  {
    system: "http://snomed.info/sct",
    code: "294307004",
    display: "Alergia al citrato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294308009",
    display: "Alergia a la preparación de hemorroides",
  },
  {
    system: "http://snomed.info/sct",
    code: "294309001",
    display: "Alergia al preparado para eliminar la cera del oído",
  },
  {
    system: "http://snomed.info/sct",
    code: "294310006",
    display: "Alergia al potasio tópico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294311005",
    display: "Alergia tópica al zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "294312003",
    display: "Alergia a preparaciones orofaríngeas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294313008",
    display: "alergia a la saliva artificial",
  },
  {
    system: "http://snomed.info/sct",
    code: "294315001",
    display: "Alergia fija al aceite",
  },
  {
    system: "http://snomed.info/sct",
    code: "294316000",
    display: "alergia al aceite de oliva",
  },
  {
    system: "http://snomed.info/sct",
    code: "294317009",
    display: "Alergia al aceite de cacahuete",
  },
  {
    system: "http://snomed.info/sct",
    code: "294318004",
    display: "Alergia al aceite de ricino",
  },
  {
    system: "http://snomed.info/sct",
    code: "294319007",
    display: "Alergia al glicerol/glicol/macrogol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294320001",
    display: "alergia al glicerol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294321002",
    display: "Alergia al lubricante",
  },
  {
    system: "http://snomed.info/sct",
    code: "294322009",
    display: "Alergia de base",
  },
  {
    system: "http://snomed.info/sct",
    code: "294324005",
    display: "alergia a la parafina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294325006",
    display: "Alergia blanda a la parafina amarilla",
  },
  {
    system: "http://snomed.info/sct",
    code: "294326007",
    display: "Alergia blanda a la parafina blanca",
  },
  {
    system: "http://snomed.info/sct",
    code: "294327003",
    display: "Alergia a la parafina liquida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294328008",
    display: "alergia a la silicona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294329000",
    display: "alergia a la dimeticona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294330005",
    display: "Alergia al alcohol de lana",
  },
  {
    system: "http://snomed.info/sct",
    code: "294331009",
    display: "Alergia al modificador de viscosidad",
  },
  {
    system: "http://snomed.info/sct",
    code: "294332002",
    display: "Alergia al alcohol polivinílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294333007",
    display: "Alergia al carbómero 940",
  },
  {
    system: "http://snomed.info/sct",
    code: "294334001",
    display: "Alergia al modificador de viscosidad derivado de la celulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294335000",
    display: "Alergia a la hipromelosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294336004",
    display: "Alergia al colirio de hipromelosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294337008",
    display: "Alergia a la hidroxietilcelulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294339006",
    display: "Alergia a la carmelosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294340008",
    display: "Alergia a medicamentos antimicóticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294341007",
    display: "Alergia a la flucitosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294342000",
    display: "Alergia a la terbinafina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294343005",
    display: "Alergia a los nitrofenoles",
  },
  {
    system: "http://snomed.info/sct",
    code: "294344004",
    display: "Alergia al tolnaftato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294346002",
    display: "Alergia a la amorolfina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294348001",
    display: "Alergia a la griseofulvina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294349009",
    display: "Alergia a la anfotericina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294350009",
    display: "Alergia a la natamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294351008",
    display: "Alergia a la nistatina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294352001",
    display: "Alergia a los antifúngicos azoles",
  },
  {
    system: "http://snomed.info/sct",
    code: "294354000",
    display: "Alergia a los undecenoatos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294355004",
    display: "Alergia antifúngica imidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294356003",
    display: "alergia al clotrimazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294357007",
    display: "Alergia al fenticonazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294358002",
    display: "Alergia al tioconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294359005",
    display: "Alergia al econazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294360000",
    display: "Alergia al isoconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294361001",
    display: "alergia al sulconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294362008",
    display: "Alergia al ketoconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294363003",
    display: "Alergia al miconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294364009",
    display: "Alergia a los antifúngicos triazoles",
  },
  {
    system: "http://snomed.info/sct",
    code: "294365005",
    display: "Alergia al fluconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294366006",
    display: "Alergia al itraconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294367002",
    display: "Alergia a medicamentos antivirales",
  },
  {
    system: "http://snomed.info/sct",
    code: "294368007",
    display: "Alergia a la inosina pranobex",
  },
  {
    system: "http://snomed.info/sct",
    code: "294369004",
    display: "Alergia a la zidovudina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294370003",
    display: "alergia al ganciclovir",
  },
  {
    system: "http://snomed.info/sct",
    code: "294371004",
    display: "alergia al famciclovir",
  },
  {
    system: "http://snomed.info/sct",
    code: "294372006",
    display: "Alergia a la didanosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294373001",
    display: "Alergia a la zalcitabina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294374007",
    display: "Alergia al valaciclovir",
  },
  {
    system: "http://snomed.info/sct",
    code: "294375008",
    display: "Alergia a los interferones",
  },
  {
    system: "http://snomed.info/sct",
    code: "294376009",
    display: "Alergia humana al interferón gamma-1b",
  },
  {
    system: "http://snomed.info/sct",
    code: "294377000",
    display: "Alergia al interferón-A-2a",
  },
  {
    system: "http://snomed.info/sct",
    code: "294378005",
    display: "Alergia al interferón-A-2b",
  },
  {
    system: "http://snomed.info/sct",
    code: "294379002",
    display: "Alergia al interferón-A-N1",
  },
  {
    system: "http://snomed.info/sct",
    code: "294380004",
    display: "Alergia a la ribavirina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294381000",
    display: "Alergia a la trifluorotimidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294382007",
    display: "alergia al foscarnet",
  },
  {
    system: "http://snomed.info/sct",
    code: "294383002",
    display: "Alergia a la vidarabina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294384008",
    display: "alergia al aciclovir",
  },
  {
    system: "http://snomed.info/sct",
    code: "294385009",
    display: "Alergia a la idoxuridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294386005",
    display: "Idoxuridina en la alergia al dimetilsulfóxido",
  },
  {
    system: "http://snomed.info/sct",
    code: "294387001",
    display: "Alergia a medicamentos antipalúdicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294388006",
    display: "alergia a la pirimetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294389003",
    display: "Alergia a los antipalúdicos con aminoquinolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294390007",
    display: "Alergia a la amodiaquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294391006",
    display: "Alergia a la primaquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294392004",
    display: "Alergia a la mefloquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294393009",
    display: "Alergia a la hidroxicloroquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294394003",
    display: "alergia a la cloroquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294395002",
    display: "Alergia antipalúdica biguanida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294396001",
    display: "Alergia al proguanil",
  },
  {
    system: "http://snomed.info/sct",
    code: "294397005",
    display: "Alergia antipalúdica a la cinchona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294398000",
    display: "alergia a la quinina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294399008",
    display: "Alergia a la halofantrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294400001",
    display: "Alergia a la mepacrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294401002",
    display: "Alergia a la vacuna lactobacilo acidófilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294402009",
    display: "Alergia a los preparados nasales antiinfecciosos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294403004",
    display: "Alergia a los desinfectantes y limpiadores",
  },
  {
    system: "http://snomed.info/sct",
    code: "294404005",
    display: "Alergia al ácido acético",
  },
  {
    system: "http://snomed.info/sct",
    code: "294405006",
    display: "Alergia al hidrargafeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294406007",
    display: "Alergia a la polinoxilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294407003",
    display: "alergia a la hexetidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294408008",
    display: "Alergia al perborato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294409000",
    display: "alergia a las soluciones cloradas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294410005",
    display: "Alergia al permanganato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294411009",
    display:
      "Alergia a las gasas impregnadas de subnitrato de bismuto y pasta de yodoformo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294412002",
    display: "Alergia a los fenólicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294413007",
    display: "alergia al timol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294414001",
    display: "Alergia al desinfectante de fenol clorado",
  },
  {
    system: "http://snomed.info/sct",
    code: "294415000",
    display: "alergia al cloroxilenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294416004",
    display: "Alergia al hexaclorofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294417008",
    display: "Alergia al triclosán",
  },
  {
    system: "http://snomed.info/sct",
    code: "294418003",
    display: "Alergia al fenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294419006",
    display: "Alergia a los desinfectantes alcohólicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294420000",
    display: "Alergia a productos alcohólicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294421001",
    display: "Alergia al alcohol desnaturalizado industrial",
  },
  {
    system: "http://snomed.info/sct",
    code: "294422008",
    display: "Alergia al desinfectante de aldehídos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294423003",
    display: "Alergia al glutaraldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "294425005",
    display: "Alergia a la noxitiolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294426006",
    display: "Alergia al formaldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "294427002",
    display: "Alergia a los desinfectantes de amidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294428007",
    display: "Alergia al isetionato de propamidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294429004",
    display: "Alergia al isetionato de dibrompropamidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294430009",
    display: "Alergia al desinfectante biguanida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294431008",
    display: "Alergia a la clorhexidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294432001",
    display: "Alergia al clorhidrato de clorhexidina y al sulfato de neomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294433006",
    display: "Alergia al borato",
  },
  {
    system: "http://snomed.info/sct",
    code: "294434000",
    display: "Alergia al ácido bórico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294435004",
    display: "Alergia al surfactante catiónico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294436003",
    display: "Alergia al surfactante de amonio cuaternario",
  },
  {
    system: "http://snomed.info/sct",
    code: "294437007",
    display: "Alergia a la cetrimida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294438002",
    display: "Alergia al benzalconio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294439005",
    display: "Alergia a Domiphen",
  },
  {
    system: "http://snomed.info/sct",
    code: "294440007",
    display: "Alergia al surfactante de piridinio cuaternario",
  },
  {
    system: "http://snomed.info/sct",
    code: "294441006",
    display: "Alergia al cetilpiridinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294442004",
    display: "Alergia al surfactante de quinolinio cuaternario",
  },
  {
    system: "http://snomed.info/sct",
    code: "294443009",
    display: "Alergia al decualinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294444003",
    display: "Alergia a los colorantes desinfectantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "294445002",
    display: "Alergia al colorante desinfectante azo de acridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294446001",
    display: "Alergia al colorante desinfectante trifenilmetano azo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294447005",
    display: "Alergia a la violeta de cristal",
  },
  {
    system: "http://snomed.info/sct",
    code: "294448000",
    display: "alergia verde brillante",
  },
  {
    system: "http://snomed.info/sct",
    code: "294449008",
    display: "Alergia al peróxido de hidrógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294450008",
    display: "Alergia a los antihelmínticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294451007",
    display: "Alergia a la piperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294452000",
    display: "Alergia al pirantel",
  },
  {
    system: "http://snomed.info/sct",
    code: "294453005",
    display: "Alergia a la niclosamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294455003",
    display: "Alergia al befenio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294456002",
    display: "Alergia a la dietilcarbamazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294457006",
    display: "Alergia antihelmíntica bencimidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294458001",
    display: "Alergia al mebendazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294459009",
    display: "Alergia al albendazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294460004",
    display: "Alergia al tiabendazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294461000",
    display: "Alergia a medicamentos antibacterianos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294462007",
    display: "Alergia a los aminoglucósidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294463002",
    display: "alergia a la amikacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294464008",
    display: "alergia a la kanamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294465009",
    display: "Alergia a la netilmicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294466005",
    display: "alergia a la estreptomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294467001",
    display: "Alergia a la framicetina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294468006",
    display: "Alergia a la neomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294469003",
    display: "alergia a la gentamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294470002",
    display: "Alergia a la tobramicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294471003",
    display: "Alergia a la claritromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294472005",
    display: "Alergia a la azitromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294473000",
    display: "Alergia al fusidato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294474006",
    display: "Alergia a la espectinomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294475007",
    display: "Alergia a la vancomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294476008",
    display: "Alergia a la teicoplanina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294477004",
    display: "Alergia a la trimetoprima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294478009",
    display: "Alergia a la nitrofurantoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294479001",
    display: "Alergia al hipurato de metenamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294480003",
    display: "Alergia a la mupirocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294481004",
    display: "Alergia a la nitrofurazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294482006",
    display: "Alergia al ácido fusídico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294483001",
    display: "alergia a las 4-quinolonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294484007",
    display: "Alergia a la acrosoxacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294485008",
    display: "Alergia a la cinoxacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294486009",
    display: "Alergia al ácido nalidíxico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294487000",
    display: "Alergia a la ciprofloxacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294488005",
    display: "alergia a la enoxacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294489002",
    display: "alergia a la ofloxacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294490006",
    display: "Alergia a la norfloxacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294491005",
    display: "alergia al temafloxacino",
  },
  {
    system: "http://snomed.info/sct",
    code: "294492003",
    display: "Alergia a las penicilinas sensibles a la penicilinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294494002",
    display: "Alergia a la penicilina benetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294495001",
    display: "Alergia a la penicilina benzatínica",
  },
  {
    system: "http://snomed.info/sct",
    code: "294496000",
    display: "alergia a la feneticilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294497009",
    display: "Alergia a la fenoximetilpenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294498004",
    display: "Alergia a la bencilpenicilina procaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "294499007",
    display: "Alergia a la bencilpenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294500003",
    display: "Alergia a las penicilinas resistentes a la penicilinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "294501004",
    display: "Alergia a la cloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294502006",
    display: "Alergia a la flucloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294503001",
    display: "alergia a la meticilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294504007",
    display: "Alergia a las penicilinas de amplio espectro",
  },
  {
    system: "http://snomed.info/sct",
    code: "294505008",
    display: "alergia a la amoxicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294506009",
    display: "alergia a la ampicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294507000",
    display: "Alergia a la ciclacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294508005",
    display: "Alergia a la mezlocilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294509002",
    display: "Alergia a la pivampicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294510007",
    display: "Alergia a la carbenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294511006",
    display: "Alergia a la bacampicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294512004",
    display: "Alergia a la talampicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294513009",
    display: "Alergia a las penicilinas antipseudomónicas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294514003",
    display: "Alergia a la temocilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294515002",
    display: "alergia a la piperacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294516001",
    display: "Alergia a la azlocilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294517005",
    display: "Alergia a la ticarcilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294518000",
    display: "Alergia a la carfecilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294519008",
    display: "alergia al mecilinam",
  },
  {
    system: "http://snomed.info/sct",
    code: "294520002",
    display: "Alergia al pivmecilinam",
  },
  {
    system: "http://snomed.info/sct",
    code: "294521003",
    display: "Alergia a preparados combinados de penicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294522005",
    display: "Alergia a la ampicilina y cloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294523000",
    display: "Alergia a amoxicilina + clavulanato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294524006",
    display: "Alergia a ampicilina + floxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294525007",
    display: "Alergia a piperacilina y tazobactam",
  },
  {
    system: "http://snomed.info/sct",
    code: "294526008",
    display: "Alergia a pivampicilina y pivmecilinam",
  },
  {
    system: "http://snomed.info/sct",
    code: "294527004",
    display: "Alergia a la ticarcilina y al ácido clavulánico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294528009",
    display: "Alergia a las polimixinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294529001",
    display: "alergia a la colistina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294530006",
    display: "Alergia a la polimixina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "294531005",
    display: "Alergia a los carbapenémicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294532003",
    display: "Alergia a las cefalosporinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294533008",
    display: "Alergia a las cefalosporinas de primera generación",
  },
  {
    system: "http://snomed.info/sct",
    code: "294534002",
    display: "Alergia al cefadroxilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "294535001",
    display: "Alergia a la cefalexina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294536000",
    display: "Alergia a las cefalotinas",
  },
  {
    system: "http://snomed.info/sct",
    code: "294537009",
    display: "Alergia a la cefazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294538004",
    display: "Alergia a la cefradina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294539007",
    display: "Alergia a latamoxef",
  },
  {
    system: "http://snomed.info/sct",
    code: "294540009",
    display: "Alergia a las cefalosporinas de segunda generación",
  },
  {
    system: "http://snomed.info/sct",
    code: "294541008",
    display: "Alergia a cefaclor",
  },
  {
    system: "http://snomed.info/sct",
    code: "294542001",
    display: "Alergia a la cefuroxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294543006",
    display: "Alergia a cefamandol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294544000",
    display: "Alergia a las cefalosporinas de tercera generación",
  },
  {
    system: "http://snomed.info/sct",
    code: "294545004",
    display: "Alergia a la cefotaxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294546003",
    display: "Alergia a la ceftazidima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294547007",
    display: "Alergia a la ceftizoxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294548002",
    display: "alergia a la cefixima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294549005",
    display: "Alergia a cefodizima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294550005",
    display: "Alergia a la cefpodoxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "294551009",
    display: "Alergia a la ceftriaxona",
  },
  {
    system: "http://snomed.info/sct",
    code: "294552002",
    display: "Alergia al ceftibuteno",
  },
  {
    system: "http://snomed.info/sct",
    code: "294554001",
    display: "Alergia a la cefsulodina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294555000",
    display: "Alergia a las cefalosporinas de cuarta generación",
  },
  {
    system: "http://snomed.info/sct",
    code: "294556004",
    display: "Alergia a cepiroma",
  },
  {
    system: "http://snomed.info/sct",
    code: "294557008",
    display: "Alergia a la cefamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294558003",
    display: "Alergia a la cefoxitina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294559006",
    display: "Alergia a la fosfomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294560001",
    display: "Alergia a la lincomicina y derivados",
  },
  {
    system: "http://snomed.info/sct",
    code: "294561002",
    display: "alergia a la clindamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294562009",
    display: "Alergia a la lincomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294563004",
    display: "Alergia al ácido mandélico",
  },
  {
    system: "http://snomed.info/sct",
    code: "294564005",
    display: "Alergia a monobactámicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "294565006",
    display: "alergia al aztreonam",
  },
  {
    system: "http://snomed.info/sct",
    code: "294566007",
    display: "Alergia al nitroimidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294567003",
    display: "alergia al metronidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294568008",
    display: "Alergia al tinidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294569000",
    display: "Alergia al nimorazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294570004",
    display: "Alergia al sulfaloxato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "294571000",
    display: "Alergia al ftalilsulfatiazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294572007",
    display: "Alergia a la sulfametopirazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294573002",
    display: "Alergia a la sulfadiazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294574008",
    display: "Alergia a la sulfadimetoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294575009",
    display: "Alergia a la sulfadimidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294576005",
    display: "Alergia al sulfafurazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "294577001",
    display: "Alergia a la sulfaguanidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "294578006",
    display: "Alergia a la sulfaurea",
  },
  {
    system: "http://snomed.info/sct",
    code: "294579003",
    display: "Alergia a la mafenida",
  },
  {
    system: "http://snomed.info/sct",
    code: "294580000",
    display: "Alergia a la sulfadiazina de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "294581001",
    display: "Alergia a las sulfonamidas combinadas",
  },
  {
    system: "http://snomed.info/sct",
    code: "25744000",
    display: "Intolerancia a la lactosa gastrogénica hereditaria",
  },
  {
    system: "http://snomed.info/sct",
    code: "29512005",
    display:
      "Deficiencia de lactasa en enfermedades distintas del intestino delgado",
  },
  {
    system: "http://snomed.info/sct",
    code: "38032004",
    display: "Déficit ontogénico de lactasa de aparición tardía",
  },
  {
    system: "http://snomed.info/sct",
    code: "54250004",
    display: "Intolerancia a la lactosa en niños sin deficiencia de lactasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "60414003",
    display: "Deficiencia adquirida de lactasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "190751001",
    display: "Intolerancia primaria a la lactosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "52070001",
    display: "Malabsorción adquirida de monosacáridos",
  },
  {
    system: "http://snomed.info/sct",
    code: "237978005",
    display: "intolerancia al glicerol",
  },
  {
    system: "http://snomed.info/sct",
    code: "700094005",
    display: "intolerancia a la leche",
  },
  {
    system: "http://snomed.info/sct",
    code: "409137002",
    display: "Sin antecedentes conocidos de alergia a medicamentos",
  },
  {
    system: "http://snomed.info/sct",
    code: "428197003",
    display: "Sin alergia a insectos conocida",
  },
  {
    system: "http://snomed.info/sct",
    code: "428607008",
    display: "Sin alergia ambiental conocida",
  },
  {
    system: "http://snomed.info/sct",
    code: "429625007",
    display: "Sin alergia alimentaria conocida",
  },
  {
    system: "http://snomed.info/sct",
    code: "716184000",
    display: "Sin alergia al látex conocida",
  },
  {
    system: "http://snomed.info/sct",
    code: "716220001",
    display: "Sin alergia animal conocida",
  },
];
const stringSustancias = [
  {
    system: "http://snomed.info/sct",
    code: "102002",
    display: "Hemoglobina Okaloosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "120006",
    display: "racemasa de ornitina",
  },
  {
    system: "http://snomed.info/sct",
    code: "125001",
    display: "Sulfato ferroso Fe^59^",
  },
  {
    system: "http://snomed.info/sct",
    code: "126000",
    display:
      "Galactosil-N-acetilglucosaminilgalactosilglucosilceramida alfa-galactosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "130002",
    display: "Hemoglobina Hopkins-II",
  },
  {
    system: "http://snomed.info/sct",
    code: "131003",
    display: "Dolichyl-fosfato manosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "159002",
    display: "sal de ferrocianuro",
  },
  {
    system: "http://snomed.info/sct",
    code: "164003",
    display: "Fosfoenolpiruvato-proteína fosfotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "178002",
    display: "Uridil difosfato galactosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "186002",
    display: "antígeno HLA-Cw9",
  },
  {
    system: "http://snomed.info/sct",
    code: "187006",
    display: "Cianocobalamina Co^57^",
  },
  { system: "http://snomed.info/sct", code: "200001", display: "Berberina" },
  {
    system: "http://snomed.info/sct",
    code: "217008",
    display: "Antígeno del grupo sanguíneo IH",
  },
  {
    system: "http://snomed.info/sct",
    code: "231008",
    display: "3-hidroxiisobutirato deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "238002", display: "heptacloro" },
  {
    system: "http://snomed.info/sct",
    code: "261000",
    display: "fosfato de codeína",
  },
  { system: "http://snomed.info/sct", code: "296000", display: "cumacloro" },
  {
    system: "http://snomed.info/sct",
    code: "322006",
    display: "octilfenoxi PH etanol",
  },
  { system: "http://snomed.info/sct", code: "327000", display: "^76^Arsénico" },
  {
    system: "http://snomed.info/sct",
    code: "329002",
    display: "^127^Antimonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "336001",
    display: "Fibrinógeno Tokio II",
  },
  {
    system: "http://snomed.info/sct",
    code: "340005",
    display: "variante enzimática",
  },
  {
    system: "http://snomed.info/sct",
    code: "363000",
    display: "Fibrinógeno San Juan",
  },
  {
    system: "http://snomed.info/sct",
    code: "370000",
    display: "beta>2S< glicoproteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "371001",
    display: "Acilcarnitina hidrolasa",
  },
  { system: "http://snomed.info/sct", code: "377002", display: "Esparteína" },
  {
    system: "http://snomed.info/sct",
    code: "392001",
    display: "^151^Gadolinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "395004",
    display: "pentámero de inmunoglobulina",
  },
  {
    system: "http://snomed.info/sct",
    code: "412004",
    display: "Ribosa-5-fosfato isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "424006",
    display: "Citramalil-CoA liasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "425007",
    display: "Hemoglobina Nagoya",
  },
  {
    system: "http://snomed.info/sct",
    code: "432003",
    display: "ácido carmínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "438004",
    display: "2-hidroxiglutarato deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "462009",
    display: "Ureasa (ATP-hidrolizante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "472007",
    display: "Fibra textil vegetal",
  },
  {
    system: "http://snomed.info/sct",
    code: "476005",
    display: "CD1b - Grupo de antígeno de diferenciación 1b",
  },
  { system: "http://snomed.info/sct", code: "498001", display: "Nitrilasa" },
  {
    system: "http://snomed.info/sct",
    code: "501001",
    display: "Anticuerpo de grupo sanguíneo Sf^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "505005",
    display: "Anticuerpo de grupo sanguíneo M",
  },
  {
    system: "http://snomed.info/sct",
    code: "506006",
    display: "3-oxoesteroide delta^1^-deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "515004",
    display: "Antígeno del grupo sanguíneo Giaigue",
  },
  {
    system: "http://snomed.info/sct",
    code: "519005",
    display: "Proteína S libre",
  },
  {
    system: "http://snomed.info/sct",
    code: "521000",
    display: "^197^mercurio",
  },
  { system: "http://snomed.info/sct", code: "529003", display: "guanosina" },
  {
    system: "http://snomed.info/sct",
    code: "538001",
    display: "2,3-Dihidroxibenzoato 3,4-dioxigenasa",
  },
  { system: "http://snomed.info/sct", code: "566009", display: "acrosina" },
  {
    system: "http://snomed.info/sct",
    code: "576007",
    display: "Anticuerpo del grupo sanguíneo Pato",
  },
  {
    system: "http://snomed.info/sct",
    code: "578008",
    display: "Hemoglobina Jianghua",
  },
  {
    system: "http://snomed.info/sct",
    code: "584006",
    display: "Anticuerpo de grupo sanguíneo Wr^b^",
  },
  {
    system: "http://snomed.info/sct",
    code: "585007",
    display: "SP - Sustancia P",
  },
  {
    system: "http://snomed.info/sct",
    code: "591009",
    display: "2-Oxoisovalerato deshidrogenasa (acilante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "593007",
    display: "Anticuerpo de grupo sanguíneo Holmes",
  },
  {
    system: "http://snomed.info/sct",
    code: "594001",
    display: "2-oxoglutarato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "597008",
    display: "^247^Californio",
  },
  {
    system: "http://snomed.info/sct",
    code: "604000",
    display: "Glucósido de sapogenina vegetal",
  },
  {
    system: "http://snomed.info/sct",
    code: "611001",
    display: "Hipurato hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "620005",
    display: "Triclorofenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "648005",
    display: "aceite de cálamo",
  },
  {
    system: "http://snomed.info/sct",
    code: "662003",
    display: "Aeromonas proteolytica aminopeptidasa",
  },
  { system: "http://snomed.info/sct", code: "668004", display: "^185^Osmio" },
  {
    system: "http://snomed.info/sct",
    code: "683009",
    display: "acetato de mercurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "686001",
    display: "Plastoquinol-plastocianina reductasa",
  },
  { system: "http://snomed.info/sct", code: "693002", display: "tricoteceno" },
  {
    system: "http://snomed.info/sct",
    code: "698006",
    display: "lactobionato de eritromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "699003",
    display: "Extracto de alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "704006",
    display: "Antígeno de grupo sanguíneo Rx",
  },
  {
    system: "http://snomed.info/sct",
    code: "732002",
    display: "N-valaldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "735000",
    display: "Antígeno del grupo sanguíneo Jobbins",
  },
  { system: "http://snomed.info/sct", code: "747006", display: "Oxamniquina" },
  {
    system: "http://snomed.info/sct",
    code: "773001",
    display: "Hemoglobina M-Iwate",
  },
  { system: "http://snomed.info/sct", code: "785009", display: "dextranasa" },
  {
    system: "http://snomed.info/sct",
    code: "804003",
    display: "ácido creosótico",
  },
  {
    system: "http://snomed.info/sct",
    code: "819002",
    display: "anticuerpo lítico",
  },
  {
    system: "http://snomed.info/sct",
    code: "850000",
    display: "Stizolobato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "859004",
    display: "Péptido-N^4^-(N-acetil-b-glucosaminil) asparagina amidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "860009",
    display: "Inmunoglobulina, agregada",
  },
  { system: "http://snomed.info/sct", code: "873008", display: "uretano" },
  { system: "http://snomed.info/sct", code: "876000", display: "antígeno D" },
  {
    system: "http://snomed.info/sct",
    code: "877009",
    display: "Carboxipeptidasa A",
  },
  {
    system: "http://snomed.info/sct",
    code: "889006",
    display: "[Acetil-CoA carboxilasa] quinasa",
  },
  { system: "http://snomed.info/sct", code: "896008", display: "Hielo" },
  {
    system: "http://snomed.info/sct",
    code: "905001",
    display: "o-dihidroxicumarina O^7^-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "923009",
    display: "Complemento componente 2",
  },
  {
    system: "http://snomed.info/sct",
    code: "925002",
    display: "Yodipamida de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "963005",
    display: "Piridoxina 4-deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "974001",
    display: "Adenosilmetionina descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "979006",
    display: "Carbamato quinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "993004",
    display: "compuesto de paladio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1002007",
    display: "Manonotetraosa 2-alfa-N-acetilglucosaminiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1010008",
    display: "N-acetilneuraminato monooxigenasa",
  },
  { system: "http://snomed.info/sct", code: "1018001", display: "nornicotina" },
  {
    system: "http://snomed.info/sct",
    code: "1025008",
    display: "^93^Molibdeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "1047008",
    display: "Guanina desaminasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1050006",
    display: "Melilotato 3-monooxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1057009",
    display: "sal de fosfato",
  },
  {
    system: "http://snomed.info/sct",
    code: "1065007",
    display: "Proteinasa periplásmica de E. coli",
  },
  { system: "http://snomed.info/sct", code: "1080001", display: "^202^Talio" },
  {
    system: "http://snomed.info/sct",
    code: "1091008",
    display: "Inhibidor del factor de coagulación",
  },
  {
    system: "http://snomed.info/sct",
    code: "1097007",
    display: "Antígeno del grupo sanguíneo M^A^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1105007",
    display: "Isocorismato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1113008",
    display: "Ribonucleasa pancreática",
  },
  { system: "http://snomed.info/sct", code: "1137008", display: "^240^Uranio" },
  {
    system: "http://snomed.info/sct",
    code: "1149009",
    display: "Hemoglobina Barcelona",
  },
  {
    system: "http://snomed.info/sct",
    code: "1160000",
    display: "Anticuerpo contra antígeno en sistema ISBT LU",
  },
  {
    system: "http://snomed.info/sct",
    code: "1166006",
    display: "Ti - Titanio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1169004",
    display: "Hemoglobina Gower-2",
  },
  {
    system: "http://snomed.info/sct",
    code: "1171004",
    display: "Fibrinógeno Kawaguchi",
  },
  {
    system: "http://snomed.info/sct",
    code: "1185009",
    display: "Hemoglobina Roseau-Pointe à Pitre",
  },
  {
    system: "http://snomed.info/sct",
    code: "1189003",
    display: "Hemoglobina FM-Osaka",
  },
  {
    system: "http://snomed.info/sct",
    code: "1190007",
    display: "mefenoxalona",
  },
  {
    system: "http://snomed.info/sct",
    code: "1219001",
    display: "Disulfuro de dietil xantógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "1223009",
    display: "Antígeno del grupo sanguíneo Marcas",
  },
  {
    system: "http://snomed.info/sct",
    code: "1244009",
    display: "Fibrinógeno Madrid I",
  },
  {
    system: "http://snomed.info/sct",
    code: "1248007",
    display: "Proteinasa neutra de leucostoma",
  },
  {
    system: "http://snomed.info/sct",
    code: "1269009",
    display: "Sulfato de amikacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1272002",
    display: "Pteridina oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1273007",
    display: "Anticuerpo del grupo sanguíneo Evelyn",
  },
  {
    system: "http://snomed.info/sct",
    code: "1313002",
    display: "Nitrato reductasa (citocromo)",
  },
  {
    system: "http://snomed.info/sct",
    code: "1319003",
    display: "Anticuerpo de grupo sanguíneo K18",
  },
  {
    system: "http://snomed.info/sct",
    code: "1320009",
    display: "Hemoglobina Manitoba",
  },
  {
    system: "http://snomed.info/sct",
    code: "1325004",
    display: "yoduro de metocurina",
  },
  { system: "http://snomed.info/sct", code: "1331001", display: "metamidofos" },
  {
    system: "http://snomed.info/sct",
    code: "1334009",
    display: "receptor de estradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "1336006",
    display: "desoxicortona",
  },
  {
    system: "http://snomed.info/sct",
    code: "1341003",
    display: "Hemoglobina Ta-li",
  },
  {
    system: "http://snomed.info/sct",
    code: "1346008",
    display: "Tinción de eosina con tono azul",
  },
  {
    system: "http://snomed.info/sct",
    code: "1355006",
    display: "Factor de coagulación IX Oxford 3 variante",
  },
  { system: "http://snomed.info/sct", code: "1368003", display: "yodo 131" },
  {
    system: "http://snomed.info/sct",
    code: "1371006",
    display: "Antígeno del grupo sanguíneo Grande",
  },
  {
    system: "http://snomed.info/sct",
    code: "1373009",
    display: "^93^Zirconio",
  },
  { system: "http://snomed.info/sct", code: "1381005", display: "^126^Yodo" },
  {
    system: "http://snomed.info/sct",
    code: "1394007",
    display: "Pentacarbonilo de hierro",
  },
  { system: "http://snomed.info/sct", code: "1396009", display: "Actinio" },
  {
    system: "http://snomed.info/sct",
    code: "1405004",
    display: "Anticuerpo de grupo sanguíneo M^e^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1408002",
    display: "Anticuerpo de grupo sanguíneo 1123K",
  },
  {
    system: "http://snomed.info/sct",
    code: "1416006",
    display: "compuesto de radio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1450002",
    display: "Metilpentinol",
  },
  {
    system: "http://snomed.info/sct",
    code: "1466000",
    display: "ciclomaltodextrinasa",
  },
  { system: "http://snomed.info/sct", code: "1471007", display: "Elastina" },
  {
    system: "http://snomed.info/sct",
    code: "1472000",
    display: "Adenosina-fosfato desaminasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1476002",
    display: "sulfato de codeína",
  },
  {
    system: "http://snomed.info/sct",
    code: "1477006",
    display: "Hemoglobina Yatsushiro",
  },
  {
    system: "http://snomed.info/sct",
    code: "1496005",
    display: "Proto-oncogén",
  },
  {
    system: "http://snomed.info/sct",
    code: "1506001",
    display: "CH1 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "1517000",
    display: "HLA - Antígeno leucocitario humano B21",
  },
  {
    system: "http://snomed.info/sct",
    code: "1530004",
    display: "6-carboxihexanoato-coenzima A ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1535009",
    display: "fluoruro de nitrógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "1536005",
    display: "clorhidrato de pargilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1540001",
    display: "radioisótopo de telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "1545006",
    display: "Uridina fosforilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1557002",
    display: "polvo de talco",
  },
  {
    system: "http://snomed.info/sct",
    code: "1565004",
    display: "Anticuerpo de grupo sanguíneo Buckalew",
  },
  {
    system: "http://snomed.info/sct",
    code: "1575001",
    display: "tetrapalmitato de maltosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1603001",
    display: "Isótopo de cobalto",
  },
  {
    system: "http://snomed.info/sct",
    code: "1607000",
    display: "Homoserina quinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1609002",
    display: "Sulfóxido de isosafrol de N-octilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "1634002",
    display: "Antígeno del grupo sanguíneo Ven",
  },
  {
    system: "http://snomed.info/sct",
    code: "1649005",
    display: "Antígeno del grupo sanguíneo Sul",
  },
  {
    system: "http://snomed.info/sct",
    code: "1656004",
    display: "Hemoglobina Shaare Zedek",
  },
  {
    system: "http://snomed.info/sct",
    code: "1660001",
    display: "Semillas de planta",
  },
  { system: "http://snomed.info/sct", code: "1668008", display: "ceforanida" },
  { system: "http://snomed.info/sct", code: "1672007", display: "ligasa" },
  { system: "http://snomed.info/sct", code: "1673002", display: "xilenol" },
  { system: "http://snomed.info/sct", code: "1675009", display: "^86^rubidio" },
  {
    system: "http://snomed.info/sct",
    code: "1676005",
    display: "Anticuerpo de grupo sanguíneo LW^ab^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1681001",
    display: "Anticuerpo de grupo sanguíneo BLe^b^",
  },
  {
    system: "http://snomed.info/sct",
    code: "1696002",
    display: "Ácido 12-hidroxieicosatetraenoico",
  },
  { system: "http://snomed.info/sct", code: "1701009", display: "^191^Oro" },
  {
    system: "http://snomed.info/sct",
    code: "1710001",
    display: "AU - Ácido úrico",
  },
  { system: "http://snomed.info/sct", code: "1726000", display: "Diamante" },
  {
    system: "http://snomed.info/sct",
    code: "1727009",
    display: "Desoxilimonato A-anillo-lactonasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1740004",
    display: "Trifosfato de desoxicitidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1764003",
    display:
      "Sacaropina deshidrogenasa (nicotinamida adenina dinucleótido fosfato ^+^, formador de L-glutamato)",
  },
  {
    system: "http://snomed.info/sct",
    code: "1768000",
    display: "sacarosa fosforilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1786002",
    display: "Ligasa de ácido ribonucleico de transferencia de leucina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1793003",
    display: "Tricloroacetato de sodio",
  },
  { system: "http://snomed.info/sct", code: "1795005", display: "Gliodina" },
  {
    system: "http://snomed.info/sct",
    code: "1798007",
    display: "Hemoglobina Hammersmith",
  },
  {
    system: "http://snomed.info/sct",
    code: "1799004",
    display: "L-lisina oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1823002",
    display: "Hemoglobina Tochigi",
  },
  {
    system: "http://snomed.info/sct",
    code: "1827001",
    display: "Ribonucleasa T>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "1886008",
    display: "Verdoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1904005",
    display: "Galactósido 3-fucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "1914001",
    display: "anticuerpo del factor de von Willebrand",
  },
  {
    system: "http://snomed.info/sct",
    code: "1916004",
    display: "boroglicerina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1940007",
    display: "Inmunoglobulina, alotipo GM>21<",
  },
  {
    system: "http://snomed.info/sct",
    code: "1944003",
    display: "Factor de coagulación X Variante del paciente",
  },
  {
    system: "http://snomed.info/sct",
    code: "1956002",
    display: "clorhidrato de buclizina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1971003",
    display: "clorhidrato de loxapina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1975007",
    display: "Anticuerpo de grupo sanguíneo Niemetz",
  },
  {
    system: "http://snomed.info/sct",
    code: "1978009",
    display:
      "Metiltransferasa específica del sitio (específica de la citosina)",
  },
  { system: "http://snomed.info/sct", code: "1985008", display: "vómito" },
  { system: "http://snomed.info/sct", code: "1991005", display: "Lignina" },
  {
    system: "http://snomed.info/sct",
    code: "2000001",
    display: "Nitrógeno pesado",
  },
  {
    system: "http://snomed.info/sct",
    code: "2006007",
    display: "difosfato de inosina",
  },
  { system: "http://snomed.info/sct", code: "2008008", display: "^67^Galio" },
  {
    system: "http://snomed.info/sct",
    code: "2009000",
    display: "carbonilo de cobalto",
  },
  {
    system: "http://snomed.info/sct",
    code: "2017008",
    display: "topoisomerasa del ácido desoxirribonucleico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2027002",
    display: "Serina proteinasa de Alternaria",
  },
  {
    system: "http://snomed.info/sct",
    code: "2029004",
    display: "Fibrinógeno Oslo II",
  },
  {
    system: "http://snomed.info/sct",
    code: "2038002",
    display: "Anticuerpo de grupo sanguíneo Bg^b^",
  },
  {
    system: "http://snomed.info/sct",
    code: "2039005",
    display: "sim-norspermidina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2050008",
    display: "Clooilglicina hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2064008",
    display: "L-Xiluloquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2082006",
    display: "Cadena alfa del receptor de vitronectina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2085008",
    display: "Proteína oncogen TCL",
  },
  {
    system: "http://snomed.info/sct",
    code: "2088005",
    display: "Página azul G-90 mancha",
  },
  {
    system: "http://snomed.info/sct",
    code: "2096000",
    display:
      "Nicotinamida adenina dinucleótido ^+^ adenosina difosfato-ribosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2100004",
    display: "sulfonetilmetano",
  },
  {
    system: "http://snomed.info/sct",
    code: "2101000",
    display: "Proteinasa B de levadura",
  },
  { system: "http://snomed.info/sct", code: "2125008", display: "Betazol" },
  {
    system: "http://snomed.info/sct",
    code: "2130007",
    display: "Ciclohexano-1,2-diol deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "2141009", display: "Hidrógeno" },
  {
    system: "http://snomed.info/sct",
    code: "2147008",
    display: "Antígeno del grupo sanguíneo Paular",
  },
  {
    system: "http://snomed.info/sct",
    code: "2151005",
    display: "Piridoxamina-piruvato aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2154002",
    display: "tagaturonato reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2159007",
    display: "Rojo ácido 27",
  },
  { system: "http://snomed.info/sct", code: "2163000", display: "dicofol" },
  {
    system: "http://snomed.info/sct",
    code: "2168009",
    display: "Bisfosfoglicerato mutasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2179004",
    display: "Malonato-semialdehído deshidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2189000",
    display: "Hemoglobina F-Dammam",
  },
  { system: "http://snomed.info/sct", code: "2194000", display: "^101^Rodio" },
  {
    system: "http://snomed.info/sct",
    code: "2195004",
    display: "clorhidrato de tocainida",
  },
  {
    system: "http://snomed.info/sct",
    code: "2197007",
    display: "Agente tópico de ácido bórico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2201007",
    display: "Bacteriopurpurina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2208001",
    display: "Fenilserina aldolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2212007",
    display: "Fibrinógeno Bethesda II",
  },
  { system: "http://snomed.info/sct", code: "2215009", display: "Azuresin" },
  {
    system: "http://snomed.info/sct",
    code: "2240002",
    display: "guanidinobutirasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2249001",
    display: "sulfato de gentamicina",
  },
  { system: "http://snomed.info/sct", code: "2254005", display: "Orotato" },
  {
    system: "http://snomed.info/sct",
    code: "2260005",
    display: "Antígeno leucocitario humano DRw18",
  },
  {
    system: "http://snomed.info/sct",
    code: "2262002",
    display: "Polisulfatasa de celulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2264001",
    display: "Isótopo de selenio",
  },
  { system: "http://snomed.info/sct", code: "2309006", display: "Au - Oro" },
  {
    system: "http://snomed.info/sct",
    code: "2311002",
    display: "Prostaciclina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2329007",
    display: "Anticuerpo de grupo sanguíneo Vel",
  },
  { system: "http://snomed.info/sct", code: "2331003", display: "sacárido" },
  { system: "http://snomed.info/sct", code: "2338009", display: "Raíz" },
  { system: "http://snomed.info/sct", code: "2343002", display: "gutión" },
  { system: "http://snomed.info/sct", code: "2346005", display: "Vascormone" },
  {
    system: "http://snomed.info/sct",
    code: "2354007",
    display: "3-Nucleotidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2358005",
    display: "Fragmento de vidrio, dispositivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "2369008",
    display: "Indol-3-acetato beta-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2370009",
    display: "Uridina difosfato-N-acetilmuramato-alanina ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2376003",
    display: "compuesto de mercurio",
  },
  { system: "http://snomed.info/sct", code: "2384004", display: "^230^Uranio" },
  {
    system: "http://snomed.info/sct",
    code: "2404002",
    display: "Anticuerpo de grupo sanguíneo St^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "2405001",
    display: "b- Propiolactona",
  },
  {
    system: "http://snomed.info/sct",
    code: "2414006",
    display: "receptor de prolactina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2430003",
    display: "radioisótopo de silicio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2431004",
    display: "Anticuerpo de grupo sanguíneo Friedberg",
  },
  {
    system: "http://snomed.info/sct",
    code: "2441001",
    display: "Radioisótopo de mercurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2444009",
    display: "Antígeno leucocitario humano Dw25",
  },
  { system: "http://snomed.info/sct", code: "2450004", display: "manosamina" },
  {
    system: "http://snomed.info/sct",
    code: "2462000",
    display:
      "Glucosa deshidrogenasa (nicotinamida adenina dinucleótido fosfato ^+^)",
  },
  {
    system: "http://snomed.info/sct",
    code: "2466002",
    display: "Cloruro peroxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2500009",
    display: "Antígeno linfocitario CDw41b",
  },
  {
    system: "http://snomed.info/sct",
    code: "2509005",
    display: "D-Glutamato oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2516006",
    display: "Compuesto de sulfuro metálico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2522002",
    display: "Sangre extravascular",
  },
  {
    system: "http://snomed.info/sct",
    code: "2529006",
    display: "Hemoglobina Madera",
  },
  {
    system: "http://snomed.info/sct",
    code: "2537003",
    display: "Agente antituberculoso",
  },
  {
    system: "http://snomed.info/sct",
    code: "2568004",
    display: "Antígeno del grupo sanguíneo McAuley",
  },
  {
    system: "http://snomed.info/sct",
    code: "2573005",
    display: "Inmunoglobulina, alotipo GM>13<",
  },
  {
    system: "http://snomed.info/sct",
    code: "2575003",
    display: "Glicoproteína alfa-2 de zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "2595009",
    display: "^119m^Telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2597001",
    display: "Globulina alfa-1",
  },
  {
    system: "http://snomed.info/sct",
    code: "2611008",
    display: "Anticuerpo de grupo sanguíneo La Fave",
  },
  {
    system: "http://snomed.info/sct",
    code: "2637006",
    display: "isótopo de indio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2648004",
    display: "bilis vomito",
  },
  {
    system: "http://snomed.info/sct",
    code: "2649007",
    display: "Azo-colorante",
  },
  {
    system: "http://snomed.info/sct",
    code: "2660003",
    display: "deshidrocolato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2671002",
    display: "3-metil-2-oxobutanoato hidroxi-metiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "2674005", display: "^128^Cesio" },
  { system: "http://snomed.info/sct", code: "2676007", display: "C3(H20)" },
  {
    system: "http://snomed.info/sct",
    code: "2678008",
    display: "Hemoglobina Nuevo México",
  },
  {
    system: "http://snomed.info/sct",
    code: "2680002",
    display: "Anticuerpo del factor XIII",
  },
  { system: "http://snomed.info/sct", code: "2698003", display: "Gas natural" },
  {
    system: "http://snomed.info/sct",
    code: "2705002",
    display: "^72^Arsénico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2706001",
    display: "Antígeno del grupo sanguíneo Vennera",
  },
  {
    system: "http://snomed.info/sct",
    code: "2719002",
    display: "tartrato deshidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2721007",
    display: "Antígeno del grupo sanguíneo McC^f^",
  },
  {
    system: "http://snomed.info/sct",
    code: "2728001",
    display: "antígeno del sistema de Lewis",
  },
  {
    system: "http://snomed.info/sct",
    code: "2753003",
    display: "Anticuerpo de grupo sanguíneo M>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "2754009",
    display: "Hemoglobina F-Kennestone",
  },
  {
    system: "http://snomed.info/sct",
    code: "2765004",
    display: "SC3 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "2778004",
    display: "Líquido pleural",
  },
  {
    system: "http://snomed.info/sct",
    code: "2796008",
    display: "Metantelinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2799001",
    display: "Metilbencetonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2823004",
    display: "Hemoglobina Brístol",
  },
  {
    system: "http://snomed.info/sct",
    code: "2832002",
    display: "compuesto de molibdeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "2846002",
    display: "Hemoglobina Saitama",
  },
  {
    system: "http://snomed.info/sct",
    code: "2869004",
    display: "Ácido etanoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2878005",
    display: "clorhidrato de petidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2880004",
    display: "Sulfato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2883002",
    display: "Exopoligalacturonato liasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2913009",
    display: "Cadena epsilon de inmunoglobulina",
  },
  { system: "http://snomed.info/sct", code: "2916001", display: "^22^Neón" },
  {
    system: "http://snomed.info/sct",
    code: "2925007",
    display: "Fluorometalona",
  },
  { system: "http://snomed.info/sct", code: "2927004", display: "rescinamina" },
  { system: "http://snomed.info/sct", code: "2938004", display: "pirazol" },
  {
    system: "http://snomed.info/sct",
    code: "2942001",
    display: "Carbono^14^ D-xilosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2950005",
    display: "Hemoglobina L-Golfo Pérsico",
  },
  {
    system: "http://snomed.info/sct",
    code: "2958003",
    display: "caprilato de zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "2964005",
    display: "dimetoxianfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2974008",
    display: "Trichophyton schoenleinii colagenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "2988007",
    display: "Antígeno leucocitario humano Aw",
  },
  {
    system: "http://snomed.info/sct",
    code: "2991007",
    display: "clorhidrato de mecamilamina",
  },
  { system: "http://snomed.info/sct", code: "2995003", display: "arecolina" },
  { system: "http://snomed.info/sct", code: "3027009", display: "^133^Bario" },
  {
    system: "http://snomed.info/sct",
    code: "3031003",
    display: "Carbonato de sodio dihidroxialuminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3040004",
    display: "Tecnecio Tc^99m^ disofenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3045009",
    display: "nitroclorobenceno",
  },
  {
    system: "http://snomed.info/sct",
    code: "3052006",
    display: "Ornitina cetoácido aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3066001",
    display: "Ácido triyodotiroacético",
  },
  {
    system: "http://snomed.info/sct",
    code: "3070009",
    display: "Aspartato-amoníaco ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3087006",
    display: "Aceite de helecho macho",
  },
  {
    system: "http://snomed.info/sct",
    code: "3107005",
    display: "Hemoglobina Shuangfeng",
  },
  {
    system: "http://snomed.info/sct",
    code: "3108000",
    display: "Aspergillus desoxirribonucleasa K>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "3131000",
    display: "Antígeno de grupo sanguíneo Middel",
  },
  {
    system: "http://snomed.info/sct",
    code: "3136005",
    display: "cefoperazona sódica",
  },
  { system: "http://snomed.info/sct", code: "3142009", display: "azaciclonol" },
  {
    system: "http://snomed.info/sct",
    code: "3145006",
    display: "ácido penicílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3150000",
    display: "Sialato O-acetilesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3151001",
    display: "Mucosidad del lóbulo superior izquierdo",
  },
  {
    system: "http://snomed.info/sct",
    code: "3155005",
    display: "3-fosfogliceroil-fosfato-polifosfato fosfotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3161008",
    display: "3-metilhistidina",
  },
  { system: "http://snomed.info/sct", code: "3167007", display: "carbón duro" },
  {
    system: "http://snomed.info/sct",
    code: "3187008",
    display: "Antígeno del grupo sanguíneo Nielsen",
  },
  {
    system: "http://snomed.info/sct",
    code: "3193000",
    display:
      "alfa-1,4-glucano-proteína sintasa (formadora de difosfato de uridina)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3197004",
    display: "Monofosfato de inosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3209002",
    display: "pancuronio sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3212004",
    display: "sulfato de manganeso",
  },
  {
    system: "http://snomed.info/sct",
    code: "3225007",
    display: "Fibrinógeno Seattle I",
  },
  {
    system: "http://snomed.info/sct",
    code: "3232003",
    display: "o-bencil-paraclorofenol",
  },
  {
    system: "http://snomed.info/sct",
    code: "3271000",
    display: "Hemoglobina Southampton",
  },
  {
    system: "http://snomed.info/sct",
    code: "3273002",
    display: "Tirosina-éster sulfotransferasa",
  },
  { system: "http://snomed.info/sct", code: "3300001", display: "Euforbaína" },
  {
    system: "http://snomed.info/sct",
    code: "3318003",
    display: "secreciones vaginales",
  },
  {
    system: "http://snomed.info/sct",
    code: "3325005",
    display: "lipopolisacárido",
  },
  {
    system: "http://snomed.info/sct",
    code: "3339005",
    display: "(R)-20-hidroxiesteroide deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "3340007", display: "diastasa" },
  {
    system: "http://snomed.info/sct",
    code: "3342004",
    display: "Isótopo de cobre",
  },
  {
    system: "http://snomed.info/sct",
    code: "3346001",
    display: "Hemoglobina Brest",
  },
  {
    system: "http://snomed.info/sct",
    code: "3378009",
    display: "clorhidrato de imipramina",
  },
  { system: "http://snomed.info/sct", code: "3379001", display: "mertiolato" },
  {
    system: "http://snomed.info/sct",
    code: "3392003",
    display: "Aldehído deshidrogenasa (aceptor)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3405005",
    display: "2-hidroxi-3-oxoadipato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3411008",
    display: "disulfuro de bis-(dimetiltiocarbamil)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3437006",
    display: "Hidroximetilglutaril-coenzima A hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3440006",
    display: "biotina carboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3455002",
    display: "pesticida descontinuado",
  },
  {
    system: "http://snomed.info/sct",
    code: "3463001",
    display: "L-aminoácido deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3465008",
    display:
      "Topoisomerasa del ácido desoxirribonucleico (trifosfato de adenosina [ATP]-hidrolizante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3466009",
    display: "dimetilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3492002",
    display: "Galactinol-sacarosa galactosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3493007",
    display: "Esmegma clítoris",
  },
  {
    system: "http://snomed.info/sct",
    code: "3495000",
    display: "Cistina aminopeptidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3501003",
    display: "Clorhidrato de isoxsuprina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3523004",
    display: "Hemoglobina Q-India",
  },
  {
    system: "http://snomed.info/sct",
    code: "3532002",
    display: "moco laríngeo",
  },
  {
    system: "http://snomed.info/sct",
    code: "3555004",
    display: "Antígeno del grupo sanguíneo Morrison",
  },
  { system: "http://snomed.info/sct", code: "3579002", display: "^129^Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "3581000",
    display: "Glucosa-6-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3587001",
    display: "Malato deshidrogenasa (descarboxilante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3588006",
    display: "Enzima del complemento",
  },
  {
    system: "http://snomed.info/sct",
    code: "3592004",
    display: "Estimulador de tiroides de acción corta",
  },
  {
    system: "http://snomed.info/sct",
    code: "3597005",
    display: "clorhidrato de acebutolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "3601005",
    display: "Disolvente de éter",
  },
  {
    system: "http://snomed.info/sct",
    code: "3602003",
    display: "Anticuerpo tibio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3610002",
    display: "Epóxido hidrolasa",
  },
  { system: "http://snomed.info/sct", code: "3617004", display: "^79^Selenio" },
  {
    system: "http://snomed.info/sct",
    code: "3648007",
    display: "receptor de glucocorticoides",
  },
  {
    system: "http://snomed.info/sct",
    code: "3655009",
    display: "Hb - Resorte constante de hemoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3672002",
    display: "Fibrinógeno Caracas",
  },
  {
    system: "http://snomed.info/sct",
    code: "3684000",
    display: "ácido fenilacético",
  },
  {
    system: "http://snomed.info/sct",
    code: "3689005",
    display: "Hemoglobina Mizushi",
  },
  {
    system: "http://snomed.info/sct",
    code: "3692009",
    display: "Sulfito de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3693004",
    display: "Fibrinógeno Dusart",
  },
  {
    system: "http://snomed.info/sct",
    code: "3702007",
    display: "Citidina difosfato (CDP) glicerol glicerofosfotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3710008",
    display: "Prostaglandina-endoperóxido sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3718001",
    display: "Leche de vaca",
  },
  {
    system: "http://snomed.info/sct",
    code: "3726009",
    display: "Ligasa de ácido ribonucleico de transferencia de valina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3727000",
    display: "Hemoglobina F-Port Royal",
  },
  {
    system: "http://snomed.info/sct",
    code: "3730007",
    display: "Antígeno del grupo sanguíneo Lanthois",
  },
  {
    system: "http://snomed.info/sct",
    code: "3737005",
    display:
      "Nitrato reductasa (dinucleótido de nicotinamida y adenina reducido)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3742002",
    display: "cristal extracelular",
  },
  { system: "http://snomed.info/sct", code: "3757009", display: "Gosipol" },
  {
    system: "http://snomed.info/sct",
    code: "3771001",
    display: "neuromelanina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3775005",
    display: "Colina deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3776006",
    display: "Xantina deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3792001",
    display: "AA - Ácido araquidónico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3793006",
    display: "Compuesto de bario soluble",
  },
  {
    system: "http://snomed.info/sct",
    code: "3800009",
    display: "Acetato quinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3807007",
    display: "RH4 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3811001",
    display: "Magnesio-protoporfirina metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3812008",
    display: "Isótopo de berilio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3816006",
    display: "isótopo de vanadio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3823007",
    display: "Edisilato de proclorperazina",
  },
  { system: "http://snomed.info/sct", code: "3829006", display: "Fe - Hierro" },
  {
    system: "http://snomed.info/sct",
    code: "3834005",
    display:
      "CMP-N-acetilneuraminato-(alfa-N-acetil-neuraminil-2,3-beta-galactosil-1,3)-N-acetil-galactosaminida alfa-2,6-sialiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "3836007", display: "glutaminasa" },
  {
    system: "http://snomed.info/sct",
    code: "3844007",
    display: "Protoafina-aglucona deshidratasa (ciclización)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3848005",
    display: "nitrotolueno",
  },
  {
    system: "http://snomed.info/sct",
    code: "3849002",
    display: "Negro carbón",
  },
  {
    system: "http://snomed.info/sct",
    code: "3854006",
    display: "éter metílico de bis-cloro",
  },
  {
    system: "http://snomed.info/sct",
    code: "3874004",
    display: "bitartrato de hidrocodona",
  },
  { system: "http://snomed.info/sct", code: "3892007", display: "timidina" },
  {
    system: "http://snomed.info/sct",
    code: "3896005",
    display: "éster de p-hidroxibenzoato",
  },
  {
    system: "http://snomed.info/sct",
    code: "3897001",
    display: "MNS30 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "3906002",
    display: "Aceite de alquitrán de abedul rectificado",
  },
  {
    system: "http://snomed.info/sct",
    code: "3920009",
    display: "Atago de hemoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3930000",
    display: "gas manufacturado",
  },
  { system: "http://snomed.info/sct", code: "3932008", display: "^64^Cobre" },
  {
    system: "http://snomed.info/sct",
    code: "3941003",
    display: "clorhidrato de metronidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "3945007",
    display: "isótopo de estaño",
  },
  {
    system: "http://snomed.info/sct",
    code: "3958008",
    display: "^245^Californio",
  },
  {
    system: "http://snomed.info/sct",
    code: "3961009",
    display: "Antígeno del grupo sanguíneo Ritherford",
  },
  {
    system: "http://snomed.info/sct",
    code: "3976001",
    display: "Antígeno de grupo sanguíneo HEMPAS",
  },
  {
    system: "http://snomed.info/sct",
    code: "3982003",
    display: "Oxaloacetato descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "3983008",
    display: "N,-N-dimetiltriptamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3990003",
    display: "Isoenzima ósea de fosfatasa alcalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3994007",
    display: "hemoglobina tampa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4014000",
    display: "sulfisomidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4024008",
    display: "metal blando",
  },
  { system: "http://snomed.info/sct", code: "4025009", display: "captodiamo" },
  {
    system: "http://snomed.info/sct",
    code: "4043008",
    display: "Clorhidrato de etidocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "4047009",
    display: "cis-1,2-dihidrobenceno-1,2-diol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4048004",
    display: "1,1,2,2-tetracloro-1,2- difluoroetano",
  },
  {
    system: "http://snomed.info/sct",
    code: "4067000",
    display: "Corismato mutasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4076007",
    display: "PTH - Hormona paratiroidea",
  },
  {
    system: "http://snomed.info/sct",
    code: "4077003",
    display: "Dihidrolipoamida succiniltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4080002",
    display: "Hemoglobina Grady, Dakar",
  },
  {
    system: "http://snomed.info/sct",
    code: "4091009",
    display: "Enteropeptidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4097008",
    display: "complejo Apo-SAA",
  },
  {
    system: "http://snomed.info/sct",
    code: "4104007",
    display: "Sulfato de condroitina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4105008",
    display: "Adenilato ciclasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4115002",
    display: "Anticuerpo del grupo sanguíneo Norlander",
  },
  {
    system: "http://snomed.info/sct",
    code: "4137009",
    display: "Acetato de sec-butilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4153007",
    display: "Enoil-coenzima A de cadena larga hidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4167003",
    display:
      "PECAM-1 - Molécula de adhesión de células endoteliales de plaquetas-1",
  },
  {
    system: "http://snomed.info/sct",
    code: "4169000",
    display: "Anticuerpo del grupo sanguíneo Le^bH^",
  },
  {
    system: "http://snomed.info/sct",
    code: "4177001",
    display: "Hemoglobina Long Island-Marsella",
  },
  {
    system: "http://snomed.info/sct",
    code: "4182008",
    display:
      "Citidina difosfato (CDP) diacilglicerol-serina O-fosfatidil-transferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4188007",
    display: "Fibrinógeno Sídney II",
  },
  { system: "http://snomed.info/sct", code: "4200007", display: "neriifolina" },
  {
    system: "http://snomed.info/sct",
    code: "4201006",
    display: "6-aminohexanoato-dímero hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4203009",
    display: "pamoato de imipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4207005",
    display: "Cortisona beta-reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4217000",
    display: "sal de fluorosilicato",
  },
  {
    system: "http://snomed.info/sct",
    code: "4218005",
    display: "Inmunoglobulina, alotipo GM>23<",
  },
  {
    system: "http://snomed.info/sct",
    code: "4231000",
    display: "isótopo de galio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4239003",
    display: "Glicerol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4255005",
    display: "Americio 241",
  },
  {
    system: "http://snomed.info/sct",
    code: "4289006",
    display: "Hemocianina de lapa ojo de cerradura",
  },
  {
    system: "http://snomed.info/sct",
    code: "4290002",
    display: "Linamarina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4314009",
    display: "Anticuerpo de grupo sanguíneo Allchurch",
  },
  {
    system: "http://snomed.info/sct",
    code: "4334005",
    display: "aceite de alquitrán",
  },
  {
    system: "http://snomed.info/sct",
    code: "4342006",
    display: "2-aminopiridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4353000",
    display: "ftalato de di-n-butilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4355007",
    display: "Factor de coagulación IX variante San Dimas",
  },
  {
    system: "http://snomed.info/sct",
    code: "4362003",
    display: "4-Cumarato-coenzima A ligasa",
  },
  { system: "http://snomed.info/sct", code: "4370008", display: "Acetona" },
  {
    system: "http://snomed.info/sct",
    code: "4393002",
    display: "Antígeno del grupo sanguíneo Fedor",
  },
  {
    system: "http://snomed.info/sct",
    code: "4401009",
    display: "Anticuerpo de grupo sanguíneo H>T<",
  },
  {
    system: "http://snomed.info/sct",
    code: "4413004",
    display: "bencipirinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4422003",
    display: "Antígeno del grupo sanguíneo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4423008",
    display: "Fibrinógeno Nueva York II",
  },
  {
    system: "http://snomed.info/sct",
    code: "4425001",
    display: "Atracón de anticuerpos del grupo sanguíneo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4435007",
    display: "fluoruro de sulfurilo",
  },
  { system: "http://snomed.info/sct", code: "4437004", display: "^127^Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "4471008",
    display: "^244^Californio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4479005",
    display: "Hemoglobina Brockton",
  },
  { system: "http://snomed.info/sct", code: "4480008", display: "sulfaetidol" },
  {
    system: "http://snomed.info/sct",
    code: "4509009",
    display: "Toxina de fenantreno vegetal",
  },
  { system: "http://snomed.info/sct", code: "4518006", display: "Buthenal" },
  {
    system: "http://snomed.info/sct",
    code: "4534009",
    display: "^208^bismuto",
  },
  {
    system: "http://snomed.info/sct",
    code: "4540002",
    display: "Adenosina difosfato (ADP) desaminasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4546008",
    display: "ácido tetradecanoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "4555006",
    display: "Anticuerpo de grupo sanguíneo Rils",
  },
  {
    system: "http://snomed.info/sct",
    code: "4560005",
    display: "Hemoglobina Mizuho",
  },
  {
    system: "http://snomed.info/sct",
    code: "4561009",
    display: "Arginina descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4564001",
    display: "Anticuerpo de grupo sanguíneo Sisson",
  },
  {
    system: "http://snomed.info/sct",
    code: "4567008",
    display: "Galactosa-1-fosfato timidililtransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4582003",
    display: "Antígeno del grupo sanguíneo N^A^",
  },
  {
    system: "http://snomed.info/sct",
    code: "4591004",
    display: "MNS22 (símbolo ISBT)",
  },
  {
    system: "http://snomed.info/sct",
    code: "4610008",
    display: "Proteína cardiaca senil",
  },
  {
    system: "http://snomed.info/sct",
    code: "4616002",
    display: "Cloruro de triclobisonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4629002",
    display: "Hipoglicina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "4635002",
    display: "Sangre arterial",
  },
  {
    system: "http://snomed.info/sct",
    code: "4643007",
    display: "Ribonucleasa H del timo de ternero",
  },
  {
    system: "http://snomed.info/sct",
    code: "4656000",
    display: "Tinción azul alcián 8GX",
  },
  {
    system: "http://snomed.info/sct",
    code: "4674009",
    display: "2,3-dihidroxibenzoato serina ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4681002",
    display: "Permanganato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4693006",
    display: "Cromo^51^ albúmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4700006",
    display: "insulina bovina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4706000",
    display: "Monóxido de cloro",
  },
  { system: "http://snomed.info/sct", code: "4714006", display: "^183m^Osmio" },
  {
    system: "http://snomed.info/sct",
    code: "4728000",
    display: "Proteinasa de Scopulariopsis",
  },
  {
    system: "http://snomed.info/sct",
    code: "4731004",
    display: "Polvo pirotécnico de aluminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4732006",
    display: "Oncogén proteína P55, V-MYC",
  },
  {
    system: "http://snomed.info/sct",
    code: "4746006",
    display: "Hemoglobina Mito",
  },
  {
    system: "http://snomed.info/sct",
    code: "4761007",
    display: "CD30 - Grupo de antígeno de diferenciación 30",
  },
  {
    system: "http://snomed.info/sct",
    code: "4762000",
    display: "Antígeno plaquetario HPA-3b",
  },
  { system: "http://snomed.info/sct", code: "4777008", display: "fluroxeno" },
  {
    system: "http://snomed.info/sct",
    code: "4780009",
    display: "Secbutabarbital sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "4786003",
    display:
      "beta-1,4-manosil-glucoproteína beta-1,4-N-acetilglucosaminiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4789005",
    display: "Anticuerpo de grupo sanguíneo bultar",
  },
  {
    system: "http://snomed.info/sct",
    code: "4793004",
    display: "Azobenceno reductasa",
  },
  { system: "http://snomed.info/sct", code: "4814001", display: "valetamato" },
  {
    system: "http://snomed.info/sct",
    code: "4824009",
    display: "MAO - Monoamino oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4825005",
    display: "Peptidil-glicinamidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4831008",
    display: "Arabinosa-5-fosfato isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4832001",
    display: "Tecnecio Tc^99m^ mebrofenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4833006",
    display: "Glucano endo-1,3-alfa-glucosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4844003",
    display: "3,3 Diyodotironina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4864008",
    display: "AMP - Monofosfato de adenosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4872005",
    display: "Glucosulfona",
  },
  {
    system: "http://snomed.info/sct",
    code: "4878009",
    display: "Antígeno leucocitario humano Dw3",
  },
  {
    system: "http://snomed.info/sct",
    code: "4882006",
    display: "ictioalieinotoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "4889002",
    display: "xiluloquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "4901003",
    display: "Piruvato oxidasa (coenzima A-acetilante)",
  },
  {
    system: "http://snomed.info/sct",
    code: "4925006",
    display: "Oncogén proteína V-ABC",
  },
  {
    system: "http://snomed.info/sct",
    code: "4933007",
    display: "Leucocito M1",
  },
  {
    system: "http://snomed.info/sct",
    code: "4940008",
    display: "Tinte para tatuajes",
  },
  {
    system: "http://snomed.info/sct",
    code: "4955004",
    display: "Gen estructural neoplásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "4962008",
    display: "Corteza de árbol",
  },
  {
    system: "http://snomed.info/sct",
    code: "4963003",
    display: "aminoácido neutro",
  },
  {
    system: "http://snomed.info/sct",
    code: "4965005",
    display: "Glutatión reductasa",
  },
  { system: "http://snomed.info/sct", code: "4968007", display: "acumentina" },
  {
    system: "http://snomed.info/sct",
    code: "4986005",
    display: "Borato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5003005",
    display: "La hemoglobina del río cisne",
  },
  {
    system: "http://snomed.info/sct",
    code: "5004004",
    display: "Anticuerpo de grupo sanguíneo Panzar",
  },
  { system: "http://snomed.info/sct", code: "5007006", display: "Papaína" },
  { system: "http://snomed.info/sct", code: "5024000", display: "Agua dulce" },
  {
    system: "http://snomed.info/sct",
    code: "5031001",
    display: "3-3 diclorobencidina",
  },
  { system: "http://snomed.info/sct", code: "5040002", display: "Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "5043000",
    display: "Tinción de eritrosina Y",
  },
  {
    system: "http://snomed.info/sct",
    code: "5045007",
    display: "Proteína oncogen TCL4",
  },
  {
    system: "http://snomed.info/sct",
    code: "5059000",
    display: "^97^Tecnecio",
  },
  { system: "http://snomed.info/sct", code: "5060005", display: "^132^Cesio" },
  {
    system: "http://snomed.info/sct",
    code: "5061009",
    display: "Proteína-metionina-S-óxido reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5064001",
    display: "Anticuerpo del grupo sanguíneo D 1276",
  },
  {
    system: "http://snomed.info/sct",
    code: "5081005",
    display: "RH31 (símbolo ISBT)",
  },
  { system: "http://snomed.info/sct", code: "5086000", display: "Gelsolina" },
  {
    system: "http://snomed.info/sct",
    code: "5094007",
    display: "Antígeno del grupo sanguíneo Ríos",
  },
  {
    system: "http://snomed.info/sct",
    code: "5098005",
    display: "aceite de hinojo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5109006",
    display:
      "Ácido desoxirribonucleico metilado-proteína-cisteína metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5142007",
    display: "Factor de coagulación II variante de Houston",
  },
  {
    system: "http://snomed.info/sct",
    code: "5160007",
    display: "Compuesto metálico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5163009",
    display: "escombrotoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5167005",
    display: "Humos de cloruro de zinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "5172001",
    display: "Factor de coagulación Xa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5179005",
    display: "Fibra de tejido conectivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5200001",
    display: "trans-epoxisuccinato hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5206007",
    display: "compuesto de cianato",
  },
  { system: "http://snomed.info/sct", code: "5220000", display: "Bacitracina" },
  {
    system: "http://snomed.info/sct",
    code: "5226006",
    display: "Flavona O^7^-beta-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5250008",
    display: "Antígeno independiente del timo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5252000",
    display: "radioisótopo de hafnio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5253005",
    display: "Hemoglobina Woodville",
  },
  {
    system: "http://snomed.info/sct",
    code: "5259009",
    display: "Antígeno del grupo sanguíneo Braden",
  },
  {
    system: "http://snomed.info/sct",
    code: "5289002",
    display: "escilirosida",
  },
  {
    system: "http://snomed.info/sct",
    code: "5303002",
    display: "Hemoglobina Hoshida",
  },
  {
    system: "http://snomed.info/sct",
    code: "5305009",
    display: "polinucleótido",
  },
  {
    system: "http://snomed.info/sct",
    code: "5307001",
    display: "Antígeno del grupo sanguíneo Hamet",
  },
  { system: "http://snomed.info/sct", code: "5312000", display: "^65^Zinc" },
  {
    system: "http://snomed.info/sct",
    code: "5323001",
    display: "Ácido glucurónico de difosfato de uridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5330007",
    display: "Proteína de unión a actina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5339008",
    display: "L-glicol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5340005",
    display: "Antígeno del grupo sanguíneo Swietlik",
  },
  {
    system: "http://snomed.info/sct",
    code: "5392001",
    display: "Éter monometílico de propilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "5395004",
    display: "Piridoxamina-fosfato oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5404007",
    display: "Antígeno linfocitario CD45RA",
  },
  { system: "http://snomed.info/sct", code: "5405008", display: "^60^Cobalto" },
  {
    system: "http://snomed.info/sct",
    code: "5406009",
    display: "beta-L-arabinosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5420002",
    display: "Mucosidad sinusal accesoria",
  },
  {
    system: "http://snomed.info/sct",
    code: "5439007",
    display: "Anticuerpo del grupo sanguíneo Do^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "5442001",
    display: "Pagina azul 83",
  },
  {
    system: "http://snomed.info/sct",
    code: "5453007",
    display: "Isótopo de iridio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5471000",
    display: "Hemoglobina G-Coushatta",
  },
  {
    system: "http://snomed.info/sct",
    code: "5474008",
    display: "Propionato-CoA ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5477001",
    display: "subsulfato férrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5483003",
    display: "Oxalato CoA-transferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5504009",
    display: "Antígeno del grupo sanguíneo Fuerhart",
  },
  {
    system: "http://snomed.info/sct",
    code: "5511008",
    display: "Inosinato nucleosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5513006",
    display: "Inmunoglobulina, cadena alfa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5515004",
    display: "vapores de rodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5533005",
    display: "Anticuerpo de grupo sanguíneo Kp^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "5537006",
    display: "Inmunoglobulina, cadena delta",
  },
  { system: "http://snomed.info/sct", code: "5540006", display: "Calcio" },
  {
    system: "http://snomed.info/sct",
    code: "5547009",
    display: "^233^Plutonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5548004",
    display: "2-Deshidro-3-desoxi-D-pentonato aldolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5568005",
    display: "Hemoglobina Hijiyama",
  },
  {
    system: "http://snomed.info/sct",
    code: "5573004",
    display: "Antígeno del grupo sanguíneo Oca",
  },
  {
    system: "http://snomed.info/sct",
    code: "5589001",
    display: "Licodiona O^2^-metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5590005",
    display: "radioisótopo de berilio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5628003",
    display: "Hemoglobina I-High Wycombe",
  },
  {
    system: "http://snomed.info/sct",
    code: "5629006",
    display: "ácido citidílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5637003",
    display: "antígeno HLA-DQw6",
  },
  {
    system: "http://snomed.info/sct",
    code: "5641004",
    display: "Valproato semisódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5647000",
    display: "Griseofulvina ultramicrométrica",
  },
  {
    system: "http://snomed.info/sct",
    code: "5656008",
    display: "^116m^antimonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5657004",
    display: "Solución tópica de alquitrán de hulla",
  },
  {
    system: "http://snomed.info/sct",
    code: "5659001",
    display: "Hemoglobina J-Tongariki",
  },
  {
    system: "http://snomed.info/sct",
    code: "5670008",
    display: "Isótopo de oro",
  },
  {
    system: "http://snomed.info/sct",
    code: "5681006",
    display: "Ceftizoxima sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "5691000",
    display: "Esponja de gelatina absorbible",
  },
  {
    system: "http://snomed.info/sct",
    code: "5692007",
    display: "Cianocobalamina Co^58^",
  },
  {
    system: "http://snomed.info/sct",
    code: "5699003",
    display: "Somatomedina C",
  },
  {
    system: "http://snomed.info/sct",
    code: "5700002",
    display: "Anticuerpo de grupo sanguíneo Gómez",
  },
  { system: "http://snomed.info/sct", code: "5702005", display: "^106m^Plata" },
  {
    system: "http://snomed.info/sct",
    code: "5704006",
    display: "Galactoquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5705007",
    display: "1,3-propanodiol deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "5739006", display: "Estramonio" },
  {
    system: "http://snomed.info/sct",
    code: "5746002",
    display: "^118m^antimonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5757007",
    display: "antígeno HLA-Cw8",
  },
  {
    system: "http://snomed.info/sct",
    code: "5762008",
    display: "ARN nuclear heterogéneo",
  },
  {
    system: "http://snomed.info/sct",
    code: "5764009",
    display: "^242^Plutonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "5767002",
    display: "sulfamerazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5774007",
    display: "Vaselina blanca",
  },
  {
    system: "http://snomed.info/sct",
    code: "5800007",
    display: "ARNt (5-metilaminometil-2-tiouridilato)-metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5813001",
    display: "Malato deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5826002",
    display: "Etil-4-bis-(hidroxipropil)-1-aminobenzoato",
  },
  {
    system: "http://snomed.info/sct",
    code: "5827006",
    display: "crotonaldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "5829009",
    display: "Hemoglobina Vaasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5830004",
    display: "Hemoglobina Bart",
  },
  {
    system: "http://snomed.info/sct",
    code: "5840001",
    display: "Anticuerpo de grupo sanguíneo Wj",
  },
  { system: "http://snomed.info/sct", code: "5858007", display: "^110m^Indio" },
  {
    system: "http://snomed.info/sct",
    code: "5863006",
    display: "Vitexina beta-glucosiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "5896008", display: "helebrín" },
  {
    system: "http://snomed.info/sct",
    code: "5899001",
    display: "Gen estructural bacteriano",
  },
  {
    system: "http://snomed.info/sct",
    code: "5907009",
    display: "Poligalacturonato de quinidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "5910002",
    display: "Oncogen proteína PP60, V-SRC",
  },
  {
    system: "http://snomed.info/sct",
    code: "5915007",
    display: "Antígeno del grupo sanguíneo Gladding",
  },
  {
    system: "http://snomed.info/sct",
    code: "5927005",
    display: "Lactoaldehído deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5931004",
    display: "Tecnecio Tc^99m^ coloide de azufre",
  },
  { system: "http://snomed.info/sct", code: "5932006", display: "cisteína" },
  {
    system: "http://snomed.info/sct",
    code: "5950004",
    display: "3,5-Nucleótido cíclico fosfodiesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "5955009",
    display: "Dietilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "5977008",
    display: "Antígeno del grupo sanguíneo Bullock",
  },
  {
    system: "http://snomed.info/sct",
    code: "5989005",
    display: "Inmunoglobulina, alotipo GM>17<",
  },
  {
    system: "http://snomed.info/sct",
    code: "5991002",
    display: "D-fuconato deshidratasa",
  },
  { system: "http://snomed.info/sct", code: "6021003", display: "^88^Itrio" },
  {
    system: "http://snomed.info/sct",
    code: "6038004",
    display: "radioisótopo de oxígeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "6043006",
    display: "cemento óseo",
  },
  {
    system: "http://snomed.info/sct",
    code: "6044000",
    display: "Disulfuro de carbono",
  },
  {
    system: "http://snomed.info/sct",
    code: "6054001",
    display: "Succinato de doxilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6056004",
    display: "Anticuerpo de grupo sanguíneo Wk^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "6068008",
    display: "Antígeno del grupo sanguíneo Mil",
  },
  {
    system: "http://snomed.info/sct",
    code: "6083003",
    display: "Hidroxilisina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6085005",
    display: "Líquido sinovial",
  },
  {
    system: "http://snomed.info/sct",
    code: "6088007",
    display: "clorhidrato de benzfetamina",
  },
  { system: "http://snomed.info/sct", code: "6089004", display: "Loquia alba" },
  {
    system: "http://snomed.info/sct",
    code: "6091007",
    display: "Anticuerpo del grupo sanguíneo L Harris",
  },
  {
    system: "http://snomed.info/sct",
    code: "6107003",
    display: "Asparagusato reductasa (NADH)",
  },
  {
    system: "http://snomed.info/sct",
    code: "6109000",
    display: "Aminoácido aromático aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6115000",
    display: "Anticuerpo del grupo sanguíneo Anuszewska",
  },
  {
    system: "http://snomed.info/sct",
    code: "6135004",
    display: "Antígeno del grupo sanguíneo Pato",
  },
  {
    system: "http://snomed.info/sct",
    code: "6138002",
    display: "Antígeno del grupo sanguíneo Le Provost",
  },
  {
    system: "http://snomed.info/sct",
    code: "6162007",
    display: "meclociclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6170002",
    display: "Anticuerpo lábil al calor",
  },
  {
    system: "http://snomed.info/sct",
    code: "6172005",
    display: "Metiltransferasa de ácidos grasos",
  },
  {
    system: "http://snomed.info/sct",
    code: "6178009",
    display: "Antígeno linfocitario CD63",
  },
  {
    system: "http://snomed.info/sct",
    code: "6179001",
    display: "o-metil-bufotenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6182006",
    display: "cloroacetona",
  },
  {
    system: "http://snomed.info/sct",
    code: "6197009",
    display: "Antígeno del grupo sanguíneo Zd",
  },
  { system: "http://snomed.info/sct", code: "6237004", display: "bemegride" },
  {
    system: "http://snomed.info/sct",
    code: "6249003",
    display: "metabisulfito de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6256009",
    display: "ribosa isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6257000",
    display: "Cloruro de sodio Na^22^",
  },
  { system: "http://snomed.info/sct", code: "6260007", display: "protoquilol" },
  { system: "http://snomed.info/sct", code: "6261006", display: "Indoklon" },
  {
    system: "http://snomed.info/sct",
    code: "6263009",
    display: "Residuos vegetales",
  },
  { system: "http://snomed.info/sct", code: "6264003", display: "diazinón" },
  { system: "http://snomed.info/sct", code: "6287006", display: "metidatión" },
  {
    system: "http://snomed.info/sct",
    code: "6291001",
    display: "N-acetilglucosamina-1-fosfodiéster N-acetilglucosaminidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6301006",
    display: "^178^Tantalio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6310003",
    display: "antígeno de partículas",
  },
  {
    system: "http://snomed.info/sct",
    code: "6314007",
    display: "Fenol beta-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6333002",
    display: "extracto de escila",
  },
  {
    system: "http://snomed.info/sct",
    code: "6338006",
    display: "Imidazolonapropionasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6356006",
    display: "clorodialilacetamida",
  },
  { system: "http://snomed.info/sct", code: "6360009", display: "Calidina II" },
  {
    system: "http://snomed.info/sct",
    code: "6367007",
    display: "^95m^Tecnecio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6386004",
    display: "N-acetilneuraminato O^4^-acetiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6394006",
    display: "clorhidrato de fentermina",
  },
  { system: "http://snomed.info/sct", code: "6401007", display: "Liquenasa" },
  { system: "http://snomed.info/sct", code: "6409009", display: "Morfolina" },
  {
    system: "http://snomed.info/sct",
    code: "6411000",
    display: "interleucina-12",
  },
  {
    system: "http://snomed.info/sct",
    code: "6422001",
    display: "antígeno HLA-DRw14",
  },
  {
    system: "http://snomed.info/sct",
    code: "6451002",
    display: "clorobencilato",
  },
  { system: "http://snomed.info/sct", code: "6455006", display: "cloropreno" },
  {
    system: "http://snomed.info/sct",
    code: "6469006",
    display: "delta^1^-Piperideína-2-carboxilato reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6478000",
    display: "6-fosfofructoquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6495008",
    display: "Fibrinógeno Montreal II",
  },
  {
    system: "http://snomed.info/sct",
    code: "6507009",
    display: "Antígeno del grupo sanguíneo Mucho",
  },
  {
    system: "http://snomed.info/sct",
    code: "6513000",
    display: "flumetiazida",
  },
  {
    system: "http://snomed.info/sct",
    code: "6516008",
    display: "Indio^111^-Fe(OH)>3<",
  },
  {
    system: "http://snomed.info/sct",
    code: "6524003",
    display: "Espíritus destilados",
  },
  {
    system: "http://snomed.info/sct",
    code: "6529008",
    display: "Antígeno del grupo sanguíneo Cl^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "6532006",
    display: "Factor activador de macrófagos",
  },
  {
    system: "http://snomed.info/sct",
    code: "6590001",
    display: "Galactosilceramidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6592009",
    display: "antígeno HLA-Dw12",
  },
  {
    system: "http://snomed.info/sct",
    code: "6602005",
    display: "Aminoacridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6611005",
    display: "dietilaminoetanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "6612003",
    display: "Succinato de cloranfenicol sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6619007",
    display: "Proteína transportadora de bilirrubina Y",
  },
  { system: "http://snomed.info/sct", code: "6642000", display: "opsonina" },
  {
    system: "http://snomed.info/sct",
    code: "6644004",
    display: "Homoserina deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6671004",
    display: "Antígeno del grupo sanguíneo Caw",
  },
  {
    system: "http://snomed.info/sct",
    code: "6672006",
    display: "Fosfoadenilato 3-nucleotidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6699008",
    display: "Radioisótopo de titanio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6701008",
    display: "Lisamina rápido rojo B",
  },
  {
    system: "http://snomed.info/sct",
    code: "6702001",
    display: "Etil mercaptoetil dietil tiofosfato",
  },
  {
    system: "http://snomed.info/sct",
    code: "6709005",
    display: "Gentamicina 2-nucleotidiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6710000",
    display: "Óxido nítrico",
  },
  { system: "http://snomed.info/sct", code: "6713003", display: "^91^Itrio" },
  { system: "http://snomed.info/sct", code: "6717002", display: "nifuroxima" },
  {
    system: "http://snomed.info/sct",
    code: "6725000",
    display: "Azul de metileno",
  },
  { system: "http://snomed.info/sct", code: "6730001", display: "^234^Uranio" },
  {
    system: "http://snomed.info/sct",
    code: "6741004",
    display: "Anticuerpo anti ADN",
  },
  { system: "http://snomed.info/sct", code: "6755007", display: "antígeno TL" },
  {
    system: "http://snomed.info/sct",
    code: "6786001",
    display: "difluoruro de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "6790004",
    display: "aminopterina",
  },
  { system: "http://snomed.info/sct", code: "6792007", display: "veratrina" },
  {
    system: "http://snomed.info/sct",
    code: "6808006",
    display: "Compuesto de hierro ferroso",
  },
  { system: "http://snomed.info/sct", code: "6809003", display: "fomopsina" },
  {
    system: "http://snomed.info/sct",
    code: "6814004",
    display: "Discadenina sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6817006",
    display: "glutatión oxidado",
  },
  {
    system: "http://snomed.info/sct",
    code: "6826009",
    display: "hormona esterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "6837005",
    display: "napsilato de dextropropoxifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "6854002",
    display: "^188^Platino",
  },
  {
    system: "http://snomed.info/sct",
    code: "6865007",
    display: "Salicilato de calcio de teofilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6873003",
    display: "Cefapirina sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "6879004",
    display: "Ácido 5,8,11-eicosatrienoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6881002",
    display: "vapores de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6884005",
    display: "(S)-3-Amino-2-metilpropionato aminotransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6890009",
    display: "3-desoxi-mano-octulosonato-8-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6896003",
    display: "Tiopurina metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6910009",
    display: "Fluoruro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6911008",
    display: "Desoxicitidilato metiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "6916003", display: "Bowieine" },
  {
    system: "http://snomed.info/sct",
    code: "6924008",
    display: "exopolifosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6925009",
    display: "Leucina acetiltransferasa",
  },
  { system: "http://snomed.info/sct", code: "6927001", display: "^121^Estaño" },
  {
    system: "http://snomed.info/sct",
    code: "6937006",
    display: "timidilato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6945001",
    display: "Antígeno del grupo sanguíneo Le^bH^",
  },
  {
    system: "http://snomed.info/sct",
    code: "6952004",
    display: "^121m^Estaño",
  },
  {
    system: "http://snomed.info/sct",
    code: "6958000",
    display: "Anticuerpo del grupo sanguíneo Frando",
  },
  {
    system: "http://snomed.info/sct",
    code: "6961004",
    display: "Lisolecitina acilmutasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6970001",
    display: "4-hidroxiprolina epimerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "6973004",
    display: "Cloruro de cromo^51^",
  },
  { system: "http://snomed.info/sct", code: "6983000", display: "acrilamida" },
  {
    system: "http://snomed.info/sct",
    code: "6992002",
    display: "Clorhidrato de triflupromazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6993007",
    display: "Fluido seminal",
  },
  {
    system: "http://snomed.info/sct",
    code: "6999006",
    display: "compuesto de amonio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7008002",
    display: "beta-caroteno 15,15-dioxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7018007",
    display: "Malato-CoA ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7029006",
    display: "Antígeno del grupo sanguíneo Greenlee",
  },
  { system: "http://snomed.info/sct", code: "7030001", display: "Globosido" },
  { system: "http://snomed.info/sct", code: "7034005", display: "diclofenaco" },
  { system: "http://snomed.info/sct", code: "7045008", display: "licorina" },
  {
    system: "http://snomed.info/sct",
    code: "7047000",
    display: "Atmósfera asfixiante",
  },
  {
    system: "http://snomed.info/sct",
    code: "7049002",
    display: "Piruvato carboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7054006",
    display: "Hemoglobina Poissy",
  },
  {
    system: "http://snomed.info/sct",
    code: "7056008",
    display: "3-propilmalato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7059001",
    display: "N-acilneuraminato-9-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7061005",
    display: "Antocianidina O^3^-glucosiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7070008",
    display: "Convallamarin",
  },
  {
    system: "http://snomed.info/sct",
    code: "7084003",
    display: "Fibrinógeno Buenos Aires II",
  },
  {
    system: "http://snomed.info/sct",
    code: "7110002",
    display: "^69^germanio",
  },
  { system: "http://snomed.info/sct", code: "7120007", display: "Antígeno" },
  { system: "http://snomed.info/sct", code: "7132006", display: "^73^Galio" },
  {
    system: "http://snomed.info/sct",
    code: "7139002",
    display: "Ácido-CoA ligasa (formadora de PIB)",
  },
  {
    system: "http://snomed.info/sct",
    code: "7146006",
    display: "Óxido de ciclohexeno",
  },
  { system: "http://snomed.info/sct", code: "7152007", display: "clortión" },
  {
    system: "http://snomed.info/sct",
    code: "7156005",
    display: "Isótopo de fósforo",
  },
  {
    system: "http://snomed.info/sct",
    code: "7158006",
    display: "Antígeno HLA-Dw19",
  },
  {
    system: "http://snomed.info/sct",
    code: "7161007",
    display: "Complemento componente C2a",
  },
  {
    system: "http://snomed.info/sct",
    code: "7179006",
    display: "precalicreína",
  },
  {
    system: "http://snomed.info/sct",
    code: "7191002",
    display: "Meteniltetrahidrofolato ciclohidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7208009",
    display: "tiol oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7211005",
    display: "Anticuerpo de grupo sanguíneo Haakestad",
  },
  {
    system: "http://snomed.info/sct",
    code: "7237008",
    display: "Galactonato deshidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7243005",
    display: "isocianato de metilo",
  },
  { system: "http://snomed.info/sct", code: "7269004", display: "Th - torio" },
  { system: "http://snomed.info/sct", code: "7271004", display: "polvo mixto" },
  {
    system: "http://snomed.info/sct",
    code: "7280004",
    display: "dTDP4-deshidroramnosa reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7281000",
    display: "tecnecio Tc^99m^ lidofenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7284008",
    display: "compuesto de mercaptano",
  },
  {
    system: "http://snomed.info/sct",
    code: "7294003",
    display: "Acetato de terc-butilo",
  },
  { system: "http://snomed.info/sct", code: "7302008", display: "ambufilina" },
  {
    system: "http://snomed.info/sct",
    code: "7318002",
    display: "bacterioclorofila",
  },
  { system: "http://snomed.info/sct", code: "7321000", display: "pirimidina" },
  {
    system: "http://snomed.info/sct",
    code: "7325009",
    display: "Hidróxido de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7327001",
    display: "Ácido sulfúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "7328006",
    display: "Vaselina roja",
  },
  { system: "http://snomed.info/sct", code: "7330008", display: "Goma laca" },
  {
    system: "http://snomed.info/sct",
    code: "7337006",
    display: "Anticuerpo de grupo sanguíneo Tr^a^",
  },
  { system: "http://snomed.info/sct", code: "7348004", display: "Factor II" },
  {
    system: "http://snomed.info/sct",
    code: "7382005",
    display: "éster de aminoalcohol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7401000",
    display: "complejo hemo-hemopexina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7411007",
    display: "Anticuerpo de grupo sanguíneo HLA-B8",
  },
  {
    system: "http://snomed.info/sct",
    code: "7427000",
    display: "sepiapterina reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7434003",
    display: "eritrosina B",
  },
  { system: "http://snomed.info/sct", code: "7446004", display: "Rutenio" },
  {
    system: "http://snomed.info/sct",
    code: "7451005",
    display: "Agente oftálmico de tobramicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7460002",
    display: "^127^Telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7470000",
    display: "p-terc-butiltolueno",
  },
  {
    system: "http://snomed.info/sct",
    code: "7489000",
    display: "Anticuerpo homocitotrópico",
  },
  { system: "http://snomed.info/sct", code: "7503004", display: "^72^Galio" },
  {
    system: "http://snomed.info/sct",
    code: "7509000",
    display: "Hexanitrato de manitol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7515000",
    display: "Micotoxina hepatotóxica",
  },
  {
    system: "http://snomed.info/sct",
    code: "7537007",
    display: "Stizolobinato sintasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7547005",
    display: "Hemoglobina Lincoln Park",
  },
  {
    system: "http://snomed.info/sct",
    code: "7549008",
    display: "Fibrinógeno Bethesda I",
  },
  {
    system: "http://snomed.info/sct",
    code: "7588005",
    display: "Anticuerpo de grupo sanguíneo Sk^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "7608003",
    display: "trietilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7616007",
    display: "Anticuerpo del grupo sanguíneo Pruitt",
  },
  {
    system: "http://snomed.info/sct",
    code: "7648006",
    display: "Antígeno HLA-Bw70",
  },
  {
    system: "http://snomed.info/sct",
    code: "7661006",
    display: "hueso de pescado",
  },
  {
    system: "http://snomed.info/sct",
    code: "7670009",
    display: "Aminobutiraldehído deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7675004",
    display: "Antígeno del grupo sanguíneo Towey",
  },
  {
    system: "http://snomed.info/sct",
    code: "7679005",
    display: "Compuesto oxidante fuerte",
  },
  {
    system: "http://snomed.info/sct",
    code: "7685003",
    display: "Anticuerpo de grupo sanguíneo Bg^c^",
  },
  {
    system: "http://snomed.info/sct",
    code: "7696006",
    display: "polvo de ferrovanadio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7716001",
    display: "Isovaleril coenzima A deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7737009",
    display: "clorhidrato de clortetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7738004",
    display: "antígeno HLA-B49",
  },
  { system: "http://snomed.info/sct", code: "7761002", display: "^111^Plata" },
  {
    system: "http://snomed.info/sct",
    code: "7770004",
    display: "^89^Estroncio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7774008",
    display: "Neo-b-vitamina A>1<",
  },
  {
    system: "http://snomed.info/sct",
    code: "7779003",
    display: "^103^Rutenio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7785005",
    display: "Esfingomielina fosfodiesterasa D",
  },
  {
    system: "http://snomed.info/sct",
    code: "7790008",
    display: "1-monoacilglicerol",
  },
  {
    system: "http://snomed.info/sct",
    code: "7791007",
    display: "Proteína de soya",
  },
  {
    system: "http://snomed.info/sct",
    code: "7795003",
    display: "Oxalato oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7801007",
    display: "Tetrahidroxipteridina cicloisomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7816005",
    display: "clorhidrato de antazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7834009",
    display: "acetil digitoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7846008",
    display: "Esfingomielina fosfodiesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7848009",
    display: "1-fosfatidilinositol fosfodiesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7868003",
    display: "beta-ciclopiazonato deshidrogenasa",
  },
  { system: "http://snomed.info/sct", code: "7879008", display: "^218^Radón" },
  {
    system: "http://snomed.info/sct",
    code: "7900007",
    display: "Presbiteriana de hemoglobina",
  },
  { system: "http://snomed.info/sct", code: "7904003", display: "Deanol" },
  {
    system: "http://snomed.info/sct",
    code: "7909008",
    display: "Arginina carboxipeptidasa",
  },
  { system: "http://snomed.info/sct", code: "7924004", display: "diflorasona" },
  {
    system: "http://snomed.info/sct",
    code: "7938006",
    display: "D-arabitol deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7945006",
    display: "Orsellinate-depside hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7948008",
    display: "Anticuerpo de Reed-Sternberg",
  },
  { system: "http://snomed.info/sct", code: "7953003", display: "Thioneb" },
  {
    system: "http://snomed.info/sct",
    code: "7957002",
    display: "Fosfatidato citidililtransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7961008",
    display: "Hemoglobina F-Shanghai",
  },
  { system: "http://snomed.info/sct", code: "7970006", display: "aloinjerto" },
  {
    system: "http://snomed.info/sct",
    code: "7974002",
    display: "Anticuerpo de grupo sanguíneo Dalman",
  },
  { system: "http://snomed.info/sct", code: "7975001", display: "amifenazol" },
  {
    system: "http://snomed.info/sct",
    code: "7979007",
    display: "3-fosfoadenililsulfato 3-fosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "7983007",
    display: "rodanuro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7985000",
    display: "isótopo de azufre",
  },
  {
    system: "http://snomed.info/sct",
    code: "7997004",
    display: "butil mercaptano",
  },
  {
    system: "http://snomed.info/sct",
    code: "8000007",
    display: "Cucurbitacina delta^23^-reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8002004",
    display: "Anticuerpo de grupo sanguíneo Fleming",
  },
  {
    system: "http://snomed.info/sct",
    code: "8025003",
    display: "Anticuerpo de grupo sanguíneo Gibson",
  },
  {
    system: "http://snomed.info/sct",
    code: "8029009",
    display: "Alil glicidil éter",
  },
  {
    system: "http://snomed.info/sct",
    code: "8030004",
    display: "PEG - Polietilenglicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "8035009",
    display: "Colestenol delta-isomerasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8048008",
    display: "Antígeno del grupo sanguíneo Th",
  },
  {
    system: "http://snomed.info/sct",
    code: "8054009",
    display: "Orotato reductasa (NADPH)",
  },
  {
    system: "http://snomed.info/sct",
    code: "8055005",
    display: "Galactósido acetiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8105004",
    display: "Hemoglobina Leiden",
  },
  {
    system: "http://snomed.info/sct",
    code: "8108002",
    display: "Undecaprenil-difosfatasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8123007",
    display: "Anticuerpo de grupo sanguíneo Schuppenhauer",
  },
  {
    system: "http://snomed.info/sct",
    code: "8132009",
    display: "acetilsalicilato de magnesio",
  },
  { system: "http://snomed.info/sct", code: "8143001", display: "diosmin" },
  { system: "http://snomed.info/sct", code: "8153000", display: "homoprolina" },
  {
    system: "http://snomed.info/sct",
    code: "8156008",
    display: "Inmunoglobulina, fragmento Fd",
  },
  {
    system: "http://snomed.info/sct",
    code: "8164002",
    display: "Grupo de antígeno de diferenciación 67",
  },
  {
    system: "http://snomed.info/sct",
    code: "8168004",
    display: "Uracil-5-carboxilato descarboxilasa",
  },
  { system: "http://snomed.info/sct", code: "8179009", display: "Cevadilina" },
  {
    system: "http://snomed.info/sct",
    code: "8184003",
    display: "convallamarogenina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8190004",
    display: "Diaminopimelato epimerasa",
  },
  { system: "http://snomed.info/sct", code: "8202008", display: "^43^Potasio" },
  {
    system: "http://snomed.info/sct",
    code: "8203003",
    display: "Gonadotropina menopáusica humana",
  },
  { system: "http://snomed.info/sct", code: "8204009", display: "Poliéster" },
  {
    system: "http://snomed.info/sct",
    code: "8222007",
    display: "Factor de coagulación II variante Padua",
  },
  {
    system: "http://snomed.info/sct",
    code: "8227001",
    display: "^106^Rutenio",
  },
  {
    system: "http://snomed.info/sct",
    code: "8230008",
    display: "cisteína proteinasa estreptocócica",
  },
  { system: "http://snomed.info/sct", code: "8237006", display: "Estrobano" },
  {
    system: "http://snomed.info/sct",
    code: "8252004",
    display: "clorotiazida sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "8257005",
    display: "Hemoglobina anormal",
  },
  {
    system: "http://snomed.info/sct",
    code: "8261004",
    display: "tiosulfato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "8268005",
    display: "Anticuerpo de grupo sanguíneo Hildebrandt",
  },
  {
    system: "http://snomed.info/sct",
    code: "8270001",
    display: "ARNt adenililtransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8275006",
    display: "Metionina-S-óxido reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8295000",
    display: "Proteína uromucoide",
  },
  {
    system: "http://snomed.info/sct",
    code: "8300003",
    display: "ciclohexanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "8310007",
    display: "Hemoglobina Madrid",
  },
  {
    system: "http://snomed.info/sct",
    code: "8313009",
    display: "ADN polimerasa dirigida por ARN",
  },
  {
    system: "http://snomed.info/sct",
    code: "8340009",
    display: "Procolágeno-lisina,2-oxoglutarato 5-dioxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8342001",
    display: "azul cresilo brillante",
  },
  {
    system: "http://snomed.info/sct",
    code: "8343006",
    display: "Anticuerpo del grupo sanguíneo Re^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "8354001",
    display: "Bis-ditiocarbamato de etileno de manganeso",
  },
  {
    system: "http://snomed.info/sct",
    code: "8355000",
    display: "isótopo de hafnio",
  },
  { system: "http://snomed.info/sct", code: "8362009", display: "contra c" },
  {
    system: "http://snomed.info/sct",
    code: "8365006",
    display: "Aceite de poleo-europeo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8368008",
    display: "Xilano 1,44-beta-xilosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8376005",
    display: "Anticuerpo del grupo sanguíneo Duffy",
  },
  {
    system: "http://snomed.info/sct",
    code: "8385005",
    display: "Ácido alfa-glucosidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8397006",
    display: "Complejo de resina de nicotina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8406008",
    display: "Nitroetano oxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8429000",
    display: "naranja brillante",
  },
  {
    system: "http://snomed.info/sct",
    code: "8450009",
    display: "Aceite de hierba de limón",
  },
  {
    system: "http://snomed.info/sct",
    code: "8452001",
    display: "Antígeno del grupo sanguíneo Sisson",
  },
  {
    system: "http://snomed.info/sct",
    code: "8456003",
    display: "Peróxido de metiletilcetona",
  },
  {
    system: "http://snomed.info/sct",
    code: "8460000",
    display: "Anticuerpo de grupo sanguíneo Vg^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "8473001",
    display: "Homocisteína metiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8474007",
    display: "oleato de plomo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8484008",
    display: "Antígeno del grupo sanguíneo Mur",
  },
  {
    system: "http://snomed.info/sct",
    code: "8485009",
    display: "Oncogén proteína P210, BCR-ABL",
  },
  {
    system: "http://snomed.info/sct",
    code: "8486005",
    display: "Antígeno HLA-DRw15",
  },
  { system: "http://snomed.info/sct", code: "8487001", display: "^48^vanadio" },
  {
    system: "http://snomed.info/sct",
    code: "8491006",
    display: "inhibidor del complemento",
  },
  { system: "http://snomed.info/sct", code: "8492004", display: "alantoicasa" },
  {
    system: "http://snomed.info/sct",
    code: "8498000",
    display: "Veneno corto de neurotoxina",
  },
  { system: "http://snomed.info/sct", code: "8507001", display: "ciclohexano" },
  { system: "http://snomed.info/sct", code: "8514004", display: "ornitina" },
  {
    system: "http://snomed.info/sct",
    code: "8520003",
    display: "Hemoglobina Machida",
  },
  { system: "http://snomed.info/sct", code: "8525008", display: "^183^Osmio" },
  {
    system: "http://snomed.info/sct",
    code: "8529002",
    display: "Proteína urinaria de bajo peso molecular",
  },
  { system: "http://snomed.info/sct", code: "8534003", display: "^110^Estaño" },
  { system: "http://snomed.info/sct", code: "8537005", display: "Solución" },
  {
    system: "http://snomed.info/sct",
    code: "8578007",
    display: "cianato de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "8591008",
    display: "diclorodifluorometano",
  },
  {
    system: "http://snomed.info/sct",
    code: "8612007",
    display: "Factor de necrosis tumoral",
  },
  {
    system: "http://snomed.info/sct",
    code: "8620009",
    display: "Proteína oncogen TCL6",
  },
  {
    system: "http://snomed.info/sct",
    code: "8631001",
    display: "Cloruro de potasio",
  },
  { system: "http://snomed.info/sct", code: "8653004", display: "Rubijervine" },
  {
    system: "http://snomed.info/sct",
    code: "8660005",
    display: "Complemento componente C3c",
  },
  {
    system: "http://snomed.info/sct",
    code: "8687009",
    display: "Goma arábiga",
  },
  {
    system: "http://snomed.info/sct",
    code: "8689007",
    display: "Sulfato de kanamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8701002",
    display: "Sulfaclorpiridazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8705006",
    display: "4-hidroxibenzoato descarboxilasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8731008",
    display: "Anticuerpo de grupo sanguíneo Austin",
  },
  { system: "http://snomed.info/sct", code: "8740007", display: "C3(H20)Bb" },
  {
    system: "http://snomed.info/sct",
    code: "8761000",
    display: "Adenililsulfato quinasa",
  },
  { system: "http://snomed.info/sct", code: "8767001", display: "Santonín" },
  {
    system: "http://snomed.info/sct",
    code: "8785008",
    display: "Dioxido de cloro",
  },
  {
    system: "http://snomed.info/sct",
    code: "8786009",
    display: "Antígeno del grupo sanguíneo Wd^a^",
  },
  {
    system: "http://snomed.info/sct",
    code: "8795001",
    display: "Hb F - Hemoglobina F",
  },
  {
    system: "http://snomed.info/sct",
    code: "8817004",
    display: "sitio del receptor de LH",
  },
  {
    system: "http://snomed.info/sct",
    code: "8818009",
    display: "Anticuerpo de grupo sanguíneo Tri W",
  },
  {
    system: "http://snomed.info/sct",
    code: "8822004",
    display: "Ácido linoleico",
  },
  {
    system: "http://snomed.info/sct",
    code: "8830003",
    display: "Nitrato reductasa (NAD(P)H)",
  },
  { system: "http://snomed.info/sct", code: "8836009", display: "galocianina" },
  {
    system: "http://snomed.info/sct",
    code: "8844009",
    display: "Hidroxibutirato-dímero hidrolasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8858006",
    display: "Nitrato de estroncio Sr^85^",
  },
  { system: "http://snomed.info/sct", code: "8865003", display: "Grafito" },
  {
    system: "http://snomed.info/sct",
    code: "8878003",
    display: "Antígeno del grupo sanguíneo Evelyn",
  },
  {
    system: "http://snomed.info/sct",
    code: "8882001",
    display: "3-hidroxibenzoato 6-monooxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8886003",
    display: "Acetato de flecainida",
  },
  {
    system: "http://snomed.info/sct",
    code: "8908003",
    display: "Anticuerpo de grupo sanguíneo I^T^",
  },
  { system: "http://snomed.info/sct", code: "8914005", display: "endolinfa" },
  { system: "http://snomed.info/sct", code: "8919000", display: "biotina" },
  { system: "http://snomed.info/sct", code: "8926000", display: "Azur B" },
  {
    system: "http://snomed.info/sct",
    code: "8945009",
    display: "Fosfopantotenato-cisteína ligasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8953001",
    display: "2,3-dihidroxiindol 2,3-dioxigenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8963009",
    display: "N-acetilmuramoil-L-alanina amidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8969008",
    display: "Secreciones bulbouretrales",
  },
  {
    system: "http://snomed.info/sct",
    code: "8977007",
    display: "Anticuerpo de grupo sanguíneo Tarplee",
  },
  {
    system: "http://snomed.info/sct",
    code: "8982000",
    display: "Oleato hidratasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "8987006",
    display: "Agente específico de la fase del ciclo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8991001",
    display: "ribuloquinasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9010006",
    display: "azul de metilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "9013008",
    display: "Defosfo-CoA quinasa",
  },
  { system: "http://snomed.info/sct", code: "9021002", display: "carbarilo" },
  {
    system: "http://snomed.info/sct",
    code: "9024005",
    display: "G6PD - Glucosa-6-fosfato deshidrogenasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9045003",
    display: "radioisótopo de radón",
  },
  {
    system: "http://snomed.info/sct",
    code: "9052001",
    display: "aceite de pimienta de Jamaica",
  },
  {
    system: "http://snomed.info/sct",
    code: "9054000",
    display: "Antígeno leucocitario humano B15",
  },
  {
    system: "http://snomed.info/sct",
    code: "9103003",
    display: "Retinol graso-aciltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9110009",
    display: "compuesto mercúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "9125009",
    display: "sempervirina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9159008",
    display: "Triacetato-lactonasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9172009",
    display: "Anticuerpo del grupo sanguíneo Alda",
  },
  {
    system: "http://snomed.info/sct",
    code: "9174005",
    display: "Poitiers de fibrinógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "9183000",
    display: "beta-N-acetilgalactosaminidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9189001",
    display:
      "CMP-N-acetilneuraminato-lactosilceramida alfa-2,3-sialiltransferasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9195000",
    display: "Alotipo INV del gen de la inmunoglobulina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9197008",
    display: "Apiosa reductasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9205004",
    display: "Tarrant de hemoglobina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9220005",
    display: "aceite de fenol vegetal",
  },
  {
    system: "http://snomed.info/sct",
    code: "9223007",
    display: "Deshidrogenasa de borneol",
  },
  {
    system: "http://snomed.info/sct",
    code: "9234005",
    display: "clorobutanol",
  },
  {
    system: "http://snomed.info/sct",
    code: "9246009",
    display: "^118^Telurio",
  },
  {
    system: "http://snomed.info/sct",
    code: "9253000",
    display: "antígeno HLA-DRw16",
  },
  {
    system: "http://snomed.info/sct",
    code: "9270008",
    display: "receptor de catecolaminas",
  },
  {
    system: "http://snomed.info/sct",
    code: "9271007",
    display: "Pontoise de fibrinógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "169008",
    display: "Preparación del factor liberador hipotalámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "211009",
    display: "Preparación de noretandrolona",
  },
  { system: "http://snomed.info/sct", code: "302007", display: "espiramicina" },
  {
    system: "http://snomed.info/sct",
    code: "439007",
    display: "Radiofármacos terapéuticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "449005",
    display: "penicilina procaína",
  },
  { system: "http://snomed.info/sct", code: "544002", display: "melfalán" },
  {
    system: "http://snomed.info/sct",
    code: "669007",
    display: "vacuna contra el virus vaccinia",
  },
  {
    system: "http://snomed.info/sct",
    code: "716000",
    display: "Agentes hematológicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "796001",
    display: "producto de digoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "847003",
    display: "preparación de D-tiroxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "902003",
    display: "droga experimental",
  },
  { system: "http://snomed.info/sct", code: "922004", display: "pralidoxima" },
  {
    system: "http://snomed.info/sct",
    code: "1039008",
    display: "6MP - Mercaptopurina",
  },
  { system: "http://snomed.info/sct", code: "1148001", display: "ticarcilina" },
  {
    system: "http://snomed.info/sct",
    code: "1182007",
    display: "agente hipotensor",
  },
  {
    system: "http://snomed.info/sct",
    code: "1206000",
    display: "Bloqueador alfa 2 adrenérgico",
  },
  {
    system: "http://snomed.info/sct",
    code: "1222004",
    display: "metronidazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "1389007",
    display: "beclometasona",
  },
  { system: "http://snomed.info/sct", code: "1434005", display: "calamina" },
  {
    system: "http://snomed.info/sct",
    code: "1528001",
    display: "Producto de ácido folínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "1552008",
    display: "Droga salurética",
  },
  { system: "http://snomed.info/sct", code: "1594006", display: "azatadina" },
  {
    system: "http://snomed.info/sct",
    code: "1613009",
    display: "maleato de dexbromfeniramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "1756009",
    display: "Anestésico tópico antipruriginoso",
  },
  {
    system: "http://snomed.info/sct",
    code: "1758005",
    display: "preparación de motilina",
  },
  { system: "http://snomed.info/sct", code: "1842003", display: "Difemanilo" },
  {
    system: "http://snomed.info/sct",
    code: "1878008",
    display: "Producto de hexaclorofano",
  },
  { system: "http://snomed.info/sct", code: "1887004", display: "permetrina" },
  {
    system: "http://snomed.info/sct",
    code: "1982006",
    display: "Preparación oftálmica de bacitracina",
  },
  {
    system: "http://snomed.info/sct",
    code: "2016004",
    display: "dextrometorfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "2037007",
    display: "Preparación antiinflamatoria ótica",
  },
  { system: "http://snomed.info/sct", code: "2183004", display: "tetrizolina" },
  { system: "http://snomed.info/sct", code: "2190009", display: "Benzhexol" },
  { system: "http://snomed.info/sct", code: "2497003", display: "Hexetidina" },
  { system: "http://snomed.info/sct", code: "2571007", display: "busulfán" },
  { system: "http://snomed.info/sct", code: "2596005", display: "lincomicina" },
  { system: "http://snomed.info/sct", code: "2679000", display: "Oxandrolona" },
  {
    system: "http://snomed.info/sct",
    code: "2944000",
    display: "agente depilatorio",
  },
  {
    system: "http://snomed.info/sct",
    code: "2949005",
    display: "Agentes de diagnóstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "3037004",
    display: "Preparación de flumetasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "3046005",
    display: "maleato de enalapril",
  },
  {
    system: "http://snomed.info/sct",
    code: "3127006",
    display: "5FU - Fluorouracilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "3221003",
    display: "Solución de timbre",
  },
  { system: "http://snomed.info/sct", code: "3334000", display: "cefotaxima" },
  {
    system: "http://snomed.info/sct",
    code: "3361000",
    display: "Agente anti-heparina",
  },
  {
    system: "http://snomed.info/sct",
    code: "3526007",
    display: "Vacuna antirrábica humana",
  },
  {
    system: "http://snomed.info/sct",
    code: "3593009",
    display: "Preparación antiinfecciosa ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "3814009",
    display: "Producto de propiltiouracilo",
  },
  { system: "http://snomed.info/sct", code: "3822002", display: "suxametonio" },
  {
    system: "http://snomed.info/sct",
    code: "4126008",
    display: "Preparación de fluprednisolona",
  },
  { system: "http://snomed.info/sct", code: "4194004", display: "mazindol" },
  {
    system: "http://snomed.info/sct",
    code: "4219002",
    display: "penicilamina",
  },
  { system: "http://snomed.info/sct", code: "4220008", display: "tolazolina" },
  {
    system: "http://snomed.info/sct",
    code: "4382004",
    display: "Agente antihipertensivo de acción central",
  },
  {
    system: "http://snomed.info/sct",
    code: "4704002",
    display: "iotiouracilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "4741001",
    display: "Preparación de folato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "4753002",
    display: "Pasta dental de triamcinolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "4865009",
    display: "Preparación del factor liberador de prolactina",
  },
  { system: "http://snomed.info/sct", code: "4937008", display: "Cefaclor" },
  {
    system: "http://snomed.info/sct",
    code: "5067008",
    display: "Medicamentos antitiroideos",
  },
  {
    system: "http://snomed.info/sct",
    code: "5465006",
    display: "Clorhidrato de propitocaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "5478006",
    display: "trifluperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "5487002",
    display: "agente terapéutico",
  },
  {
    system: "http://snomed.info/sct",
    code: "5606003",
    display: "Preparado nasal de dexametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "5720001",
    display: "Antiveneno Latrodectus mactans",
  },
  {
    system: "http://snomed.info/sct",
    code: "5737008",
    display: "demeclociclina",
  },
  { system: "http://snomed.info/sct", code: "5776009", display: "Anestésico" },
  {
    system: "http://snomed.info/sct",
    code: "5786005",
    display: "clorotiazida",
  },
  { system: "http://snomed.info/sct", code: "5797005", display: "clotrimazol" },
  {
    system: "http://snomed.info/sct",
    code: "5924003",
    display: "dinitrato de isosorbida",
  },
  { system: "http://snomed.info/sct", code: "5975000", display: "niclosamida" },
  {
    system: "http://snomed.info/sct",
    code: "6028009",
    display: "Preparación de triamcinolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "6067003",
    display: "orciprenalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "6071000",
    display: "Preparación de alquitrán de hulla",
  },
  { system: "http://snomed.info/sct", code: "6102009", display: "baclofeno" },
  {
    system: "http://snomed.info/sct",
    code: "6116004",
    display: "preparación de oximetolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "6122008",
    display: "Fármaco antiarrítmico de clase Ia",
  },
  { system: "http://snomed.info/sct", code: "6232005", display: "nafazolina" },
  {
    system: "http://snomed.info/sct",
    code: "6247001",
    display: "preparación de ácido fólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6259002",
    display: "Solución de peróxido de hidrógeno al 3%",
  },
  {
    system: "http://snomed.info/sct",
    code: "6369005",
    display: "Penicilina -clase de antibiótico-",
  },
  {
    system: "http://snomed.info/sct",
    code: "6425004",
    display: "Antihistamínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "6517004",
    display: "Agente antipsicótico derivado de butirofenona",
  },
  { system: "http://snomed.info/sct", code: "6526001", display: "nalorfina" },
  {
    system: "http://snomed.info/sct",
    code: "6625006",
    display: "Sulfato de cinc",
  },
  {
    system: "http://snomed.info/sct",
    code: "6652001",
    display: "Preparación de pantotenato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "6716006",
    display: "agente abortivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "6960003",
    display: "Polimixina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "6985007",
    display: "preparación de opio",
  },
  { system: "http://snomed.info/sct", code: "7092007", display: "metoprolol" },
  {
    system: "http://snomed.info/sct",
    code: "7140000",
    display: "Medios de contraste radiográfico",
  },
  {
    system: "http://snomed.info/sct",
    code: "7168001",
    display: "Carbonato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7230005",
    display: "vacuna contra la brucela",
  },
  {
    system: "http://snomed.info/sct",
    code: "7235000",
    display: "Antihistamínico derivado de etilendiamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "7292004",
    display: "Verde de indocianina",
  },
  { system: "http://snomed.info/sct", code: "7336002", display: "trazodona" },
  {
    system: "http://snomed.info/sct",
    code: "7561000",
    display: "Preparación de dexametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "7577004",
    display: "Ciprofloxacino",
  },
  {
    system: "http://snomed.info/sct",
    code: "7624002",
    display: "Producto de perborato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "7836006",
    display: "expectorantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "7947003",
    display: "Ácido acetilsalicílico",
  },
  { system: "http://snomed.info/sct", code: "7959004", display: "tenipósido" },
  {
    system: "http://snomed.info/sct",
    code: "7982002",
    display: "clorhidrato de fenmetrazina",
  },
  { system: "http://snomed.info/sct", code: "8028001", display: "Butacaína" },
  { system: "http://snomed.info/sct", code: "8109005", display: "alimemazina" },
  {
    system: "http://snomed.info/sct",
    code: "8163008",
    display: "nitroprusiato",
  },
  {
    system: "http://snomed.info/sct",
    code: "8348002",
    display: "ciclopentolato",
  },
  { system: "http://snomed.info/sct", code: "8372007", display: "prometazina" },
  {
    system: "http://snomed.info/sct",
    code: "8416000",
    display: "dicloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8571001",
    display: "vasoconstrictor",
  },
  {
    system: "http://snomed.info/sct",
    code: "8658008",
    display: "Preparación de albúmina de suero humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "8661009",
    display: "Preparación de reemplazo",
  },
  {
    system: "http://snomed.info/sct",
    code: "8692006",
    display: "metanfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "8696009",
    display: "Antiespasmódico",
  },
  { system: "http://snomed.info/sct", code: "9190005", display: "tropicamida" },
  {
    system: "http://snomed.info/sct",
    code: "9268004",
    display: "butabarbitona",
  },
  {
    system: "http://snomed.info/sct",
    code: "9307009",
    display: "Preparación de globulina de suero animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "9500005",
    display: "IMAO - Fenelzina",
  },
  {
    system: "http://snomed.info/sct",
    code: "9542007",
    display: "Inmunoglobulina antihepatitis B",
  },
  { system: "http://snomed.info/sct", code: "9690006", display: "niquetamida" },
  {
    system: "http://snomed.info/sct",
    code: "9745007",
    display: "producto sacarosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "9778000",
    display: "Inmunoglobulina de citomegalovirus",
  },
  {
    system: "http://snomed.info/sct",
    code: "9944001",
    display: "clorfenamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "10099000",
    display: "ketoprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "10135005",
    display: "Alcaloide de cinchona",
  },
  {
    system: "http://snomed.info/sct",
    code: "10243007",
    display: "Ungüento de ácido benzoico y salicílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "10312003",
    display: "preparación de prednisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "10332002",
    display: "Vacuna - bacterina - toxoide",
  },
  {
    system: "http://snomed.info/sct",
    code: "10355004",
    display: "Preparado vitamínico inyectable",
  },
  {
    system: "http://snomed.info/sct",
    code: "10356003",
    display: "Ácido undecilénico y sal de undecilenato",
  },
  {
    system: "http://snomed.info/sct",
    code: "10368007",
    display: "polvo de avena coloidal",
  },
  {
    system: "http://snomed.info/sct",
    code: "10422008",
    display: "nitropentaeritrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "10504007",
    display: "doxiciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "10515002",
    display: "Preparación de lututrina",
  },
  { system: "http://snomed.info/sct", code: "10555000", display: "tocainida" },
  {
    system: "http://snomed.info/sct",
    code: "10632007",
    display: "Preparación multivitamínica",
  },
  {
    system: "http://snomed.info/sct",
    code: "10668002",
    display: "Antiinfeccioso para la piel",
  },
  {
    system: "http://snomed.info/sct",
    code: "10712001",
    display: "producto de glucagón",
  },
  {
    system: "http://snomed.info/sct",
    code: "10756001",
    display: "haloperidol",
  },
  {
    system: "http://snomed.info/sct",
    code: "10784006",
    display: "Agente antipsicótico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11185009",
    display: "Vacuna autógena - bacterina autógena",
  },
  {
    system: "http://snomed.info/sct",
    code: "11260008",
    display: "Preparado antiinfeccioso oftálmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11402001",
    display: "enzima medicinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "11430001",
    display: "Fármaco antidepresivo tetracíclico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11563006",
    display: "preparación de vitamina D",
  },
  {
    system: "http://snomed.info/sct",
    code: "11719000",
    display: "cetilpiridinio",
  },
  {
    system: "http://snomed.info/sct",
    code: "11777007",
    display: "antibiótico oftálmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "11783005",
    display: "Ablandador fecal",
  },
  {
    system: "http://snomed.info/sct",
    code: "11796006",
    display: "metisergida",
  },
  { system: "http://snomed.info/sct", code: "11841005", display: "doxepina" },
  { system: "http://snomed.info/sct", code: "11847009", display: "naproxeno" },
  {
    system: "http://snomed.info/sct",
    code: "11866009",
    display: "vacuna contra la peste",
  },
  {
    system: "http://snomed.info/sct",
    code: "11959009",
    display: "procainamida",
  },
  { system: "http://snomed.info/sct", code: "12096000", display: "nistatina" },
  {
    system: "http://snomed.info/sct",
    code: "12236006",
    display: "producto de pancreatina",
  },
  {
    system: "http://snomed.info/sct",
    code: "12289007",
    display: "producto de sangre entera",
  },
  {
    system: "http://snomed.info/sct",
    code: "12335007",
    display: "diatrizoato",
  },
  {
    system: "http://snomed.info/sct",
    code: "12369008",
    display: "producto de oxitocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "12425002",
    display: "Producto de glóbulos blancos humanos",
  },
  {
    system: "http://snomed.info/sct",
    code: "12436009",
    display: "Vinblastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "12495006",
    display: "Citrato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "12512008",
    display: "triamtereno",
  },
  { system: "http://snomed.info/sct", code: "12559001", display: "Emetina" },
  {
    system: "http://snomed.info/sct",
    code: "12657005",
    display: "Preparación de acetato de fludrocortisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "12839006",
    display: "producto de estradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "12968008",
    display: "productos vitamínicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "13132007",
    display: "producto de dextrano",
  },
  { system: "http://snomed.info/sct", code: "13154009", display: "clormetina" },
  {
    system: "http://snomed.info/sct",
    code: "13178004",
    display: "Vacuna Rickettsial",
  },
  { system: "http://snomed.info/sct", code: "13252002", display: "salsalato" },
  {
    system: "http://snomed.info/sct",
    code: "13414000",
    display: "cefadroxilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "13432000",
    display: "nortriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "13512003",
    display: "minociclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "13525006",
    display: "preparación de acetilcolina",
  },
  { system: "http://snomed.info/sct", code: "13565005", display: "bisacodilo" },
  {
    system: "http://snomed.info/sct",
    code: "13592004",
    display: "pirazinamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "13664004",
    display: "BAL - Anti-Lewisita británica",
  },
  {
    system: "http://snomed.info/sct",
    code: "13790009",
    display: "Preparación de hierro en forma oral",
  },
  { system: "http://snomed.info/sct", code: "13800009", display: "naftifina" },
  {
    system: "http://snomed.info/sct",
    code: "13813003",
    display: "Preparación de biotina",
  },
  {
    system: "http://snomed.info/sct",
    code: "13929005",
    display: "espironolactona",
  },
  { system: "http://snomed.info/sct", code: "13936006", display: "butorfanol" },
  {
    system: "http://snomed.info/sct",
    code: "13965000",
    display: "Ácido valproico",
  },
  {
    system: "http://snomed.info/sct",
    code: "14054003",
    display: "Preparaciones del complejo de vitamina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "14103001",
    display: "Antagonista de opiáceos",
  },
  {
    system: "http://snomed.info/sct",
    code: "14170004",
    display: "capreomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "14542005",
    display: "Vial de solución inyectable de cafeína y benzoato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "14601000",
    display: "Agente anticolinérgico",
  },
  {
    system: "http://snomed.info/sct",
    code: "14706000",
    display: "feneticilina",
  },
  { system: "http://snomed.info/sct", code: "14728000", display: "cloroquina" },
  {
    system: "http://snomed.info/sct",
    code: "14745005",
    display: "Vacuna contra la hepatitis A",
  },
  {
    system: "http://snomed.info/sct",
    code: "14814001",
    display: "trimetobenzamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "14816004",
    display: "Producto de cocaína",
  },
  { system: "http://snomed.info/sct", code: "15117003", display: "Coagulante" },
  { system: "http://snomed.info/sct", code: "15222008", display: "enalapril" },
  {
    system: "http://snomed.info/sct",
    code: "15375005",
    display: "Derivado de fenantreno",
  },
  { system: "http://snomed.info/sct", code: "15383004", display: "levodopa" },
  {
    system: "http://snomed.info/sct",
    code: "15389000",
    display: "Anticonvulsivo derivado de la hidantoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "15432003",
    display: "Etinilestradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "15772006",
    display: "Producto bloqueador beta 1",
  },
  {
    system: "http://snomed.info/sct",
    code: "15857002",
    display: "Antihistamínico derivado de etanolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16031005",
    display: "Dexclorfeniramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16037009",
    display: "Producto de terfenadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16047007",
    display: "Benzodiazepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "16131008",
    display: "antisuero animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "16403005",
    display: "Agente antiinflamatorio no esteroideo",
  },
  {
    system: "http://snomed.info/sct",
    code: "16602005",
    display: "preparación de hidrocortisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "16787005",
    display: "Streptococcus equisimilis - suis antisuero",
  },
  { system: "http://snomed.info/sct", code: "16791000", display: "cefradina" },
  {
    system: "http://snomed.info/sct",
    code: "16832004",
    display: "Estrógenos conjugados",
  },
  { system: "http://snomed.info/sct", code: "16858004", display: "Urea" },
  {
    system: "http://snomed.info/sct",
    code: "16867004",
    display: "Sulfatiazol",
  },
  { system: "http://snomed.info/sct", code: "16970001", display: "Proguanil" },
  {
    system: "http://snomed.info/sct",
    code: "16977003",
    display: "carbonato de litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "17016006",
    display: "gammaglobulina animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "17055007",
    display: "acidulante sistémico",
  },
  { system: "http://snomed.info/sct", code: "17308007", display: "dapsona" },
  {
    system: "http://snomed.info/sct",
    code: "17386008",
    display: "Agente antiinfeccioso",
  },
  {
    system: "http://snomed.info/sct",
    code: "17502009",
    display: "trietioduro de galamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "17554004",
    display: "Preparación de parametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "17558001",
    display: "Aceite de maíz",
  },
  {
    system: "http://snomed.info/sct",
    code: "17600005",
    display: "Radiofármacos de diagnóstico",
  },
  {
    system: "http://snomed.info/sct",
    code: "17805003",
    display: "citrato de litio",
  },
  {
    system: "http://snomed.info/sct",
    code: "17859000",
    display: "Antiveneno polivalente para crotalidae",
  },
  {
    system: "http://snomed.info/sct",
    code: "17893001",
    display: "Relajante del músculo esquelético",
  },
  { system: "http://snomed.info/sct", code: "18002004", display: "auranofina" },
  {
    system: "http://snomed.info/sct",
    code: "18125000",
    display: "fluocinonida",
  },
  {
    system: "http://snomed.info/sct",
    code: "18335001",
    display: "Ácido aureólico",
  },
  {
    system: "http://snomed.info/sct",
    code: "18340009",
    display: "oxicloroseno",
  },
  { system: "http://snomed.info/sct", code: "18381001", display: "Prindolol" },
  {
    system: "http://snomed.info/sct",
    code: "18511007",
    display: "Droga generica",
  },
  {
    system: "http://snomed.info/sct",
    code: "18548003",
    display: "Metilfenidato",
  },
  {
    system: "http://snomed.info/sct",
    code: "18679008",
    display: "Resina eliminadora de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "18811003",
    display: "Preparación de L-asparaginasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "18914005",
    display: "hidroflumetiazida",
  },
  { system: "http://snomed.info/sct", code: "18952006", display: "econazol" },
  { system: "http://snomed.info/sct", code: "19194001", display: "ddl" },
  { system: "http://snomed.info/sct", code: "19225000", display: "Lorazepam" },
  { system: "http://snomed.info/sct", code: "19232009", display: "prilocaína" },
  {
    system: "http://snomed.info/sct",
    code: "19261005",
    display: "Sulfinpirazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "19315007",
    display: "Preparación de clorhidrato de piridoxina",
  },
  { system: "http://snomed.info/sct", code: "19403009", display: "flurazepam" },
  {
    system: "http://snomed.info/sct",
    code: "19405002",
    display: "netilmicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "19581007",
    display: "Agente parasimpaticomimético",
  },
  {
    system: "http://snomed.info/sct",
    code: "19583005",
    display: "diclofenamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "19630009",
    display: "Sulfadiazina de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "19768003",
    display: "Drogas alquilantes",
  },
  {
    system: "http://snomed.info/sct",
    code: "19841008",
    display: "ceftriaxona",
  },
  {
    system: "http://snomed.info/sct",
    code: "20091003",
    display: "Preparación del factor liberador de somatotropina",
  },
  { system: "http://snomed.info/sct", code: "20201001", display: "nafoxidina" },
  {
    system: "http://snomed.info/sct",
    code: "20237006",
    display: "Preparación de dihidrotaquisterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "20249007",
    display: "Preparación de progestina",
  },
  {
    system: "http://snomed.info/sct",
    code: "20303001",
    display: "sulfato de vinblastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "20320002",
    display: "hidrocodona",
  },
  {
    system: "http://snomed.info/sct",
    code: "20577002",
    display: "HCG - Producto de gonadotropina coriónica humana",
  },
  { system: "http://snomed.info/sct", code: "20865003", display: "diflunisal" },
  {
    system: "http://snomed.info/sct",
    code: "20969008",
    display: "Antiveneno de serpiente polivalente",
  },
  {
    system: "http://snomed.info/sct",
    code: "21069002",
    display: "agente lipotrópico",
  },
  { system: "http://snomed.info/sct", code: "21159006", display: "Pargyline" },
  {
    system: "http://snomed.info/sct",
    code: "21451004",
    display: "Cloruro de indio-113m",
  },
  {
    system: "http://snomed.info/sct",
    code: "21691008",
    display: "trisilicato de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "21701005",
    display: "ácido cromoglicico",
  },
  {
    system: "http://snomed.info/sct",
    code: "21767006",
    display: "complejo de hierro dextrano",
  },
  {
    system: "http://snomed.info/sct",
    code: "21788002",
    display: "Clorhidrato de fenazopiridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "21986005",
    display: "Antisuero de Erysipelothrix rhusiopathiae",
  },
  {
    system: "http://snomed.info/sct",
    code: "22091006",
    display: "Preparación de hormonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "22168005",
    display: "glicopirronio",
  },
  { system: "http://snomed.info/sct", code: "22198003", display: "metolazona" },
  {
    system: "http://snomed.info/sct",
    code: "22274004",
    display: "Preparación de metandriol",
  },
  {
    system: "http://snomed.info/sct",
    code: "22474002",
    display: "Preparación de aldosterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "22587006",
    display: "Relajante muscular despolarizante",
  },
  {
    system: "http://snomed.info/sct",
    code: "22657006",
    display: "producto de calcitonina",
  },
  {
    system: "http://snomed.info/sct",
    code: "22672005",
    display: "grupo de anfetaminas",
  },
  {
    system: "http://snomed.info/sct",
    code: "22696000",
    display: "hidralazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "22801004",
    display: "Solución de agua estéril",
  },
  {
    system: "http://snomed.info/sct",
    code: "22826008",
    display: "Desintoxicante de amoníaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "22969001",
    display: "Oxitetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "23079006",
    display: "vincristina",
  },
  { system: "http://snomed.info/sct", code: "23222006", display: "antisueros" },
  {
    system: "http://snomed.info/sct",
    code: "23343005",
    display: "producto de plaquetas humanas",
  },
  {
    system: "http://snomed.info/sct",
    code: "23532003",
    display: "fenmetrazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "23822003",
    display: "fracción de plasma humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "23827009",
    display: "Sulfacetamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "23838009",
    display: "Agente bloqueador alfa-adrenérgico no específico",
  },
  { system: "http://snomed.info/sct", code: "23888001", display: "cascara" },
  {
    system: "http://snomed.info/sct",
    code: "24036003",
    display: "Medicamento antianemia",
  },
  {
    system: "http://snomed.info/sct",
    code: "24450004",
    display: "etambutolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "24504000",
    display: "Metilcelulosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "24866006",
    display: "Antisuero de Salmonella typhimurium",
  },
  {
    system: "http://snomed.info/sct",
    code: "24891006",
    display: "amidotrizoato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "25014009",
    display: "Tripelennamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "25057004",
    display: "Producto diurético mercurial",
  },
  {
    system: "http://snomed.info/sct",
    code: "25076002",
    display: "carisoprodol",
  },
  {
    system: "http://snomed.info/sct",
    code: "25085002",
    display: "Preparación de colecistoquinina",
  },
  { system: "http://snomed.info/sct", code: "25142008", display: "trilostano" },
  { system: "http://snomed.info/sct", code: "25246002", display: "alopurinol" },
  { system: "http://snomed.info/sct", code: "25398003", display: "Ichthammol" },
  {
    system: "http://snomed.info/sct",
    code: "25419009",
    display: "Sulfato de bario",
  },
  {
    system: "http://snomed.info/sct",
    code: "25465007",
    display: "Anticuerpo monoclonal de Escherichia coli",
  },
  { system: "http://snomed.info/sct", code: "25673006", display: "omeprazol" },
  {
    system: "http://snomed.info/sct",
    code: "25716001",
    display: "Toxoide tetánico, humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "25849001",
    display: "SNP - Nitroprusiato de sodio",
  },
  { system: "http://snomed.info/sct", code: "25860005", display: "Terconazol" },
  {
    system: "http://snomed.info/sct",
    code: "25912006",
    display: "Preparación de difosfato sódico de menadiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "25995007",
    display: "triprolidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "26122009",
    display: "dimetindeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "26124005",
    display: "producto de glipizida",
  },
  {
    system: "http://snomed.info/sct",
    code: "26244009",
    display: "Antimuscarínico",
  },
  {
    system: "http://snomed.info/sct",
    code: "26303005",
    display: "Preparación de hexestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "26370007",
    display: "agente hemostático",
  },
  {
    system: "http://snomed.info/sct",
    code: "26456008",
    display: "Preparación de levotiroxina sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "26458009",
    display: "difenhidramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "26462003",
    display: "Ciproheptadina",
  },
  {
    system: "http://snomed.info/sct",
    code: "26503009",
    display: "Deserpidina",
  },
  { system: "http://snomed.info/sct", code: "26523005", display: "dobutamina" },
  {
    system: "http://snomed.info/sct",
    code: "26548008",
    display: "Producto de hormona pancreática",
  },
  { system: "http://snomed.info/sct", code: "26574002", display: "droperidol" },
  { system: "http://snomed.info/sct", code: "26580005", display: "Digestivo" },
  {
    system: "http://snomed.info/sct",
    code: "26736008",
    display: "Gluconato ferroso",
  },
  { system: "http://snomed.info/sct", code: "26800000", display: "midazolam" },
  {
    system: "http://snomed.info/sct",
    code: "26842003",
    display: "Preparación de aceite de hígado de lota",
  },
  {
    system: "http://snomed.info/sct",
    code: "27035007",
    display: "Antagonista de metales pesados",
  },
  {
    system: "http://snomed.info/sct",
    code: "27085003",
    display: "Sulfonato de poliestireno de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "27196008",
    display: "bupivacaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "27242001",
    display: "Preparación de metilprednisolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "27479000",
    display: "AZT - Azidotimidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "27518004",
    display: "Hormona paratiroidea",
  },
  {
    system: "http://snomed.info/sct",
    code: "27548001",
    display: "LA - Fármaco anestésico local",
  },
  {
    system: "http://snomed.info/sct",
    code: "27566006",
    display: "conservante de vehículo de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "27638005",
    display: "T-PA - activador del plasminógeno de tipo tisular",
  },
  {
    system: "http://snomed.info/sct",
    code: "27658006",
    display: "amoxicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "27707001",
    display: "Preparación de acetato de medroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "27754002",
    display: "pirazinobutazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "27867009",
    display: "antineoplásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "28028002",
    display: "Preparación de hormonas sintéticas",
  },
  {
    system: "http://snomed.info/sct",
    code: "28149003",
    display: "pentostatina",
  },
  { system: "http://snomed.info/sct", code: "28235004", display: "doxapram" },
  {
    system: "http://snomed.info/sct",
    code: "28240007",
    display: "cosmético de ojos",
  },
  {
    system: "http://snomed.info/sct",
    code: "28410007",
    display: "alfa-carboxipenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "28415002",
    display: "metescopolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "28426008",
    display: "fluocinolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "28506006",
    display: "flucitosina",
  },
  {
    system: "http://snomed.info/sct",
    code: "28748001",
    display: "Hidrato de cloral",
  },
  {
    system: "http://snomed.info/sct",
    code: "28841002",
    display: "anhidrohidroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "28906000",
    display: "Preparación de aceite de hígado percoide",
  },
  {
    system: "http://snomed.info/sct",
    code: "29051009",
    display: "Producto diurético de asa",
  },
  {
    system: "http://snomed.info/sct",
    code: "29058003",
    display: "Halcinonida",
  },
  {
    system: "http://snomed.info/sct",
    code: "29089004",
    display: "dibromomanitol",
  },
  { system: "http://snomed.info/sct", code: "29121001", display: "Mersalilo" },
  {
    system: "http://snomed.info/sct",
    code: "29129004",
    display: "oximetazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "29156002",
    display: "mecloretamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "29175007",
    display: "producto de rifampicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "29237004",
    display: "antiveneno para arácnidos",
  },
  { system: "http://snomed.info/sct", code: "29439004", display: "captopril" },
  {
    system: "http://snomed.info/sct",
    code: "29620001",
    display: "preparación de beta-tocoferol",
  },
  { system: "http://snomed.info/sct", code: "29840005", display: "amoxapina" },
  {
    system: "http://snomed.info/sct",
    code: "29877002",
    display: "IMAO - Isocarboxazida",
  },
  {
    system: "http://snomed.info/sct",
    code: "29883004",
    display: "Antiarrítmico clase IV",
  },
  {
    system: "http://snomed.info/sct",
    code: "29896003",
    display: "betametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "29987004",
    display: "Preparación de vitaminas A y D",
  },
  {
    system: "http://snomed.info/sct",
    code: "30010009",
    display: "Producto de cianocobalamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "30125007",
    display: "producto de sen",
  },
  {
    system: "http://snomed.info/sct",
    code: "30306003",
    display: "Preparación de vitamina B1",
  },
  { system: "http://snomed.info/sct", code: "30317002", display: "cisaprida" },
  {
    system: "http://snomed.info/sct",
    code: "30427009",
    display: "producto de eritromicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "30466001",
    display: "cloramifeno",
  },
  { system: "http://snomed.info/sct", code: "30492008", display: "Diurético" },
  {
    system: "http://snomed.info/sct",
    code: "30666008",
    display: "Toxoide (humano)",
  },
  {
    system: "http://snomed.info/sct",
    code: "30729008",
    display: "preparación de hierro",
  },
  {
    system: "http://snomed.info/sct",
    code: "30761007",
    display: "Producto de manitol",
  },
  {
    system: "http://snomed.info/sct",
    code: "30964009",
    display: "Metiprilona",
  },
  {
    system: "http://snomed.info/sct",
    code: "30988006",
    display: "Preparación de dienestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "31025003",
    display: "Agente antipsicótico derivado de la dibenzoxazepina",
  },
  { system: "http://snomed.info/sct", code: "31087008", display: "ampicilina" },
  {
    system: "http://snomed.info/sct",
    code: "31181006",
    display: "Preparado de testosterona inyectable",
  },
  {
    system: "http://snomed.info/sct",
    code: "31231007",
    display: "H2O2 - Peróxido de hidrógeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "31305008",
    display: "Streptococcus equisimilis antisuero",
  },
  { system: "http://snomed.info/sct", code: "31306009", display: "quinidina" },
  {
    system: "http://snomed.info/sct",
    code: "31352002",
    display: "Suero de calostro normal",
  },
  {
    system: "http://snomed.info/sct",
    code: "31587003",
    display: "Líquido de aceite de almendras",
  },
  {
    system: "http://snomed.info/sct",
    code: "31684002",
    display: "buprenorfina",
  },
  { system: "http://snomed.info/sct", code: "31690003", display: "Betanecol" },
  {
    system: "http://snomed.info/sct",
    code: "31692006",
    display: "pentamidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "31716004",
    display: "Producto de plasma congelado, humano",
  },
  { system: "http://snomed.info/sct", code: "31865003", display: "fluconazol" },
  { system: "http://snomed.info/sct", code: "31872002", display: "pramocaína" },
  {
    system: "http://snomed.info/sct",
    code: "31970009",
    display: "vasodilatador de nitrato",
  },
  {
    system: "http://snomed.info/sct",
    code: "32249005",
    display: "Medicamentos antivirales",
  },
  { system: "http://snomed.info/sct", code: "32313007", display: "enflurano" },
  {
    system: "http://snomed.info/sct",
    code: "32460003",
    display: "Preparación nasal de dipropionato de beclometasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "32462006",
    display:
      "Preparación de factor liberador de hormona estimulante de melanocitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "32473004",
    display: "antiveneno de araña",
  },
  { system: "http://snomed.info/sct", code: "32474005", display: "Probucol" },
  {
    system: "http://snomed.info/sct",
    code: "32583002",
    display: "Medicamento antiseborreico",
  },
  { system: "http://snomed.info/sct", code: "32647002", display: "Ergotamina" },
  {
    system: "http://snomed.info/sct",
    code: "32653002",
    display: "Preparación de ergosterol",
  },
  {
    system: "http://snomed.info/sct",
    code: "32792001",
    display: "trimetoprima",
  },
  {
    system: "http://snomed.info/sct",
    code: "32823007",
    display: "maprotilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "32841004",
    display: "NaCl - Solución de cloruro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "32955006",
    display: "domperidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "32960005",
    display: "tiosalicilato",
  },
  { system: "http://snomed.info/sct", code: "33124007", display: "Butamidum" },
  {
    system: "http://snomed.info/sct",
    code: "33133009",
    display: "Preparado antiinflamatorio oftálmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "33219003",
    display: "Antidepresivo tricíclico",
  },
  {
    system: "http://snomed.info/sct",
    code: "33231001",
    display: "pentobarbital",
  },
  { system: "http://snomed.info/sct", code: "33234009", display: "Var/Vac" },
  {
    system: "http://snomed.info/sct",
    code: "33236006",
    display: "Preparación de acetato de cortisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "33252009",
    display: "fármaco bloqueador de los receptores beta-adrenérgicos",
  },
  {
    system: "http://snomed.info/sct",
    code: "33378002",
    display: "desipramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "33484000",
    display: "Medicamento patentado",
  },
  {
    system: "http://snomed.info/sct",
    code: "33588000",
    display: "tioridazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "33589008",
    display: "glucósido cardíaco",
  },
  {
    system: "http://snomed.info/sct",
    code: "33664007",
    display: "Acetazolamida",
  },
  { system: "http://snomed.info/sct", code: "33675006", display: "carbacol" },
  { system: "http://snomed.info/sct", code: "33682005", display: "midriático" },
  {
    system: "http://snomed.info/sct",
    code: "33815001",
    display: "Streptococcus suis antisuero",
  },
  {
    system: "http://snomed.info/sct",
    code: "34012005",
    display: "Producto de sulfonilurea",
  },
  {
    system: "http://snomed.info/sct",
    code: "34217006",
    display: "Oxiquinolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34364009",
    display: "Ácido mefenámico",
  },
  { system: "http://snomed.info/sct", code: "34393009", display: "tolazamida" },
  { system: "http://snomed.info/sct", code: "34462007", display: "natamicina" },
  {
    system: "http://snomed.info/sct",
    code: "34598001",
    display:
      "Agente inmunobiológico disponible en los Centros para el Control y la Prevención de Enfermedades",
  },
  {
    system: "http://snomed.info/sct",
    code: "34599009",
    display: "Preparación de tiroglobulina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34689006",
    display: "vacuna contra la hepatitis B",
  },
  {
    system: "http://snomed.info/sct",
    code: "34693000",
    display: "Zalcitabina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34696008",
    display: "Preparación de ascorbato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "34731007",
    display: "carbenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "34816007",
    display: "aceite de hígado de bacalao",
  },
  {
    system: "http://snomed.info/sct",
    code: "34833000",
    display: "Preparación oftálmica de hidrocortisona",
  },
  { system: "http://snomed.info/sct", code: "34929006", display: "bencetonio" },
  {
    system: "http://snomed.info/sct",
    code: "35035001",
    display: "orfenadrina",
  },
  { system: "http://snomed.info/sct", code: "35063004", display: "ribavirina" },
  {
    system: "http://snomed.info/sct",
    code: "35097006",
    display: "antígeno de pulgas",
  },
  {
    system: "http://snomed.info/sct",
    code: "35282000",
    display: "gemfibrozilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "35300007",
    display: "daunorrubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "35324004",
    display: "Producto de paraldehído",
  },
  {
    system: "http://snomed.info/sct",
    code: "35392005",
    display: "Resina eliminadora de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "35476001",
    display: "Producto de nitrato de plata",
  },
  {
    system: "http://snomed.info/sct",
    code: "35531004",
    display: "Preparación de hidrocortamato",
  },
  {
    system: "http://snomed.info/sct",
    code: "35736007",
    display: "Vacunas contra el cólera",
  },
  {
    system: "http://snomed.info/sct",
    code: "35768004",
    display: "Oxibutinina",
  },
  {
    system: "http://snomed.info/sct",
    code: "35792007",
    display: "solución de diálisis peritoneal",
  },
  { system: "http://snomed.info/sct", code: "35967000", display: "medazepam" },
  {
    system: "http://snomed.info/sct",
    code: "35983000",
    display: "Producto de sangre celular, humano",
  },
  { system: "http://snomed.info/sct", code: "36068003", display: "pirantel" },
  { system: "http://snomed.info/sct", code: "36113004", display: "imipramina" },
  {
    system: "http://snomed.info/sct",
    code: "36168000",
    display: "Preparaciones nasales antiinfecciosas",
  },
  {
    system: "http://snomed.info/sct",
    code: "36218003",
    display: "tietilperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36236003",
    display: "antidepresivo",
  },
  { system: "http://snomed.info/sct", code: "36391008", display: "primaquina" },
  { system: "http://snomed.info/sct", code: "36537006", display: "ambenonio" },
  {
    system: "http://snomed.info/sct",
    code: "36594001",
    display: "tiabendazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "36621009",
    display: "medroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "36642006",
    display: "propantelina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36763003",
    display: "Inmunoglobulina IM",
  },
  {
    system: "http://snomed.info/sct",
    code: "36795002",
    display: "Sulfato de estrona de piperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36893000",
    display: "ceftazidima",
  },
  {
    system: "http://snomed.info/sct",
    code: "36909007",
    display: "Fenindamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "36940000",
    display: "Agente antipsicótico derivado del tioxanteno",
  },
  {
    system: "http://snomed.info/sct",
    code: "36944009",
    display: "Preparación de vitamina B6",
  },
  {
    system: "http://snomed.info/sct",
    code: "37084008",
    display: "4-quinolonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "37146000",
    display: "vacuna contra el tifus",
  },
  { system: "http://snomed.info/sct", code: "37306000", display: "Vidarabina" },
  {
    system: "http://snomed.info/sct",
    code: "37400007",
    display: "Sulfato de magnesio",
  },
  { system: "http://snomed.info/sct", code: "37628007", display: "cefalotina" },
  {
    system: "http://snomed.info/sct",
    code: "37643009",
    display: "bacterina autógena",
  },
  {
    system: "http://snomed.info/sct",
    code: "37773009",
    display: "Agente antipsicótico derivado de la difenilbutilpiperidina",
  },
  {
    system: "http://snomed.info/sct",
    code: "37803001",
    display: "d-TC - Tubocurarina",
  },
  {
    system: "http://snomed.info/sct",
    code: "38076006",
    display: "tiroxina de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "38131009",
    display: "Droga sintética",
  },
  { system: "http://snomed.info/sct", code: "38166006", display: "tolnaftato" },
  {
    system: "http://snomed.info/sct",
    code: "38181000",
    display: "Antibiótico antineoplásico",
  },
  {
    system: "http://snomed.info/sct",
    code: "38231004",
    display: "complejo de polisacárido de hierro",
  },
  {
    system: "http://snomed.info/sct",
    code: "38268001",
    display: "Ácido propiónico-ibuprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "38314008",
    display: "isotretinoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "38413003",
    display: "Producto en forma de dosificación ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "38578004",
    display: "Preparación de megestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "38828006",
    display: "Tiosulfato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "38900001",
    display: "agente proliferante",
  },
  {
    system: "http://snomed.info/sct",
    code: "39064002",
    display: "Acetohexamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "39124003",
    display: "metohexital",
  },
  { system: "http://snomed.info/sct", code: "39128000", display: "famotidina" },
  {
    system: "http://snomed.info/sct",
    code: "39142008",
    display: "Fendimetrazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "39252001",
    display: "Agente de balance de agua",
  },
  {
    system: "http://snomed.info/sct",
    code: "39359008",
    display: "Penicilina V",
  },
  {
    system: "http://snomed.info/sct",
    code: "39432004",
    display: "Desodorante",
  },
  {
    system: "http://snomed.info/sct",
    code: "39487003",
    display: "producto de insulina regular",
  },
  {
    system: "http://snomed.info/sct",
    code: "39516004",
    display: "producto de disulfiram",
  },
  {
    system: "http://snomed.info/sct",
    code: "39598004",
    display: "derivado de la marihuana",
  },
  {
    system: "http://snomed.info/sct",
    code: "39608003",
    display: "pentazocina",
  },
  {
    system: "http://snomed.info/sct",
    code: "39707000",
    display: "Ácido aminobenzoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "39741008",
    display:
      "Grupos de fármacos que afectan principalmente al sistema gastrointestinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "39860005",
    display: "producto de fructosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "39939003",
    display: "Feniltoloxamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40162007",
    display: "Laxantes formadores de volumen",
  },
  {
    system: "http://snomed.info/sct",
    code: "40232005",
    display: "ketoconazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "40339003",
    display: "Lactato de calcio",
  },
  { system: "http://snomed.info/sct", code: "40429005", display: "etomidato" },
  { system: "http://snomed.info/sct", code: "40430000", display: "bromelinas" },
  {
    system: "http://snomed.info/sct",
    code: "40556005",
    display: "producto de fenitoína",
  },
  {
    system: "http://snomed.info/sct",
    code: "40562000",
    display: "Preparación de metilergonovina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40589005",
    display: "amitriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40606008",
    display: "Medicamento huérfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "40648001",
    display: "Producto de fentanilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "40652001",
    display: "cromoglicato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "40820003",
    display: "Producto de carbamazepina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40877002",
    display: "Estreptomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "40901001",
    display: "mesilato de deferoxamina",
  },
  { system: "http://snomed.info/sct", code: "40905005", display: "Beractante" },
  {
    system: "http://snomed.info/sct",
    code: "40974005",
    display: "Fenilpiperona",
  },
  {
    system: "http://snomed.info/sct",
    code: "40999006",
    display: "CCNU - Lomustina",
  },
  { system: "http://snomed.info/sct", code: "41001009", display: "Dinoprost" },
  {
    system: "http://snomed.info/sct",
    code: "41015006",
    display: "Metaraminol",
  },
  {
    system: "http://snomed.info/sct",
    code: "41147003",
    display: "perfenazina",
  },
  { system: "http://snomed.info/sct", code: "41193000", display: "aciclovir" },
  {
    system: "http://snomed.info/sct",
    code: "41324009",
    display: "propiomazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "41365009",
    display: "flufenazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "41367001",
    display: "preparación de enterogastron",
  },
  {
    system: "http://snomed.info/sct",
    code: "41399007",
    display: "Oxazolidinediona",
  },
  { system: "http://snomed.info/sct", code: "41470001", display: "corbadrina" },
  {
    system: "http://snomed.info/sct",
    code: "41493007",
    display: "dicicloverina",
  },
  {
    system: "http://snomed.info/sct",
    code: "41549009",
    display: "Inhibidor de la enzima convertidora de angiotensina",
  },
  { system: "http://snomed.info/sct", code: "41985001", display: "bitolterol" },
  {
    system: "http://snomed.info/sct",
    code: "42082003",
    display: "vancomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "42098005",
    display: "Preparación oftálmica de dexametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "42271003",
    display: "Producto de ácido glutámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "42348003",
    display: "Metiltestosterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "42374009",
    display: "bromhidrato de dextrometorfano",
  },
  {
    system: "http://snomed.info/sct",
    code: "42444000",
    display: "secobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "42514000",
    display: "producto de procaína",
  },
  {
    system: "http://snomed.info/sct",
    code: "42638008",
    display: "Cloruro de metilrosanilio",
  },
  {
    system: "http://snomed.info/sct",
    code: "42714002",
    display: "Antisuero de Escherichia coli",
  },
  { system: "http://snomed.info/sct", code: "42720001", display: "miconazol" },
  {
    system: "http://snomed.info/sct",
    code: "42863006",
    display: "Preparación de acetato de desmopresina",
  },
  { system: "http://snomed.info/sct", code: "43343000", display: "Magaldrato" },
  {
    system: "http://snomed.info/sct",
    code: "43499003",
    display: "Interferón inyectable",
  },
  {
    system: "http://snomed.info/sct",
    code: "43533002",
    display: "Preparación oftálmica de cloranfenicol",
  },
  {
    system: "http://snomed.info/sct",
    code: "43594006",
    display: "Preparaciones para blanquear la piel",
  },
  {
    system: "http://snomed.info/sct",
    code: "43684009",
    display: "producto de misoprostol",
  },
  {
    system: "http://snomed.info/sct",
    code: "43747001",
    display: "excipiente de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "43753001",
    display: "didrogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "43879000",
    display: "flunisolida",
  },
  {
    system: "http://snomed.info/sct",
    code: "43927002",
    display: "Agente analéptico",
  },
  { system: "http://snomed.info/sct", code: "44175000", display: "Diperodón" },
  {
    system: "http://snomed.info/sct",
    code: "44418001",
    display: "Preparación de aceite de hígado de percomorfo",
  },
  { system: "http://snomed.info/sct", code: "44658005", display: "promazina" },
  {
    system: "http://snomed.info/sct",
    code: "44731005",
    display: "Hidrocortisona de forma ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "44790008",
    display: "etosuximida",
  },
  {
    system: "http://snomed.info/sct",
    code: "44798001",
    display: "producto de dinoprostona",
  },
  {
    system: "http://snomed.info/sct",
    code: "44938006",
    display: "cefoperazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "44990002",
    display: "prociclidina",
  },
  { system: "http://snomed.info/sct", code: "45218006", display: "meclastina" },
  {
    system: "http://snomed.info/sct",
    code: "45311002",
    display: "terbutalina",
  },
  {
    system: "http://snomed.info/sct",
    code: "45313004",
    display: "Propilpiperazina derivado de fenotiazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "45355008",
    display: "Vacuna contra la fiebre maculosa de las Montañas Rocosas",
  },
  {
    system: "http://snomed.info/sct",
    code: "45518007",
    display: "Producto diurético tiazídico",
  },
  { system: "http://snomed.info/sct", code: "45680002", display: "tolmetín" },
  {
    system: "http://snomed.info/sct",
    code: "45844004",
    display: "Sulfasalazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "45888006",
    display: "preparación de gamma-tocoferol",
  },
  {
    system: "http://snomed.info/sct",
    code: "45923000",
    display: "E331 - Citrato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "46009007",
    display: "clorambucilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "46063005",
    display: "Agente psicoterapéutico",
  },
  {
    system: "http://snomed.info/sct",
    code: "46123006",
    display: "Producto de ácido ascórbico",
  },
  {
    system: "http://snomed.info/sct",
    code: "46233009",
    display: "GRIPE - Vacuna contra la influenza",
  },
  {
    system: "http://snomed.info/sct",
    code: "46436003",
    display: "haloprogina",
  },
  { system: "http://snomed.info/sct", code: "46479001", display: "encainida" },
  {
    system: "http://snomed.info/sct",
    code: "46532003",
    display: "Verde brillante",
  },
  { system: "http://snomed.info/sct", code: "46547007", display: "Labetalol" },
  { system: "http://snomed.info/sct", code: "46576005", display: "flecainida" },
  {
    system: "http://snomed.info/sct",
    code: "46709004",
    display: "Metilfenobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "46741005",
    display: "SA - Ácido salicílico",
  },
  { system: "http://snomed.info/sct", code: "46913003", display: "edrofonio" },
  { system: "http://snomed.info/sct", code: "47065008", display: "Quinina" },
  {
    system: "http://snomed.info/sct",
    code: "47120002",
    display: "hexamidinum",
  },
  {
    system: "http://snomed.info/sct",
    code: "47124006",
    display: "Aminoglutetimida",
  },
  { system: "http://snomed.info/sct", code: "47140009", display: "medrisona" },
  {
    system: "http://snomed.info/sct",
    code: "47331002",
    display: "CPZ - Clorpromazina",
  },
  { system: "http://snomed.info/sct", code: "47527007", display: "fenindiona" },
  {
    system: "http://snomed.info/sct",
    code: "47602007",
    display: "Ácido nalidíxico",
  },
  {
    system: "http://snomed.info/sct",
    code: "47755009",
    display: "Diurético ahorrador de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "47772002",
    display: "clorhidrato de fenfluramina",
  },
  { system: "http://snomed.info/sct", code: "47898004", display: "verapamilo" },
  {
    system: "http://snomed.info/sct",
    code: "48028008",
    display:
      "Vacuna contra Haemophilus influenzae tipo b (Hib)/difteria/tétanos/tos ferina",
  },
  { system: "http://snomed.info/sct", code: "48174005", display: "ranitidina" },
  {
    system: "http://snomed.info/sct",
    code: "48256008",
    display: "Benzoato de bencilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "48279009",
    display: "Producto emoliente",
  },
  { system: "http://snomed.info/sct", code: "48351000", display: "butadiona" },
  {
    system: "http://snomed.info/sct",
    code: "48546005",
    display: "Producto de diazepam",
  },
  { system: "http://snomed.info/sct", code: "48603004", display: "warfarina" },
  { system: "http://snomed.info/sct", code: "48614001", display: "clobetasol" },
  {
    system: "http://snomed.info/sct",
    code: "48647005",
    display: "pancrelipasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "48698004",
    display: "Bloqueador de canales de calcio",
  },
  { system: "http://snomed.info/sct", code: "48836000", display: "amikacina" },
  {
    system: "http://snomed.info/sct",
    code: "48875009",
    display: "Producto de dihidroergotamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "48899009",
    display: "hiosciamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "49019002",
    display: "Preparación oftálmica de prednisolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "49157004",
    display: "Producto uricosúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "49192007",
    display: "agente antiflatulento",
  },
  {
    system: "http://snomed.info/sct",
    code: "49267000",
    display: "Hidroxifenilbutazona",
  },
  {
    system: "http://snomed.info/sct",
    code: "49299006",
    display: "protriptilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "49485009",
    display: "norfloxacina",
  },
  { system: "http://snomed.info/sct", code: "49577002", display: "minoxidil" },
  {
    system: "http://snomed.info/sct",
    code: "49590009",
    display: "Antiarrítmico clase I",
  },
  {
    system: "http://snomed.info/sct",
    code: "49600008",
    display: "Plasma animal normal",
  },
  {
    system: "http://snomed.info/sct",
    code: "49617001",
    display: "enoxolona disódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "49663007",
    display: "Preparaciones de protección solar",
  },
  {
    system: "http://snomed.info/sct",
    code: "49669006",
    display:
      "Escherichia coli - pasteurella multocida - antisuero de salmonella typhimurium",
  },
  { system: "http://snomed.info/sct", code: "49688004", display: "Hexociclio" },
  {
    system: "http://snomed.info/sct",
    code: "49694007",
    display: "mucolíticos",
  },
  {
    system: "http://snomed.info/sct",
    code: "49705006",
    display: "idoxuridina",
  },
  {
    system: "http://snomed.info/sct",
    code: "49802003",
    display: "Inmunoglobulina anti-D (Rh)",
  },
  {
    system: "http://snomed.info/sct",
    code: "49860008",
    display: "producto de oro",
  },
  { system: "http://snomed.info/sct", code: "49953001", display: "feniramina" },
  {
    system: "http://snomed.info/sct",
    code: "49992008",
    display: "Fosfato de sodio de dexametasona",
  },
  { system: "http://snomed.info/sct", code: "50094009", display: "Hetalmidón" },
  {
    system: "http://snomed.info/sct",
    code: "50137001",
    display: "solución de glicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "50182002",
    display: "líquido de hemodiálisis",
  },
  {
    system: "http://snomed.info/sct",
    code: "50244000",
    display: "anestésico intravenoso",
  },
  {
    system: "http://snomed.info/sct",
    code: "50256004",
    display: "Agente antitricomonas",
  },
  {
    system: "http://snomed.info/sct",
    code: "50318003",
    display: "hormona lútea",
  },
  { system: "http://snomed.info/sct", code: "50335004", display: "Levorfanol" },
  {
    system: "http://snomed.info/sct",
    code: "50520001",
    display: "Neomicina B",
  },
  {
    system: "http://snomed.info/sct",
    code: "50841004",
    display: "Cloranfenicol forma ótica",
  },
  {
    system: "http://snomed.info/sct",
    code: "50868004",
    display: "dexanfetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51013009",
    display: "Sulfadimetoxina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51073002",
    display: "Producto de fenobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "51103004",
    display: "solución salina hipertónica",
  },
  {
    system: "http://snomed.info/sct",
    code: "51126006",
    display: "Preparación de benzestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "51132001",
    display: "Producto de hialuronidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "51326002",
    display: "BCNU - Carmustina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51334008",
    display: "cicloserina",
  },
  { system: "http://snomed.info/sct", code: "51361008", display: "amantadina" },
  {
    system: "http://snomed.info/sct",
    code: "51425004",
    display: "antiveneno de escorpión",
  },
  {
    system: "http://snomed.info/sct",
    code: "51555009",
    display: "Preparación de hígado desecado",
  },
  { system: "http://snomed.info/sct", code: "51752005", display: "Chologon" },
  { system: "http://snomed.info/sct", code: "51758009", display: "Amidina" },
  {
    system: "http://snomed.info/sct",
    code: "51779009",
    display: "Cefalosporina -clase de antibiótico-",
  },
  {
    system: "http://snomed.info/sct",
    code: "51908007",
    display: "prenilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "51992002",
    display: "Preparación de gastrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "52017007",
    display: "Antiemético",
  },
  {
    system: "http://snomed.info/sct",
    code: "52108005",
    display: "Fumarato ferroso",
  },
  { system: "http://snomed.info/sct", code: "52215008", display: "desonida" },
  {
    system: "http://snomed.info/sct",
    code: "52388000",
    display: "prednisolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "52412009",
    display: "Preparación de maleato de metilergonovina",
  },
  {
    system: "http://snomed.info/sct",
    code: "52423008",
    display: "preparación de alquitrán",
  },
  {
    system: "http://snomed.info/sct",
    code: "52451004",
    display: "Agente antipsicótico derivado de la dihidroindolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "52489009",
    display: "Preparación de tanato de vasopresina",
  },
  {
    system: "http://snomed.info/sct",
    code: "52628005",
    display: "Vacuna contra la fiebre tifoidea y la paratifoidea",
  },
  {
    system: "http://snomed.info/sct",
    code: "52761007",
    display: "Parasimpaticomimético anticolinesterasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "52883001",
    display: "para-hidroxianfetamina",
  },
  { system: "http://snomed.info/sct", code: "52896000", display: "Chinoforma" },
  { system: "http://snomed.info/sct", code: "53009005", display: "Analgésico" },
  { system: "http://snomed.info/sct", code: "53480001", display: "fentermina" },
  { system: "http://snomed.info/sct", code: "53584007", display: "metacolina" },
  { system: "http://snomed.info/sct", code: "53640004", display: "fluoxetina" },
  { system: "http://snomed.info/sct", code: "53641000", display: "flavoxato" },
  {
    system: "http://snomed.info/sct",
    code: "53691001",
    display: "Gluconato de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "53793005",
    display: "anticuerpo de Escherichia coli",
  },
  { system: "http://snomed.info/sct", code: "53800008", display: "ditranol" },
  { system: "http://snomed.info/sct", code: "53848009", display: "metirapona" },
  {
    system: "http://snomed.info/sct",
    code: "53855006",
    display: "bromuro de neostigmina",
  },
  { system: "http://snomed.info/sct", code: "54142000", display: "domifeno" },
  {
    system: "http://snomed.info/sct",
    code: "54344006",
    display: "flurbiprofeno",
  },
  { system: "http://snomed.info/sct", code: "54391004", display: "Levamisol" },
  { system: "http://snomed.info/sct", code: "54406003", display: "metoxamina" },
  {
    system: "http://snomed.info/sct",
    code: "54541002",
    display: "Preparación de ergometrina",
  },
  { system: "http://snomed.info/sct", code: "54544005", display: "petidina" },
  {
    system: "http://snomed.info/sct",
    code: "54577009",
    display: "ceftizoxima",
  },
  {
    system: "http://snomed.info/sct",
    code: "54659006",
    display: "Preparación de clorhidrato de tiamina",
  },
  { system: "http://snomed.info/sct", code: "54705000", display: "Temazepam" },
  {
    system: "http://snomed.info/sct",
    code: "54765002",
    display: "Fenilefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "54824008",
    display: "isometepteno",
  },
  {
    system: "http://snomed.info/sct",
    code: "54882005",
    display: "anfepramona",
  },
  { system: "http://snomed.info/sct", code: "54887004", display: "cefalexina" },
  { system: "http://snomed.info/sct", code: "54972005", display: "tretinoína" },
  {
    system: "http://snomed.info/sct",
    code: "54982006",
    display: "preparación de promethestrol",
  },
  {
    system: "http://snomed.info/sct",
    code: "55015008",
    display: "E325 - Lactato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "55217007",
    display: "Carbonato de calcio",
  },
  { system: "http://snomed.info/sct", code: "55432002", display: "Azlocilina" },
  { system: "http://snomed.info/sct", code: "55556000", display: "tetracaína" },
  {
    system: "http://snomed.info/sct",
    code: "55673009",
    display: "Iotalato de sodio I^125^",
  },
  {
    system: "http://snomed.info/sct",
    code: "55745002",
    display: "propranolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "55782006",
    display: "Anestésico de tipo amida",
  },
  {
    system: "http://snomed.info/sct",
    code: "55784007",
    display: "Preparación de hormonas naturales",
  },
  {
    system: "http://snomed.info/sct",
    code: "55830003",
    display: "menotrofina",
  },
  {
    system: "http://snomed.info/sct",
    code: "55867006",
    display: "aminofilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "55889005",
    display: "Praziquantel",
  },
  {
    system: "http://snomed.info/sct",
    code: "56011005",
    display: "Extracto de inmunoterapia contra insectos que pican",
  },
  {
    system: "http://snomed.info/sct",
    code: "56014002",
    display: "Hidroxiprogesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "56032002",
    display: "androstanolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "56059005",
    display: "Producto de mebendazol",
  },
  { system: "http://snomed.info/sct", code: "56123002", display: "hexamina" },
  { system: "http://snomed.info/sct", code: "56230001", display: "bretilio" },
  {
    system: "http://snomed.info/sct",
    code: "56234005",
    display: "producto de la hormona del crecimiento",
  },
  {
    system: "http://snomed.info/sct",
    code: "56240003",
    display: "Preparación de acetato de parametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "56281006",
    display: "Éter anestésico",
  },
  {
    system: "http://snomed.info/sct",
    code: "56480005",
    display: "parabromdilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "56549003",
    display: "metoclopramida",
  },
  {
    system: "http://snomed.info/sct",
    code: "56602009",
    display: "Hidroxicarbamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "56615000",
    display: "Preparación de fosfato de poliestradiol",
  },
  {
    system: "http://snomed.info/sct",
    code: "56656002",
    display: "Antiácido a base de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "56844000",
    display: "Producto de vacuna contra la fiebre amarilla",
  },
  {
    system: "http://snomed.info/sct",
    code: "56928005",
    display: "producto de etopósido",
  },
  {
    system: "http://snomed.info/sct",
    code: "56934003",
    display: "PVP - Polivinilpirrolidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "57002000",
    display: "clorprotixeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "57066004",
    display: "producto de cisplatino",
  },
  {
    system: "http://snomed.info/sct",
    code: "57123008",
    display: "acidulante urinario",
  },
  {
    system: "http://snomed.info/sct",
    code: "57191001",
    display: "Producto de cloranfenicol",
  },
  { system: "http://snomed.info/sct", code: "57263002", display: "Oxiconazol" },
  {
    system: "http://snomed.info/sct",
    code: "57376006",
    display: "Carbonato monosódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "57538001",
    display: "clortetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "57616006",
    display: "STD - Tetradecilo sulfato de sodio",
  },
  { system: "http://snomed.info/sct", code: "57670008", display: "cefoxitina" },
  {
    system: "http://snomed.info/sct",
    code: "57752001",
    display: "producto de gentamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "57811004",
    display: "dihidrocodeína",
  },
  {
    system: "http://snomed.info/sct",
    code: "57819002",
    display: "Preparación del factor inhibidor de la somatotropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "57845006",
    display: "isoprenalina",
  },
  { system: "http://snomed.info/sct", code: "57853003", display: "clidinio" },
  {
    system: "http://snomed.info/sct",
    code: "57893000",
    display: "clortalidona",
  },
  {
    system: "http://snomed.info/sct",
    code: "57952007",
    display: "Fármaco reductor de lípidos",
  },
  {
    system: "http://snomed.info/sct",
    code: "58050004",
    display: "agente antiparkinsoniano",
  },
  {
    system: "http://snomed.info/sct",
    code: "58098008",
    display: "Toxoide tetánico adsorbido",
  },
  { system: "http://snomed.info/sct", code: "58360000", display: "Fenazocina" },
  { system: "http://snomed.info/sct", code: "58467001", display: "Papaverina" },
  {
    system: "http://snomed.info/sct",
    code: "58502006",
    display: "Antihistamínico derivado de la propilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "58760003",
    display: "Antimetabolitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "58805000",
    display: "Preparación de hormonas hipofisarias",
  },
  {
    system: "http://snomed.info/sct",
    code: "58883005",
    display: "clindamicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "58892008",
    display: "F3T - trifluorotimidina",
  },
  { system: "http://snomed.info/sct", code: "58905004", display: "diazóxido" },
  {
    system: "http://snomed.info/sct",
    code: "58944007",
    display: "vasodilatador",
  },
  {
    system: "http://snomed.info/sct",
    code: "59057006",
    display: "Preparación de factor antihemofílico",
  },
  {
    system: "http://snomed.info/sct",
    code: "59187003",
    display: "producto de dopamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "59240002",
    display: "MMC-Mitomicina-C",
  },
  {
    system: "http://snomed.info/sct",
    code: "59245007",
    display: "Preparación de factor hipofisiostático",
  },
  {
    system: "http://snomed.info/sct",
    code: "59255006",
    display: "Sulfonamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "59261009",
    display: "Preparación anticonceptiva oral",
  },
  { system: "http://snomed.info/sct", code: "59270007", display: "loxapina" },
  { system: "http://snomed.info/sct", code: "59456005", display: "astemizol" },
  {
    system: "http://snomed.info/sct",
    code: "59589008",
    display: "Producto de pirimetamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "59594008",
    display: "Agente no despolarizante",
  },
  {
    system: "http://snomed.info/sct",
    code: "59751001",
    display: "Supresor de la tos",
  },
  {
    system: "http://snomed.info/sct",
    code: "59799001",
    display: "Producto diurético osmótico",
  },
  { system: "http://snomed.info/sct", code: "59941008", display: "diltiazem" },
  {
    system: "http://snomed.info/sct",
    code: "59953007",
    display: "piridostigmina",
  },
  {
    system: "http://snomed.info/sct",
    code: "59999009",
    display: "Toxoide tetánico y diftérico adsorbido para uso en adultos",
  },
  {
    system: "http://snomed.info/sct",
    code: "60090003",
    display: "droga blanda",
  },
  {
    system: "http://snomed.info/sct",
    code: "60093001",
    display: "Clorhidrato de fenilpropanolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60149003",
    display: "indometacina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60169008",
    display: "Neutralizador de acidez",
  },
  {
    system: "http://snomed.info/sct",
    code: "60468008",
    display: "Hidróxido de magnesio",
  },
  {
    system: "http://snomed.info/sct",
    code: "60520004",
    display: "Preparación de mononitrato de tiamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60533005",
    display: "droga astringente",
  },
  {
    system: "http://snomed.info/sct",
    code: "60541005",
    display: "Lanatosido C",
  },
  { system: "http://snomed.info/sct", code: "60682004", display: "ecotiofato" },
  {
    system: "http://snomed.info/sct",
    code: "60731009",
    display: "dietilcarbamazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "60767002",
    display: "Suero animal normal",
  },
  { system: "http://snomed.info/sct", code: "60881009", display: "Heroína" },
  {
    system: "http://snomed.info/sct",
    code: "60972002",
    display: "Solución de irrigación",
  },
  {
    system: "http://snomed.info/sct",
    code: "60978003",
    display: "Barbitúrico",
  },
  {
    system: "http://snomed.info/sct",
    code: "61020000",
    display: "preparación de tiroides",
  },
  {
    system: "http://snomed.info/sct",
    code: "61093008",
    display: "Preparación del factor inhibidor de la prolactina",
  },
  {
    system: "http://snomed.info/sct",
    code: "61123001",
    display: "Amobarbital sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "61132004",
    display: "Antitoxina de gangrena gaseosa",
  },
  {
    system: "http://snomed.info/sct",
    code: "61153008",
    display: "Vacuna contra sarampión, paperas y rubéola",
  },
  {
    system: "http://snomed.info/sct",
    code: "61181002",
    display: "Preparación de meprednisona",
  },
  { system: "http://snomed.info/sct", code: "61408004", display: "molindona" },
  {
    system: "http://snomed.info/sct",
    code: "61457001",
    display: "Preparación de hormonas suprarrenales",
  },
  {
    system: "http://snomed.info/sct",
    code: "61602008",
    display: "vacuna contra la tos ferina",
  },
  { system: "http://snomed.info/sct", code: "61621000", display: "Laxante" },
  { system: "http://snomed.info/sct", code: "61623002", display: "buclizina" },
  {
    system: "http://snomed.info/sct",
    code: "61650007",
    display: "Preparación de niacinamida",
  },
  { system: "http://snomed.info/sct", code: "61651006", display: "Cefamandol" },
  { system: "http://snomed.info/sct", code: "61862008", display: "meticilina" },
  {
    system: "http://snomed.info/sct",
    code: "61939007",
    display: "laxante de difenilmetano",
  },
  {
    system: "http://snomed.info/sct",
    code: "61946003",
    display: "preparación estrogénica",
  },
  {
    system: "http://snomed.info/sct",
    code: "62051009",
    display: "Preparación de diclorosona",
  },
  {
    system: "http://snomed.info/sct",
    code: "62063004",
    display: "Preparado antiinflamatorio nasal",
  },
  {
    system: "http://snomed.info/sct",
    code: "62191005",
    display: "Preparado de hígado inyectable",
  },
  { system: "http://snomed.info/sct", code: "62288001", display: "Vermífugo" },
  {
    system: "http://snomed.info/sct",
    code: "62294009",
    display: "Inmunoglobulina contra la varicela-zóster",
  },
  {
    system: "http://snomed.info/sct",
    code: "62353003",
    display: "Citrato de clomifeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "62354009",
    display: "vacuna contra la bronquitis",
  },
  { system: "http://snomed.info/sct", code: "62529008", display: "tiotixeno" },
  {
    system: "http://snomed.info/sct",
    code: "62560008",
    display: "Preparación oftálmica de fluorometolona",
  },
  { system: "http://snomed.info/sct", code: "62782004", display: "clonidina" },
  {
    system: "http://snomed.info/sct",
    code: "63094006",
    display: "anticonvulsivo",
  },
  {
    system: "http://snomed.info/sct",
    code: "63136007",
    display: "preparación de fitonadiona",
  },
  {
    system: "http://snomed.info/sct",
    code: "63318000",
    display: "Ácido benzoico",
  },
  {
    system: "http://snomed.info/sct",
    code: "63338004",
    display: "saborizante de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "63470003",
    display: "Preparación de fluoximesterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "63639004",
    display: "preparación de niacina",
  },
  { system: "http://snomed.info/sct", code: "63682003", display: "halotano" },
  {
    system: "http://snomed.info/sct",
    code: "63758001",
    display: "Preparación de noretindrona",
  },
  {
    system: "http://snomed.info/sct",
    code: "63822004",
    display: "preparación de vitamina E",
  },
  {
    system: "http://snomed.info/sct",
    code: "64083002",
    display: "Relajante del músculo liso genitourinario",
  },
  {
    system: "http://snomed.info/sct",
    code: "64115004",
    display: "amodiaquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "64127001",
    display: "dactinomicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "64240003",
    display: "Preparación de metandrostenolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "64296005",
    display: "Toxoide estafilococo",
  },
  {
    system: "http://snomed.info/sct",
    code: "64349004",
    display: "griseofulvina",
  },
  { system: "http://snomed.info/sct", code: "64462001", display: "Terpin" },
  { system: "http://snomed.info/sct", code: "64558005", display: "metixeno" },
  {
    system: "http://snomed.info/sct",
    code: "64851009",
    display: "diyodohidroxiquina",
  },
  {
    system: "http://snomed.info/sct",
    code: "64878006",
    display: "Metiltiouracilo",
  },
  { system: "http://snomed.info/sct", code: "65020006", display: "Benzocaína" },
  { system: "http://snomed.info/sct", code: "65026000", display: "efedrina" },
  { system: "http://snomed.info/sct", code: "65041000", display: "Biperideno" },
  {
    system: "http://snomed.info/sct",
    code: "65092008",
    display: "cloropirileno",
  },
  {
    system: "http://snomed.info/sct",
    code: "65265006",
    display: "tromboplastina",
  },
  {
    system: "http://snomed.info/sct",
    code: "65461004",
    display: "Extracto de corteza suprarrenal",
  },
  {
    system: "http://snomed.info/sct",
    code: "65484006",
    display: "Preparación de prostaciclina PGI>2<",
  },
  {
    system: "http://snomed.info/sct",
    code: "65502005",
    display: "Preparación de epinefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "65505007",
    display: "Relajante del músculo liso gastrointestinal",
  },
  {
    system: "http://snomed.info/sct",
    code: "65627005",
    display: "Preparación de hidrato de 4-amino-2-metil-1-naftol",
  },
  {
    system: "http://snomed.info/sct",
    code: "65628000",
    display: "agente de la piel",
  },
  {
    system: "http://snomed.info/sct",
    code: "65638005",
    display: "Preparación de hidróxido de zinc con corticotropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "65695006",
    display: "Anestésico general por inhalación",
  },
  {
    system: "http://snomed.info/sct",
    code: "65823007",
    display: "agente protector",
  },
  { system: "http://snomed.info/sct", code: "65884003", display: "antrapurol" },
  {
    system: "http://snomed.info/sct",
    code: "65965000",
    display: "Micrurus fulvius antiveneno",
  },
  {
    system: "http://snomed.info/sct",
    code: "66065008",
    display: "laxante salino",
  },
  { system: "http://snomed.info/sct", code: "66094001", display: "probenecid" },
  {
    system: "http://snomed.info/sct",
    code: "66125007",
    display: "Preparación nasal de flunisolida",
  },
  {
    system: "http://snomed.info/sct",
    code: "66243004",
    display: "Preparación de acetato de noretindrona",
  },
  {
    system: "http://snomed.info/sct",
    code: "66261008",
    display: "tetraciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "66349002",
    display: "preparación androgénica",
  },
  {
    system: "http://snomed.info/sct",
    code: "66441000",
    display: "preparación de ácido pantoténico",
  },
  { system: "http://snomed.info/sct", code: "66492008", display: "isoflurano" },
  { system: "http://snomed.info/sct", code: "66493003", display: "teofilina" },
  {
    system: "http://snomed.info/sct",
    code: "66602007",
    display: "Preparación de estanozolol",
  },
  {
    system: "http://snomed.info/sct",
    code: "66672008",
    display: "Anestésico local tipo éster",
  },
  {
    system: "http://snomed.info/sct",
    code: "66742008",
    display: "Agente de pigmentación",
  },
  {
    system: "http://snomed.info/sct",
    code: "66854004",
    display: "Valerato de betametasona",
  },
  {
    system: "http://snomed.info/sct",
    code: "66859009",
    display: "dipiridamol",
  },
  {
    system: "http://snomed.info/sct",
    code: "66860004",
    display: "Cloruro de aluminio",
  },
  {
    system: "http://snomed.info/sct",
    code: "66919007",
    display: "metilclotiazida",
  },
  { system: "http://snomed.info/sct", code: "66971004", display: "Colestipol" },
  {
    system: "http://snomed.info/sct",
    code: "67213005",
    display: "Inmunoglobulina de linfocitos",
  },
  {
    system: "http://snomed.info/sct",
    code: "67423003",
    display: "acilaminopenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "67440007",
    display: "Agente bloqueador alfa-adrenérgico",
  },
  { system: "http://snomed.info/sct", code: "67477004", display: "Valproato" },
  {
    system: "http://snomed.info/sct",
    code: "67507000",
    display: "Fármaco antiarrítmico",
  },
  {
    system: "http://snomed.info/sct",
    code: "67585005",
    display: "anestésico tópico",
  },
  { system: "http://snomed.info/sct", code: "67735003", display: "paclitaxel" },
  {
    system: "http://snomed.info/sct",
    code: "67891001",
    display: "Cefalosporina de segunda generación",
  },
  { system: "http://snomed.info/sct", code: "67939000", display: "apomorfina" },
  { system: "http://snomed.info/sct", code: "68088000", display: "Acebutolol" },
  {
    system: "http://snomed.info/sct",
    code: "68113000",
    display:
      "Vacuna de conjugado de oligosacárido de Hib (conjugado de proteína de difteria CRM>197<)",
  },
  {
    system: "http://snomed.info/sct",
    code: "68206008",
    display: "preparación de calcitriol",
  },
  {
    system: "http://snomed.info/sct",
    code: "68208009",
    display: "Toxoide diftérico y tetánico adsorbido",
  },
  {
    system: "http://snomed.info/sct",
    code: "68395000",
    display: "Cloruro de calcio",
  },
  {
    system: "http://snomed.info/sct",
    code: "68398003",
    display: "Preparación de somatomedina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68402007",
    display: "Inhibidor de la anhidrasa carbónica",
  },
  {
    system: "http://snomed.info/sct",
    code: "68407001",
    display: "Solución de peróxido de hidrógeno al 30%",
  },
  {
    system: "http://snomed.info/sct",
    code: "68422006",
    display: "cloxacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68424007",
    display: "isoflurofato",
  },
  {
    system: "http://snomed.info/sct",
    code: "68444001",
    display: "doxorrubicina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68461003",
    display: "Jalea quirúrgica",
  },
  {
    system: "http://snomed.info/sct",
    code: "68490009",
    display: "propionato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "68622003",
    display: "preparación de secretina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68702006",
    display: "aurotiomalato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "68774008",
    display: "isoxsuprina",
  },
  {
    system: "http://snomed.info/sct",
    code: "68864001",
    display: "Antiveneno polivalente para reptiles",
  },
  {
    system: "http://snomed.info/sct",
    code: "68887009",
    display: "metotrexato",
  },
  {
    system: "http://snomed.info/sct",
    code: "68892006",
    display: "Penicilina resistente a la penicilinasa",
  },
  { system: "http://snomed.info/sct", code: "69107004", display: "dantroleno" },
  { system: "http://snomed.info/sct", code: "69204002", display: "guanadrel" },
  {
    system: "http://snomed.info/sct",
    code: "69227005",
    display: "Fármaco antiarrítmico de clase II",
  },
  { system: "http://snomed.info/sct", code: "69236009", display: "amiodarona" },
  { system: "http://snomed.info/sct", code: "69242008", display: "miótico" },
  {
    system: "http://snomed.info/sct",
    code: "69331001",
    display: "Aminociclohexilpenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "69431002",
    display: "inmunosupresor",
  },
  {
    system: "http://snomed.info/sct",
    code: "69509008",
    display: "Agente biológico",
  },
  {
    system: "http://snomed.info/sct",
    code: "69576000",
    display: "preparación de menadiona",
  },
  { system: "http://snomed.info/sct", code: "69708003", display: "Clonazepam" },
  {
    system: "http://snomed.info/sct",
    code: "69801001",
    display: "Preparación de sulfato de estrona de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "69879000",
    display: "altretamina",
  },
  { system: "http://snomed.info/sct", code: "69918003", display: "aztreonam" },
  { system: "http://snomed.info/sct", code: "69967001", display: "sucralfato" },
  {
    system: "http://snomed.info/sct",
    code: "70047000",
    display: "Sulfametoxazol",
  },
  {
    system: "http://snomed.info/sct",
    code: "70216000",
    display: "sal undecilenato",
  },
  {
    system: "http://snomed.info/sct",
    code: "70254000",
    display: "Sulfametizol",
  },
  {
    system: "http://snomed.info/sct",
    code: "70343008",
    display: "Antihistamínico derivado de la piperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "70379000",
    display: "Cloruro de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "70447008",
    display: "Vacuna antineumocócica polivalente",
  },
  {
    system: "http://snomed.info/sct",
    code: "70460002",
    display: "Preparación de aceite de hígado de pescado",
  },
  {
    system: "http://snomed.info/sct",
    code: "70702006",
    display: "deferoxamina",
  },
  { system: "http://snomed.info/sct", code: "70776005", display: "pemolina" },
  {
    system: "http://snomed.info/sct",
    code: "70841003",
    display: "Preparación de quimotripsina",
  },
  {
    system: "http://snomed.info/sct",
    code: "70864001",
    display: "meprobamato",
  },
  { system: "http://snomed.info/sct", code: "70934008", display: "Demecario" },
  { system: "http://snomed.info/sct", code: "71181003", display: "Vacuna" },
  {
    system: "http://snomed.info/sct",
    code: "71289008",
    display: "antiveneno de serpiente",
  },
  {
    system: "http://snomed.info/sct",
    code: "71338005",
    display: "Preparación de vasopresina",
  },
  { system: "http://snomed.info/sct", code: "71451001", display: "kanamicina" },
  { system: "http://snomed.info/sct", code: "71453003", display: "mupirocina" },
  {
    system: "http://snomed.info/sct",
    code: "71455005",
    display: "Preparación de flurandrenolona",
  },
  {
    system: "http://snomed.info/sct",
    code: "71462001",
    display: "resina de podófilo",
  },
  {
    system: "http://snomed.info/sct",
    code: "71516007",
    display: "Preparación de ergocalciferol",
  },
  {
    system: "http://snomed.info/sct",
    code: "71584004",
    display: "Fosfato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "71634000",
    display: "clormezanona",
  },
  {
    system: "http://snomed.info/sct",
    code: "71699007",
    display: "trifluoperazina",
  },
  {
    system: "http://snomed.info/sct",
    code: "71724000",
    display: "Sulfato de hierro",
  },
  {
    system: "http://snomed.info/sct",
    code: "71731001",
    display: "Preparación oftálmica de medrisona",
  },
  {
    system: "http://snomed.info/sct",
    code: "71759000",
    display: "nitroglicerina",
  },
  {
    system: "http://snomed.info/sct",
    code: "71770007",
    display: "Inhibidor de la monoaminooxidasa",
  },
  {
    system: "http://snomed.info/sct",
    code: "71798005",
    display: "fenoprofeno",
  },
  {
    system: "http://snomed.info/sct",
    code: "71837009",
    display: "Agente citotóxico",
  },
  {
    system: "http://snomed.info/sct",
    code: "72312007",
    display: "ciclandelato",
  },
  {
    system: "http://snomed.info/sct",
    code: "72398005",
    display: "Preparación de sulfonamida oftálmica",
  },
  {
    system: "http://snomed.info/sct",
    code: "72416006",
    display: "Metaciclina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72623000",
    display: "2-Amino-6-mercaptopurina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72824008",
    display: "colestiramina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72870001",
    display: "Escopolamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72924009",
    display: "clofazimina",
  },
  {
    system: "http://snomed.info/sct",
    code: "72968006",
    display: "Salicilato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "72996000",
    display: "constructor de drogas",
  },
  { system: "http://snomed.info/sct", code: "73074003", display: "colistina" },
  { system: "http://snomed.info/sct", code: "73093001", display: "Neomicina" },
  { system: "http://snomed.info/sct", code: "73133000", display: "colchicina" },
  { system: "http://snomed.info/sct", code: "73170009", display: "Mentol" },
  { system: "http://snomed.info/sct", code: "73212002", display: "Adipiodona" },
  {
    system: "http://snomed.info/sct",
    code: "73228007",
    display: "Preparación de estrógenos no esteroideos",
  },
  {
    system: "http://snomed.info/sct",
    code: "73274006",
    display: "Crioprecipitado de plasma humano",
  },
  {
    system: "http://snomed.info/sct",
    code: "73277004",
    display: "mecamilamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "73454001",
    display: "Preparación de desmopresina",
  },
  { system: "http://snomed.info/sct", code: "73572009", display: "Morfina" },
  {
    system: "http://snomed.info/sct",
    code: "73585007",
    display: "Fenitoína sódica",
  },
  {
    system: "http://snomed.info/sct",
    code: "73627008",
    display: "agente calórico",
  },
  {
    system: "http://snomed.info/sct",
    code: "73639000",
    display: "Medicamento con receta médica",
  },
  {
    system: "http://snomed.info/sct",
    code: "73647000",
    display: "dipivefrina",
  },
  {
    system: "http://snomed.info/sct",
    code: "73756003",
    display: "amobarbital",
  },
  {
    system: "http://snomed.info/sct",
    code: "73763003",
    display: "penicilina de espectro extendido",
  },
  {
    system: "http://snomed.info/sct",
    code: "73805002",
    display: "Preparación de la hormona liberadora de tirotropina",
  },
  { system: "http://snomed.info/sct", code: "73949004", display: "Atropina" },
  { system: "http://snomed.info/sct", code: "73986003", display: "cefuroxima" },
  {
    system: "http://snomed.info/sct",
    code: "74022005",
    display: "mepenzolato",
  },
  { system: "http://snomed.info/sct", code: "74065006", display: "prazepam" },
  { system: "http://snomed.info/sct", code: "74074008", display: "atracurio" },
  {
    system: "http://snomed.info/sct",
    code: "74147005",
    display: "Edetato disódico",
  },
  { system: "http://snomed.info/sct", code: "74213004", display: "indapamida" },
  {
    system: "http://snomed.info/sct",
    code: "74226000",
    display: "preparación de vitamina k",
  },
  {
    system: "http://snomed.info/sct",
    code: "74470007",
    display: "ciclofosfamida",
  },
  {
    system: "http://snomed.info/sct",
    code: "74480006",
    display: "suplemento de potasio",
  },
  {
    system: "http://snomed.info/sct",
    code: "74575000",
    display: "piperacilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "74583006",
    display: "producto de hidroquinona",
  },
  {
    system: "http://snomed.info/sct",
    code: "74626007",
    display: "diluyente de drogas",
  },
  {
    system: "http://snomed.info/sct",
    code: "74632002",
    display: "succinimida",
  },
  { system: "http://snomed.info/sct", code: "74674007", display: "Propofol" },
  {
    system: "http://snomed.info/sct",
    code: "74771007",
    display: "Fenoxibenzamina",
  },
  {
    system: "http://snomed.info/sct",
    code: "74780007",
    display: "Laxantes de antraquinona",
  },
  {
    system: "http://snomed.info/sct",
    code: "74782004",
    display: "Alcaloide natural",
  },
  {
    system: "http://snomed.info/sct",
    code: "74798006",
    display: "pipenzolato",
  },
  {
    system: "http://snomed.info/sct",
    code: "74819009",
    display: "ácido acetohidroxámico",
  },
  {
    system: "http://snomed.info/sct",
    code: "75029008",
    display: "Preparación de desoxicorticosterona",
  },
  {
    system: "http://snomed.info/sct",
    code: "75201000",
    display: "Bacterina - toxoide",
  },
  { system: "http://snomed.info/sct", code: "75203002", display: "mometasona" },
  {
    system: "http://snomed.info/sct",
    code: "75292001",
    display: "sulfato de vincristina",
  },
  {
    system: "http://snomed.info/sct",
    code: "75366006",
    display: "edetato de calcio de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "75429004",
    display: "Dexbromfeniramina",
  },
  { system: "http://snomed.info/sct", code: "75501004", display: "bromazina" },
  {
    system: "http://snomed.info/sct",
    code: "75661008",
    display: "preparación delta-tocoferol",
  },
  {
    system: "http://snomed.info/sct",
    code: "75748004",
    display: "teofilina glicinato de sodio",
  },
  {
    system: "http://snomed.info/sct",
    code: "75770001",
    display: "Preparación tópica de urea",
  },
  {
    system: "http://snomed.info/sct",
    code: "75927008",
    display: "floxuridina",
  },
  { system: "http://snomed.info/sct", code: "75959001", display: "tamoxifeno" },
  {
    system: "http://snomed.info/sct",
    code: "75969007",
    display: "Preparación del factor liberador de gonadotropina",
  },
  { system: "http://snomed.info/sct", code: "76058001", display: "prazosina" },
  {
    system: "http://snomed.info/sct",
    code: "76155001",
    display: "ácido iopanoico",
  },
  { system: "http://snomed.info/sct", code: "76286000", display: "galamina" },
  {
    system: "http://snomed.info/sct",
    code: "76289007",
    display: "xilometazolina",
  },
  {
    system: "http://snomed.info/sct",
    code: "76385003",
    display: "Agente bloqueador adrenérgico alfa 1",
  },
  { system: "http://snomed.info/sct", code: "76390000", display: "Practolol" },
  { system: "http://snomed.info/sct", code: "76591000", display: "bleomicina" },
  { system: "http://snomed.info/sct", code: "76696004", display: "noscapina" },
  {
    system: "http://snomed.info/sct",
    code: "76759004",
    display: "producto de disopiramida",
  },
  {
    system: "http://snomed.info/sct",
    code: "76962009",
    display: "Iproniazida",
  },
  { system: "http://snomed.info/sct", code: "77035009", display: "clofibrato" },
  {
    system: "http://snomed.info/sct",
    code: "77048008",
    display: "sumergir/ser",
  },
  { system: "http://snomed.info/sct", code: "77237006", display: "Emético" },
  {
    system: "http://snomed.info/sct",
    code: "77331005",
    display: "Concentrado normal de globulina animal",
  },
  {
    system: "http://snomed.info/sct",
    code: "77390008",
    display: "Benzatropina",
  },
  {
    system: "http://snomed.info/sct",
    code: "77398001",
    display: "agente antidiarreico",
  },
  { system: "http://snomed.info/sct", code: "77549006", display: "Terpeno" },
  {
    system: "http://snomed.info/sct",
    code: "77657003",
    display: "Droga ilegal",
  },
  {
    system: "http://snomed.info/sct",
    code: "77731008",
    display: "N-acetilcisteína",
  },
  {
    system: "http://snomed.info/sct",
    code: "77750008",
    display: "dacarbazina",
  },
  { system: "http://snomed.info/sct", code: "77856005", display: "esmolol" },
  {
    system: "http://snomed.info/sct",
    code: "77885004",
    display: "producto mestranol",
  },
  { system: "http://snomed.info/sct", code: "77898008", display: "simeticona" },
  {
    system: "http://snomed.info/sct",
    code: "78025001",
    display: "producto de ganciclovir",
  },
  {
    system: "http://snomed.info/sct",
    code: "78057000",
    display: "Solución tópica de carbol-fucsina",
  },
  {
    system: "http://snomed.info/sct",
    code: "78174002",
    display: "Mezlocilina",
  },
  { system: "http://snomed.info/sct", code: "78379001", display: "reserpina" },
  {
    system: "http://snomed.info/sct",
    code: "78411008",
    display: "tiopental sódico",
  },
  {
    system: "http://snomed.info/sct",
    code: "78439009",
    display: "sal de citrato",
  },
  { system: "http://snomed.info/sct", code: "78449007", display: "nitrazepam" },
  {
    system: "http://snomed.info/sct",
    code: "78507004",
    display: "bencilpenicilina",
  },
  {
    system: "http://snomed.info/sct",
    code: "78542000",
    display: "Producto de citrato de potasio",
  },
];
const stringSeveridad = ref([
  {
    system: "http://hl7.org/fhir/reaction-event-severity",
    code: "mild",
    display: "Provoca efectos fisiológicos leves.",
  },
  {
    system: "http://hl7.org/fhir/reaction-event-severity",
    code: "moderate",
    display: "Provoca efectos fisiológicos moderados.",
  },
  {
    system: "http://hl7.org/fhir/reaction-event-severity",
    code: "severe",
    display: "Provoca graves efectos fisiológicos.",
  },
]);
const stringRiesgo = ref([
  {
    system: "http://hl7.org/fhir/allergy-intolerance-criticality",
    code: "low",
    display: "Riesgo bajo",
  },
  {
    system: "http://hl7.org/fhir/allergy-intolerance-criticality",
    code: "high",
    display: "Alto riesgo",
  },
  {
    system: "http://hl7.org/fhir/allergy-intolerance-criticality",
    code: "unable-to-assess",
    display: "No se puede evaluar el riesgo",
  },
]);
const stringStatus = ref([
  {
    system:
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
    code: "unconfirmed",
    display: "Sin Confirmar",
  },
  {
    system:
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
    code: "confirmed",
    display: "Confirmado",
  },
  {
    system:
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
    code: "refuted",
    display: "Refutado",
  },
  {
    system:
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
    code: "entered-in-error",
    display: "Ingresada por Error",
  },
]);
const alergiaIntolerancia = ref(null);
const sustancia = ref(null);
const severidad = ref(null);
const riesgo = ref(null);
const status = ref(null);
const options = ref(stringOptions);
const optionsSustancias = ref(stringSustancias);
const optionsRiesgo = ref(stringRiesgo);
const optionsStatus = ref(stringStatus);

function filterFn(val, update) {
  update(() => {
    const needle = val.toLocaleLowerCase();
    console.log(needle);
    options.value = stringOptions.filter(
      (v) => v.display.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
}
function filterFnSustancias(val, update) {
  update(() => {
    const needle = val.toLocaleLowerCase();
    optionsSustancias.value = stringSustancias.filter(
      (v) => v.display.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
}

async function guardarAlergias() {
  $q.loading.show();
  const object = {
    resourceType: "AllergyIntolerance",
    clinicalStatus: {
      coding: [
        {
          system:
            "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
          code: "active",
          display: "Active",
        },
      ],
    },
    verificationStatus: {
      coding: [status.value],
    },
    type: type.value,
    category: category.value,
    criticality: riesgo.value.code,
    code: {
      coding: [alergiaIntolerancia.value],
    },
    patient: {
      reference: "Patient/" + patient.value.id,
    },
    recordedDate: new Date(),
  };

  if (edad.value) {
    const edad = {
      value: setInterval(edad.value),
      system: "http://unitsofmeasure.org",
      code: "a",
    };
    Object.assign(object, { onsetAge: edad });
  }

  if (sabeSustancia.value) {
    const reaccion = [
      {
        manifestation: [
          {
            text: descripcion.value,
          },
        ],
        description: descripcion.value,
        severity: severidad.value.code,
      },
    ];
    if (sustancia.value) {
      Object.assign(reaccion, {
        substance: {
          coding: [sustancia.value],
        },
      });
    }
    Object.assign(object, { reaction: reaccion });
  }

  let allergy = await store.dispatch("alergyIntolerance/postAllergy", object);
  if (allergy.status > 400) {
    $q.loading.hide();
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Problem!",
    });
  } else {
    $q.loading.hide();
    void store.dispatch("alergyIntolerance/setAlergias", patient.value.id);
    alergias.value = computed(
      () => store.getters["alergyIntolerance/getAlergias"]
    );
    console.log(alergias.value.entry);
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Alergia creada",
    });
  }
}

function calcularEdad(fecha) {
  if (typeof fecha != "string" && fecha && esNumero(fecha.getTime())) {
    fecha = formatDate(fecha, "yyyy-MM-dd");
  }

  var values = fecha.split("-");
  var dia = values[2];
  var mes = values[1];
  var ano = values[0];

  // cogemos los valores actuales
  var fecha_hoy = new Date();
  var ahora_ano = fecha_hoy.getYear();
  var ahora_mes = fecha_hoy.getMonth() + 1;
  var ahora_dia = fecha_hoy.getDate();

  // realizamos el calculo
  var edad = ahora_ano + 1900 - ano;
  if (ahora_mes < mes) {
    edad--;
  }
  if (mes == ahora_mes && ahora_dia < dia) {
    edad--;
  }
  if (edad > 1900) {
    edad -= 1900;
  }

  // calculamos los meses
  var meses = 0;

  if (ahora_mes > mes && dia > ahora_dia) meses = ahora_mes - mes - 1;
  else if (ahora_mes > mes) meses = ahora_mes - mes;
  if (ahora_mes < mes && dia < ahora_dia) meses = 12 - (mes - ahora_mes);
  else if (ahora_mes < mes) meses = 12 - (mes - ahora_mes + 1);
  if (ahora_mes == mes && dia > ahora_dia) meses = 11;

  // calculamos los dias
  var dias = 0;
  if (ahora_dia > dia) dias = ahora_dia - dia;
  if (ahora_dia < dia) {
    let ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
    dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
  }

  return edad + " años, " + meses + " meses y " + dias + " días";
}

function limpiar() {
  sustancia.value = null;
  severidad.value = null;
  riesgo.value = null;
  status.value = null;
  alergiaIntolerancia.value = null;
  descripcion.value = null;
  edad.value = "";
  category.value = [];
  sabeSustancia.value = 0;
}

async function actualizarEstadoAlergia(estado, estadoDisplay, id, object) {
  $q.loading.show();
  if (estado === "entered-in-error") {
    delete object.resource.clinicalStatus;
  }
  const verificationStatus = {
    coding: [
      {
        system:
          "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        code: estado,
        display: estadoDisplay,
      },
    ],
  };
  Object.assign(object.resource, { verificationStatus: verificationStatus });

  let postBundle = await store.dispatch(
    "alergyIntolerance/putResource",
    object
  );
  if (postBundle.status == 200) {
    $q.loading.hide();
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Actualizada",
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
}

function buscarOtroPaciente() {
  $q.loading.show();
  LocalStorage.set("PatientID", "");
  if (props.url_to_props != undefined) {
    router.push({ name: props.url_to_props });
  } else {
    router.push({ name: props.url_to_return });
  }
}
</script>

<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section class="col-xs-5 col-md-6">
          <q-item-label
            ><span class="text-weight-medium">Paciente</span>
            <span class="text-grey-8"
              >&nbsp;{{
                patient?.name?.filter((name) => {
                  return name.use === "official";
                })[0]?.family
              }}
              {{
                patient?.name?.filter((name) => {
                  return name.use === "official";
                })[0]?._family?.extension[0]?.valueString
              }},
              {{
                patient?.name?.filter((name) => {
                  return name.use === "official";
                })[0]?.given[0]
              }}</span
            ></q-item-label
          >
        </q-item-section>

        <q-item-section class="col-xs-5 col-md-5" side style="color: black">
          <q-item-label
            ><span class="text-weight-medium">Edad</span>
            <span class="text-grey-8">
              {{
                patient?.birthDate ? " " + calcularEdad(patient?.birthDate) : ""
              }}
              ({{ patient?.birthDate }})</span
            ></q-item-label
          >
        </q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="row">
                <div class="col-xs-6 col-md-6">
                  <q-item-label
                    ><span class="text-weight-medium"
                      >N° Documento</span
                    ></q-item-label
                  >
                </div>
                <div class="col-xs-6 col-md-6">
                  <q-item-label
                    ><span class="text-weight-light">{{
                      patient?.identifier?.filter((identifier) => {
                        return identifier.use === "official";
                      })[0]?.value
                    }}</span></q-item-label
                  >
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 offset-md-6 offset-sm-6">
              <div class="row">
                <div class="col-xs-6 col-md-6">
                  <q-item-label
                    ><span class="text-weight-medium">Sexo</span></q-item-label
                  >
                  <q-item-label
                    ><span class="text-weight-medium">Email</span></q-item-label
                  >
                </div>
                <div class="col-xs-6 col-md-6">
                  <q-item-label
                    ><span class="text-weight-light">{{
                      patient?.gender == "male"
                        ? "Hombre"
                        : patient?.gender == "female"
                        ? "Mujer"
                        : "Desconocido"
                    }}</span></q-item-label
                  >
                  <q-item-label
                    ><span class="text-weight-light">{{
                      patient?.telecom?.filter((telecom) => {
                        return telecom.system === "email";
                      })[0]?.value
                    }}</span></q-item-label
                  >
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item expand-icon-class="hidden">
      <template v-slot:header>
        <q-item-section class="xs-hide col-md-3">
          <q-item-label>Teléfono</q-item-label>
          <q-item-label caption>{{
            patient?.telecom?.filter((telecom) => {
              return telecom.system === "phone";
            })[0]?.value
          }}</q-item-label>
        </q-item-section>
        <q-item-section class="col-xs-4 col-md-3">
          <q-item-label>Dirección</q-item-label>
          <q-item-label caption>{{
            patient?.address
              ?.filter((address) => {
                return address.use === "home";
              })[0]
              .line?.join(" ")
          }}</q-item-label>
        </q-item-section>
        <q-item-section class="col-xs-4 col-md-4">
          <q-item-label>Alegias</q-item-label>
          <q-item-label :class="{ 'truncate-chip-labels': true }">
            <q-chip
              size="sm"
              outline
              :color="
                alergia.resource.verificationStatus.coding[0].code ===
                'confirmed'
                  ? 'green'
                  : alergia.resource.verificationStatus.coding[0].code ===
                    'entered-in-error'
                  ? 'red'
                  : 'primary'
              "
              text-color="white"
              v-for="alergia in alergias.entry"
              :label="alergia.resource.code.coding[0].display"
              :key="alergia.resource.id"
            >
              <q-popup-proxy style="min-width: 350px">
                <q-list bordered padding>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline
                        >Detalle #{{ alergia.resource.id }}</q-item-label
                      >
                      <q-item-label>{{
                        alergia.resource.code.coding[0].display
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="primary" name="today" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Fecha Notificación</q-item-label>
                      <q-item-label caption lines="2">{{
                        alergia.resource.recordedDate
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="alergia.resource.clinicalStatus">
                    <q-item-section avatar>
                      <q-icon color="primary" name="pending_actions" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Estado Clínico</q-item-label>
                      <q-item-label caption lines="2">{{
                        alergia.resource.clinicalStatus.coding[0].display
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="primary" name="settings_backup_restore" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Estado</q-item-label>
                      <q-item-label caption lines="2">{{
                        alergia.resource.verificationStatus.coding[0].display
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator
                    spaced
                    v-if="alergia.resource?.reaction?.length > 0"
                  />
                  <q-item v-if="alergia.resource?.reaction?.length > 0">
                    <q-item-section avatar>
                      <q-icon
                        name="warning"
                        v-if="alergia.resource.reaction[0].severity === 'mild'"
                        color="green"
                      />
                      <q-icon
                        name="warning"
                        v-if="
                          alergia.resource.reaction[0].severity === 'moderate'
                        "
                        color="orange"
                      />
                      <q-icon
                        name="warning"
                        v-if="
                          alergia.resource.reaction[0].severity === 'severe'
                        "
                        color="red"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        alergia.resource.reaction[0].manifestation[0].text
                      }}</q-item-label>
                      <q-item-label caption lines="2">Reacción</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator
                    spaced
                    v-if="alergia.resource?.reaction?.length > 0"
                  />
                  <q-item
                    class="text-center"
                    v-if="
                      alergia.resource.verificationStatus.coding[0].code !=
                      'entered-in-error'
                    "
                  >
                    <q-card-actions class="text-center" align="center">
                      <q-btn
                        flat
                        round
                        color="green"
                        v-close-popup
                        @click="
                          actualizarEstadoAlergia(
                            'confirmed',
                            'Confirmado',
                            alergia.resource.id,
                            alergia
                          )
                        "
                        title="Confirmar"
                        icon="thumb_up_alt"
                      />
                      <q-btn
                        flat
                        round
                        color="primary"
                        v-close-popup
                        @click="
                          actualizarEstadoAlergia(
                            'unconfirmed',
                            'Sin Confirmar',
                            alergia.resource.id,
                            alergia
                          )
                        "
                        title="No Confirmar"
                        icon="thumb_down_alt"
                      />
                      <q-btn
                        flat
                        round
                        color="red"
                        v-close-popup
                        @click="
                          actualizarEstadoAlergia(
                            'entered-in-error',
                            'Error',
                            alergia.resource.id,
                            alergia
                          )
                        "
                        title="Error"
                        icon="error"
                      />
                    </q-card-actions>
                  </q-item>
                </q-list>
              </q-popup-proxy>
            </q-chip>
          </q-item-label>
        </q-item-section>
        <q-item-section class="col-xs-2 col-md-1" side style="color: black">
          <q-btn
            color="secondary"
            icon="add"
            size="sm"
            @click="
              persistent = true;
              step = 1;
              limpiar();
            "
            label="Alergia"
          />
        </q-item-section>
        <q-item-section
          class="col-xs-2 col-md-1"
          side
          style="color: black; padding-right: 5px"
        >
          <q-btn
            color="grey"
            icon="arrow_back_ios"
            size="sm"
            @click="buscarOtroPaciente"
            label="Volver"
          />
        </q-item-section>
      </template>
    </q-expansion-item>
  </q-list>

  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Agregar nueva alergia</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        style="width: 700px; max-width: 80vw"
      >
        <q-step
          :name="1"
          title="Tipo de Evento"
          caption="Identificación del mecanismo fisiológico subyacente para un Riesgo de Reacción."
          icon="settings"
          :done="step > 1"
        >
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="type" val="allergy" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Alergia</q-item-label>
                <q-item-label caption
                  >Una propensión a reacciones de hipersensibilidad a una
                  sustancia. Estas reacciones suelen ser hipersensibilidad de
                  tipo I, además de otras reacciones "similares a las alergias",
                  incluida la pseudoalergia.</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="type" val="intolerance" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Intolerancia</q-item-label>
                <q-item-label caption
                  >Una propensión a reacciones adversas a una sustancia que no
                  se considera alérgica o "parecida a una alergia". Estas
                  reacciones son típicamente (pero no necesariamente) no
                  inmunes. Son hasta cierto punto idiosincrásicos y/o
                  específicos del paciente (es decir, no son una reacción que se
                  espera que ocurra con la mayoría o todos los pacientes en
                  circunstancias similares).</q-item-label
                >
              </q-item-section>
            </q-item> </q-list
          ><br />
          <q-input
            v-model="edad"
            mask="###"
            suffix="años"
            label="Edad en la que inicio o sucedio por primera vez"
            dense
          /><br />

          <q-stepper-navigation style="text-align: right">
            <q-btn @click="step = 2" color="primary" label="Continuar" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Categoría"
          caption="Categoría de una sustancia identificada asociada a alergias o intolerancias."
          icon="create_new_folder"
          :done="step > 2"
        >
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="category" val="food" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Comida</q-item-label>
                <q-item-label caption
                  >Cualquier sustancia consumida para proporcionar soporte
                  nutricional para el cuerpo.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="category" val="medication" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Medicamento</q-item-label>
                <q-item-label caption
                  >Sustancias administradas para lograr un efecto
                  fisiológico.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="category" val="environment" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Ambiente</q-item-label>
                <q-item-label caption
                  >Cualquier sustancia que se encuentre en el medio ambiente,
                  incluida cualquier sustancia que aún no esté clasificada como
                  alimento, medicamento o biológico.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="category" val="biologic" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Biológico</q-item-label>
                <q-item-label caption
                  >Una preparación que se sintetiza a partir de organismos vivos
                  o sus productos, especialmente una proteína humana o animal,
                  como una hormona o antitoxina, que se utiliza como agente
                  diagnóstico, preventivo o terapéutico. Los ejemplos de
                  medicamentos biológicos incluyen: vacunas; extractos
                  alergénicos, que se utilizan tanto para el diagnóstico como
                  para el tratamiento (por ejemplo, vacunas contra la alergia);
                  terapias génicas; terapias celulares. Hay otros productos
                  biológicos, como los tejidos, que normalmente no se asocian
                  con alergias.</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>

          <q-stepper-navigation style="text-align: right">
            <q-btn
              @click="step = 3"
              color="primary"
              :disable="category == ''"
              label="Continuar"
            />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Volver"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Identificacción"
          caption="Código que identifica la alergia o intolerancia"
          icon="assignment"
          :done="step > 3"
        >
          <q-select
            outlined
            v-model="alergiaIntolerancia"
            :options="options"
            :option-value="(option) => option.code"
            :option-label="(option) => option.display"
            @filter="filterFn"
            dense
            options-dense
            use-input
            input-debounce="0"
            behavior="menu"
            label="alergias o intolerancias"
            hint="Este conjunto de valores incluye códigos de concepto para sustancias/productos farmacéuticos específicos, condiciones de alergia o intolerancia y códigos de negación/exclusión para especificar la ausencia de tipos específicos de alergias o intolerancias."
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No hay resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br />
          <q-toggle
            :false-value="false"
            label="Tiene eventos de reacción adversa relacionados con la exposición a la sustancia"
            :true-value="true"
            color="green"
            v-model="sabeSustancia"
          />

          <q-stepper-navigation style="text-align: right">
            <q-btn
              @click="step = sabeSustancia ? 4 : 5"
              :disable="alergiaIntolerancia === null"
              color="primary"
              label="Continuar"
            />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Volver"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="4"
          title="Reaccion Adversa"
          caption="Reacción adversa Eventos relacionados con la exposición a la sustancia"
          icon="assignment"
          :disable="sabeSustancia === false"
          :done="step > 4"
        >
          <q-select
            outlined
            v-model="sustancia"
            :options="optionsSustancias"
            :option-value="(option) => option.code"
            :option-label="(option) => option.display"
            @filter="filterFnSustancias"
            dense
            options-dense
            use-input
            input-debounce="0"
            behavior="menu"
            label="Sustancia"
            hint="Sustancia específica o producto farmacéutico considerado responsable del evento"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No hay resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br />
          <q-input
            v-model="descripcion"
            outlined
            label="Descripcion de la reacción"
            autogrow
          />
          <br />
          <q-select
            outlined
            v-model="severidad"
            :options="stringSeveridad"
            :option-value="(option) => option.code"
            :option-label="(option) => option.display"
            dense
            options-dense
            use-input
            input-debounce="0"
            behavior="menu"
            label="Evaluación clínica de la gravedad de la reacción"
            hint="Evaluación clínica de la gravedad de un evento de reacción en su conjunto, considerando potencialmente múltiples manifestaciones diferentes."
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No hay resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-stepper-navigation style="text-align: right">
            <q-btn
              @click="step = 5"
              color="primary"
              :disable="
                severidad === null || descripcion === null ? true : false
              "
              label="Continuar"
            />
            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Volver"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="5" title="Finalizar" icon="add_comment">
          <q-select
            outlined
            v-model="riesgo"
            :options="optionsRiesgo"
            :option-value="(option) => option.code"
            :option-label="(option) => option.display"
            dense
            options-dense
            use-input
            label="Estimación del daño clínico"
            input-debounce="0"
            behavior="menu"
            hint="Estimación del daño clínico potencial, o gravedad, de una reacción a una sustancia identificada."
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No hay resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br />
          <q-select
            outlined
            v-model="status"
            :options="optionsStatus"
            :option-value="(option) => option.code"
            :option-label="(option) => option.display"
            dense
            options-dense
            use-input
            label="Estado de verificación de intolerancia a alergias"
            input-debounce="0"
            behavior="menu"
            hint="Estado de verificación de intolerancia a alergias"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No hay resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-stepper-navigation style="text-align: right">
            <q-btn
              color="primary"
              @click="guardarAlergias"
              v-close-popup
              :disable="status === null || riesgo === null ? true : false"
              label="Guardar"
            />
            <q-btn
              flat
              @click="step = sabeSustancia ? 4 : 3"
              color="primary"
              label="Volver"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.truncate-chip-labels > .q-chip
  max-width: 100px
.my-card
  width: 100%
  max-width: 250px
</style>
