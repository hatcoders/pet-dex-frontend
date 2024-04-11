import { Component } from 'pet-dex-utilities';
import VaccineItem from '../VaccineItem';
import './index.scss';

const events = ['change:title', 'change:vaccineItem'];

const html = `
<div class="vaccine-group" data-select="vaccine-group">
    <p class="vaccine-group__vaccine-title" data-select="vaccine-title"> </p>
</div>`;

export default function VaccineGroup(year, vaccineItem) {
  Component.call(this, { html, events });

  this.items = new Map();

  if (year) this.setTitle(year);
  if (vaccineItem) this.addItem(vaccineItem);
}
VaccineGroup.prototype = Object.assign(
  VaccineGroup.prototype,
  Component.prototype,
  {
    setTitle(year) {
      this.title = year;
      this.selected.get('vaccine-title').textContent = year;
      this.emit('change:title', year);
    },
    getTitle() {
      return this.title;
    },
    getItem(itemId) {
      return this.items.get(itemId);
    },
    addItem(item) {
      const $vaccineGroup = this.selected.get('vaccine-group');
      const vaccineItem = new VaccineItem(item);

      vaccineItem.mount($vaccineGroup);
      this.items.set(item.id, vaccineItem);
      this.emit('change:vaccineItem', vaccineItem);
    },
  },
);
