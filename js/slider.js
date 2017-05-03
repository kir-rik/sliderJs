var sliderJsModule = (function(){

    return {
        createSlider: createSlider
    }

    var currentIndex;
    var imgsCollection;

    /**
     * creates slider
     * @function
     * @param {string} sourceId - slider container id
     * @param {Object} config - configuration object
     * @param {number} config.width - Set width of the slideshow.
     * @param {number} config.height - Set height of the slideshow.
     * @param {number} config.start - Set the first slide in the slideshow
     */
    function createSlider(sourceId, config){

        currentIndex = (config.start || 1 ) - 1;

        var container = document.getElementById(sourceId);
        setupContainer(container, config);

        imgsCollection = getImgs(container);
        setupImgs(imgsCollection, config);

        for (var i = 0; i < imgsCollection.length; i++) {
            hide(imgsCollection[i]);
        }
        show(imgsCollection[currentIndex]);

        addSlideButtons(container);
    }

    function next(){
        hide( imgsCollection[currentIndex] );
        if ( currentIndex < imgsCollection.length -1 ){
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        show( imgsCollection[currentIndex] );
    }

    function prev(){
        hide( imgsCollection[currentIndex] );
        if ( currentIndex > 0 ){
            currentIndex--;
        } else {
            currentIndex = imgsCollection.length - 1;
        }
        show( imgsCollection[currentIndex] );
    }

    function hide(elem){
        elem.style.display = 'none'
    }

    function show(elem){
        elem.style.display = 'block'
    }

    function getImgs(container){
        var imgs = [];
        for (var i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].tagName == 'IMG'){
                imgs.push(container.childNodes[i]);
            }
        }
        return imgs;
    }

    function setupContainer(container, config){
        container.style.overflow = 'hidden';
        container.style.position= 'relative';
        container.style.width = (config.width || 1024)+'px';
        container.style.height = (config.height || 768)+'px';
        container.style.zIndex='1';
    }

    function setupImgs( imgsCollection, config ){
        for (var i = 0; i < imgsCollection.length; i++) {
            imgsCollection[i].style.maxWidth = (config.width || 1024)+'px';
            imgsCollection[i].style.maxHeight = (config.height || 768)+'px';
            imgsCollection[i].style.zIndex='2';
        }
    }

    function addSlideButtons(container){
        
        var left = document.createElement('div');
        left.classList.add("slider-slide-button");
        left.classList.add("slider-noselect");
        left.style.left='0';
        left.onclick=prev;
        
        var right = document.createElement('div');
        right.classList.add("slider-slide-button");
        right.classList.add("slider-noselect");
        right.style.right='0';
        right.onclick=next;

        container.appendChild(left);
        container.appendChild(right);
        
    }
})();
