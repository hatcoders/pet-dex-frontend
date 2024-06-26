import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'setName',
  'setPlaceholder',
  'setMaxLength',
  'setRequired',
  'error',
];

const html = `
  <div class="textarea">
    <textarea class="textarea__input" data-select="textarea" rows="1" cols="1"></textarea>
    <span class="textarea__trigger" data-select="resize-trigger" contenteditable></span>
  </div>
`;

export default function TextArea({
  name = '',
  placeholder = '',
  maxLength = 524288,
  required = false,
}) {
  Component.call(this, { html, events });
  const $textarea = this.selected.get('textarea');

  this.setName(name);
  this.setPlaceholder(placeholder);
  this.setMaxLength(maxLength);
  this.setRequired(required);

  $textarea.addEventListener('focus', () =>
    $textarea.classList.remove('error'),
  );
  $textarea.addEventListener('input', () => this.autoResize());
  window.addEventListener('resize', () => this.autoResize());
}

TextArea.prototype = Object.assign(TextArea, Component.prototype, {
  setName(name = '') {
    this.selected.get('textarea').name = name;
    this.emit('setName', name);
  },
  setPlaceholder(placeholder = '') {
    this.selected.get('textarea').placeholder = placeholder;
    this.emit('setPlaceholder', placeholder);
  },
  setMaxLength(maxLength) {
    if (maxLength) {
      this.selected.get('textarea').maxLength = maxLength;
    }
    this.emit('setMaxLength', maxLength);
  },
  setRequired(required = false) {
    this.selected.get('textarea').required = required;
    this.emit('setRequired', required);
  },
  error() {
    this.selected.get('textarea').classList.add('error');
    this.emit('error');
  },
  autoResize() {
    const { value } = this.selected.get('textarea');

    this.selected.get('resize-trigger').innerText = value;

    this.selected.get('textarea').style.height = 'auto';
    this.selected.get('textarea').style.height =
      `${this.selected.get('resize-trigger').offsetHeight}px`;
  },
});
