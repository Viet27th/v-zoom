/**
 * Vanilla JavaScript zooming image library
 *
 * Original preamble:
 * v-zoom.js - It's the best way to zoom an image only used plain Javascript
 * @author xuandieu
 * @version v0.9.5
 * @link https://github.com/vDiFoung/v-zoom
 * @license MIT
 *
 *
 * The MIT License. Copyright © 2018 xuandieu
 */

+function () {
  "use strict";

  const DefaultOptions = {
	zoomEffect: "translate",
	duration: 279,
	backgroundColor: "rgba(0.0.0.1)",
	scrollToCancel: true,
	zoomPercentage: 50,
  };

  let ImgToZoom = {
	scale: 1
  };

  let ElementWrappedImage = {
	className: "vz-img-wrap",
	translateX: 0,
	translateY: 0
  };

  let ElementPageBackground = {
	idName: "vz-bg",
	opacity: 0
  };

  let IntervalList = {
	backgroundPageOpacity: "",
	wrappedImgTranslate: "",
	imgScale: ""
  };

  const Selector = {
	elementHasData: ".vz-img-wrap .vz-js"
  };

  let VZoom = function () {
	let init = function (selector, option) {
	  option = {...DefaultOptions, ...option};
	  document.querySelectorAll(selector).forEach(el => {
		el.data = new Actions(el, option);
	  });
	};
	return {init};
  }();

  let Actions = function (el, option) {
	this.el = el;
	this.option = option;
	this.vzoomScale = el.dataset.vzoomScale;
	this.currentTimeExecutedEvent = 0;

	this.ImgToZoom = ImgToZoom;
	this.ElementWrappedImage = ElementWrappedImage;
	this.ElementPageBackground = ElementPageBackground;
	this.IntervalList = IntervalList;

	el.classList.add("vz-zoom-in", "vz-zoom-out", "vz-js");

	el.addEventListener("click", (e) => {
	  e.stopPropagation();
	  let isZoom = el.parentNode.classList.contains(this.ElementWrappedImage.className);
	  if (!isZoom) {
		this.handleNodeWrappedImg(true);
		this.handlePageBackground(true);

		if (option.zoomEffect.toUpperCase() === "SCALE") {
		  this.effectScale(true);
		}
		else if (option.zoomEffect.toUpperCase() === "TRANSLATE") {
		  this.effectTranslate(true);
		}
		else {
		  this.effectTranslate(true);
		}

		if (option.scrollToCancel) {
		  this.documentScrollToCancel(true);
		}

		document.body.addEventListener('click', this.handleCommon);

	  }
	  else {
		this.zoomCancel();
	  }

	});

  };

  Actions.prototype.isMobile = function () {
	return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
  };

  Actions.prototype.calculateScaleZoom = function () {
	let scaleTo;
	let imgWidth = this.el.offsetWidth;
	let windowWidth = window.innerWidth;

	if (this.isMobile()) {
	  scaleTo = windowWidth / imgWidth;
	}
	else {
	  scaleTo = (windowWidth * this.option.zoomPercentage / 100) / imgWidth;
	}

	return scaleTo;
  };

  Actions.prototype.handleNodeWrappedImg = function (toggle) {
	if (toggle) {
	  let newNodeWrapImg = document.createElement("div");
	  newNodeWrapImg.className = this.ElementWrappedImage.className;
	  this.el.parentNode.insertBefore(newNodeWrapImg, this.el);
	  newNodeWrapImg.appendChild(this.el);
	  let imgWidth = this.el.offsetWidth;
	  let imgHeight = this.el.offsetHeight;

	  let viewportPointCenter = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	  };
	  let elementTargetedPointCenter = {
		x: this.el.getBoundingClientRect().left + imgWidth / 2,
		y: this.el.getBoundingClientRect().top + imgHeight / 2
	  };

	  let startTime = Date.now();
	  this.IntervalList.wrappedImgTranslate = setInterval(() => {
		if ((Date.now() - startTime) >= this.option.duration) {
		  this.ElementWrappedImage.translateX = viewportPointCenter.x - elementTargetedPointCenter.x;
		  this.ElementWrappedImage.translateY = viewportPointCenter.y - elementTargetedPointCenter.y;
		  newNodeWrapImg.style.transform = `translate(${this.ElementWrappedImage.translateX}px,${this.ElementWrappedImage.translateY}px)`;
		  clearInterval(this.IntervalList.wrappedImgTranslate);
		}
		else {
		  this.ElementWrappedImage.translateX = ((Date.now() - startTime) / this.option.duration) * (viewportPointCenter.x - elementTargetedPointCenter.x);
		  this.ElementWrappedImage.translateY = ((Date.now() - startTime) / this.option.duration) * (viewportPointCenter.y - elementTargetedPointCenter.y);
		  newNodeWrapImg.style.transform = `translate(${this.ElementWrappedImage.translateX}px,${this.ElementWrappedImage.translateY}px)`;
		}
	  }, 0);

	  newNodeWrapImg.addEventListener('click', this.handleCommon);
	}
	else {
	  let parent = this.el.parentNode;
	  if (parent.classList.contains(this.ElementWrappedImage.className)) {
		clearInterval(this.IntervalList.wrappedImgTranslate);
		let startTime = Date.now();
		this.IntervalList.wrappedImgTranslate = setInterval(() => {
		  if ((Date.now() - startTime) >= this.option.duration || (Date.now() - startTime) >= this.currentTimeExecutedEvent) {
			parent.style.transform = `translate(0px,0px)`;
			this.ElementWrappedImage.translateX = 0;
			this.ElementWrappedImage.translateY = 0;
			clearInterval(this.IntervalList.wrappedImgTranslate);
			parent.parentNode.insertBefore(this.el, parent);
			parent.remove();
		  }
		  else {
			let coordinateX = this.ElementWrappedImage.translateX * (this.currentTimeExecutedEvent - (Date.now() - startTime)) / this.currentTimeExecutedEvent;
			let coordinateY = this.ElementWrappedImage.translateY * (this.currentTimeExecutedEvent - (Date.now() - startTime)) / this.currentTimeExecutedEvent;
			parent.style.transform = `translate(${coordinateX}px,${coordinateY}px)`;
		  }
		}, 0);

	  }
	}
  };

  Actions.prototype.handlePageBackground = function (toggle) {
	if (toggle) {
	  let background = document.createElement("div");
	  background.setAttribute("id", this.ElementPageBackground.idName);
	  background.setAttribute("style", `position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: ${this.option.backgroundColor}; z-index: 9999; opacity: 0;`);
	  document.body.appendChild(background);

	  let startTime = Date.now();
	  this.IntervalList.backgroundPageOpacity = setInterval(() => {
		if ((Date.now() - startTime) > parseInt(this.option.duration) || parseInt(this.option.duration) === 0) {
		  background.style.opacity = "1";
		  this.ElementPageBackground.opacity = 1;
		  this.currentTimeExecutedEvent = this.option.duration;
		  clearInterval(this.IntervalList.backgroundPageOpacity);
		}
		else {
		  this.ElementPageBackground.opacity = (Date.now() - startTime) / this.option.duration;
		  background.style.opacity = `${this.ElementPageBackground.opacity}`;
		  // Calculate time executed events.
		  this.currentTimeExecutedEvent = Date.now() - startTime;
		}
	  }, 0);

	  background.addEventListener("click", this.handleCommon);

	}
	else {
	  clearInterval(this.IntervalList.backgroundPageOpacity);

	  let background = document.getElementById(this.ElementPageBackground.idName);
	  let startTime = Date.now();
	  let animationEffectRemoveBackground = setInterval(() => {
		if ((Date.now() - startTime) > parseInt(this.option.duration) || (Date.now() - startTime) >this.currentTimeExecutedEvent) {
		  background.style.opacity = "0";
		  this.ElementPageBackground.opacity = 0;
		  background.remove();
		  clearInterval(animationEffectRemoveBackground);
		  document.body.classList.remove('prevent-click');
		}
		else {
		  document.body.classList.add('prevent-click');

		  background.style.opacity = `${this.ElementPageBackground.opacity * ((this.currentTimeExecutedEvent - (Date.now() - startTime)) / this.currentTimeExecutedEvent)}`;
		}
	  }, 0);
	}
  };

  Actions.prototype.documentScrollToCancel = function (toggle) {
	if (toggle) {
	  document.addEventListener("scroll", this.handleCommon);
	}
	else {
	  document.removeEventListener("scroll", this.handleCommon);
	}
  };


  Actions.prototype.handleCommon = function () {
	let elementData = document.querySelector(Selector.elementHasData).data;
	elementData.zoomCancel();
  };

  Actions.prototype.effectTranslate = function (toggle) {
	let zoomTo = (typeof this.vzoomScale === "undefined") ? this.calculateScaleZoom() : parseFloat(this.vzoomScale);

	if (toggle) {
	  let startTime = Date.now();

	  this.IntervalList.imgScale = setInterval(() => {
		if ((Date.now() - startTime) >= this.option.duration) {
		  this.el.style.transform = `scale(${zoomTo})`;
		  this.ImgToZoom.scale = zoomTo;
		  clearInterval(this.IntervalList.imgScale);
		}
		else {
		  this.ImgToZoom.scale = 1 + ((Date.now() - startTime) / this.option.duration) * (zoomTo - 1);
		  this.el.style.transform = `scale(${this.ImgToZoom.scale})`;
		}
	  }, 0);


	}
	else {
	  clearInterval(this.IntervalList.imgScale);
	  let startTime = Date.now();
	  this.IntervalList.imgScale = setInterval(() => {
		if ((Date.now() - startTime) >= this.option.duration || (Date.now() - startTime) >= this.currentTimeExecutedEvent) {
		  this.el.style.transform = `scale(1)`;
		  this.ImgToZoom.scale = 1;
		  clearInterval(this.IntervalList.imgScale);
		}
		else {
		  this.el.style.transform = `scale(${this.ImgToZoom.scale - ((Date.now() - startTime) / this.currentTimeExecutedEvent) * (this.ImgToZoom.scale - 1)})`;
		}
	  }, 0);

	}
  };

  Actions.prototype.effectScale = function (toggle) {
	let zoomTo = (typeof this.vzoomScale === "undefined") ? this.calculateScaleZoom() : parseFloat(this.vzoomScale);

	if (toggle) {
	  let startTime = Date.now();
	  let animationScaleEffect = setInterval(() => {
		if ((Date.now() - startTime) >= this.option.duration) {
		  this.el.style.transform = `scale(${zoomTo})`;
		  clearInterval(animationScaleEffect);
		}
		else {
		  this.el.style.transform = `scale(${((Date.now() - startTime) / this.option.duration) * zoomTo})`;
		}
	  }, 0);

	}
	else {

	  let startTime = Date.now();
	  let animationScaleEffect = setInterval(() => {
		if ((Date.now() - startTime) >= this.option.duration) {
		  this.el.style.transform = `scale(1)`;
		  clearInterval(animationScaleEffect);
		}
		else {
		  this.el.style.transform = `scale(${zoomTo * (this.option.duration - (Date.now() - startTime)) / this.option.duration})`;
		}
	  }, 0);
	}
  };

  Actions.prototype.zoomCancel = function () {
	this.handlePageBackground(false);
	this.handleNodeWrappedImg(false);

	if (this.option.zoomEffect.toUpperCase() === "SCALE") {
	  this.effectScale(false);
	}
	else if (this.option.zoomEffect.toUpperCase() === "TRANSLATE") {
	  this.effectTranslate(false);
	}
	else {
	  this.effectTranslate(false);
	}

	if (this.option.scrollToCancel) {
	  this.documentScrollToCancel(false);
	}

	document.body.removeEventListener('click', this.handleCommon);
  };

  if (typeof window !== "undefined") {
	window.VZoom = VZoom;
  }

}();