let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let gameEnded = false; // Flag, um das Spielende zu verfolgen

function render() {
  let contentDiv = document.getElementById("content");
  //Generate table HTML
  let tableHtml = "<table>";
  for (let i = 0; i < 3; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        symbol = generateCrossSVG();
      }
      tableHtml += `<td onclick='handleClick(this,${index})'>${symbol}</td>`; //fugt symbol hinzu
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";
  //Set table HTML to contentDiv
  contentDiv.innerHTML = tableHtml;
}

function generateCircleSVG() {
  let svgHTML = `
  <svg viewBox="0 0 100 100">
    <path d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
  </svg>
`;
  return svgHTML;
}

function generateCrossSVG() {
  let svgHTML = `
  <svg viewBox="0 0 100 100">
    <line x1="20" y1="20" x2="80" y2="80" />
    <line x1="20" y1="80" x2="80" y2="20" />
  </svg>`;
  return svgHTML;
}

function handleClick(cell, index) {
  if (!gameEnded && fields[index] === null) {
    fields[index] = currentPlayer;
    cell.innerHTML =
      currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    if (checkWin()) {
      gameEnded = true;
      alert("Spiel beendet! Spieler " + currentPlayer + " hat gewonnen!");
    }
  }
}

function checkWin() {
  // Mögliche Gewinnkombinationen
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontale Reihen
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertikale Reihen
    [0, 4, 8],
    [2, 4, 6], // diagonale Reihen
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      fields[a] !== null &&
      fields[a] === fields[b] &&
      fields[a] === fields[c]
    ) {
      // Wenn drei Symbole in einer Reihe sind, markiere diese
      markWinningCombo(a, b, c);
      return true;
    }
  }
  return false;
}

function markWinningCombo(index1, index2, index3) {
  const cells = document.getElementsByTagName("td");
  cells[index1].style.setProperty("background-color", "grey");
  cells[index2].style.setProperty("background-color", "grey");
  cells[index3].style.setProperty("background-color", "grey");
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  gameEnded = false;
  render();
  // Reset onclick attributes for all cells
  const cells = document.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function () {
      handleClick(this, i);
    };
  }
}
