import { Component } from 'pet-dex-utilities';
import sizeSmall from './img/size-small.svg';
import sizeMedium from './img/size-medium-active.svg';
import sizeLarge from './img/size-large.svg';
import './index.scss';

const events = ['click', 'touchstart'];

const html = `
<div class="slider-wrapper" data-select="slider-wrapper">
  <ul role="listbox" class="slider-wrapper__slide" data-select="slider-wrapper__slide"> 
     <li role="option" aria-label="tamanho pequeno do pet" aria-selected="false" class="slider-wrapper__item" data-select="slider-small">     
      <img class="slider-wrapper__image" data-select="slider-wrapper__image" src="${sizeSmall}" alt="icon do tamanho pequeno do pet">
      <h3>Small</h3>
      <p>under 14kg</p>
     </li>
     <li role="option" aria-label="tamanho médio do pet" aria-selected="true" class="slider-wrapper__item active" data-select="slider-medium">
      <img class="slider-wrapper__image" src="${sizeMedium}" alt="icon do tamanho médio do pet">
      <h3>Medium</h3>
      <p>14-25kg</p>
     </li>
     <li role="option" aria-label="tamanho grande do pet" aria-selected="false" class="slider-wrapper__item" data-select="slider-large">
      <img class="slider-wrapper__image" da src="${sizeLarge}" alt="icon do tamanho grande do pet">
      <h3>Large</h3>
      <p>over 25kg</p>
     </li> 
  </ul> 
</div>
`;

export default function SizeSelector(slide) {
  Component.call(this, { html, events });

  const slideItems = this.selected.get(slide);

  const childrens = [...slideItems.children];
  this.StartEvents(childrens);
}

SizeSelector.prototype = Object.assign(
  SizeSelector.prototype,
  Component.prototype,
  {
    StartEvents(childrens) {
      childrens.map((element) => {
        element.addEventListener('pointerdown', () => {
          this.ChangeToDefault(childrens);
          if (element.classList.contains('active')) {
            element.classList.add('active');
          } else {
            childrens.map((children) => {
              children.classList.remove('active');
              return children;
            });
            element.classList.add('active');
          }
          this.ChangeToActive(element);
        });
        return this;
      });
    },

    ChangeToDefault(childrens) {
      childrens.map((element) => {
        const srcValue = element.children[0].attributes.src.value;
        const itemSrc = element.children[0].attributes.src;

        if (srcValue === '/components/SizeSelector/img/size-small-active.svg') {
          itemSrc.value = '/components/SizeSelector/img/size-small.svg';
          element.setAttribute('aria-selected', 'false');
        } else if (
          srcValue === '/components/SizeSelector/img/size-medium-active.svg'
        ) {
          itemSrc.value = '/components/SizeSelector/img/size-medium.svg';
          element.setAttribute('aria-selected', 'false');
        } else if (
          srcValue === '/components/SizeSelector/img/size-large-active.svg'
        ) {
          itemSrc.value = '/components/SizeSelector/img/size-large.svg';
          element.setAttribute('aria-selected', 'false');
        }
        return srcValue;
      });
    },

    ChangeToActive(element) {
      const srcValue = element.children[0].attributes.src.value;
      const itemSrc = element.children[0].attributes.src;

      if (srcValue === '/components/SizeSelector/img/size-small.svg') {
        itemSrc.value = '/components/SizeSelector/img/size-small-active.svg';
        element.setAttribute('aria-selected', 'true');
      } else if (srcValue === '/components/SizeSelector/img/size-medium.svg') {
        itemSrc.value = '/components/SizeSelector/img/size-medium-active.svg';
        element.setAttribute('aria-selected', 'true');
      } else if (srcValue === '/components/SizeSelector/img/size-large.svg') {
        itemSrc.value = '/components/SizeSelector/img/size-large-active.svg';
        element.setAttribute('aria-selected', 'true');
      }
    },
  },
);
