

export const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append'
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerText') {
      el.setAttribute(key, attrs[key]);
    } else {
      el.innerHTML = attrs[key]
    }
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);

  return el;
};

export const createMarkup = () => {

  // Slides
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend'
  });

  const slides = createElement({
    type: 'div',
    attrs: { class: 'slides' },
    container
  });

  for (let i = 0; i < 5; i++) {
    const slide = createElement({
      type: 'div',
      attrs: {
        class: 'slide',
        style: `background-image: url(assets/img/img${i + 1}.jpg)`
      },
      container: slides
    });
    document.querySelectorAll('.slide')[0].classList.add('active')
  }


  // Controls
  const controls = createElement({
    type: 'div',
    attrs: { class: 'controls' },
    container
  });

  const controlPause = createElement({
    type: 'span',
    attrs: {
      class: 'control-pause',
      id: 'pause-btn'
    },
    container: controls
  });
  const controlPauseIcon = createElement({
    type: 'span',
    attrs: { id: 'fa-pause-icon' },
    container: controlPause
  });
  const controlPauseCircle = createElement({
    type: 'i',
    attrs: { class: 'far fa-pause-circle' },
    container: controlPauseIcon
  });
  const controlPlayIcon = createElement({
    type: 'span',
    attrs: { id: 'fa-play-icon' },
    container: controlPause
  });
  const controlPlayCircle = createElement({
    type: 'i',
    attrs: { class: 'far fa-play-circle' },
    container: controlPlayIcon
  });

  const controlPrev = createElement({
    type: 'span',
    attrs: {
      class: 'control-prev',
      id: 'prev-btn'
    },
    container: controls
  });
  const controlPrevIcon = createElement({
    type: 'i',
    attrs: { class: 'fas fa-angle-left' },
    container: controlPrev
  });

  const controlNext = createElement({
    type: 'span',
    attrs: {
      class: 'control-next',
      id: 'next-btn'
    },
    container: controls
  });
  const controlNextIcon = createElement({
    type: 'i',
    attrs: { class: 'fas fa-angle-right' },
    container: controlNext
  });


  // Indicators
  const indicators = createElement({
    type: 'div',
    attrs: { class: 'indicators' },
    container
  });

  for (let i = 0; i < 5; i++) {
    const indicator = createElement({
      type: 'i',
      attrs: { class: 'indicator' },
      container: indicators,
      position: 'append',
    });
  }
  for (let i = 0; i < 5; i++) {
    document.querySelectorAll('.indicator')[i].dataset.slideTo = i
    if (i === 0) document.querySelectorAll('.indicator')[i].classList.add('active')
  }
}

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerText: `
      * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    
    html {
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
    }
    
    body {
      margin: 0;
    }
    
    .fa-angle-left,
    .fa-angle-right {
      color: rgba(255, 255, 255, 0.4);
    
      font-size: 40px;
    }
    
    .fa-play-circle,
    .fa-pause-circle {
      color: rgba(255, 255, 255, 0.4);
    
      font-size: 40vh;
    }
    
    .slides {
      position: relative;
    
      height: 100vh;
      margin: 0;
      padding: 0;
    
      list-style-type: none;
    
      background: #000000;
    }
    
    .slide {
      position: absolute;
      top: 0;
      left: 0;
    
      width: 100%;
      height: 100%;
      padding: 40px;
    
      -webkit-transition: opacity 1s;
      -o-transition: opacity 1s;
      transition: opacity 1s;
    
      opacity: 0;
      background-position: 50% 50%;
      background-size: cover;
    
      font-size: 40px;

    }
    
    .slide a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    
    .slide.active {
      z-index: 1;
    
      opacity: 1;
    }
    
    .controls {
      position: absolute;
      top: 0;
    
      width: 100%;
      height: 100%;
    }
    
    .control-pause,
    .control-prev,
    .control-next {
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
    
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -ms-flex-align: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
    
    .control-pause {
      top: calc(50% - 20vh);
      left: calc(50% - 20vh);
    
      height: 0;
      padding: 0;
    
      -webkit-transition: opacity 0.25s ease-out;
      -o-transition: opacity 0.25s ease-out;
      transition: opacity 0.25s ease-out;
    
      opacity: 0;
    }
    
    .control-pause:hover,
    .control-pause:focus {
      -webkit-transition: opacity 1s ease-in 0.5s;
      -o-transition: opacity 1s ease-in 0.5s;
      transition: opacity 1s ease-in 0.5s;
    
      opacity: 1;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }
    
    .control-pause span {
      position: absolute;
    
      display: block;
    
      -webkit-transform: translate(50%, 50%);
      -ms-transform: translate(50%, 50%);
      transform: translate(50%, 50%);
    
      opacity: 0;
    }
    
    .control-prev {
      left: 0;
    
      width: 10%;
    }
    
    .control-prev:hover,
    .control-prev:focus {
      color: #ffffff;
      background: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0)));
      background: -o-linear-gradient(left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      text-shadow: 0 0 10px #ffffff;
    }
    
    .control-next {
      right: 0;
    
      width: 10%;
    }
    
    .control-next:hover,
    .control-next:focus {
      color: #ffffff;
      background: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0)));
      background: -o-linear-gradient(right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      background: linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      text-shadow: 0 0 10px #ffffff;
    }
    
    .indicators {
      position: absolute;
      z-index: 1;
      bottom: 0;
    
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    
      width: 100%;
      height: 0;
      margin: 0;
      padding: 0;
    
      list-style: none;
    }
    
    .indicator {
      width: 20px;
      height: 20px;
      margin: -40px 7.5px 0;
    
      border: 3px solid rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      outline: none;
      background: none;
      background-clip: padding-box;
    }
    
    .indicator:hover {
      cursor: pointer;
    }
    
    .indicator.active {
      border-color: #ffffff;
      -webkit-box-shadow: 0 0 10px #ffffff;
      box-shadow: 0 0 10px #ffffff;
    }
    
    @media (min-width: 992px) {
      .control-pause,
      .control-prev,
      .control-next {
        cursor: pointer;
      }
      .indicator {
        cursor: pointer;
      }
    }`
    },
    container: document.head
  })
}