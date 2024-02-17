import Storage from './Storage.js';

class Tracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._netCalories = Storage.getNetCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    this._render();
    document.getElementById('limit').value = Storage.getCalorieLimit();
  }

  // Public Method //
  addMeal(meal) {
    this._meals.push(meal);
    const calories = parseInt(meal.calories);
    this._netCalories += calories;
    Storage.setNetCalories(this._netCalories);
    Storage.updateMeal(meal);
    this._displayMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._netCalories -= workout.calories;
    Storage.setNetCalories(this._netCalories);
    Storage.updateWorkout(workout);
    this._displayWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => {
      return meal.id === id;
    });
    console.log('this is index ' + index);

    if (index !== -1) {
      const item = this._meals[index];
      this._netCalories -= item.calories;
      console.log(this._netCalories);
      Storage.setNetCalories(this._netCalories);
      this._meals.splice(index, 1);
      Storage.removeMeal(index);
    }

    this._render();
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => {
      return workout.id === id;
    });
    console.log('this is index ' + index);

    if (index !== -1) {
      const item = this._workouts[index];
      this._netCalories += item.calories;
      console.log(this._netCalories);
      Storage.setNetCalories(this._netCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(index);
    }

    this._render();
  }

  setLimit(value) {
    this._calorieLimit = value;
    Storage.setCalorieLimit(value);
    this._render();
  }

  reset() {
    // reset all values
    Storage.clearStorage();
    this._calorieLimit = Storage.getCalorieLimit();
    this._netCalories = Storage.getNetCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    document.getElementById('limit').value = Storage.getCalorieLimit();
    this._render();
  }

  // Private methods //
  _displayCalorieLimit() {
    const limitEl = document.getElementById('calories-limit');
    limitEl.textContent = this._calorieLimit;
  }

  _displayCalorieConsumed() {
    const consumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce((acc, meal) => {
      return (acc += meal.calories);
    }, 0);
    consumedEl.textContent = consumed;
  }

  _displayCalorieBurned() {
    const burnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce((acc, workout) => {
      return (acc += workout.calories);
    }, 0);
    burnedEl.textContent = burned;
  }

  _displayNetCalories() {
    const netCaloriesEl = document.getElementById('calories-total');
    netCaloriesEl.textContent = this._netCalories;
    const parentEl = netCaloriesEl.closest('.card');
    if (this._netCalories < 0) {
      parentEl.classList.remove('bg-primary');
      parentEl.classList.add('bg-danger');
    } else {
      parentEl.classList.remove('bg-danger');
      parentEl.classList.add('bg-primary');
    }
  }

  _displayRemainingCalories() {
    const remainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');
    const calories = this._calorieLimit - this._netCalories;
    remainingEl.textContent = calories;
    const parentEl = remainingEl.closest('.card');
    if (calories <= 0) {
      parentEl.classList.remove('bg-light');
      parentEl.classList.add('bg-danger');
      progressEl.classList.add('bg-danger');
    } else {
      parentEl.classList.remove('bg-danger');
      progressEl.classList.remove('bg-danger');
      parentEl.classList.add('bg-light');
    }
  }

  _progressBar() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._netCalories / this._calorieLimit) * 100;

    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  loadItems() {
    this._meals.forEach((item) => {
      this._displayMeal(item);
    });
    this._workouts.forEach((item) => {
      this._displayWorkout(item);
    });
  }

  _displayMeal(meal) {
    const parentEl = document.getElementById('meal-items');
    const div = document.createElement('div');
    div.setAttribute('data-id', meal.id);
    div.classList.add('card', 'my-2');
    div.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;
    parentEl.appendChild(div);
  }

  _displayWorkout(workout) {
    const parentEl = document.getElementById('workout-items');
    const div = document.createElement('div');
    div.setAttribute('data-id', workout.id);
    div.classList.add('card', 'my-2');
    div.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;
    parentEl.appendChild(div);
  }

  _render() {
    this._displayCalorieLimit();
    this._displayCalorieBurned();
    this._displayCalorieConsumed();
    this._displayRemainingCalories();
    this._displayNetCalories();
    this._progressBar();
  }
}

export default Tracker;
