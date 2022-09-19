function Deal(vendor, details, totalExpenses) {
  this.vendor = vendor;
  this.details = details;
  this.totalExpenses = totalExpenses;
}

function Team(teamName, vendor, details, totalExpenses) {
  this.teamName = teamName;
  this.deal = new Deal(vendor, details, totalExpenses);
}

const handleAddExpense = () => {
  const teamName = document.getElementById("teamName").value;
  const vendor = document.getElementById("vendor").value;
  const details = document.getElementById("details").value;
  const totalExpenses = document.getElementById("totalExpenses").value;
  let team = new Team(teamName, vendor, details, totalExpenses);

  if (localStorage.getItem("totalTeam") == undefined) {
    localStorage.setItem("totalTeam", 1);
    totalTeams = 1;
  } else {
    var totalTeams = Number(localStorage.getItem("totalTeam")) + 1;
    localStorage.setItem("totalTeam", totalTeams);
  }

  var teamVar = "Team" + totalTeams.toString();
  localStorage.setItem(teamVar, JSON.stringify(team));
};

function handleViewExpense() {
  if (Number(localStorage.getItem("totalTeam")) > 0) {
    const noData = document.getElementById("noData");
    noData.remove(); // to remove <p> created to show no data message

    const tbl = document.createElement("table");
    let thead = document.createElement("thead");
    let row1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.innerHTML = "Team Name";
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "Vendor Name";
    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Deal Details";
    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Total Expenses involved in Deal";

    row1.appendChild(heading_1);
    row1.appendChild(heading_2);
    row1.appendChild(heading_3);
    row1.appendChild(heading_4);
    thead.appendChild(row1);
    tbl.appendChild(thead);

    const tblBody = document.createElement("tbody");

    for (let i = 1; i <= Number(localStorage.getItem("totalTeam")); i++) {
      const row = document.createElement("tr");
      Team_i = JSON.parse(localStorage.getItem("Team" + i));

      const arr = [
        Team_i.teamName,
        Team_i.deal.vendor,
        Team_i.deal.details,
        Team_i.deal.totalExpenses,
      ];

      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(arr[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "1");
    tbl.setAttribute("table-layout", "fixed");
    tbl.setAttribute("align", "center");
  } else {
    document.getElementById("noData").innerHTML = "No data found !";
  }
}
