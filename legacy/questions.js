        const questions = {
            easy: [
				{q: "Quantos dias e noites choveu durante o dilúvio nos tempos de Noé?", 
				 options: ["30 dias e 30 noites", "40 dias e 40 noites", "50 dias e 50 noites", "60 dias e 60 noites"], 
				 correct: 1, num: 1, ref: "Gênesis 7:12"},
				
				{q: "Qual foi o primeiro milagre que Jesus realizou?", 
				 options: ["Curar um cego", "Transformar água em vinho", "Multiplicar pães", "Andar sobre as águas"], 
				 correct: 1, num: 2, ref: "João 2:1-11"},
				
				{q: "Qual o primeiro livro da Bíblia?", 
				 options: ["Êxodo", "Gênesis", "Levítico", "Apocalipse"], 
				 correct: 1, num: 3, ref: ""},
				
				{q: "Qual era o nome da esposa de Adão?", 
				 options: ["Eva", "Sara", "Rebeca", "Maria"], 
				 correct: 0, num: 4, ref: "Gênesis 3:20"},
				
				{q: "Quem libertou o povo do Egito?", 
				 options: ["José", "Moisés", "Davi", "Salomão"], 
				 correct: 1, num: 5, ref: "Êxodo 3:10"},
				
				{q: "Quem traiu Jesus por 30 moedas de prata?", 
				 options: ["Pedro", "Judas Iscariotes", "Tomé", "Tiago"], 
				 correct: 1, num: 6, ref: "Mateus 26:14-16"},
				
				{q: "Em que cidade Jesus nasceu?", 
				 options: ["Nazaré", "Belém", "Jerusalém", "Cafarnaum"], 
				 correct: 1, num: 7, ref: "Lucas 2:4-7"},
				
				{q: "Quem construiu a arca?", 
				 options: ["Abraão", "Moisés", "Noé", "Jacó"], 
				 correct: 2, num: 8, ref: "Gênesis 6:14-16"},
				
				{q: "Quantos discípulos Jesus escolheu?", 
				 options: ["10", "11", "12", "13"], 
				 correct: 2, num: 9, ref: "Mateus 10:1-4"},
				
				{q: "Quem foi jogado na cova dos leões?", 
				 options: ["Elias", "Davi", "Daniel", "Isaías"], 
				 correct: 2, num: 10, ref: "Daniel 6:16"},
				
				{q: "Quem matou o gigante Golias?", 
				 options: ["Saul", "Davi", "Sansão", "Josué"], 
				 correct: 1, num: 11, ref: "1 Samuel 17:49-50"},
				
				{q: "Quantos mandamentos Deus deu a Moisés?", 
				 options: ["5 mandamentos", "10 mandamentos", "15 mandamentos", "12 mandamentos"], 
				 correct: 1, num: 12, ref: "Êxodo 20:1-17"},
				
				{q: "Quantos anos tinha Abraão quando Isaque nasceu?", 
				 options: ["90 anos", "100 anos", "110 anos", "120 anos"], 
				 correct: 1, num: 13, ref: "Gênesis 21:5"},
				
				{q: "Quem foi o primeiro homem criado por Deus?", 
				 options: ["Adão", "Moisés", "Abraão", "Pedro"], 
				 correct: 0, num: 14, ref: "Gênesis 2:7"},
				
				{q: "Qual foi o discípulo que traiu Jesus?", 
				 options: ["Pedro", "João", "Judas", "Tiago"], 
				 correct: 2, num: 15, ref: "Mateus 26:47-50"},
				
				{q: "Quem abriu o Mar Vermelho?", 
				 options: ["Josué", "Moisés", "Davi", "Salomão"], 
				 correct: 1, num: 16, ref: "Êxodo 14:21"},
				
				{q: "Onde Jesus foi crucificado?", 
				 options: ["Monte Sinai", "No Calvário", "Monte das Oliveiras", "Monte Nebo"], 
				 correct: 1, num: 17, ref: "Lucas 23:33"},
				
				{q: "Quantos livros tem o Novo Testamento?", 
				 options: ["27", "39", "66", "33"], 
				 correct: 0, num: 18, ref: ""},
				
				{q: "Qual apóstolo era cobrador de impostos?", 
				 options: ["Pedro", "Mateus", "Paulo", "Tiago"], 
				 correct: 1, num: 19, ref: "Mateus 9:9"},
				
				{q: "Qual o último livro da Bíblia?", 
				 options: ["Mateus", "Apocalipse", "Judas", "Hebreus"], 
				 correct: 1, num: 20, ref: ""},
				
				{q: "Quantos pães e peixes Jesus usou para alimentar cinco mil pessoas?", 
				 options: ["3 pães e 2 peixes", "5 pães e 2 peixes", "7 pães e 3 peixes", "2 pães e 5 peixes"], 
				 correct: 1, num: 21, ref: "João 6:9"},
				
				{q: "Qual foi a primeira mulher criada por Deus?", 
				 options: ["Sara", "Eva", "Miriã", "Rebeca"], 
				 correct: 1, num: 22, ref: "Gênesis 2:22"},
				
				{q: "Quem foi lançado na fornalha ardente?", 
				 options: ["Daniel", "Sadraque, Mesaque e Abede-Nego", "Elias", "Jeremias"], 
				 correct: 1, num: 23, ref: "Daniel 3:19-20"},
				
				{q: "Quem foi o pai de Jesus segundo a lei?", 
				 options: ["Pedro", "José", "Zacarias", "João"], 
				 correct: 1, num: 24, ref: "Mateus 1:16"},
				
				{q: "Qual era o nome da mãe de Jesus?", 
				 options: ["Maria", "Marta", "Rebeca", "Ana"], 
				 correct: 0, num: 25, ref: "Lucas 1:27"},
				
				{q: "Em quantos dias Deus criou o mundo?", 
				 options: ["5 dias", "6 dias", "7 dias", "8 dias"], 
				 correct: 1, num: 26, ref: "Gênesis 1:31; 2:2"},
				
				{q: "Qual rio Jesus foi batizado?", 
				 options: ["Rio Nilo", "Rio Jordão", "Rio Eufrates", "Rio Tigre"], 
				 correct: 1, num: 27, ref: "Mateus 3:13"},
				
				{q: "Quem escreveu muitos Salmos?", 
				 options: ["Davi", "Moisés", "Isaías", "Salomão"], 
				 correct: 0, num: 28, ref: ""},
				
				{q: "Quem foi o irmão de Moisés?", 
				 options: ["Arão", "Josué", "Esaú", "Jacó"], 
				 correct: 0, num: 29, ref: "Êxodo 4:14"},
				
				{q: "Quem foi o profeta que enfrentou os profetas de Baal?", 
				 options: ["Eliseu", "Elias", "Isaías", "Jeremias"], 
				 correct: 1, num: 30, ref: "1 Reis 18:20-40"},
				
				{q: "Quem escreveu o livro de Apocalipse?", 
				 options: ["Paulo", "Pedro", "João", "Tiago"], 
				 correct: 2, num: 31, ref: "Apocalipse 1:1"},
				
				{q: "Qual foi o primeiro pecado cometido no Jardim do Éden?", 
				 options: ["Mentir", "Comer do fruto proibido", "Roubar", "Matar"], 
				 correct: 1, num: 32, ref: "Gênesis 3:6"},
				
				{q: "Quantos filhos Noé teve?", 
				 options: ["2 filhos", "3 filhos", "4 filhos", "5 filhos"], 
				 correct: 1, num: 33, ref: "Gênesis 6:10"},
				
				{q: "Qual era o nome original de Paulo?", 
				 options: ["Simão", "Saulo", "Judas", "Tomé"], 
				 correct: 1, num: 34, ref: "Atos 13:9"},
				
				{q: "Quem sonhou com uma escada que ia até o céu?", 
				 options: ["José", "Jacó", "Elias", "Daniel"], 
				 correct: 1, num: 35, ref: "Gênesis 28:12"},
				
				{q: "Quem andou sobre as águas com Jesus?", 
				 options: ["João", "Pedro", "Tiago", "André"], 
				 correct: 1, num: 36, ref: "Mateus 14:29"},
				
				{q: "O que significa o nome Emanuel?", 
				 options: ["O Senhor é Paz", "Deus é Amor", "Deus conosco", "Filho de Deus"], 
				 correct: 2, num: 37, ref: "Mateus 1:23"},
				
				{q: "Quem batizou Jesus?", 
				 options: ["Pedro", "Tiago", "João Batista", "João"], 
				 correct: 2, num: 38, ref: "Mateus 3:13"},
				
				{q: "Quem foi o primeiro rei de Israel?", 
				 options: ["Saul", "Davi", "Salomão", "Josué"], 
				 correct: 0, num: 39, ref: "1 Samuel 10:1"},
				
				{q: "Qual era a profissão de Pedro?", 
				 options: ["Pescador", "Carpinteiro", "Médico", "Cobrador de impostos"], 
				 correct: 0, num: 40, ref: "Mateus 4:18"},
				
				{q: "Quem recebeu as tábuas da lei?", 
				 options: ["Abraão", "Moisés", "Elias", "Josué"], 
				 correct: 1, num: 41, ref: "Êxodo 31:18"},
				
				{q: "Quem matou Abel?", 
				 options: ["Sete", "Caim", "Noé", "Lameque"], 
				 correct: 1, num: 42, ref: "Gênesis 4:8"},
				
				{q: "Qual era a cidade natal de Jesus?", 
				 options: ["Jerusalém", "Belém", "Nazaré", "Cafarnaum"], 
				 correct: 2, num: 43, ref: "Lucas 2:39"},
				
				{q: "Qual era a língua comum falada por Jesus?", 
				 options: ["Grego", "Latim", "Hebraico", "Aramaico"], 
				 correct: 3, num: 44, ref: ""},
				
				{q: "Quantos livros tem a Bíblia?", 
				 options: ["73", "66", "70", "60"], 
				 correct: 1, num: 45, ref: ""},
				
				{q: "Quem subiu ao céu sem morrer?", 
				 options: ["Elias", "Moisés", "Abraão", "Isaías"], 
				 correct: 0, num: 46, ref: "2 Reis 2:11"},
				
				{q: "Quem foi o homem mais forte da Bíblia?", 
				 options: ["Davi", "Saul", "Sansão", "Golias"], 
				 correct: 2, num: 47, ref: "Juízes 16:17"},
				
				{q: "O que é o maná?", 
				 options: ["Água", "Carne", "Pão do céu", "Mel"], 
				 correct: 2, num: 48, ref: "Êxodo 16:31"},
				
				{q: "Qual discípulo negou Jesus 3 vezes?", 
				 options: ["João", "Tiago", "Pedro", "Mateus"], 
				 correct: 2, num: 49, ref: "Mateus 26:69-75"},
				
				{q: "Quem viu a sarça ardente?", 
				 options: ["Abraão", "Jacó", "Moisés", "Isaías"], 
				 correct: 2, num: 50, ref: "Êxodo 3:2"},
				
				{q: "Em que mar Jesus acalmou a tempestade?", 
				 options: ["Mar Morto", "Mar da Galileia", "Mar Mediterrâneo", "Mar Vermelho"], 
				 correct: 1, num: 51, ref: "Marcos 4:39"},
				
				{q: "Qual era o nome do jardim onde Adão e Eva viviam?", 
				 options: ["Jardim do Éden", "Jardim de Deus", "Jardim Sagrado", "Jardim da Vida"], 
				 correct: 0, num: 52, ref: "Gênesis 2:8"},
				
				{q: "Jesus nasceu durante o reinado de qual imperador romano?", 
				 options: ["Nero", "César Augusto", "Tibério", "Cláudio"], 
				 correct: 1, num: 53, ref: "Lucas 2:1"},
				
				{q: "Quantas pragas Deus enviou ao Egito?", 
				 options: ["8 pragas", "10 pragas", "12 pragas", "7 pragas"], 
				 correct: 1, num: 54, ref: "Êxodo 7-12"},
				
				{q: "Em que monte Moisés recebeu os Dez Mandamentos?", 
				 options: ["Monte Sinai", "Monte Carmelo", "Monte das Oliveiras", "Monte Nebo"], 
				 correct: 0, num: 55, ref: "Êxodo 19:20"},
				
				{q: "Qual era a comida preferida de Esaú que Jacó preparou?", 
				 options: ["Peixe", "Ensopado de lentilhas", "Pão", "Mel"], 
				 correct: 1, num: 56, ref: "Gênesis 25:34"},
				
				{q: "Quantos animais de cada espécie Noé levou na arca?", 
				 options: ["Um casal", "Três casais", "Quatro casais", "Dois casais"], 
				 correct: 0, num: 57, ref: "Gênesis 7:9"},
				
				{q: "Em que cidade Jesus cresceu?", 
				 options: ["Belém", "Nazaré", "Jerusalém", "Caná"], 
				 correct: 1, num: 58, ref: "Lucas 2:39"},
				
				{q: "Quantos Evangelhos existem no Novo Testamento?", 
				 options: ["3 evangelhos", "4 evangelhos", "5 evangelhos", "6 evangelhos"], 
				 correct: 1, num: 59, ref: ""},
				
				{q: "Qual foi o sinal que Deus deu a Noé de que não destruiria mais a terra com água?", 
				 options: ["Uma pomba", "Arco-íris", "Uma estrela", "Um relâmpago"], 
				 correct: 1, num: 60, ref: "Gênesis 9:13"},				
			],
            medium: [
				{q: "Quantos anos o povo de Israel ficou no deserto?", 
				 options: ["20", "30", "40", "50"], 
				 correct: 2, num: 61, ref: "Números 14:33"},
				
				{q: "O que significa a palavra 'Pentateuco'?", 
				 options: ["Cinco cânticos", "Cinco leis", "Cinco livros", "Cinco histórias"], 
				 correct: 2, num: 62, ref: ""},
				
				{q: "Quem foi o rei que teve um sonho com uma estátua de diferentes metais?", 
				 options: ["Rei Davi", "Rei Nabucodonosor", "Rei Salomão", "Rei Saul"], 
				 correct: 1, num: 63, ref: "Daniel 2:31-35"},
				
				{q: "Qual profeta foi engolido por um grande peixe?", 
				 options: ["Eliseu", "Jonas", "Ezequiel", "Jeremias"], 
				 correct: 1, num: 64, ref: "Jonas 1:17"},
				
				{q: "Qual foi o apóstolo que negou Jesus três vezes?", 
				 options: ["João", "Paulo", "Pedro", "Tiago"], 
				 correct: 2, num: 65, ref: "Mateus 26:69-75"},
				
				{q: "Qual o primeiro milagre de Jesus?", 
				 options: ["Curar um cego", "Multiplicação de pães", "Andar sobre as águas", "Transformar água em vinho"], 
				 correct: 3, num: 66, ref: "João 2:1-11"},
				
				{q: "Qual o significado da palavra 'Messias' em hebraico?", 
				 options: ["Salvador", "Ungido", "Senhor", "Profeta"], 
				 correct: 1, num: 67, ref: ""},
				
				{q: "Qual era o nome da esposa de Isaque?", 
				 options: ["Sara", "Rebeca", "Raquel", "Lia"], 
				 correct: 1, num: 68, ref: "Gênesis 24:67"},
				
				{q: "Qual era a profissão de José, pai adotivo de Jesus?", 
				 options: ["Pescador", "Carpinteiro", "Pastor", "Comerciante"], 
				 correct: 1, num: 69, ref: "Mateus 13:55"},
				
				{q: "Quem foi lançado na cova dos leões?", 
				 options: ["Ezequiel", "Daniel", "Jeremias", "Isaías"], 
				 correct: 1, num: 70, ref: "Daniel 6:16"},
				
				{q: "Quem interpretou os sonhos do Faraó no Egito?", 
				 options: ["Moisés", "José", "Arão", "Jacó"], 
				 correct: 1, num: 71, ref: "Gênesis 41:15-16"},
				
				{q: "Qual era o nome do irmão de Moisés?", 
				 options: ["Arão", "Josué", "Calebe", "Hur"], 
				 correct: 0, num: 72, ref: "Êxodo 4:14"},
				
				{q: "Quem foi o primeiro rei de Israel?", 
				 options: ["Davi", "Saul", "Salomão", "Samuel"], 
				 correct: 1, num: 73, ref: "1 Samuel 10:1"},
				
				{q: "Qual era o nome da mãe de Samuel?", 
				 options: ["Ana", "Sara", "Miriã", "Débora"], 
				 correct: 0, num: 74, ref: "1 Samuel 1:20"},
				
				{q: "Quem foi vendido como escravo pelos seus irmãos?", 
				 options: ["Benjamim", "José", "Judá", "Rúben"], 
				 correct: 1, num: 75, ref: "Gênesis 37:28"},
				
				{q: "Qual era o nome do sumo sacerdote na época da crucificação de Jesus?", 
				 options: ["Anás", "Caifás", "Zacarias", "Eleazar"], 
				 correct: 1, num: 76, ref: "Mateus 26:57"},
				
				{q: "Qual é a festa judaica que celebra a saída do Egito?", 
				 options: ["Purim", "Páscoa", "Tabernáculos", "Pentecostes"], 
				 correct: 1, num: 77, ref: "Êxodo 12:14"},
				
				{q: "Quem foi o profeta que casou com uma prostituta?", 
				 options: ["Oséias", "Isaías", "Ezequiel", "Jeremias"], 
				 correct: 0, num: 78, ref: "Oséias 1:2"},
				
				{q: "Qual é o significado de 'Aleluia'?", 
				 options: ["Deus é fiel", "Louvai ao Senhor", "Glória a Deus", "Deus é amor"], 
				 correct: 1, num: 79, ref: ""},
				
				{q: "Quem escreveu o livro de Atos dos Apóstolos?", 
				 options: ["Paulo", "Pedro", "Lucas", "João"], 
				 correct: 2, num: 80, ref: "Atos 1:1"},
				
				{q: "Qual cidade foi destruída junto com Sodoma?", 
				 options: ["Nínive", "Gomorra", "Jericó", "Babilônia"], 
				 correct: 1, num: 81, ref: "Gênesis 19:24"},
				
				{q: "Qual apóstolo teve uma visão em Patmos?", 
				 options: ["Tiago", "João", "Pedro", "Paulo"], 
				 correct: 1, num: 82, ref: "Apocalipse 1:9"},
				
				{q: "Quem foi apedrejado até a morte em Atos?", 
				 options: ["Estevão", "Tiago", "Bartolomeu", "Paulo"], 
				 correct: 0, num: 83, ref: "Atos 7:59"},
				
				{q: "Qual foi o sinal do pacto com Noé?", 
				 options: ["Uma estrela", "Um arco-íris", "Uma nuvem", "Um altar"], 
				 correct: 1, num: 84, ref: "Gênesis 9:13"},
				
				{q: "Qual era o nome do rei de Jerusalém quando Abraão voltou de derrotar os reis?", 
				 options: ["Melquisedeque", "Adonizedeque", "Abede-Nego", "Belsazar"], 
				 correct: 0, num: 85, ref: "Gênesis 14:18"},
				
				{q: "Quantos livros tem o Antigo Testamento na Bíblia Protestante?", 
				 options: ["37 livros", "39 livros", "41 livros", "35 livros"], 
				 correct: 1, num: 86, ref: ""},
				
				{q: "Qual profeta viveu durante o cativeiro babilônico?", 
				 options: ["Isaías", "Ezequiel", "Oséias", "Amós"], 
				 correct: 1, num: 87, ref: "Ezequiel 1:1"},
				
				{q: "Quantas cartas Paulo escreveu que estão no Novo Testamento?", 
				 options: ["12 cartas", "13 cartas", "14 cartas", "15 cartas"], 
				 correct: 1, num: 88, ref: ""},
				
				{q: "Em qual cidade Paulo pregou no Areópago?", 
				 options: ["Roma", "Atenas", "Corinto", "Éfeso"], 
				 correct: 1, num: 89, ref: "Atos 17:19"},
				
				{q: "Quantos filhos Jacó teve?", 
				 options: ["10 filhos", "12 filhos", "14 filhos", "11 filhos"], 
				 correct: 1, num: 90, ref: "Gênesis 35:22"},
			],
            hard: [
				{q: "O que significa 'YHWH' (Tetragrama) na tradição hebraica?", 
				 options: ["Senhor dos Exércitos", "Aquele que provê", "Eu Sou o que Sou", "O Criador"], 
				 correct: 2, num: 91, ref: "Êxodo 3:14"},
				
				{q: "Quem foi o autor da obra teológica 'Institutas da Religião Cristã'?", 
				 options: ["Martinho Lutero", "Agostinho", "João Calvino", "Tomás de Aquino"], 
				 correct: 2, num: 92, ref: ""},
				
				{q: "Em qual concílio foi definido o cânon do Novo Testamento como o conhecemos hoje?", 
				 options: ["Niceia", "Trento", "Cartago", "Éfeso"], 
				 correct: 2, num: 93, ref: ""},
				
				{q: "O termo 'koinonia' em grego significa:", 
				 options: ["Serviço", "Fé", "Comunhão", "Alegria"], 
				 correct: 2, num: 94, ref: ""},
				
				{q: "O termo hebraico 'hesed' usado em Salmos refere-se a:", 
				 options: ["Justiça", "Misericórdia/amor leal", "Poder", "Sabedoria"], 
				 correct: 1, num: 95, ref: ""},
				
				{q: "Qual foi o tema central da Reforma Protestante de 1517?", 
				 options: ["Autoridade do papa", "Salvação pela fé", "Fim da idolatria", "Rebelião contra Roma"], 
				 correct: 1, num: 96, ref: ""},
				
				{q: "Quem foi o principal teólogo do período patrístico latino?", 
				 options: ["Orígenes", "João Crisóstomo", "Jerônimo", "Agostinho de Hipona"], 
				 correct: 3, num: 97, ref: ""},
				
				{q: "Em qual idioma foi escrito originalmente o Novo Testamento?", 
				 options: ["Latim", "Hebraico", "Grego koiné", "Aramaico"], 
				 correct: 2, num: 98, ref: ""},
				
				{q: "Qual era a função dos Essênios no contexto do Segundo Templo?", 
				 options: ["Sacerdotes do templo", "Grupo revolucionário", "Grupo apocalíptico ascético", "Fariseus especializados"], 
				 correct: 2, num: 99, ref: ""},
				
				{q: "Quem escreveu a epístola aos Hebreus?", 
				 options: ["Paulo", "Apolo", "Autor desconhecido", "Lucas"], 
				 correct: 2, num: 100, ref: ""},
				
				{q: "Qual era o nome do bisavô de Noé?", 
				 options: ["Enoque", "Matusalém", "Lameque", "Sete"], 
				 correct: 0, num: 101, ref: "Gênesis 5:21"},
				
				{q: "Em que ano Martinho Lutero afixou as 95 teses?", 
				 options: ["1517", "1519", "1515", "1520"], 
				 correct: 0, num: 102, ref: ""},
				
				{q: "Quantos versículos tem o livro de Filemom?", 
				 options: ["23 versículos", "25 versículos", "27 versículos", "21 versículos"], 
				 correct: 1, num: 103, ref: ""},
				
				{q: "Qual era o nome do pai de Abraão?", 
				 options: ["Terá", "Naor", "Harã", "Seрuge"], 
				 correct: 0, num: 104, ref: "Gênesis 11:27"},
				
				{q: "Em que concílio foi definida a doutrina da Trindade?", 
				 options: ["Concílio de Nicéia", "Concílio de Constantinopla", "Concílio de Éfeso", "Concílio de Calcedônia"], 
				 correct: 0, num: 105, ref: ""},
				
				{q: "Quantos anos tinha Matusalém quando morreu?", 
				 options: ["969 anos", "962 anos", "950 anos", "930 anos"], 
				 correct: 0, num: 106, ref: "Gênesis 5:27"},
				
				{q: "Qual era o nome do escriba de Jeremias?", 
				 options: ["Baruque", "Gedalias", "Safã", "Hilquias"], 
				 correct: 0, num: 107, ref: "Jeremias 36:4"},
				
				{q: "Em que ano ocorreu o Grande Cisma entre Igreja Oriental e Ocidental?", 
				 options: ["1054", "1053", "1055", "1052"], 
				 correct: 0, num: 108, ref: ""},
				
				{q: "Quantos capítulos tem o livro de Jó?", 
				 options: ["40 capítulos", "42 capítulos", "44 capítulos", "38 capítulos"], 
				 correct: 1, num: 109, ref: ""},
				
				{q: "Qual era o nome da filha de Jó que nasceu após sua restauração?", 
				 options: ["Jemima", "Quézia", "Quéren-Hapuque", "A Bíblia menciona três"], 
				 correct: 3, num: 110, ref: "Jó 42:14"},
				
				{q: "Quem foi o reformador que traduziu a Bíblia para o alemão?", 
				 options: ["João Calvino", "Martinho Lutero", "Ulrico Zuínglio", "João Huss"], 
				 correct: 1, num: 111, ref: ""},
				
				{q: "Quantos versículos tem o menor capítulo da Bíblia?", 
				 options: ["2 versículos", "3 versículos", "4 versículos", "5 versículos"], 
				 correct: 0, num: 112, ref: "Salmo 117"},
				
				{q: "Qual era o nome do pai de Betsabá?", 
				 options: ["Elião", "Urias", "Aitofel", "Natã"], 
				 correct: 0, num: 113, ref: "2 Samuel 11:3"},
				
				{q: "Em que ano João Crisóstomo tornou-se patriarca de Constantinopla?", 
				 options: ["398", "397", "399", "400"], 
				 correct: 1, num: 114, ref: ""},
				
				{q: "Quantos anos durou o cativeiro babilônico?", 
				 options: ["60 anos", "70 anos", "80 anos", "65 anos"], 
				 correct: 1, num: 115, ref: "Jeremias 25:11"},
				
				{q: "Qual era o nome do profeta que profetizou sobre a restauração do templo?", 
				 options: ["Ageu", "Zacarias", "Malaquias", "Todos os anteriores"], 
				 correct: 3, num: 116, ref: "Ageu 1:8; Zacarias 4:9"},
				
				{q: "Em que ano Agostinho de Hipona morreu?", 
				 options: ["430", "431", "428", "432"], 
				 correct: 0, num: 117, ref: ""},
				
				{q: "Quantos versículos tem o livro de 2 João?", 
				 options: ["11 versículos", "13 versículos", "15 versículos", "9 versículos"], 
				 correct: 1, num: 118, ref: ""},
				
				{q: "Qual era o nome do avô de Davi?", 
				 options: ["Obede", "Boaz", "Jessé", "Salma"], 
				 correct: 0, num: 119, ref: "Rute 4:17"},
				
				{q: "Em que concílio foi condenado o Arianismo definitivamente?", 
				 options: ["Nicéia I", "Constantinopla I", "Éfeso", "Calcedônia"], 
				 correct: 1, num: 200, ref: ""},
				
				{q: "Quantos anos tinha Josias quando começou a reinar?", 
				 options: ["6 anos", "8 anos", "10 anos", "12 anos"], 
				 correct: 1, num: 201, ref: "2 Reis 22:1"},
				
				{q: "Qual era o nome da esposa de Ezequiel?", 
				 options: ["A Bíblia não menciona", "Gômer", "Hulda", "Ana"], 
				 correct: 0, num: 202, ref: "Ezequiel 24:18"},
				
				{q: "Em que ano ocorreu o Sínodo de Dort?", 
				 options: ["1618-1619", "1620-1621", "1616-1617", "1615-1616"], 
				 correct: 0, num: 203, ref: ""},
				
				{q: "Quantos homens Gideão selecionou para lutar contra os midianitas?", 
				 options: ["200 homens", "300 homens", "400 homens", "500 homens"], 
				 correct: 1, num: 204, ref: "Juízes 7:7"},
				
				{q: "Qual era o nome do profeta que foi contemporâneo de Isaías?", 
				 options: ["Miquéias", "Oséias", "Joel", "Amós"], 
				 correct: 0, num: 205, ref: "Miquéias 1:1"},
				
				{q: "Em que ano foi estabelecido o Cânon do Novo Testamento no Concílio de Cartago?", 
				 options: ["397", "393", "419", "405"], 
				 correct: 0, num: 206, ref: ""},
				
				{q: "Quantos filhos teve o sacerdote Eli?", 
				 options: ["1 filho", "2 filhos", "3 filhos", "4 filhos"], 
				 correct: 1, num: 207, ref: "1 Samuel 2:12"},
				
				{q: "Qual era o nome do sucessor de Moisés como líder de Israel?", 
				 options: ["Josué", "Calebe", "Eleazar", "Itamar"], 
				 correct: 0, num: 208, ref: "Deuteronômio 31:23"},
				
				{q: "Em que século viveu Orígenes de Alexandria?", 
				 options: ["Século II-III", "Século III-IV", "Século I-II", "Século IV-V"], 
				 correct: 0, num: 209, ref: ""},
				
				{q: "Quantos capítulos tem o livro de Esdras?", 
				 options: ["8 capítulos", "10 capítulos", "12 capítulos", "9 capítulos"], 
				 correct: 1, num: 210, ref: ""},
				
				{q: "Qual era o nome da profetisa que reconheceu Jesus no templo quando bebê?", 
				 options: ["Ana", "Débora", "Hulda", "Miriã"], 
				 correct: 0, num: 211, ref: "Lucas 2:36"},
				
				{q: "Em que ano aproximadamente ocorreu a queda de Jerusalém pelo rei Nabucodonosor?", 
				 options: ["586 a.C.", "587 a.C.", "585 a.C.", "588 a.C."], 
				 correct: 0, num: 212, ref: "2 Reis 25:8-9"},
				
				{q: "Quantos anos durou o ministério público de Jesus?", 
				 options: ["2 anos", "3 anos", "4 anos", "5 anos"], 
				 correct: 1, num: 213, ref: ""},
				
				{q: "Qual era o nome da cidade natal de Paulo?", 
				 options: ["Damasco", "Tarso", "Antioquia", "Jerusalém"], 
				 correct: 1, num: 214, ref: "Atos 22:3"},
				
				{q: "Quem foi o escriba que leu a Lei para o povo após o retorno do exílio?", 
				 options: ["Neemias", "Esdras", "Zorobabel", "Ageu"], 
				 correct: 1, num: 215, ref: "Neemias 8:1"},
				
				{q: "Qual era o nome da esposa de Moisés?", 
				 options: ["Zípora", "Miriã", "Débora", "Raquel"], 
				 correct: 0, num: 216, ref: "Êxodo 2:21"},
				
				{q: "Em que monte Elias desafiou os profetas de Baal?", 
				 options: ["Monte Sinai", "Monte Carmelo", "Monte Horeb", "Monte das Oliveiras"], 
				 correct: 1, num: 217, ref: "1 Reis 18:19"},
				
				{q: "Quantas igrejas são mencionadas no livro de Apocalipse?", 
				 options: ["5 igrejas", "7 igrejas", "9 igrejas", "12 igrejas"], 
				 correct: 1, num: 218, ref: "Apocalipse 1:11"},
				
				{q: "Qual era o nome do pai de João Batista?", 
				 options: ["Zacarias", "Simeão", "José", "Joaquim"], 
				 correct: 0, num: 219, ref: "Lucas 1:13"},
				
				{q: "Quantos versículos tem o Salmo 119?", 
				 options: ["150 versículos", "176 versículos", "200 versículos", "120 versículos"], 
				 correct: 1, num: 220, ref: ""},
            ]
        };