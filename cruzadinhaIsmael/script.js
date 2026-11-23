// [resposta, linha, coluna, direção, pista]
const P = [
  ["MEMORIADEMASSA", 6, 0, "H", "Guarda dados e programas de forma permanente, como o HD ou o SSD."],
  ["REGISTRADORES", 2, 3, "H", "Pequenas áreas dentro da CPU que guardam dados durante a execução."],
  ["FLASH", 0, 9, "H", "Memória não volátil de pen drives e SSDs, apagada em blocos."],
  ["UC", 4, 13, "H", "Parte da CPU que coordena o trabalho dos outros componentes."],
  ["CPU", 8, 9, "H", "Cérebro do computador: busca, decodifica e executa instruções."],
  ["EEPROM", 1, 0, "V", "Memória não volátil apagada e regravada eletricamente, byte a byte."],
  ["DMA", 5, 2, "V", "Técnica que deixa um dispositivo acessar a memória sem passar pela CPU."],
  ["RAM", 6, 4, "V", "Memória volátil dos aplicativos em uso; perde tudo ao desligar."],
  ["CACHE", 5, 6, "V", "Memória pequena e rápida, junto da CPU, para dados muito usados."],
  ["ROM", 4, 9, "V", "Memória não volátil gravada de fábrica, geralmente só lida, que guarda o firmware."],
  ["ADDRESSBUS", 0, 11, "V", "Caminho pelo qual a CPU indica a posição da memória a acessar."],
  ["ULA", 4, 13, "V", "Circuito da CPU que faz somas, subtrações e comparações lógicas."]
];

const D = { H: [0, 1], V: [1, 0] };
const ws = P.map(([a, r, c, d, t]) => ({ a, r, c, d, t }));
const inicios = [...new Set(ws.map(w => w.r + "," + w.c))].sort((x, y) => {
  const [a, b] = x.split(",").map(Number), [c, d] = y.split(",").map(Number);
  return a - c || b - d;
});

// monta o mapa de casas e numera as palavras na ordem de leitura
const cel = {};
ws.forEach(w => {
  w.n = inicios.indexOf(w.r + "," + w.c) + 1;
  w.cels = [...w.a].map((l, i) => {
    const r = w.r + D[w.d][0] * i, c = w.c + D[w.d][1] * i, k = r + "," + c;
    cel[k] = cel[k] || { r, c, l, ds: {} };
    cel[k].ds[w.d] = w;
    return cel[k];
  });
});
const casas = Object.values(cel);

const tab = document.getElementById("tabuleiro");
tab.style.setProperty("--cols", Math.max(...casas.map(x => x.c)) + 1);
let dir = "H";
const prox = (x, dr, dc) => cel[(x.r + dr) + "," + (x.c + dc)];
const foco = x => x && x.i.focus();

casas.forEach(x => {
  const d = document.createElement("div");
  d.className = "casa";
  d.style.gridRow = x.r + 1;
  d.style.gridColumn = x.c + 1;
  const i = document.createElement("input");
  i.maxLength = 1;
  i.autocomplete = "off";
  i.setAttribute("aria-label", "Linha " + (x.r + 1) + ", coluna " + (x.c + 1));
  d.append(i);
  const w = Object.values(x.ds).find(w => w.r == x.r && w.c == x.c);
  if (w) {
    const s = document.createElement("span");
    s.textContent = w.n;
    d.append(s);
  }
  x.el = d;
  x.i = i;
  tab.append(d);

  i.addEventListener("focus", () => {
    if (!x.ds[dir]) dir = dir == "H" ? "V" : "H";
    i.select();
  });
  i.addEventListener("input", () => {
    i.value = i.value.toUpperCase().replace(/[^A-Z]/g, "").slice(-1);
    if (i.value) foco(prox(x, ...D[x.ds[dir] ? dir : (dir == "H" ? "V" : "H")]));
  });
  i.addEventListener("keydown", e => {
    const m = { ArrowRight: ["H", 0, 1], ArrowLeft: ["H", 0, -1], ArrowDown: ["V", 1, 0], ArrowUp: ["V", -1, 0] }[e.key];
    if (m) {
      e.preventDefault();
      dir = m[0];
      foco(prox(x, m[1], m[2]));
    } else if (e.key == "Backspace" && !i.value) {
      e.preventDefault();
      foco(prox(x, -D[dir][0], -D[dir][1]));
    }
  });
});

// pistas numeradas, separadas em horizontais e verticais
const listas = { H: document.getElementById("horizontais"), V: document.getElementById("verticais") };
[...ws].sort((a, b) => a.n - b.n).forEach(w => {
  const li = document.createElement("li");
  li.value = w.n;
  li.textContent = w.t + " (" + w.a.length + ")";
  listas[w.d].append(li);
  w.li = li;
});

const placar = document.getElementById("placar");
const mostrar = ok => placar.textContent = ok + " de " + ws.length + " palavras";
mostrar(0);

document.getElementById("conferir").onclick = () => {
  let ok = 0;
  casas.forEach(x => x.el.classList.remove("certa", "errada"));
  ws.forEach(w => {
    const certa = w.cels.every(x => x.i.value == x.l);
    w.li.className = certa ? "certa" : "errada";
    w.certa = certa;
    if (certa) ok++;
    else w.cels.forEach(x => { if (x.i.value) x.el.classList.add("errada"); });
  });
  ws.filter(w => w.certa).forEach(w => w.cels.forEach(x => {
    x.el.classList.remove("errada");
    x.el.classList.add("certa");
  }));
  mostrar(ok);
};

document.getElementById("reiniciar").onclick = () => {
  casas.forEach(x => { x.i.value = ""; x.el.classList.remove("certa", "errada"); });
  ws.forEach(w => w.li.className = "");
  mostrar(0);
  foco(casas[0]);
};
