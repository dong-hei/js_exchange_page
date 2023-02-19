let currencyRatio ={
    KRW:{
        KRW:1,
        USD:0.00077,
        JPY:0.10,
        CNY:0.0053,
        EUR:0.00072,
        unit:"원",
        img: "https://cdn.countryflags.com/thumbs/south-korea/flag-square-250.png",
    },
    USD:{
        KRW:1300,
        USD:1,
        JPY:134.1,
        CNY:6.87,
        EUR:0.93,
        unit:"달러",
        img: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png",
    },
    JPY:{
        KRW:9.66,
        USD:0.0075,
        JPY:1,
        CNY:0.051,
        EUR:0.0070,
        unit:"엔",
        img:"https://cdn.countryflags.com/thumbs/japan/flag-square-250.png",
    },
    CNY:{   
        KRW:188.69,
        USD:0.15,
        JPY:1,
        CNY:1,
        EUR:0.14,
        unit:"위안",
        img:"https://cdn.countryflags.com/thumbs/china/flag-square-250.png",
    },
    EUR:{
        KRW:1388.69,
        USD:1.07,
        JPY:143.83,
        CNY:7.36,
        EUR:1,
        unit:"유로",
        img:"https://cdn.countryflags.com/thumbs/europe/flag-square-250.png",
    }
};
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-btn");
let fromButton = document.getElementById("from-btn");
let toCurrency = "USD";
let fromCurrency = "KRW";

document.querySelectorAll("#from-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    fromCurrency = this.id;
    fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert("from");
  });
});

document.querySelectorAll("#to-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    toCurrency = this.id;
    toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert("from");
  });
});

function convert(type) {
  console.log("here");
  let amount = 0;
  if (type == "from") {
    //입력값
    amount = document.getElementById("from-input").value;
    // 환전
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    // 환전한값
    document.getElementById("to-input").value = convertedAmount;
    //환전한값 한국어로
    renderKoreanNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("from-input").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}
function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}
function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}