class Meal {
  constructor(name, calories) {
    (this.id = new Date().getTime()),
      (this.name = name),
      (this.calories = calories);
  }
}

class Workout {
  constructor(name, calories) {
    (this.id = new Date().getTime()),
      (this.name = name),
      (this.calories = calories);
  }
}

export { Meal, Workout };
