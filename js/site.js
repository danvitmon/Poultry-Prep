const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const mealTableBody = document.getElementById("mealTable");
const mealTableHeader = document.getElementById("mealTableHeader");

const staticMeals = [
  {
    id: null,
    date: "2023-01-02",
    name: "Pancakes and bacon",
    type: "Breakfast",
    calories: 500,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-02",
    name: "Burrito",
    type: "Lunch",
    calories: 600,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-02",
    name: "Steak and potatoes",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-03",
    name: "Bacon McMuffin",
    type: "Breakfast",
    calories: 500,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-03",
    name: "Donair",
    type: "Lunch",
    calories: 600,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-03",
    name: "Rice and chicken",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-04",
    name: "French toast",
    type: "Breakfast",
    calories: 500,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-04",
    name: "BLT",
    type: "Lunch",
    calories: 600,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-04",
    name: "Lamb curry",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-05",
    name: "Eggs and toast",
    type: "Breakfast",
    calories: 500,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-05",
    name: "Soup and sandwich",
    type: "Lunch",
    calories: 600,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-05",
    name: "Chicken and salad",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-06",
    name: "Pancakes and bacon",
    type: "Breakfast",
    calories: 500,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-06",
    name: "Burrito",
    type: "Lunch",
    calories: 600,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-06",
    name: "Steak and potatoes",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-07",
    name: "Bacon McMuffin",
    type: "Breakfast",
    calories: 500,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-07",
    name: "Donair",
    type: "Lunch",
    calories: 600,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-01-07",
    name: "Rice and chicken",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
  {
    id: null,
    date: "2023-02-07",
    name: "Rice and chicken",
    type: "Dinner",
    calories: 900,
    protein: 40,
    fiber: 10,
    weight: 500,
    water: 0.5,
  },
];

function getValues() {
  let data = localStorage.getItem("jgMealZealMeals");
  if (data == null) {
    document.getElementById("titleText").innerText = "Welcome!";
  } else {
    document.getElementById("titleText").innerText = "Welcome Back!";
  }
  displayAllMeals();
  calculateAndSetDailyCards();
}

function getAllMeals() {
  let data = localStorage.getItem("jgMealZealMeals");

  if (data == null) {
    let exampleMeals = staticMeals.map((meal) => {
      meal.id = generateId();
      return meal;
    });
    localStorage.setItem("jgMealZealMeals", JSON.stringify(exampleMeals));
    data = localStorage.getItem("jgMealZealMeals");
  }

  let allMeals = JSON.parse(data);

  if (
    allMeals.some((meal) => meal.id == null) ||
    allMeals.some((meal) => meal.id == undefined)
  ) {
    allMeals.forEach((meal) => (meal.id = generateId()));
    localStorage.setItem("jgMealZealMeals", JSON.stringify(allMeals));
  }

  allMeals = allMeals.sort((meal1, meal2) =>
    Number(new Date(meal1.date) - new Date(meal2.date))
  );
  return allMeals;
}

function addMeal() {
  try {
    let mealDate = new Date(
      document.getElementById("newMealDate").value + "T00:00"
    )
      .toISOString()
      .split("T")[0];
    let mealName = document.getElementById("newMealName").value;
    let mealType = document.getElementById("newMealType").value;
    let mealCalories = parseInt(
      document.getElementById("newMealCalories").value
    );
    let mealProtein = parseInt(document.getElementById("newMealProtein").value);
    let mealFiber = parseInt(document.getElementById("newMealFiber").value);
    let mealWater = parseInt(document.getElementById("newMealWater").value);

    if (
      mealCalories < 0 ||
      isNaN(mealCalories) ||
      mealProtein < 0 ||
      isNaN(mealProtein) ||
      mealFiber < 0 ||
      isNaN(mealFiber) ||
      mealWater < 0 ||
      isNaN(mealWater) ||
      !mealType
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter valid inputs.",
        heightAuto: false,
      });
    } else {
      let newMeal = {
        id: generateId(),
        date: mealDate,
        name: mealName,
        type: mealType,
        calories: mealCalories,
        protein: mealProtein,
        fiber: mealFiber,
        water: mealWater,
      };

      let allMeals = getAllMeals();
      allMeals.push(newMeal);
      localStorage.setItem("jgMealZealMeals", JSON.stringify(allMeals));

      getValues();
      document.getElementById("newMealForm").reset();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please enter valid inputs.",
      heightAuto: false,
    });
  }
}

function deleteMeal() {
  let mealId = document.getElementById("editMealId").value;

  let allMeals = getAllMeals();

  let filteredMeals = allMeals.filter((meal) => meal.id != mealId);

  localStorage.setItem("jgMealZealMeals", JSON.stringify(filteredMeals));

  getValues();
}

function editMeal(mealRow) {
  let mealId = mealRow.getAttribute("data-identifier");

  let allMeals = getAllMeals();

  let mealToEdit = allMeals.find((mealObject) => mealObject.id == mealId);

  document.getElementById("editMealId").value = mealToEdit.id;
  document.getElementById("editMealName").value = mealToEdit.name;
  document.getElementById("editMealType").value = mealToEdit.type;
  document.getElementById("editMealCalories").value = mealToEdit.calories;
  document.getElementById("editMealProtein").value = mealToEdit.protein;
  document.getElementById("editMealFiber").value = mealToEdit.fiber;
  document.getElementById("editMealWater").value = mealToEdit.water;

  let mealDate = new Date(mealToEdit.date);
  let mealDateString = mealDate.toISOString();
  let formattedDate = mealDateString.split("T")[0];
  document.getElementById("editMealDate").value = formattedDate;
}

function updateMeal() {
  try {
    let mealId = document.getElementById("editMealId").value;
    let mealName = document.getElementById("editMealName").value;
    let mealType = document.getElementById("editMealType").value;
    let mealCalories = parseInt(
      document.getElementById("editMealCalories").value
    );
    let mealProtein = parseInt(
      document.getElementById("editMealProtein").value
    );
    let mealFiber = parseInt(document.getElementById("editMealFiber").value);
    let mealWater = parseInt(document.getElementById("editMealWater").value);

    let mealDate = new Date(
      document.getElementById("editMealDate").value + "T00:00"
    )
      .toISOString()
      .split("T")[0];

    if (
      mealCalories < 0 ||
      isNaN(mealCalories) ||
      mealProtein < 0 ||
      isNaN(mealProtein) ||
      mealFiber < 0 ||
      isNaN(mealFiber) ||
      mealWater < 0 ||
      isNaN(mealWater) ||
      !mealType
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter valid inputs.",
        heightAuto: false,
      });
    } else {
      let newMeal = {
        id: mealId,
        date: mealDate,
        name: mealName,
        type: mealType,
        calories: mealCalories,
        protein: mealProtein,
        fiber: mealFiber,
        water: mealWater,
      };

      let allMeals = getAllMeals();

      let index = allMeals.findIndex((meal) => meal.id == mealId);

      allMeals[index] = newMeal;

      localStorage.setItem("jgMealZealMeals", JSON.stringify(allMeals));

      getValues();

      document.getElementById("editMealForm").reset();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please enter valid inputs.",
      heightAuto: false,
    });
  }
}

function createDailyMealsObjectArray() {
  let days = new Set();
  let mealsArray = getAllMeals();
  for (let i = 0; i < mealsArray.length; i++) {
    days.add(mealsArray[i].date);
  }

  let dayArray = [...days];
  let mealRows = [];

  for (let i = 0; i < dayArray.length; i++) {
    let mealDay = {
      date: dayArray[i],
      calories: 0,
      protein: 0,
      fiber: 0,
      water: 0,
    };
    for (let j = 0; j < mealsArray.length; j++) {
      if (mealDay.date == mealsArray[j].date) {
        mealDay.calories += mealsArray[j].calories;
        mealDay.protein += mealsArray[j].protein;
        mealDay.fiber += mealsArray[j].fiber;
        mealDay.water += mealsArray[j].water;
      }
    }
    mealRows.push(mealDay);
  }

  return mealRows;
}

function createWeeklyMealsObjectArray() {
  let mealsArray = createDailyMealsObjectArray();
  let firstDay = new Date(mealsArray[0].date + "T00:00");
  let lastDay = new Date(mealsArray[mealsArray.length - 1].date + "T00:00");
  let mealRows = [];

  if (firstDay.getDay() != 0) {
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());
  }

  let difference = lastDay.getTime() - firstDay.getTime();
  let differenceInDays = Math.round(difference / (1000 * 3600 * 24));

  for (let i = 0; i <= differenceInDays; i += 7) {
    let dummyDate = new Date(firstDay.getTime() + i * 24 * 3600 * 1000);
    let dummyDateString = dummyDate.toISOString().split("T")[0];

    let mealWeek = {
      date: dummyDateString,
      calories: 0,
      protein: 0,
      fiber: 0,
      water: 0,
      count: 0,
    };

    for (let j = 0; j < mealsArray.length; j++) {
      let currentMeal = mealsArray[j];
      let currentMealDate = new Date(currentMeal.date + "T00:00");
      let currentMealDateMinusItself = new Date(
        currentMealDate.getTime() - currentMealDate.getDay() * 24 * 3600 * 1000
      );
      if (
        currentMealDateMinusItself.toDateString() == dummyDate.toDateString()
      ) {
        mealWeek.calories += currentMeal.calories;
        mealWeek.protein += currentMeal.protein;
        mealWeek.fiber += currentMeal.fiber;
        mealWeek.water += currentMeal.water;
        mealWeek.count++;
      }
    }
    mealWeek.calories =
      Math.round((mealWeek.calories / mealWeek.count) * 100) / 100;
    mealWeek.protein =
      Math.round((mealWeek.protein / mealWeek.count) * 100) / 100;
    mealWeek.fiber = Math.round((mealWeek.fiber / mealWeek.count) * 100) / 100;
    mealWeek.water = Math.round((mealWeek.water / mealWeek.count) * 100) / 100;

    if (
      mealWeek.calories > 0 ||
      mealWeek.protein > 0 ||
      mealWeek.fiber > 0 ||
      mealWeek.water > 0
    ) {
      mealRows.push(mealWeek);
    }
  }
  return mealRows;
}

function createMonthlyMealsObjectArray() {
  let mealsArray = createDailyMealsObjectArray();

  let mealRows = [];
  let mealMonths = new Set();

  for (let i = 0; i < mealsArray.length; i++) {
    let mealMonthArray = mealsArray[i].date.split("-");
    let mealMonth = mealMonthArray[0] + "-" + mealMonthArray[1];
    mealMonths.add(mealMonth);
  }

  let mealMonthsArray = [...mealMonths];

  for (let i = 0; i < mealMonthsArray.length; i++) {
    let count = 0;
    mealMonthData = {
      date: mealMonthsArray[i],
      calories: 0,
      protein: 0,
      fiber: 0,
      water: 0,
    };

    for (let j = 0; j < mealsArray.length; j++) {
      let mealDate = new Date(mealsArray[j].date + "T00:00")
        .toISOString()
        .split("T")[0];
      let month = mealDate.split("-")[0] + "-" + mealDate.split("-")[1];

      if (mealMonthsArray[i] == month) {
        mealMonthData.calories += mealsArray[j].calories;
        mealMonthData.protein += mealsArray[j].protein;
        mealMonthData.fiber += mealsArray[j].fiber;
        mealMonthData.water += mealsArray[j].water;
        count++;
      }
    }
    mealMonthData.calories =
      Math.round((mealMonthData.calories / count) * 100) / 100;
    mealMonthData.protein =
      Math.round((mealMonthData.protein / count) * 100) / 100;
    mealMonthData.fiber = Math.round((mealMonthData.fiber / count) * 100) / 100;
    mealMonthData.water = Math.round((mealMonthData.water / count) * 100) / 100;

    if (
      mealMonthData.calories > 0 ||
      mealMonthData.protein > 0 ||
      mealMonthData.fiber > 0 ||
      mealMonthData.water > 0
    ) {
      mealRows.push(mealMonthData);
    }
  }
  return mealRows;
}

function createYearlyMealsObjectArray() {
  let mealsArray = createDailyMealsObjectArray();

  let mealRows = [];
  let mealYears = new Set();

  for (let i = 0; i < mealsArray.length; i++) {
    let mealYearArray = mealsArray[i].date.split("-");
    let mealYear = mealYearArray[0];
    mealYears.add(mealYear);
  }

  let mealYearsArray = [...mealYears];

  for (let i = 0; i < mealYearsArray.length; i++) {
    let count = 0;
    mealYearData = {
      date: mealYearsArray[i],
      calories: 0,
      protein: 0,
      fiber: 0,
      water: 0,
    };

    for (let j = 0; j < mealsArray.length; j++) {
      let mealDate = new Date(mealsArray[j].date + "T00:00")
        .toISOString()
        .split("T")[0];
      let year = mealDate.split("-")[0];

      if (mealYearsArray[i] == year) {
        mealYearData.calories += mealsArray[j].calories;
        mealYearData.protein += mealsArray[j].protein;
        mealYearData.fiber += mealsArray[j].fiber;
        mealYearData.water += mealsArray[j].water;
        count++;
      }
    }
    mealYearData.calories =
      Math.round((mealYearData.calories / count) * 100) / 100;
    mealYearData.protein =
      Math.round((mealYearData.protein / count) * 100) / 100;
    mealYearData.fiber = Math.round((mealYearData.fiber / count) * 100) / 100;
    mealYearData.water = Math.round((mealYearData.water / count) * 100) / 100;

    if (
      mealYearData.calories > 0 ||
      mealYearData.protein > 0 ||
      mealYearData.fiber > 0 ||
      mealYearData.water > 0
    ) {
      mealRows.push(mealYearData);
    }
  }
  return mealRows;
}

function displayAllMeals() {
  let mealsArray = getAllMeals();
  mealsArray = mealsArray.sort((meal1, meal2) =>
    Number(new Date(meal2.date) - new Date(meal1.date))
  );
  let rowTemplate = document.getElementById("allTableRowTemplate");
  let headerTemplate = document.getElementById("allTableHeaderTemplate");
  mealTableHeader.innerHTML = "";
  mealTableHeader.appendChild(
    document.importNode(headerTemplate.content, true)
  );
  mealTableBody.innerHTML = "";
  for (let i = 0; i < mealsArray.length; i++) {
    let meal = mealsArray[i];

    let tableRow = document.importNode(rowTemplate.content, true);

    tableRow.querySelector('[data-id="date"]').textContent = meal.date;
    tableRow.querySelector('[data-id="mealName"]').textContent = meal.name;
    tableRow.querySelector('[data-id="mealType"]').textContent = meal.type;
    tableRow.querySelector('[data-id="calories"]').textContent = meal.calories;
    tableRow.querySelector('[data-id="protein"]').textContent = meal.protein;
    tableRow.querySelector('[data-id="fiber"]').textContent = meal.fiber;
    tableRow.querySelector('[data-id="water"]').textContent = meal.water;

    tableRow.querySelector("tr").setAttribute("data-identifier", meal.id);

    mealTableBody.appendChild(tableRow);
  }
  document.getElementById("tableTrackingText").innerText = "All Meals";
}

function displayFilteredMeals(filteredMealsArray, timeFrame) {
  let mealsArray = filteredMealsArray;
  mealsArray = mealsArray.sort((meal1, meal2) =>
    Number(new Date(meal2.date) - new Date(meal1.date))
  );
  // reset meal table
  mealTableHeader.innerHTML = "";
  mealTableBody.innerHTML = "";

  // assign appropriate table templates to variables
  let headerTemplate = document.getElementById("filteredTableHeaderTemplate");
  let rowTemplate = document.getElementById("filteredTableRowTemplate");

  // append table header template to meal table header
  mealTableHeader.appendChild(
    document.importNode(headerTemplate.content, true)
  );

  // iterate through meals array argument
  for (let i = 0; i < mealsArray.length; i++) {
    // deep copy appropriate row template and assign to a variable
    let tableRow = document.importNode(rowTemplate.content, true);

    // input appropriate data to each table row cell
    tableRow.querySelector('[data-id="date"]').textContent = mealsArray[i].date;
    tableRow.querySelector('[data-id="calories"]').textContent =
      mealsArray[i].calories;
    tableRow.querySelector('[data-id="protein"]').textContent =
      mealsArray[i].protein;
    tableRow.querySelector('[data-id="fiber"]').textContent =
      mealsArray[i].fiber;
    tableRow.querySelector('[data-id="water"]').textContent =
      mealsArray[i].water;

    // append create table row to meal table body
    mealTableBody.appendChild(tableRow);
  }

  let timeFrameText = document.getElementById("timeFrame");
  let tableTrackingText = document.getElementById("tableTrackingText");

  if (timeFrame == "Daily") {
    timeFrameText.innerText = "Date";
    tableTrackingText.innerText = "Daily Totals";
  } else if (timeFrame == "Weekly") {
    timeFrameText.innerText = "Week Of";
    tableTrackingText.innerText = "Daily Averages / Week";
  } else if (timeFrame == "Monthly") {
    timeFrameText.innerText = "Month";
    tableTrackingText.innerText = "Daily Averages / Month";
  } else if (timeFrame == "Yearly") {
    timeFrameText.innerText = "Year";
    tableTrackingText.innerText = "Daily Averages / Year";
  }
}

function generateId() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function calculateAndSetDailyCards() {
  let dailyMeals = getAllMeals();

  let calorieCount = 0;
  let proteinCount = 0;
  let fiberCount = 0;
  let waterCount = 0;

  let today = new Date();

  for (let i = 0; i < dailyMeals.length; i++) {
    mealDate = new Date(dailyMeals[i].date + "T00:00");
    if (mealDate.toDateString() == today.toDateString()) {
      calorieCount += dailyMeals[i].calories;
      proteinCount += dailyMeals[i].protein;
      fiberCount += dailyMeals[i].fiber;
      waterCount += dailyMeals[i].water;
      break;
    }
  }

  document.getElementById("calorieCount").textContent = calorieCount;
  document.getElementById("proteinCount").textContent = proteinCount;
  document.getElementById("fiberCount").textContent = fiberCount;
  document.getElementById("waterCount").textContent = waterCount;

  document.getElementById("cardTrackingText").innerText = "Today's Totals";
}

function calculateAndSetWeeklyCards() {
  let mealsArray = createWeeklyMealsObjectArray();

  let calorieCount = 0;
  let proteinCount = 0;
  let fiberCount = 0;
  let waterCount = 0;

  let today = new Date();
  let dummyWeek = new Date(today.getTime() - today.getDay() * 24 * 3600 * 1000);
  let dummyWeekString = dummyWeek.toDateString();
  let currentWeekString = new Date(dummyWeekString).toISOString().split("T")[0];

  for (let i = 0; i < mealsArray.length; i++) {
    if (currentWeekString == mealsArray[i].date) {
      calorieCount += mealsArray[i].calories;
      proteinCount += mealsArray[i].protein;
      fiberCount += mealsArray[i].fiber;
      waterCount += mealsArray[i].water;
      break;
    }
  }

  document.getElementById("calorieCount").textContent = calorieCount;
  document.getElementById("proteinCount").textContent = proteinCount;
  document.getElementById("fiberCount").textContent = fiberCount;
  document.getElementById("waterCount").textContent = waterCount;

  document.getElementById("cardTrackingText").innerText =
    "Daily Averages this Week";
}

function calculateAndSetMonthlyCards() {
  let mealsArray = createMonthlyMealsObjectArray();

  let calorieCount = 0;
  let proteinCount = 0;
  let fiberCount = 0;
  let waterCount = 0;

  let currentDate = new Date().toISOString().split("T")[0];
  let currentMonth =
    currentDate.split("-")[0] + "-" + currentDate.split("-")[1];

  for (let i = 0; i < mealsArray.length; i++) {
    if (mealsArray[i].date == currentMonth) {
      calorieCount += mealsArray[i].calories;
      proteinCount += mealsArray[i].protein;
      fiberCount += mealsArray[i].fiber;
      waterCount += mealsArray[i].water;
      break;
    }
  }

  document.getElementById("calorieCount").textContent = calorieCount;
  document.getElementById("proteinCount").textContent = proteinCount;
  document.getElementById("fiberCount").textContent = fiberCount;
  document.getElementById("waterCount").textContent = waterCount;

  document.getElementById("cardTrackingText").innerText =
    "Daily Averages this Month";
}

function calculateAndSetYearlyCards() {
  let mealsArray = createYearlyMealsObjectArray();

  let calorieCount = 0;
  let proteinCount = 0;
  let fiberCount = 0;
  let waterCount = 0;

  let currentDate = new Date().toISOString().split("T")[0];
  let currentYear = currentDate.split("-")[0];

  for (let i = 0; i < mealsArray.length; i++) {
    if (mealsArray[i].date == currentYear) {
      calorieCount += mealsArray[i].calories;
      proteinCount += mealsArray[i].protein;
      fiberCount += mealsArray[i].fiber;
      waterCount += mealsArray[i].water;
      break;
    }
  }

  document.getElementById("calorieCount").textContent = calorieCount;
  document.getElementById("proteinCount").textContent = proteinCount;
  document.getElementById("fiberCount").textContent = fiberCount;
  document.getElementById("waterCount").textContent = waterCount;

  document.getElementById("cardTrackingText").innerText =
    "Daily Averages this Year";
}

function filterMeals(filter) {
  if (filter == "All") {
    displayAllMeals();
  } else if (filter == "Daily") {
    let filteredMealsArray = createDailyMealsObjectArray();
    displayFilteredMeals(filteredMealsArray, filter);
  } else if (filter == "Weekly") {
    let filteredMealsArray = createWeeklyMealsObjectArray();
    displayFilteredMeals(filteredMealsArray, filter);
  } else if (filter == "Monthly") {
    let filteredMealsArray = createMonthlyMealsObjectArray();
    displayFilteredMeals(filteredMealsArray, filter);
  } else if (filter == "Yearly") {
    let filteredMealsArray = createYearlyMealsObjectArray();
    displayFilteredMeals(filteredMealsArray, filter);
  }
}

function filterCards(filter) {
  if (filter == "Today") {
    calculateAndSetDailyCards();
  } else if (filter == "Week") {
    calculateAndSetWeeklyCards();
  } else if (filter == "Month") {
    calculateAndSetMonthlyCards();
  } else if (filter == "Year") {
    calculateAndSetYearlyCards();
  }
}