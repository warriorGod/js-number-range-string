(function(){

    "use strict";

    window.NumberOrListString = function(list) {
        this.list = null;
        this.setList(list);
    };

    NumberOrListString.prototype.setList = function(list) {
        if (Number(list) == list) {
            // list is a number
            this.list = [list];
        } else {
            this.list = list.split(',');
        }
    };

    NumberOrListString.prototype.getList = function() {
        return this.list;
    };

    NumberOrListString.prototype.getLast = function() {
        return this.list[this.list.length - 1];
    };

    NumberOrListString.prototype.toString = function() {
        return this.list.join(',');
    };


    window.NumberRangeString = function(range){

        // class properties
        this.from = null;
        this.to = null;
        this.outputSeparator = null;
        this.defaultSeparator = '-';

        this.setRange(range);
    };

    // static API function
    NumberRangeString.fromRange = function(range) {
        return new NumberRangeString(range)
    };

    NumberRangeString.prototype.add = function(days) {
        this.from += days;
        this.to += days;

        return this;
    };

    NumberRangeString.prototype.getFrom = function() {
        return this.from;
    };

    NumberRangeString.prototype.getTo = function() {
        return this.to;
    };

    NumberRangeString.prototype.countExclusive = function() {
        return Math.abs(this.from - this.to) - 1;
    };

    NumberRangeString.prototype.countInclusive = function() {
        return Math.abs(this.from - this.to) + 1;
    };

    NumberRangeString.prototype.countNumeric = function() {
        return Math.abs(this.from - this.to);
    };

    NumberRangeString.prototype.moveTo = function(from) {
        var to = from + this.countNumeric();

        this.setRange([from, to]);

        return this;
    };

    NumberRangeString.prototype.moveBy = function(nbr) {
        this.setRange([
            this.from + nbr
            , this.to + nbr
        ]);

        return this;
    };

    NumberRangeString.prototype.includesNumber = function(number) {
        return this.from <= number && this.to >= number;
    };

    NumberRangeString.prototype.expand = function(range) {
        if (range.from < this.from) {
            this.from = range.from;
        }
        if (range.to > this.to) {
            this.to = range.to;
        }
        return this;
    };

    NumberRangeString.prototype.setRange = function(range) {
        var from = null
            , to = null
            , sep = this.outputSeparator // keep set separator
            , regex = /((?:-|)\d+)([^\d]+?)((?:-|)\d+)/i
            , match
            ;

        if (Array.isArray && Array.isArray(range)) {
            from = Number(range[0]);
            to = Number(range[1]);
            sep = range[2] ? range[2] : this.outputSeparator;
        } else if (Number(range) == range) {
            // number or number as a string
            from = Number(range);
            to = Number(range);
        } else {
            // a proper string
            match = regex.exec(range);
            if (!match) {
                // can't find a range here ...
                throw 'Cant parse ' + range;
            }

            from = Number(match[1]);
            sep = match[2];
            to = Number(match[3]);
        }

        this.from = from;
        this.to = to;
        this.outputSeparator = sep;

        return this;
    };

    NumberRangeString.prototype.toString = function(separator) {
        var sep;

        if (this.from == this.to) {
            return this.from + '';
        } else {
            sep = (separator != undefined ? separator : this.outputSeparator);
            if (sep === null) {
                // no separator supplied, no separator found in the range
                sep = this.defaultSeparator;
            }
            return this.from.toString() + sep + this.to.toString();
        }
    };



})();
