const side = 7;
const squares = side * side;
const indexes = Array.from({length: squares}, (e, i) => i);
const cells = Array(side);

const padNumber = i => i.padStart(2, 0);
const lottery2hash = lottery => lottery.map(n => padNumber(n.toString())).join("-");
const hash2lottery = hash => {
  const numbers = hash.slice(1).split("-");
  if(numbers.length != squares)
    return null;
  const parsed = numbers.map(x => Number.parseInt(x));
  if(parsed.some(x => x < 0 || x >= squares))
    return null;
  const sorted = Array.from(parsed).sort((a,b) => a - b);
  if(sorted.some((e,i) => e != i))
    return null;
  return parsed;
};

const roll = () => {
  const lottery = shuffle(Array.from(indexes));
  location.hash = lottery2hash(lottery);
  return lottery;
};

function newCard(lottery) {
  lottery.forEach((e,i) => cells[i].node.style.order = e);
}

function main() {
  document.body.style.margin = "0px";

  const root = document.getElementById("root");
  root.setAttribute("style", "padding:20px; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; font-size:calc(min(16px, 1.5vw, 1.5vh)); gap:10px");

  const card = document.createElement("div");
  card.setAttribute("style", "display:flex; flex-direction:column; justify-content:start; align-items:center");

  const grid = document.createElement("div");
  grid.setAttribute("style", "width:calc(min(95vw, 95vh)); max-width:1067px; display:grid; grid-template-columns:repeat(" + side.toString() + ", minmax(0, 1fr)); text-align:center;");
  for(let i = 0; i < side*side; i++) {
    const cell = grid.appendChild(document.createElement("div"));
    cells[i] = { node: cell, checked: false }; ;
    cell.setAttribute("style", "aspect-ratio:1; display:flex; justify-content:center; align-items:center; border:solid black 1px; cursor:pointer;");
    cell.addEventListener("click", () => {
      cells[i].checked ^= true;
      cell.style.background = cells[i].checked ? "url(orange.jpg) center center / cover" : "";
    });

    cell.append(bingo[i]);
  }

  card.appendChild(grid);

  const intro = document.createElement("div");
  intro.setAttribute("style", "padding:20px; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; font-size: 1.5em");
  intro.appendChild(document.createElement("div")).append("What better way to laugh at someone who bankrupts casinos?");
  intro.appendChild(document.createElement("div")).append("Join us for bingo night September 10 as Humpty Trumpty puts on his freak show once again");

  const rules = document.createElement("ul");
  rules.setAttribute("style", "list-style: disc");
  rules.appendChild(document.createElement("li")).append("Roll the dice until you're happy with the card");
  rules.appendChild(document.createElement("li")).append("Share your starting card by copying the URL");
  rules.appendChild(document.createElement("li")).append("Click a square to (un)mark it");
  rules.appendChild(document.createElement("li")).append("Bring popcorn and everyone you know");

  const dice = document.createElement("img");
  dice.setAttribute("src", "dice.jpg");
  dice.setAttribute("style", "width: 150px; cursor: pointer");
  dice.addEventListener("click", () => newCard(roll()));

  const howToPlay = document.createElement("div");
  howToPlay.setAttribute("style", "display:flex; flex-direction:row; justify-content:space-evenly; align-items:center; gap:100px");
  howToPlay.appendChild(dice);
  howToPlay.appendChild(rules);

  newCard(hash2lottery(location.hash) || roll());

  root.appendChild(intro);
  root.appendChild(howToPlay);
  root.appendChild(card);
}

// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

const bingo = [
   "LIFE ACCORDION TO TRUMP",
   "CAESAR WORD SALAD BUFFET",
   "I'M NOT WEIRD",
   "THE LATE GREAT HANNIBAL LECTER",
   "THE BEST AND MOST SERIOUS PEOPLE",
   "ELON MUSK SIMPING",
   "RFK'S CONSPIRACY THEORY",
   "THAT GUY IS SO STRAIGHT, JD IS SO",
   "JD VANCE DID NOT HAVE SEXUAL RELATIONS WITH THAT COUCH",
   "I DIDN'T HAVE SEX WITH A PORN STAR",
   "I KNOW NOTHING ABOUT PROJECT 2025. ANYTHING THEY DO, I WISH THEM LUCK",
   "PRESIDENTIAL IMMUNITY",
   "JAN 6 PATRIOT HOSTAGES",
   "DERANGED JACK SMITH",
   "WEAPONIZED DEPARTMENT OF JUSTICE",
   "WITCH HUNT",
   "PERSECUTION OF A POLITICAL OPPONENT",
   "DEEP STATE",
   "FAKE NEWS",
   "FAKE CROWDS",
   "ELECTION INTERFERENCE 2020 EDITION",
   "ELECTION INTERFERENCE 2024 EDITION",
   "GO ON AND ON ABOUT BIDEN LIKE A CLINGY DUMPED STALKER EX",
   "REIMBURSEMENT FOR DNC COUP FRAUD",
   "BIDENFLATION",
   "LAPTOP FROM HELL",
   "TAMPON TIM",
   "ALLUCINATE ABOUT HELICOPTER RIDE",
   "GET CONFUSED ABOUT MIXED RACE",
   "SHE'S A CHAMELEON",
   "FLIP-FLOP ON REPRODUCTIVE RIGHTS",
   "RED SCARE",
   "BORDER CZAR",
   "WE HAVE A BORDER THAT IS THE MOST DANGEROUS PLACE ANYWHERE IN THE WORLD",
   "FOREIGN CRIMINALS FROM MENTAL INSTITUTIONS AND INSANE ASYLUMS",
   "THEY'RE TAKING BLACK JOBS AND HISPANIC JOBS",
   "POISONING THE BLOOD OF OUR COUNTRY",
   "FAILING NATION",
   "WORLD WAR III",
   "ONLY I CAN SAVE AMERICA",
   "BITCOIN MADE IN THE USA",
   "MAGA",
   "FIGHT FIGHT FIGHT",
   "BEST PRESIDENT FOR THE BLACK POPULATION SINCE ABRAHAM LINCOLN",
   "FRANKLY, I HAVE DONE MORE FOR ISRAEL THAN ANY PERSON, AND IT'S NOT EVEN CLOSE",
   "AGE IS JUST A NUMBER",
   "RANT ABOUT ELECTRIC ENERGY, VEHICLES, BATTERIES OR SHARKS",
   "MANY PEOPLE ARE SAYING IT",
   "THEY CALLED ME, I DIDN'T CALL THEM",
];
