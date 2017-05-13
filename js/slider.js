(function(){

    /**
     * Turns container into slider
     */
    class SliderJs {

        /**
         * Turns container into slider
         * @param {string} sourceId - slider container id
         * @param {Object} config - configuration object
         * @param {number} config.width - Set width of the slideshow.
         * @param {number} config.height - Set height of the slideshow.
         * @param {number} config.start - Set the first slide in the slideshow
         * @param {boolean} config.autoplay - Set the slides autoplay
         * @param {number} config.autoplayInterval - Set the slides autoplay inteval, ms
         * @param {boolean} config.hideControls - Hide controls bar
         */
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
                hide(this.elementsCollection[i]);
            }
            show(this.elementsCollection[this.currentIndex]);

            this.addSlideButtons();

            if (!config.hideControls){
                this.addControlsBar();
            }

            if (this.isAutoplay){
                this.autoplayTimerId = this.startAutoplay();
            }

        };

        next() {
            hide( this.elementsCollection[this.currentIndex] );
            if ( this.currentIndex < this.elementsCollection.length -1 ) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            show( this.elementsCollection[this.currentIndex] );
            this.updateCounterSpanText();
        };

        prev() {
            hide( this.elementsCollection[this.currentIndex] );
            if ( this.currentIndex > 0 ){
                this.currentIndex--;
            } else {
                this.currentIndex = this.elementsCollection.length - 1;
            }
            show( this.elementsCollection[this.currentIndex] );
            this.updateCounterSpanText();
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
            this.container.classList.add('slider-noselect');

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

            this.counterSpan = document.createElement('span');  
            this.counterSpan.classList.add('slider-counter') ;
            this.counterSpan.classList.add('slider-noselect');
            
            this.updateCounterSpanText();

            controlsBar.appendChild(this.autoplayButton);
            controlsBar.appendChild(this.counterSpan);

            this.container.appendChild(controlsBar);
        }
        
        startAutoplay(){
            var self = this;
            
            this.isAutoplay = true;

            this.autoplayButton.classList.add('slider-controls-bar-button-stop');
            this.autoplayButton.classList.remove('slider-controls-bar-button-start');

            return this.autoplayIntervalId = setInterval(function(){
                self.next();
            }, this.autoplayInterval);
        };

        stopAutoplay(){
            this.isAutoplay = false;

            this.autoplayButton.classList.add('slider-controls-bar-button-start');
            this.autoplayButton.classList.remove('slider-controls-bar-button-stop');

            if (this.autoplayTimerId){
                clearInterval(this.autoplayTimerId);
            }
        };

        autoplayButtonClick(){
            if (this.isAutoplay){
                this.stopAutoplay();
            } else {
                this.autoplayTimerId = this.startAutoplay();
            }
        };

        updateCounterSpanText(){
            this.counterSpan.innerText = `${this.currentIndex+1} / ${this.elementsCollection.length}`;
        };

    }

    function hide(elem) {
        elem.style.display = 'none'
    };

    function show(elem) {
        elem.style.display = 'block'
    };

    window.SliderJs = SliderJs;

})();
