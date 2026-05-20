---
title: "Como Eu Me Perdi (e Me Encontrei) no Universo da IA"
slug: como-eu-me-perdi-e-me-encontrei-no-universo-da-ia
date: 2026-05-19
status: published
language: pt
en_title: ""
en_body_path: ""
seo_title: ""
seo_description: ""
tags: []
---

Nós últimos dois anos eu me dediquei minhas horas vagas e as vezes algumas madrugadas das quais deveria estar dormindo, para aprender/refinar meus conhecimentos com IA, li artigos, blogs e noticias sem fim sobre esse cenário tão volátil que se transforma, a cada hora e isso não é exagero. A cada intervalo curtíssimo de tempo as grandes bigtechs lançam um novo modelo, uma nova harness, uma nova versão, que muda o ranking disputadissimo de quem é a melhor. Isso era deveras interessante pra mim, e me motivava a cada vez procurar mais e mais, mesmo se eu não conseguisse acompanhar.

Ainda ligado com o pensamento de me tornar capaz nessa área, resolvi então me colocar fazendo mais uma pós graduação, dessa vez em algo ligado diretamente a área, Ciencia de dados e inteligencia artificial foi a escolhida e nela fui apresentado ao backend desse universo, não que ja não estivesse familiarizado com backends, afinal é a minha área preferida desde a faculdade há quase mil anos atras (2014 rs). Finalizei a pós em menos de um ano.

Mas ainda sentia que estava faltando algo, faltava vivencia com IA, então me questionei em como eu iria adentrar mais profundamente nesse universo afim de sanar minha sede e curiosidade. Apenas assinar um plano de um dos N’s big modelos e brincar não era suficiente. Foi então que uma área em especifico fez meus olhos brilharem ainda mais. A terra maravilhosa e turbulenta dos modelos de IA open-source.

Ver aquela quantidade vasta de modelos, criados por diversas empresas, e usados, desmontados, refinados por quem quisesse me fez ter um deslumbre de querer aquilo também. Então me dediquei completamente a entender em como rodar aqueles modelos e o que eu poderia fazer com eles. Ideias não faltaram, o que faltou foi o conhecimento de infra-estrutura e uma base pra conseguir colocar aquilo pra funcionar.

Ter um LLM rodando no meu computador offline me fascinava. E ollama me permitiu ter esse fascinio. Era um comando “ollama run ...” e a IA estava lá pronta pra uso. Então vieram os primeiros baldes de agua fria. Eu estava longe de ter a capacidade pra rodar aquilo. Mesmo tendo um PC “Bom” os “miseros” 8GB VRAM da minha RTX 2070 Super mal eram capazes de subir modelos minusculos, de 8 bilhões de parametros. A frase out of memory me assombrou por muito tempo.

Então resolvi juntar umas moedas e dar um upgrade, e nisso consegui uma maravilhosa RTX 3090, com seus cobiçados 24 GB de VRAM, isso era uma maravilha, eu rodei modelos de 20 bilhões de parametros lindamente nela, mas estava na hora de além de ser hobby, ter uma finalidade pra aqueles modelos. Foi então que o segundo balde veio.

Os modelos que eu era capaz de rodar, mesmo com a 3090, não eram “fortes” o suficientes para o que eu queria, um copiloto de programação pesada, codebases gigantescas, um amigo pra me ajudar a desbravar as florestas selvagens de códigos legados que muitas vezes eu teria que enfrentar. Então logo fui, juntei mais umas moedas e comprei uma segunda GPU, dessa vez uma Tesla.

Na minha inocente mente deslumbrada e ansiosa, agora eu teria VRAM somada entre as GPUs e o céu seria o limite. Spoiler: Não foi kkk. Descobri da forma mais dolorosa, que o maravilhoso ollama, que me permitia rodar praticamente qualquer modelo open-source disponivel na sua vasta biblioteca com apenas um comando, não era nada bom em administrar multi-gpus. Resultado, eu até rodava os modelos, mas com desempenho muitas vezes pior que com apenas a 3090.

E foi aí que talvez tenha começado a parte mais importante dessa jornada: perceber que trabalhar com IA local não era só sobre “rodar modelo”. Era sobre entender quantização, throughput, largura de banda, KV cache, offload, tensor split, context window, inferência distribuída e todas aquelas palavras assustadoras que no começo pareciam escritas em outro idioma.

Quanto mais eu aprendia, mais eu percebia que o buraco era absurdamente mais fundo do que eu imaginava. E sinceramente? Isso só me deixava mais fascinado. Porque pela primeira vez em muitos anos eu sentia aquela sensação antiga de quando comecei a programar: a sensação de não saber absolutamente nada, mas ao mesmo tempo querer aprender tudo.

Foram incontáveis testes quebrando ambiente, reinstalando drivers, trocando backend, compilando projeto manualmente, tentando fazer CUDA conversar direito com hardware antigo, misturando GPUs completamente diferentes e vendo gargalos absurdos nascerem na minha frente. Em muitos momentos parecia mais engenharia reversa do que simplesmente “usar IA”.

Mas aos poucos as coisas começaram a fazer sentido. Eu comecei a perceber que existia uma diferença gigantesca entre consumir IA e realmente entender como ela funciona por trás das cortinas. A maioria das pessoas vê um chat bonito respondendo perguntas. Eu comecei a enxergar tokens sendo processados, memória sendo alocada, GPUs brigando por banda PCIe e modelos tentando sobreviver dentro de limitações físicas reais.

E talvez seja justamente isso que mais me encanta nesse universo. IA não é magia. Parece magia às vezes, mas por trás dela existe engenharia, matemática, infra-estrutura, otimização e uma quantidade absurda de tentativa e erro.

Hoje eu ainda estou longe de me considerar especialista. Na verdade, quanto mais eu aprendo, mais eu percebo o tamanho do oceano que existe pela frente. Mas diferente de antes, agora eu sinto que não estou apenas observando a revolução da IA acontecer pela internet. Eu estou participando dela, mesmo que do meu próprio jeito, com hardware improvisado, noites mal dormidas, logs infinitos e muito café.

E sinceramente? Acho que foi uma das jornadas mais divertidas que eu já tive com tecnologia.