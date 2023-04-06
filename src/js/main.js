(function () {
  class Main {
    constructor() {
      this.anchorAmin = 0;
      this.anchorBmin = 0;
      this.anchorCmin = 0;

      this.anchorAmin = 0;
      this.heightB = 0;
      this.anchorCmin = 0;

      this.introImage = document.getElementById("intro-image");
      this.arrowDown = document.getElementById("down-arrow");
      this.arrowRight = document.getElementById("right-arrow");
      this.arrowUp = document.getElementById("up-arrow");

      this.fadeInElsB = document.getElementsByClassName("fade-in-b");
      this.fadeInElsC = document.getElementsByClassName("fade-in-c");

      this.canScroll = false;

      setTimeout(() => {
        this.startIntro();
      }, 500);

      this.setAnchorPoints();
      this.activeScroll();
    }

    startIntro() {
      const introLogo = document.getElementById("intro-logo");
      const introText = document.getElementById("intro-text");

      this.introImage.style.transition = "1s 0s ease-in-out";
      introLogo.style.transition = "1s 0.5s ease-in-out";
      introText.style.transition = "1s 0.8s ease-in-out";
      this.arrowDown.style.transition = "1.5s 1s ease-in-out";

      introLogo.style.opacity = 1;
      introText.style.opacity = 1;
      this.introImage.style.opacity = 1;

      introLogo.style.transform = "translateY(0)";
      introText.style.transform = "translateY(0)";
      this.arrowDown.style.transform = "translateY(0)";

      setTimeout(() => {
        this.arrowDown.style.transition = "0s";
        this.introImage.style.transition = "0s";
        this.canScroll = true;

        this.setAnchorPoints();
      }, 2500);
    }

    activeScroll() {
      window.addEventListener("scroll", () => {
        this.scrollArrows();
      });
      window.addEventListener("resize", () => {
        this.setAnchorPoints();
      });
    }

    setAnchorPoints() {
      const app = document.getElementById("app");
      this.totalHeight = app.clientHeight;

      const anchorA = document.getElementById("anchorA");
      const anchorB = document.getElementById("anchorB");
      const anchorC = document.getElementById("anchorC");

      this.anchorAmin = anchorA.offsetTop;
      this.anchorBmin = anchorB.offsetTop;
      this.anchorCmin = anchorC.offsetTop;

      this.heightB = anchorB.offsetHeight / 3;
    }

    scrollArrows() {
      const scrollY = window.scrollY;
      const ih = window.innerHeight;
      const ay = scrollY < this.anchorAmin ? 0 : scrollY * 0.25;
      const bx =
        scrollY < this.anchorBmin ? 0 : (scrollY - this.anchorBmin) / 2;
      const cy =
        scrollY < this.anchorCmin ? 1000 : this.totalHeight - scrollY - ih;

      this.arrowRight.style.transform = `translateX(${bx}px)`;
      this.arrowUp.style.transform = `translateY(${cy}px)`;

      const opacityB =
        scrollY < this.anchorBmin * 0.5
          ? 0
          : (scrollY - this.anchorBmin * 0.5) / this.heightB;
      const opacityC =
        scrollY < this.anchorBmin * 0.75
          ? 0
          : (scrollY - this.anchorBmin * 0.75) / this.heightB;

      for (let i = 0; i < this.fadeInElsB.length; i++) {
        this.fadeInElsB[i].style.opacity = opacityB;
        this.fadeInElsC[i].style.opacity = opacityC;
      }

      if (this.canScroll) {
        this.arrowDown.style.transform = `translateY(${ay}px)`;
        let opacityA = scrollY < this.anchorAmin ? 1 : 1 - scrollY / ih;
        if (opacityA < 0) opacityA = 0;
        this.arrowDown.style.opacity = opacityA;
      }
    }
  }

  const main = new Main();
})();
