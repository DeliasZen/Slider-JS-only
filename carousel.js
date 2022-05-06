class Carousel {
  constructor(isPlaying = true, interval = 2500) {
    this.isPlaying = isPlaying;
    this.interval = interval;
  }

  _initProps() {
    this.container = document.querySelector('.container')
    this.slides = document.querySelectorAll('.slide');
    this.slidesContainer = document.querySelector('#slides');
    this.indContainer = document.querySelector('.indicators');
    this.indItems = document.querySelectorAll('.indicator');

    this.pauseBtn = document.querySelector('#pause-btn');
    this.nextBtn = document.querySelector('#next-btn');
    this.prevBtn = document.querySelector('#prev-btn');
    this.pauseIcon = document.querySelector('#fa-pause-icon');
    this.playIcon = document.querySelector('#fa-play-icon');

    this.indContainer = document.querySelector('.indicators');
    this.indItems = document.querySelectorAll('.indicator');

    this.codeLeftArrow = 'ArrowLeft';
    this.codeRightArrow = 'ArrowRight';
    this.codeSpace = 'Space';

    this.slidesCount = this.slides.length;
    this.currentSlide = 0;
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indContainer.addEventListener('click', this.indicate.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
  }

  gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
  };

  gotoNext() {
    this.gotoNth(this.currentSlide + 1)
  }

  gotoPrev() {
    this.gotoNth(this.currentSlide - 1)
  }

  pause() {
    if (this.isPlaying) {
      this.pauseIcon.style.opacity = 0;
      this.playIcon.style.opacity = 1;
      this.isPlaying = false;
      clearInterval(this.timerID);
    };
  }

  play() {
    if (!this.isPlaying) {
      this.pauseIcon.style.opacity = 1;
      this.playIcon.style.opacity = 0;
      this.isPlaying = true;
      this.timerID = setInterval(() => this.gotoNext(), this.interval);
    };
  }

  indicate(e) {
    this.target = e.target;

    if (this.target.classList.contains('indicator')) {
      this.pause();
      this.gotoNth(+this.target.dataset.slideTo);
    };
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  next() {
    this.pause();
    this.gotoNext();
  }

  prev() {
    this.pause();
    this.gotoPrev();
  }

  pressKey(e) {
    if (e.code === this.codeLeftArrow) this.prev();
    if (e.code === this.codeRightArrow) this.next();
    if (e.code === this.codeSpace) this.pausePlay();
  }

  swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
  }

  init() {
    this._initProps()
    this._initListeners()
    if (this.isPlaying) this.timerID = setInterval(() => this.gotoNext(), this.interval);
    this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
  }
}

export default Carousel;