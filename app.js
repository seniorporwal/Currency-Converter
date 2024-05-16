const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

let dropdown = document.querySelectorAll(".dropdown select");
let button = document.querySelector("button");

window.addEventListener("load", () => {
  updateExchangeRate();
});

dropdown.forEach((select) => {
  for (let currCode in countryList) {
    const option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;
    // console.log(option);
    select.append(option);
    if (currCode === "USD" && select.name === "from") {
      option.selected = true;
    } else if (currCode === "INR" && select.name === "to") {
      option.selected = true;
    }
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});

function updateFlag(element) {
  //   console.log(select.value);
  //   console.log(countryList[select.value]);

  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  console.log(img.src);

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  img.src = newSrc;
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  const input = document.querySelector(".amount input");
  let amount = input.value;
  if (amount < 1 || amount === "") {
    amount = 1;
    input.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amount * rate;
  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
