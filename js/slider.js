var sliderJsModule = (function(){

    class SliderJs {

        constructor(sourceId, config){
            this.config = config;
            this.currentIndex = (config.start || 1 ) - 1;        
            
            this.container = document.getElementById(sourceId);
            this.setupContainer();

            this.elementsCollection = this.getElements();
            this.setupElements();

            for (var i = 0; i < this.elementsCollection.length; i++) {
                this.hide(this.elementsCollection[i]);
            }
            this.show(this.elementsCollection[this.currentIndex]);

            this.addSlideButtons();

            this.autoplayInterval = config.autoplayInterval || 3000;

            if (config.autoplay || config.autoplay == undefined ){
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
                if (this.container.childNodes[i].tagName == 'IMG'){
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

    }

    return {
        createSlider: createSlider
    }

    // var currentIndex;
    // var elementsCollection;

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
     */
    function createSlider(sourceId, config) {
        
        return new SliderJs(sourceId, config);


        //currentIndex = (config.start || 1 ) - 1;

        //var container = document.getElementById(sourceId);
        //setupContainer(container, config);

        //elementsCollection = getImgs(container);
        //setupImgs(elementsCollection, config);

        // for (var i = 0; i < elementsCollection.length; i++) {
        //     hide(elementsCollection[i]);
        // }
        // show(elementsCollection[currentIndex]);

        // addSlideButtons(container);
    }

    // function next(){
    //     hide( elementsCollection[currentIndex] );
    //     if ( currentIndex < elementsCollection.length -1 ){
    //         currentIndex++;
    //     } else {
    //         currentIndex = 0;
    //     }
    //     show( elementsCollection[currentIndex] );
    // }

    // function prev(){
    //     hide( elementsCollection[currentIndex] );
    //     if ( currentIndex > 0 ){
    //         currentIndex--;
    //     } else {
    //         currentIndex = elementsCollection.length - 1;
    //     }
    //     show( elementsCollection[currentIndex] );
    // }

    // function hide(elem){
    //     elem.style.display = 'none'
    // }

    // function show(elem){
    //     elem.style.display = 'block'
    // }

    // function getImgs(container){
    //     var imgs = [];
    //     for (var i = 0; i < container.childNodes.length; i++) {
    //         if (container.childNodes[i].tagName == 'IMG'){
    //             imgs.push(container.childNodes[i]);
    //         }
    //     }
    //     return imgs;
    // }

    // function setupContainer(container, config){
    //     container.classList.add("slider-container");
    //     if (config.width) {
    //         container.style.width = config.width+'px';
    //     }
    //     if (config.height) {
    //         container.style.height = config.height+'px';
    //     }
    // }

    // function setupImgs( elementsCollection, config ){
    //     for (var i = 0; i < elementsCollection.length; i++) {
    //         elementsCollection[i].classList.add("slider-element");
    //         if (config.width) {
    //             elementsCollection[i].style.width = config.width+'px';
    //         }
    //         if (config.height) {
    //             elementsCollection[i].style.height = config.height+'px';
    //         }
    //     }
    // }

    // function addSlideButtons(container){
        
    //     var left = document.createElement('div');
    //     left.classList.add("slider-slide-button");
    //     left.classList.add("slider-noselect");
    //     left.style.left='0';
    //     left.onclick=prev;
        
    //     var right = document.createElement('div');
    //     right.classList.add("slider-slide-button");
    //     right.classList.add("slider-noselect");
    //     right.style.right='0';
    //     right.onclick=next;

    //     container.appendChild(left);
    //     container.appendChild(right);
        
    // }

})();
