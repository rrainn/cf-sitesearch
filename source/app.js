(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {
    element = INSTALL.createElement(options.location, element)

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute('app', 'sitesearch')

    var form = document.createElement("form");
    form.style.cssText = options["styling-form"];
    element.appendChild(form);

    var inputSearchBox = document.createElement("input");
    inputSearchBox.setAttribute('type', 'text');
    inputSearchBox.setAttribute('id', 'searchboxq');
    inputSearchBox.setAttribute('placeholder', options["placeholder-field"]);
    inputSearchBox.style.cssText = options["styling-field"];
    form.appendChild(inputSearchBox);

    var submitButton = document.createElement("input");
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', options["placeholder-button"]);
    submitButton.style.cssText = options["styling-button"];
    form.appendChild(submitButton);

    element.addEventListener("submit", searchForm);
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      updateElement()
    }
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }

  function searchForm (event) {
    event.preventDefault();
    window.location.href = 'https://www.google.com/search?q=' + document.getElementById('searchboxq').value + '+site%3A' + INSTALL.proxy.originalURL.hostname;
  }
}())
