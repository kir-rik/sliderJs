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
            this.isPaused = false;  
            
            this.container = document.getElementById(sourceId);
            this.setupContainer();

            this.elementsCollection = this.getElements();
            this.setupElements();

            for (var i = 0; i < this.elementsCollection.length; i++) {
                this.hideAllBut(this.currentIndex);
            }

            if (!config.hideControls){
                this.addControlsBar();
            }

            if (this.isAutoplay){
                this.autoplayTimerId = this.startAutoplay();
            }

        };

        next() {
            var targetIndex = (this.currentIndex+1) % this.elementsCollection.length;
            // this.hideAllBut(this.currentIndex, targetIndex);

            hide( this.elementsCollection[this.currentIndex], 'left' );
            show( this.elementsCollection[targetIndex], 'left' );

            this.currentIndex = targetIndex;

            this.updateCounterSpanText();
        };

        prev() {
            var n = this.elementsCollection.length;
            var targetIndex = ((this.currentIndex - 1) % n + n) % n;
            // this.hideAllBut(this.currentIndex, targetIndex);

            hide( this.elementsCollection[this.currentIndex], 'right' );
            show( this.elementsCollection[targetIndex], 'right' );

            this.currentIndex = targetIndex;

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
            var self = this;
            this.container.classList.add("slider-container");
            this.container.classList.add('slider-noselect');

            // this.container.onmouseover = function(){
            //     self.pause();
            // }
            // this.container.onmouseout = function(){
            //     self.unPause();
            // }

            this.container.addEventListener("click", function(event){
                if (event.clientX > self.container.offsetWidth/2){
                    self.next();
                } else {
                    self.prev();
                }
            });

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

        addControlsBar() {
            var self = this;

            var controlsBar = document.createElement('div');  
            controlsBar.classList.add("slider-controls-bar");

            controlsBar.addEventListener("click", _stopPropagation);
            controlsBar.addEventListener("mouseover", _stopPropagation);
            controlsBar.addEventListener("mouseout", _stopPropagation);

            
            this.autoplayButton = document.createElement('a');
            this.autoplayButton.appendChild(document.createElement('div'));  
            this.autoplayButton.classList.add("slider-controls-bar-button");
            this.autoplayButton.classList.add(
                this.isAutoplay ? 
                "slider-controls-bar-button-stop" : 
                "slider-controls-bar-button-start"
                );
            this.autoplayButton.addEventListener("click", function(){
                self.autoplayButtonClick();
            });
        

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

            if (this.autoplayButton){
                this.autoplayButton.classList.add('slider-controls-bar-button-stop');
                this.autoplayButton.classList.remove('slider-controls-bar-button-start');
            }

            console.log('startAutoplay');
            return this.autoplayIntervalId = setInterval(function(){
                self.next();
            }, this.autoplayInterval);
        };

        stopAutoplay(){
            this.isAutoplay = false;

            if (this.autoplayButton){
                this.autoplayButton.classList.add('slider-controls-bar-button-start');
                this.autoplayButton.classList.remove('slider-controls-bar-button-stop');
            }

            if (this.autoplayTimerId){
                console.log('stopAutoplay');
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
            if (this.counterSpan){
                this.counterSpan.innerText = `${this.currentIndex+1} / ${this.elementsCollection.length}`;
            }
        };

        pause(){
            console.log('pause?');
            if (this.isAutoplay && !this.isPaused) {
                console.log('pause!');
                this.isPaused = true;
                this.stopAutoplay();
            }
        }

        unPause(){
            console.log('unpause?');
            if (this.isPaused) {
                console.log('unpause!');
                this.isPaused = false;
                this.startAutoplay();
            }
        }

        hideAllBut(but1, but2){
            for (var i = 0; i < this.elementsCollection.length; i++) {
                if (i == but1 || i == but2) continue;
                hide(this.elementsCollection[i]);
            }
        }

    }

    function hide(elem, direction) {
        elem.classList.remove('slide-right-in');
        elem.classList.remove('slide-left-in');
        elem.classList.remove('slide-right-out');
        elem.classList.remove('slide-left-out');

        if (!direction || direction == 'none'){
            elem.classList.add('slide-hide');
            return;
        }

        if (direction == 'left'){
            elem.classList.add('slide-left-out');
            return;
        }
        if (direction == 'right'){
            elem.classList.add('slide-right-out');
            return;
        }
    };

    function show(elem, direction) {
        elem.classList.remove('slide-hide');
        elem.classList.remove('slide-right-in');
        elem.classList.remove('slide-left-in');
        elem.classList.remove('slide-right-out');
        elem.classList.remove('slide-left-out');

        if (direction == 'left'){
            elem.classList.add('slide-left-in');
        }
        if (direction == 'right'){    
            elem.classList.add('slide-right-in');
        }
    };

    function _stopPropagation(event){
        event.stopPropagation();
    }

    window.SliderJs = SliderJs;

})();
