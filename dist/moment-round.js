(function() {
  var moment = (typeof require !== "undefined" && require !== null) && !require.amd ? require("moment") : this.moment;

  moment.fn.round = function(precision, key, direction) {
    if(typeof direction === 'undefined') {
      direction = 'round';
    }

    var keys = ['Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
    var maxValues = [12, 31, 24, 60, 60, 1000];

    if (key.toLowerCase().indexOf('day') !== -1) {
      key = 'Date';
    }
    
    // Capitalize first letter
    key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

    // make sure key is plural
    if (key.indexOf('s', key.length - 1) === -1 && key.indexOf('Month') === -1 && key.indexOf('Date') === -1) {
      key += 's';
    }
    var value = 0;
    var rounded = false;
    var subRatio = 1;
    var maxValue;

    keys.forEach((function(k, i){      
        if (k === key) {
          value = this._d['get' + key]();
          maxValue = maxValues[i];
          rounded = true;
      
        } else if(rounded) {
          subRatio *= maxValues[i];
          value += this._d['get' + k]() / subRatio;
          this._d['set' + k](0);
        }
    }).bind(this));

    value = Math[direction](value / precision) * precision;
    value = Math.min(value, maxValue);
    this._d['set' + key](value);

    return this;
  }

  moment.fn.ceil = function(precision, key) {
    return this.round(precision, key, 'ceil');
  }

  moment.fn.floor = function(precision, key) {
    return this.round(precision, key, 'floor');
  }

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }
}).call(this);