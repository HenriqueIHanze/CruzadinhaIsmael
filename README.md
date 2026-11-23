## Cruzadinha de Arquitetura Computacional

Jogo de cruzadinha que roda no navegador, criado para treinar os termos da disciplina de Arquitetura Computacional (Sprint 3). Feito só com HTML, CSS e JavaScript puros.


## Como jogar

1. Leia as pistas, separadas em **Horizontais** e **Verticais**. O número de cada pista é o mesmo que aparece no tabuleiro.
2. Clique em uma casa e digite a resposta. Use letras maiúsculas ou minúsculas, sem acento e sem espaço. O cursor avança sozinho para a próxima casa.
3. Use as **setas do teclado** para mudar a direção de digitação. O **Backspace** volta uma casa.
4. Clique em **Conferir** para ver quais palavras estão certas (✓, casas verdes) e quais estão erradas (✗, casas vermelhas). O contador mostra quantas palavras você acertou, por exemplo "8 de 12 palavras".
5. Clique em **Reiniciar** para limpar o tabuleiro e jogar de novo.

O número entre parênteses no fim de cada pista é a quantidade de letras da resposta.

## Palavras e pistas

### Horizontais

| Nº | Resposta | Pista |
|----|----------|-------|
| 1 | FLASH | Memória não volátil de pen drives e SSDs, apagada em blocos. |
| 4 | REGISTRADORES | Pequenas áreas dentro da CPU que guardam dados durante a execução. |
| 6 | UC | Parte da CPU que coordena o trabalho dos outros componentes. |
| 9 | MEMORIADEMASSA | Guarda dados e programas de forma permanente, como o HD ou o SSD. |
| 11 | CPU | Cérebro do computador: busca, decodifica e executa instruções. |

### Verticais

| Nº | Resposta | Pista |
|----|----------|-------|
| 2 | ADDRESSBUS | Caminho pelo qual a CPU indica a posição da memória a acessar. |
| 3 | EEPROM | Memória não volátil apagada e regravada eletricamente, byte a byte. |
| 5 | ROM | Memória não volátil gravada de fábrica, geralmente só lida, que guarda o firmware. |
| 6 | ULA | Circuito da CPU que faz somas, subtrações e comparações lógicas. |
| 7 | DMA | Técnica que deixa um dispositivo acessar a memória sem passar pela CPU. |
| 8 | CACHE | Memória pequena e rápida, junto da CPU, para dados muito usados. |
| 10 | RAM | Memória volátil dos aplicativos em uso; perde tudo ao desligar. |

## Estrutura do projeto

- `index.html`: página e estrutura do jogo
- `style.css`: visual do tabuleiro e das pistas
- `script.js`: palavras, pistas, tabuleiro, botão Conferir, contador e botão Reiniciar
- `README.md`: este arquivo

## Tecnologias

HTML, CSS e JavaScript puros, sem bibliotecas. Publicado com o GitHub Pages.
