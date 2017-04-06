describe("Number range string suite", function() {
    var a, data;

    it("should parse simple numbers", function() {
        a = new NumberRangeString(1);

        expect(a.toString()).toBe('1');
    });

    it("should parse ranges as strings", function() {
        a = new NumberRangeString('1-4');
        expect(a.toString()).toBe('1-4');

        a = new NumberRangeString('-1-4');
        expect(a.getFrom()).toBe(-1);
        expect(a.getTo()).toBe(4);
    });

    it("should parse ranges as arrays", function() {
        a = new NumberRangeString([1,4]);
        expect(a.toString()).toBe('1-4');

        a = new NumberRangeString([-1, 4]);
        expect(a.getFrom()).toBe(-1);
        expect(a.getTo()).toBe(4);
    });

    it("countInclusive will count all days in the range", function() {
        data = [
            [4, 1, 4]
            , [2, -1, 0]
            , [1, 1, 1]
        ];
        data.forEach(function(params){
            returnMethodTest('countInclusive', params.shift(), params);
        })
    });

    it("countExclusive will count all days but not the edges", function() {
        data = [
            [2, 1, 4]
            , [0, -1, 0]
            , [-1, 1, 1]
        ];
        data.forEach(function(params){
            returnMethodTest('countExclusive', params.shift(), params);
        })
    });

    it("countNumeric will do an arithmetic operation 'from' - 'to'", function() {
        data = [
            [3, 1, 4]
            , [1, -1, 0]
            , [0, 1, 1]
        ];
        data.forEach(function(params){
            returnMethodTest('countNumeric', params.shift(), params);
        })
    });

    it("moveBy should move the range by a number of days", function() {
        data = [
            // expected, source, moveBy
            [[2, 3], [1, 2], 1]
            , [[1, 2], [1, 2], 0]
        ];
        data.forEach(function(params){
            modifyMethodTest('moveBy', params[0], params[1], params[2]);
        })
    });

    it("moveTo should move the range to start from a specific day", function() {
        data = [
            // expected, source, moveBy
            [[1, 2], [1, 2], 1]
            , [[0, 1], [1, 2], 0]
        ];
        data.forEach(function(params){
            modifyMethodTest('moveTo', params[0], params[1], params[2]);
        })
    });

    it('expend should expand the current range', function(){

        a = new NumberRangeString(5);

        expect(a.expand(new NumberRangeString('6-7')).toString()).toBe('5-7');
    });

    function returnMethodTest(methodName, expectedValue, rangeConstructorParams, methodParams) {
        var r = new NumberRangeString(rangeConstructorParams);
        expect(r[methodName].apply(r, methodParams)).toBe(expectedValue);
    }

    function modifyMethodTest(methodName, expectedRange, sourceRange, methodParam) {
        var r = new NumberRangeString(sourceRange);
        // run
        r[methodName].call(r, methodParam);
        expect(r.getFrom()).toBe(expectedRange[0]);
        expect(r.getTo()).toBe(expectedRange[1]);
    }
});