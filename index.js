import { createElement, createMarkup, createStyle } from './dom.js';
import Carousel from './carousel.js';
createMarkup()
createStyle()


const carousel = new Carousel(true, 2000)

carousel.init()
