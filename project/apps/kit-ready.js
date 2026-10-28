// R2: an order that turns ready travels from the PREPARING column into READY
// (FLIP: measure, move in the DOM, play the difference back), turns green on
// arrival, then the O1 ribbon catches one pass of light. Reduced motion: the
// card just appears in READY, green, with no ribbon.
// kitReadyMove(card, readyColumn, { before }) -> Promise
(function () {
  window.kitReadyMove = function (card, column, opts) {
    opts = opts || {};
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var from = card.getBoundingClientRect();
    column.insertBefore(card, opts.before || column.querySelector('.kit-order'));
    card.classList.add('is-ready');
    if (reduce) return Promise.resolve();
    var to = card.getBoundingClientRect();
    var move = card.animate([
      { transform: 'translate(' + (from.left - to.left) + 'px,' + (from.top - to.top) + 'px)' },
      { transform: 'none' }
    ], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' });
    return move.finished.then(function () {
      card.classList.remove('just-ready');
      void card.offsetWidth;
      card.classList.add('just-ready');
    });
  };
})();
