const sliderJsModule = (function(){
    return {
        createSlider: createSlider
    }
    /**
     * creates slider
     * @function
     * @param {string} sourceId - slider container id
     * @param {Object} config - configuration object
     * @param {number} config.width - Set width of the slideshow.
     * @param {number} config.heigth - Set height of the slideshow.
     * @param {number} config.start - Set the first slide in the slideshow
     */
    function createSlider(sourceId, config){

        var container = document.getElementById(sourceId);
        var urls = getImgsUrlFromContainer(container);
        // container.style.overflow = 'hidden';
        // container.style.display = 'block';

        var innerContainer  = document.createElement('div');
        innerContainer.style.overflow = 'hidden';
        innerContainer.style.position= 'relative';
        innerContainer.style.width = (config.width || 1024)+'px;'
        innerContainer.style.heigth = (config.heigth || 768)+'px;'

        container.appendChild(innerContainer);

    }

    // function getImgsUrlFromContainer(elem){
    //     var urls = [];
    //     for (var i = 0; i < elem.childNodes.length; i++) {
    //         var node = elem.childNodes[i];
    //         var srcVal = elem.getAttribute("src");
    //         if (node.tagName == 'IMG' && srcVal){
    //             urls.push(srcVal);
    //         }
    //     }
    // }

})();
