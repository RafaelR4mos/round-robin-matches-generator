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
  document.querySelectorAll("#team-names-container .teams-selector").forEach((teamsSelector) => {
    selectedData.push(teamsSelector.getAttribute('data-selected-value'));
  });

  matches(parseInt(numberOfTeams), selectedData);

  let count = 1;
  document.querySelectorAll(".matches").forEach((match) => {
    const filteredArr = match.querySelector("span");
    if (filteredArr.innerText == "") {
      match.style.display = "none";
    } else {
      match.setAttribute("data-match-id", count);
      count++;
    }
  });

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
      const logoImage = span.parentElement.querySelector(
        "." + span.className + "-img"
      );
      const teamName = span.innerText.split(' ')[1] ? span.innerText.split(' ')[0] : span.innerText;
      const teamItem = teamsData.find(
        (team) => teamName === team.shortName
      );
      const imgName = teamItem ? teamItem.icon : "default";
      logoImage && logoImage.setAttribute("src", "images/" + imgName + ".png");
    }
  });
}
function createSelect() {
  const selectTeamsName = document.createElement("div");
        selectTeamsName.classList.add('teams-selector');

  const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');
  const label = document.createElement("span");
        label.innerText = "Selecione";
  const labelImg = document.createElement("img");
        labelImg.style.display = 'none';

  label.addEventListener('click', (event) => {
    toggleSelectOpen(event.currentTarget.parentElement.parentElement.querySelector('.options-container'));
  });

  headerContainer.appendChild(labelImg);
  headerContainer.appendChild(label);
  selectTeamsName.appendChild(headerContainer);

  const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');

  selectTeamsName.appendChild(optionsContainer);
  teamsData.forEach((team) => {
    el = document.createElement("div");
    el.classList.add('teams-selector-item');
    const logoImage = document.createElement('img');
    const teamName = team.shortName.split(' ')[1] ? team.shortName.split(' ')[0] : team.shortName;
    const teamItem = teamsData.find(
      (teamData) => teamData.shortName === teamName
    );
    const imgName = teamItem ? teamItem.icon : "default";
    logoImage && logoImage.setAttribute("src", "images/" + imgName + ".png");

    const label = document.createElement('span');
    el.setAttribute('data-value', team.shortName);
    label.innerText = team.shortName;
    el.appendChild(logoImage);
    el.appendChild(label);
    el.addEventListener('click', (event) => {
      const dataValue = event.currentTarget.getAttribute('data-value');
      event.currentTarget.parentElement.parentElement.setAttribute('data-selected-value', dataValue);
      event.currentTarget.parentElement.parentElement.querySelector('span').innerText = dataValue;
      const topImage = event.currentTarget.parentElement.parentElement.querySelector('img');
      topImage.setAttribute('src', event.currentTarget.querySelector('img').getAttribute('src'));
      topImage.style.display = 'block';
      toggleSelectOpen(event.currentTarget.parentElement.parentElement.querySelector('.options-container'));
      updateTeamsOnSelects(event.currentTarget.parentElement.parentElement);
    });

    selectTeamsName.querySelector('.options-container').appendChild(el);
  });
  document.querySelector(".teams-select").appendChild(selectTeamsName);
}

function updateTeamsOnSelects(selectUpdated) {
  const selectedTeam = selectUpdated.getAttribute('data-selected-value');
  selectUpdated.parentElement.querySelectorAll('.teams-selector').forEach((teamSelector) => {
    if(teamSelector !== selectUpdated) {
      if (!teamSelector.getAttribute('data-selected-value') || teamSelector.getAttribute('data-selected-value') !== selectedTeam) {
        const teamToUpdate = teamSelector.querySelector('.teams-selector-item[data-value="'+ selectedTeam +'"]');
        if (teamToUpdate) {
          const newTeamName = (selectedTeam.split(' ')[1]) ? selectedTeam.split(' ')[0] + ' ' + parseInt(parseInt(selectedTeam.split(' ')[1]) + 1) : selectedTeam + ' ' + 2;
          teamToUpdate.setAttribute('data-value', newTeamName);
          teamToUpdate.querySelector('span').innerText = newTeamName;
        }
      }
    }
  });
}

function toggleSelectOpen(selectContainer) {
  if (selectContainer.classList.contains('open')) {
    selectContainer.classList.remove('open');
  } else {
    selectContainer.classList.add('open');
  }
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
          teamName: scoreRow.querySelector("span.first").innerText,
          teamScore: score.value,
        };
      } else if (score.classList.contains("second")) {
        data.second = {
          teamName: scoreRow.querySelector("span.second").innerText,
          teamScore: score.value,
        };
      }
    }
  });

  if (bothFilled) {
    data.matchId = scoreRow.getAttribute("data-match-id");
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

  drawScoreTable();
}
function drawScoreTable() {
  const containerScores = document.querySelector(".container-qualify");
  const scoreRow = document.querySelector(".qualify-row");
  containerScores.innerHTML = "";
  scoreData.forEach((score, index) => {
    const newRow = scoreRow.cloneNode(true);
    newRow.querySelector(".position").innerText = index + 1;
    newRow.querySelector(".team-name").innerText = score.team;
    newRow.querySelector(".points").innerText = score.points;
    newRow.querySelector(".matches-played").innerText = score.matches;
    newRow.querySelector(".wins").innerText = score.wins;
    newRow.querySelector(".draws").innerText = score.draws;
    newRow.querySelector(".defeats").innerText = score.defeats;
    newRow.querySelector(".goals-diff").innerText = score.goalsDiff;
    newRow.style.display = "flex";
    containerScores.appendChild(newRow);
  });
}
