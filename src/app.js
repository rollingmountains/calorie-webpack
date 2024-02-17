import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import Tracker from './Tracker.js';
import { Meal, Workout } from './Items.js';
import './css/bootstrap.css';
import './css/style.css';

class App {
  constructor() {
    this._tracker = new Tracker();
    this._tracker.loadItems();
    this._eventListeners();
  }

  _eventListeners() {
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._addItem.bind(this, 'meal'));

    document
      .getElementById('workout-form')
      .addEventListener('submit', this._addItem.bind(this, 'workout'));

    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));

    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));

    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));

    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));

    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItem.bind(this, 'meal'));

    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItem.bind(this, 'workout'));
  }

  _addItem(type, e) {
    e.preventDefault();
    const nameEl = document.getElementById(`${type}-name`);
    const name = nameEl.value;
    const caloriesEl = document.getElementById(`${type}-calories`);
    const calories = caloriesEl.value;

    if (!name || !calories || calories === '0') {
      alert('Please enter all fields');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(name, +calories);
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name, +calories);
      this._tracker.addWorkout(workout);
    }

    nameEl.value = '';
    caloriesEl.value = '';
    this._collapseForm(type);
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      const parentEl = e.target.closest('.card');
      const id = parseInt(parentEl.dataset.id);
      parentEl.remove();
      if (type === 'workout') {
        this._tracker.removeWorkout(id);
      } else {
        this._tracker.removeMeal(id);
      }
    }
  }

  _filterItem(type, e) {
    const searchName = e.target.value;

    const list = Array.from(document.getElementById(`${type}-items`).children);

    list.forEach((item) => {
      const nameEl = item.querySelector('h4');
      const name = nameEl.textContent;
      item.style.display = name.includes(searchName) ? 'block' : 'none';
    });
  }

  _setLimit(e) {
    e.preventDefault();
    const value = parseInt(document.getElementById('limit').value);

    if (value === '' || value < 1000) {
      alert('Limit should be above 1000');
      return;
    }

    const modalEl = document.getElementById('limit-modal');
    const bsModal = Modal.getInstance(modalEl);
    bsModal.hide();

    this._tracker.setLimit(value);
  }

  _reset() {
    // remove meals and workouts list's dom elements
    this._removeItems('meal');
    this._removeItems('workout');
    // call tracker's method to rest all values
    this._tracker.reset();
  }

  _removeItems(type) {
    const parentEl = document.getElementById(`${type}-items`);
    while (parentEl.firstChild) {
      parentEl.firstChild.remove();
    }
  }

  _collapseForm(type) {
    const collapseEl = document.getElementById(`collapse-${type}`);
    new Collapse(collapseEl, {
      toggle: true,
    });
  }
}

const app = new App();
