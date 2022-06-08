var DarkModeSwitcherModule = (function (doc) {

    var _selector, _parent;

    var _init = function ({
        selector,
        parent
    }) {
        _selector = selector;
        _parent = parent || 'body';
        _initSelector();
        _initMode();
        _addEventListeners();
    }

    var _initSelector = function () {
        if (!_selector) return null;
        if (!_selector.classList.contains('sr-only')) {
            _selector.classList.add('sr-only');
        }
    }

    var _parentSelector = function () {
        return doc.querySelector(_parent) || null;
    }

    var _isSelectorTypeCheckboxOrRadio = function () {
        return 'INPUT' === _selector.tagName && ('radio' === _selector.type || 'checkbox' === _selector.type);
    }

    var _swicthDarkMode = function () {
        if ('INPUT' === _selector.tagName && 'checkbox' === _selector.type) {
            _parentSelector().dataset.theme = _selector.checked ? 'dark' : 'light';
        }
        window.localStorage.setItem('app.dark-mode', JSON.stringify(_selector.checked));
    }

    var _getModeFromLocalStorage = function () {
        return window.localStorage.getItem('app.dark-mode');
    }

    var _addEventListeners = function () {
        if (_selector) {
            var eventType = 'INPUT' === _selector.tagName && ('radio' === _selector.type || 'checkbox' === _selector.type) ? 'change' : 'click';
            _selector.addEventListener(eventType, _swicthDarkMode, false);
        }
    }

    var _initMode = function () {
        var parent = _parentSelector();
        if (parent) {
            var dm;
            if ('dark' === parent.dataset.theme && _getModeFromLocalStorage()) {
                dm = JSON.parse(window.localStorage.getItem('app.dark-mode'));
            }
            if (_isSelectorTypeCheckboxOrRadio()) {
                _selector.checked = undefined !== dm;
            }
            parent.dataset.theme = undefined !== dm ? 'dark' : 'light';
            window.localStorage.setItem('app.dark-mode', JSON.stringify((undefined !== dm ? dm : false)));
        }
    }

    return {
        switch: _init
    }

})(window.document);
var darkMode = DarkModeSwitcherModule;
