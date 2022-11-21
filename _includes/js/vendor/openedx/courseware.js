// Once generated by CoffeeScript 1.9.3, but now lives as pure JS
/* eslint-disable */
(function() {
    this.Courseware = (function() {
      Courseware.prefix = '';
  
      function Courseware() {
        Logger.bind();
        this.render();
      }
  
      Courseware.start = function() {
        return new Courseware;
      };
  
      Courseware.prototype.render = function() {
        var courseContentElement = $('.course-content')[0];
        var blocks = XBlock.initializeBlocks(courseContentElement);
  
        if (courseContentElement.dataset.enableCompletionOnViewService === 'true') {
          RequireJS.require(['bundles/CompletionOnViewService'], function() {
              markBlocksCompletedOnViewIfNeeded(blocks[0].runtime, courseContentElement);
          });
        }
  
        return $('.course-content .histogram').each(function() {
          var error, histg, id;
          id = $(this).attr('id').replace(/histogram_/, '');
          try {
            histg = new Histogram(id, $(this).data('histogram'));
          } catch (_error) {
            error = _error;
            histg = error;
            if (typeof console !== "undefined" && console !== null) {
              console.log(error);
            }
          }
          return histg;
        });
      };
  
      return Courseware;
  
    })();
  
  }).call(this);