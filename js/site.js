var meals = [
  {
    month: "April",
    date: "4/19/2023",
    meal: "Teriyaki Chicken with Brussel Sprouts",
    calories: 860,
    protein: 67,
    sugars: 13,
    carbs: 18,
    fats: 4
  },
  {
    month: "April",
    date: "4/19/2023",
    meal: "Teriyaki Chicken with Brussel Sprouts",
    calories: 860,
    protein: 67,
    sugars: 13,
    carbs: 18,
    fats: 4
  },
  {
    month: "April",
    date: "4/19/2023",
    meal: "Teriyaki Chicken with Brussel Sprouts",
    calories: 860,
    protein: 67,
    sugars: 13,
    carbs: 18,
    fats: 4
  },
  {
    month: "May",
    date: "4/19/2023",
    meal: "Teriyaki Chicken with Brussel Sprouts Teriyaki Chicken with Brussel Sprouts",
    calories: 860,
    protein: 67,
    sugars: 13,
    carbs: 18,
    fats: 4
  }
];

function buildDropDown() {
  let dropdownMenu = document.getElementById("mealDropDown");
  dropdownMenu.innerHTML = "";

  let currentMeals = getMealData();

  let monthNames = currentMeals.map((meal) => meal.month);
  let monthsSet = new Set(monthNames);
  let distinctMonths = [...monthsSet];

  const dropdownTemplate = document.getElementById("dropdownItemTemplate");

  let dropdownItemNode = document.importNode(dropdownTemplate.content, true);

  let dropdownItemLink = dropdownItemNode.querySelector('a');
  dropdownItemLink.innerText = 'All Months';
  dropdownItemLink.setAttribute('data-string', 'All');

  dropdownMenu.appendChild(dropdownItemNode);

  for (let i = 0; i < distinctMonths.length; i += 1) {
    let monthName = distinctMonths[i];

    let itemNode = document.importNode(dropdownTemplate.content, true);
    let anchorTag = itemNode.querySelector('a');
    anchorTag.innerText = monthName;
    anchorTag.setAttribute('data-string', monthName);

    dropdownMenu.appendChild(itemNode);
  }

  displayMealData(currentMeals);
  displayStats(currentMeals);
  document.getElementById('month').innerText = 'All Months';
}

function displayMealData(currentMeals) {

  const mealTable = document.getElementById('mealTable');
  const template = document.getElementById('tableRowTemplate');

  mealTable.innerHTML = '';

  for (let i = 0; i < currentMeals.length; i++) {
    let meal = currentMeals[i];
    let tableRow = document.importNode(template.content, true);
    tableRow.querySelector('[data-id="month"]').textContent = meal.month
    tableRow.querySelector('[data-id="date"]').textContent = new Date(meal.date).toLocaleDateString();
    tableRow.querySelector('[data-id="meal"]').textContent = meal.meal;
    tableRow.querySelector('[data-id="calories"]').textContent = meal.calories;
    tableRow.querySelector('[data-id="protein"]').textContent = meal.protein;
    tableRow.querySelector('[data-id="sugars"]').textContent = meal.sugars.toLocaleString();
    tableRow.querySelector('[data-id="carbs"]').textContent = meal.carbs;
    tableRow.querySelector('[data-id="fats"]').textContent = meal.fats;

    tableRow.querySelector('tr').setAttribute('data-meal', meal.id);

    mealTable.appendChild(tableRow);
  }
}

function calculateStats(currentMeals) {
  let calories = 0;
  let protein = 0
  let sugars = 0;
  let carbs = 0;
  let fats = 0;

  for (let i = 0; i < currentMeals.length; i++) {
    let calories = currentMeals[i].calories;
    let protein = currentMeals[i].protein;
    let sugars = currentMeals[i].sugars
    let carbs = currentMeals[i].carbs
    let fats = currentMeals[i].fats

    calories += calories
    protein += protein
    sugars += sugars
    carbs += carbs
    fats += fats
  }

  let stats = {
    calories: calories,
    protein: protein,
    sugars: sugars,
    carbs: carbs,
    fats: fats
  }

  return stats;
}

function displayStats(currentMeals) {
  let statistics = calculateStats(currentMeals);

  document.getElementById('calories').textContent = statistics.calories.toLocaleString();
  document.getElementById('protein').textContent = Math.round(statistics.protein).toLocaleString();
  document.getElementById('sugars').textContent = statistics.sugars.toLocaleString();
  document.getElementById('carbs').textContent = statistics.carbs.toLocaleString();
  document.getElementById('fats').textContent = statistics.fats.toLocaleString();
}

function getMealData() {
  let data = localStorage.getItem('dmPoultryPrepMealData');

  if (data == null) {
    let identifiedMeals = meals.map((meal) => {
      meal.id = generateId();
      return meal;
    });

    localStorage.setItem('dmPoultryPrepMealData', JSON.stringify(identifiedMeals));
    data = localStorage.getItem('dmPoultryPrepMealData');
  }

  let currentMeals = JSON.parse(data);

  if (currentMeals.some(meal => meal.id == undefined)) {

    currentMeals.forEach(meal => meal.id = generateId());

    localStorage.setItem('dmPoultryPrepMealData', JSON.stringify(currentMeals));
    }
    
  return currentMeals;
  }

function viewFilteredMeals(dropdownItem) {
  let monthName = dropdownItem.getAttribute('data-string');

  let allMeals = getMealData();

  if (monthName == 'All') {
    displayStats(allMeals);
    displayMealData(allMeals);
    document.getElementById('month').innerText = 'All Meals';

    return;
  }

  let filteredMeals = allMeals.filter(meal => meal.month.toLowerCase() == monthName.toLowerCase());

  displayStats(filteredMeals);

  document.getElementById('month').innerText = monthName;

  displayMealData(filteredMeals);
}

function saveNewMeal() {
  let month = document.getElementById('newMonth').value;
  let meal = document.getElementById('newMeal').value;
  let calories = parseInt(document.getElementById('newCalories').value);
  let protein = parseInt(document.getElementById('newProtein').value, 10);
  let sugars = parseInt(document.getElementById('newSugars').value);
  let carbs = parseInt(document.getElementById('newCarbs').value);
  let fats = parseInt(document.getElementById('newFats').value);

  let dateValue = document.getElementById('newDate').value;
  dateValue = new Date(dateValue + ' 00:00');

  let date = dateValue.toLocaleDateString();

  let newMeal = {
    month: month,
    meal: meal,
    calories: calories,
    protein: protein,
    sugars: sugars,
    carbs: carbs,
    fats: fats,
    date: date,
    id: generateId()
  };

  let meals = getMealData();
  meals.push(newMeal);

  localStorage.setItem('dmPoultryPrepMealData', JSON.stringify(meals));

  buildDropDown();
  document.getElementById('newMealForm').clear();
}

function generateId() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function editMeal(mealRow) {
  let mealId = mealRow.getAttribute('data-meal');

  let currentMeals = getMealData();

  let mealToEdit = currentMeals.find(meal => meal.id == mealId);

  document.getElementById('editMealId').value = mealToEdit.id;
  document.getElementById('editMonth').value = mealToEdit.month;
  document.getElementById('editMeal').value = mealToEdit.meal;
  document.getElementById('editCalories').value = mealToEdit.calories;
  document.getElementById('editProtein').value = mealToEdit.protein;
  document.getElementById('editSugars').value = mealToEdit.sugars;
  document.getElementById('editCarbs').value = mealToEdit.carbs;
  document.getElementById('editFats').value = mealToEdit.fats;

  let mealDate = new Date(mealToEdit.date + ' 00:00');
  let mealDateString = mealDate.toISOString();
  let dateArray = mealDateString.split('T');
  let formattedDate = dateArray[0];
  
  document.getElementById('editDate').value = formattedDate;
}

function deleteMeal() {
  let mealId = document.getElementById('editMealId').value;

  let currentMeals = getMealData();
  let filteredMeals = currentMeals.filter(meal => meal.id != mealId);
  localStorage.setItem('dmPoultryPrepMealData', JSON.stringify(filteredMeals));

  buildDropDown();
}

function updateMeal() {
  let mealId = document.getElementById('editMealId').value;

  let meal = document.getElementById('editMeal').value;
  let month = document.getElementById('editMonth').value;
  let calories = document.getElementById('editCalories').value;
  let protein = document.getElementById('editProtein').value;
  let sugars = document.getElementById('editSugars').value;
  let carbs = document.getElementById('editCarbs').value;
  let fats = document.getElementById('editFats').value;

  let dateValue = document.getElementById('editDate').value;
  dateValue = new Date(dateValue);

  let date = dateValue.toLocaleDateString();

  let newMeal = {
    month: month,
    meal: meal,
    calories: calories,
    protein: protein,
    carbs: carbs,
    sugars: sugars,
    fats: fats,
    date: date,
    id: mealId
  };

  let currentMeals = getMealData();
  let index = -1;
  for (let i = 0; i < currentMeals.length; i++) {
    if (currentMeals[i].id == mealId) {
      currentMeals[i] = newMeal;
      break;
    }
  }

  localStorage.setItem('dmPoultryPrepMealData', JSON.stringify(currentMeals));

  buildDropDown();
}