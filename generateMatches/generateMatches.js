const generateBtn = document.querySelector("#generate-btn");
const numberTeamsBtn = document.querySelector("#number-teams-btn");

const numberTeamsInput = document.querySelector("#number-teams");
const teamNamesContainer = document.querySelector(".team-names");
const matchesTable = document.querySelector("#matches-table");
const matchesTableContainer = document.querySelector(
  ".matches-table-container"
);

const sixthTeamNameInput = document.querySelector("#team-six");
const sixthTeamNameLabel = document.querySelector("#team-six-label");

const fifthTeamNameInput = document.querySelector("#team-five");
const fifthTeamNameLabel = document.querySelector("#team-five-label");

const fourthTeamNameInput = document.querySelector("#team-four");
const fourthTeamNameLabel = document.querySelector("#team-four-label");

const thirdTeamNameInput = document.querySelector("#team-three");
const thirdTeamNameLabel = document.querySelector("#team-three-label");

const secondTeamNameInput = document.querySelector("#team-second");
const secondTeamNameLabel = document.querySelector("#team-second-label");

const firstTeamNameInput = document.querySelector("#team-first");
const firstTeamNameLabel = document.querySelector("#team-first-label");

var numberOfTeams;
var numberOfTeamsActuallyTyped;

let teamsData;
const matchesData = [];
let scoreData = [];
let teamsParticipating;

numberTeamsBtn.addEventListener("click", () => {
  window.location.href = "#team-names-container";
  numberOfTeams = numberTeamsInput.value;
  teamNamesContainer.style.display = "flex";

  for (let i = 1; i <= numberOfTeams; i++) {
    createSelect(i);
  }

  if (numberOfTeams > 2 && numberOfTeams < 7) {
    generateBtn.style.display = "block";
  }

  // window.history.pushState({}, document.title, "/" + "index.html");
});

generateBtn.addEventListener("click", () => {
  createTable();
  window.location.href = "#matches-container";
  loadIcons();
  //window.history.pushState({}, document.title, "/" + "index.html");
});

document.querySelectorAll(".score").forEach((score) => {
  score.addEventListener("blur", () => {
    if (score.value != "") {
      score.style.opacity = "100%";
    } else {
      score.style.opacity = "20%";
    }
  });
});

const DUMMY = -1;
// returns an array of round representations (array of player pairs).
// http://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function matches(n, ps) {
  teamsParticipating = ps;
  ps = shuffle(ps);
  // n = num players
  const rs = []; // rs = round array
  if (!ps) {
    ps = [];
    for (let k = 1; k <= n; k += 1) {
      ps.push(k);
    }
  } else {
    ps = ps.slice();
  }

  if (n % 2 === 1) {
    ps.push(DUMMY); // so we can match algorithm for even numbers
    n += 1;
  }
  for (let j = 0; j < n - 1; j += 1) {
    rs[j] = []; // create inner match array for round j
    for (let i = 0; i < n / 2; i += 1) {
      const o = n - 1 - i;
      if (ps[i] !== DUMMY && ps[o] !== DUMMY) {
        // flip orders to ensure everyone gets roughly n/2 home matches
        const isHome = i === 0 && j % 2 === 1;
        // insert pair as a match - [ away, home ]
        rs[j].push([isHome ? ps[o] : ps[i], isHome ? ps[i] : ps[o]]);
      }
    }
    ps.splice(1, 0, ps.pop()); // permutate for next round
  }

  rs[0] && rs[0][0] && rs[0][0][0]
    ? (document.querySelector("#one-team-one").innerText = rs[0][0][0])
    : null;
  rs[0] && rs[0][0] && rs[0][0][1]
    ? (document.querySelector("#one-team-two").innerText = rs[0][0][1])
    : null;

  rs[0] && rs[0][1] && rs[0][1][0]
    ? (document.querySelector("#two-team-one").innerText = rs[0][1][0])
    : null;
  rs[0] && rs[0][1] && rs[0][1][1]
    ? (document.querySelector("#two-team-two").innerText = rs[0][1][1])
    : null;

  rs[0] && rs[0][2] && rs[0][2][0]
    ? (document.querySelector("#three-team-one").innerText = rs[0][2][0])
    : null;
  rs[0] && rs[0][2] && rs[0][2][1]
    ? (document.querySelector("#three-team-two").innerText = rs[0][2][1])
    : null;

  rs[1] && rs[1][0] && rs[1][0][0]
    ? (document.querySelector("#four-team-one").innerText = rs[1][0][0])
    : null;
  rs[1] && rs[1][0] && rs[1][0][1]
    ? (document.querySelector("#four-team-two").innerText = rs[1][0][1])
    : null;

  rs[1] && rs[1][1] && rs[1][1][0]
    ? (document.querySelector("#five-team-one").innerText = rs[1][1][0])
    : null;
  rs[1] && rs[1][1] && rs[1][1][1]
    ? (document.querySelector("#five-team-two").innerText = rs[1][1][1])
    : null;

  rs[1] && rs[1][2] && rs[1][2][0]
    ? (document.querySelector("#six-team-one").innerText = rs[1][2][0])
    : null;
  rs[1] && rs[1][2] && rs[1][2][1]
    ? (document.querySelector("#six-team-two").innerText = rs[1][2][1])
    : null;

  rs[2] && rs[2][0] && rs[2][0][0]
    ? (document.querySelector("#seven-team-one").innerText = rs[2][0][0])
    : null;
  rs[2] && rs[2][0] && rs[2][0][1]
    ? (document.querySelector("#seven-team-two").innerText = rs[2][0][1])
    : null;

  rs[2] && rs[2][1] && rs[2][1][0]
    ? (document.querySelector("#eight-team-one").innerText = rs[2][1][0])
    : null;
  rs[2] && rs[2][1] && rs[2][1][1]
    ? (document.querySelector("#eight-team-two").innerText = rs[2][1][1])
    : null;

  rs[2] && rs[2][2] && rs[2][2][0]
    ? (document.querySelector("#nine-team-one").innerText = rs[2][2][0])
    : null;
  rs[2] && rs[2][2] && rs[2][2][1]
    ? (document.querySelector("#nine-team-two").innerText = rs[2][2][1])
    : null;

  rs[3] && rs[3][0] && rs[3][0][0]
    ? (document.querySelector("#ten-team-one").innerText = rs[3][0][0])
    : null;
  rs[3] && rs[3][0] && rs[3][0][1]
    ? (document.querySelector("#ten-team-two").innerText = rs[3][0][1])
    : null;

  rs[3] && rs[3][1] && rs[3][1][0]
    ? (document.querySelector("#eleven-team-one").innerText = rs[3][1][0])
    : null;
  rs[3] && rs[3][1] && rs[3][1][1]
    ? (document.querySelector("#eleven-team-two").innerText = rs[3][1][1])
    : null;

  rs[3] && rs[3][2] && rs[3][2][0]
    ? (document.querySelector("#twelve-team-one").innerText = rs[3][2][0])
    : null;
  rs[3] && rs[3][2] && rs[3][2][1]
    ? (document.querySelector("#twelve-team-two").innerText = rs[3][2][1])
    : null;

  rs[4] && rs[4][0] && rs[4][0][0]
    ? (document.querySelector("#thirteen-team-one").innerText = rs[4][0][0])
    : null;
  rs[4] && rs[4][0] && rs[4][0][1]
    ? (document.querySelector("#thirteen-team-two").innerText = rs[4][0][1])
    : null;

  rs[4] && rs[4][1] && rs[4][1][0]
    ? (document.querySelector("#fourteen-team-one").innerText = rs[4][1][0])
    : null;
  rs[4] && rs[4][1] && rs[4][1][1]
    ? (document.querySelector("#fourteen-team-two").innerText = rs[4][1][1])
    : null;

  rs[4] && rs[4][2] && rs[4][2][0]
    ? (document.querySelector("#fifteen-team-one").innerText = rs[4][2][0])
    : null;
  rs[4] && rs[4][2] && rs[4][2][1]
    ? (document.querySelector("#fifteen-team-two").innerText = rs[4][2][1])
    : null;

  return rs;
}

function createTable() {
  const selectedData = [];
  document.querySelectorAll(".teams-select>select").forEach((select) => {
    selectedData.push(select.value);
    console.log(selectedData);
  });

  matches(parseInt(numberOfTeams), selectedData);

  let count = 1;
  document.querySelectorAll(".matches").forEach((match) => {
    const filteredArr = match.querySelector("span");
    if (filteredArr.innerText == "") {
      match.style.display = "none";
    }
  });

  console.log(selectedData);
  matchesTable.style.display = "flex";
  matchesTableContainer.style.display = "flex";
}

window.onload = () => {
  configScoreListeners();
  fetch("./database.json")
    .then((response) => response.json())
    .then((json) => {
      teamsData = json.teams;
    });
};

function loadIcons() {
  const matchesQueries = new Set([
    ...document.querySelector("#matches-table").querySelectorAll(".first"),
    ...document.querySelector("#matches-table").querySelectorAll(".second"),
  ]);

  matchesQueries.forEach((span) => {
    if (
      span.classList.length === 1 &&
      span.parentElement.style.display != "none"
    ) {
      console.log("Span: ", span);
      const logoImage = span.parentElement.querySelector(
        "." + span.className + "-img"
      );
      console.log("Logo img: ", logoImage);
      const teamItem = teamsData.find(
        (team) => span.innerText === team.shortName
      );
      const imgName = teamItem ? teamItem.icon : "default";
      console.log(imgName);
      logoImage && logoImage.setAttribute("src", "images/" + imgName + ".png");
    }
  });
}
function createSelect(index) {
  const selectTeamsName = document.createElement("select");
  var label = document.createElement("label");
  label.innerText = "time" + index;
  document.querySelector(".teams-select").appendChild(label);
  var el = document.createElement("option");
  el.textContent = "Times";
  el.value = 0;
  selectTeamsName.appendChild(el);
  document.querySelector(".teams-select").appendChild(selectTeamsName);

  teamsData.forEach((team) => {
    el = document.createElement("option");
    el.textContent = team.shortName;
    el.value = team.shortName;
    selectTeamsName.appendChild(el);
    document.querySelector(".teams-select").appendChild(selectTeamsName);
  });
}

function configScoreListeners() {
  document.querySelectorAll(".score").forEach((score) => {
    score.addEventListener("input", (event) => {
      validateScore(event.currentTarget);
    });
  });
}

function validateScore(element) {
  const scoreRow = element.parentElement.parentElement;
  let bothFilled = true;
  const data = {};

  scoreRow.querySelectorAll(".score").forEach((score) => {
    if (score.value === "") {
      bothFilled = false;
    } else {
      if (score.classList.contains("first")) {
        data.first = {
          teamName: scoreRow.querySelector("td.first").innerText,
          teamScore: score.value,
        };
      } else if (score.classList.contains("second")) {
        data.second = {
          teamName: scoreRow.querySelector("td.second").innerText,
          teamScore: score.value,
        };
      }
    }
  });

  if (bothFilled) {
    data.matchId = scoreRow.querySelector("td").innerText;
    updateMainScore(data);
  }
}

function updateMainScore(data) {
  const matchIndex = matchesData.findIndex(
    (match) => match.matchId === data.matchId
  );
  if (matchIndex === -1) {
    matchesData.push(data);
  } else {
    matchesData[matchIndex] = data;
  }

  proccessData();
}

function proccessData() {
  scoreData = [];
  teamsParticipating.forEach((team) => {
    const teamMatches = matchesData.filter(
      (match) => match.first.teamName === team || match.second.teamName === team
    );
    let points = 0;
    const matches = teamMatches.length;
    let wins = 0;
    let draws = 0;
    let defeats = 0;
    let goalsDiff = 0;
    teamMatches.forEach((match) => {
      // WIN, DRAW, LOSE
      if (
        (match.first.teamScore > match.second.teamScore &&
          match.first.teamName === team) ||
        (match.first.teamScore < match.second.teamScore &&
          match.second.teamName === team)
      ) {
        wins++;
        points += 3;
        goalsDiff += Math.abs(match.first.teamScore - match.second.teamScore);
      } else if (match.first.teamScore === match.second.teamScore) {
        draws++;
        points++;
      } else {
        defeats++;
        goalsDiff -= Math.abs(match.first.teamScore - match.second.teamScore);
      }
    });

    scoreData.push({
      team: team,
      points: points,
      matches: matches,
      wins: wins,
      draws: draws,
      defeats: defeats,
      goalsDiff: goalsDiff,
    });
  });

  scoreData = scoreData.sort(function (score1, score2) {
    // sort by points
    if (score1.points > score2.points) return -1;
    if (score1.points < score2.points) return 1;

    // sort by goals difference
    if (score1.goalsDiff > score2.goalsDiff) return -1;
    if (score1.goalsDiff < score2.goalsDiff) return 1;

    return 0;
  });

  console.log("DATA", scoreData);
}
function drawScoreTable() {}
