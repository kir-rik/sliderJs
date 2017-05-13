var sliderJsModule = (function(){

    class SliderJs {

        constructor(sourceId, config){
            this.config = config;
            this.currentIndex = (config.start || 1 ) - 1;               
            this.isAutoplay = config.autoplay || config.autoplay == undefined;
            this.autoplayInterval = config.autoplayInterval || 3000;     
            
            this.container = document.getElementById(sourceId);
            this.setupContainer();

            this.elementsCollection = this.getElements();
            this.setupElements();

            for (var i = 0; i < this.elementsCollection.length; i++) {
                this.hide(this.elementsCollection[i]);
            }
            this.show(this.elementsCollection[this.currentIndex]);

            this.addSlideButtons();

            if (!config.hideControls){
                this.addControlsBar();
            }

            if (this.isAutoplay){
                this.autoplayTimerId = this.startAutoplay();
            }

        };

        next() {
            this.hide( this.elementsCollection[this.currentIndex] );
            if ( this.currentIndex < this.elementsCollection.length -1 ) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.show( this.elementsCollection[this.currentIndex] );
        };

        prev() {
            this.hide( this.elementsCollection[this.currentIndex] );
            if ( this.currentIndex > 0 ){
                this.currentIndex--;
            } else {
                this.currentIndex = this.elementsCollection.length - 1;
            }
            this.show( this.elementsCollection[this.currentIndex] );
        };

        hide(elem) {
            elem.style.display = 'none'
        };

        show(elem) {
            elem.style.display = 'block'
        };

        getElements() {
            var elements = [];
            for (var i = 0; i < this.container.childNodes.length; i++) {
                if (this.container.childNodes[i].nodeType == 1){
                    elements.push(this.container.childNodes[i]);
                }
            }
            return elements;
        };

        setupContainer() {
            this.container.classList.add("slider-container");
            if (this.config.width) {
                this.container.style.width = this.config.width+'px';
            }
            if (this.config.height) {
                this.container.style.height = this.config.height+'px';
            }
        };

        setupElements() {
            for (var i = 0; i < this.elementsCollection.length; i++) {
                this.elementsCollection[i].classList.add("slider-element");
                if (this.config.width) {
                    this.elementsCollection[i].style.width = config.width+'px';
                }
                if (this.config.height) {
                    this.elementsCollection[i].style.height = config.height+'px';
                }
            }
        }

        addSlideButtons() {
            var self = this;

            var left = document.createElement('div');
            left.classList.add("slider-slide-button");
            left.classList.add("slider-noselect");
            left.style.left='0';
            left.onclick = function () {
                self.prev();
            };
            
            var right = document.createElement('div');
            right.classList.add("slider-slide-button");
            right.classList.add("slider-noselect");
            right.style.right='0';
            right.onclick = function () {
                self.next();
            };

            this.container.appendChild(left);
            this.container.appendChild(right);
            
        }

        addControlsBar() {
            var self = this;

            var controlsBar = document.createElement('div');  
            controlsBar.classList.add("slider-controls-bar");

            this.autoplayButton = document.createElement('a');
            this.autoplayButton.appendChild(document.createElement('div'));  
            this.autoplayButton.classList.add("slider-controls-bar-button");
            this.autoplayButton.classList.add(
                this.isAutoplay ? 
                "slider-controls-bar-button-stop" : 
                "slider-controls-bar-button-start"
                );

            this.autoplayButton.onclick = function(){
                self.autoplayButtonClick();
            };

            var counter = document.createElement('span');  
            counter.classList.add('slider-counter')
            counter.innerText = `${this.currentIndex+1} / ${this.elementsCollection.length}`;

            controlsBar.appendChild(this.autoplayButton);

            this.container.appendChild(controlsBar);
        }
        
        startAutoplay(){
            var self = this;
            return this.autoplayIntervalId = setInterval(function(){
                self.next();
            }, this.autoplayInterval);
        }

        stopAutoplay(){
            if (this.autoplayTimerId){
                clearInterval(this.autoplayTimerId);
            }
        }

        autoplayButtonClick(){
            
            if (this.isAutoplay){
                this.stopAutoplay();
                this.autoplayButton.classList.add('slider-controls-bar-button-start');
                this.autoplayButton.classList.remove('slider-controls-bar-button-stop');
            } else {
                this.autoplayTimerId = this.startAutoplay();
                this.autoplayButton.classList.add('slider-controls-bar-button-stop');
                this.autoplayButton.classList.remove('slider-controls-bar-button-start');
            }

            this.isAutoplay = !this.isAutoplay;
        }

    }

    return {
        createSlider: createSlider
    }
    /**
     * creates slider
     * @function
     * @param {string} sourceId - slider container id
     * @param {Object} config - configuration object
     * @param {number} config.width - Set width of the slideshow.
     * @param {number} config.height - Set height of the slideshow.
     * @param {number} config.start - Set the first slide in the slideshow
     * @param {boolean} config.autoplay - Set the slides autoplay
     * @param {number} config.autoplayInterval - Set the slides autoplay inteval, ms
     * @param {boolean} config.hideControls - Hide controls bar
     */
    function createSlider(sourceId, config) {
        return new SliderJs(sourceId, config);
    }



})();
