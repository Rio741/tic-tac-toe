let fields = ["cross", null, null, "circle", null, null, null, null, null];

function init() {
  render();
}

function render() {
  let contentDiv = document.getElementById("content");

  //Generate table HTML
  let tableHtml = "<table>"; //table tag auf
  for (let i = 0; i < 3; i++) {
    //generiert die 3 Zeilen
    tableHtml += "<tr>";
    for (let j = 0; j < 3; j++) {
      //generiert in den Zeilen die 3 Felder
      const index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        //bei O
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        //bei X
        symbol = generateCrossSVG();
      }
      tableHtml += `<td>${symbol}</td>`; //fugt symbol hinzu
    }
    tableHtml += "</tr>"; //schliesst tr tag
  }

  tableHtml += "</table>"; //table tag zu

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
