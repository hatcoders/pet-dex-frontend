import { Component } from 'pet-dex-utilities';
import VaccineGroup from '../VaccineGroup';
import vaccineUrl from './images/vaccine.svg';
import addVaccineUrl from './images/plus.svg';
import './index.scss';

const events = ['drawer:open', 'group:change', 'group:remove'];

const html = `
  <div class="vaccine-container" data-select="vaccine-container">
    <div class="vaccine-container__header" data-select-"vaccine-header">
      <div class="vaccine-container__header-title"> 
        <img class="vaccine-container__img" src="${vaccineUrl}" alt="vaccine" />
        <p class="vaccine-container__text"> Vacinas </p>
      </div>
      <div class="vaccine-container__add-vacine" data-select="vaccine-add-vaccine"> 
        <div class="vaccine-container__add-vacine-container">
          <img class="vaccine-container__add-vaccine-img" src="${addVaccineUrl}" alt="add-vaccine-icon" data-select="add-vacine-icon" /> 
          <p class="vaccine-container__add-vacine-text" data-select="add-vacine-text"> Adicionar Vacina </p>
        </div>
      </div>
    </div>
    <div class="vaccine-container__list-group"> 
    <div class="vaccine-container__sections" data-select="vaccine-group-container"> </div>
    </div>
  </div>
`;

export default function Vaccine({ vaccines = [] } = {}) {
  Component.call(this, { html, events });

  const $addVaccineContainer = this.selected.get('vaccine-add-vaccine');
  this.groups = new Map();

  if (vaccines.length) this.loadVaccines(vaccines);

  $addVaccineContainer.addEventListener('click', () => {
    this.openDrawer();
  });
}

Vaccine.prototype = Object.assign(Vaccine.prototype, Component.prototype, {
  getGroup(vaccine) {
    const dateYear = new Date(vaccine.date).getFullYear();
    return this.groups.get(dateYear);
  },
  createGroup(vaccine) {
    const dateYear = new Date(vaccine.date).getFullYear();
    const vaccineGroup = new VaccineGroup(dateYear, vaccine);
    const $groupContainer = this.selected.get('vaccine-group-container');

    vaccineGroup.mount($groupContainer);

    this.groups.set(dateYear, vaccineGroup);
    this.emit('group:change', vaccine);
  },
  removeGroup(year) {
    const group = this.groups.get(year);
    if (!group) return;

    this.emit('group:remove', group);
    this.groups.delete(year);
  },
  addVaccine(vaccine, group) {
    group.addItem(vaccine);
    this.emit('group:change', vaccine);
  },
  loadVaccines(vaccines) {
    vaccines.forEach((vaccine) => {
      const group = this.getGroup(vaccine);
      if (group) {
        this.addVaccine(vaccine, group);
        return;
      }
      this.createGroup(vaccine);
    });
  },
  openDrawer() {
    this.emit('drawer:open');
  },
});
