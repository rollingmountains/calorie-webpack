class Storage {
  static getCalorieLimit(defaultLimit = 4000) {
    let limit;
    if (localStorage.getItem('calorieLimit') === null) {
      limit = defaultLimit;
    } else {
      limit = localStorage.getItem('calorieLimit');
    }
    return +limit;
  }

  static setCalorieLimit(value) {
    localStorage.setItem('calorieLimit', JSON.stringify(value));
  }

  static getNetCalories(defaultCalories = 0) {
    let calories;
    if (localStorage.getItem('netCalories') === null) {
      calories = defaultCalories;
    } else {
      calories = localStorage.getItem('netCalories');
    }
    return +calories;
  }

  static setNetCalories(value) {
    localStorage.setItem('netCalories', JSON.stringify(value));
  }

  static getMeals(defaultList = []) {
    let items;
    if (localStorage.getItem('mealsList') === null) {
      items = defaultList;
    } else {
      items = JSON.parse(localStorage.getItem('mealsList'));
    }
    return items;
  }

  static updateMeal(meal) {
    let list = this.getMeals();
    list.push(meal);
    localStorage.setItem('mealsList', JSON.stringify(list));
  }

  static getWorkouts(defaultWorkout = []) {
    let items;
    if (localStorage.getItem('workoutsList') === null) {
      items = defaultWorkout;
    } else {
      items = JSON.parse(localStorage.getItem('workoutsList'));
    }
    return items;
  }

  static updateWorkout(workout) {
    let items = this.getWorkouts();
    items.push(workout);
    localStorage.setItem('workoutsList', JSON.stringify(items));
  }

  static removeWorkout(index) {
    const items = this.getWorkouts();
    items.splice(index, 1);
    localStorage.setItem('workoutsList', JSON.stringify(items));
  }

  static removeMeal(index) {
    const items = this.getMeals();
    items.splice(index, 1);
    localStorage.setItem('mealsList', JSON.stringify(items));
  }

  static clearStorage() {
    const keys = ['calorieLimit', 'netCalories', 'mealsList', 'workoutsList'];
    keys.forEach((key) => localStorage.removeItem(key));
  }
}

export default Storage;
