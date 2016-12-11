define(['Example'], function(Example) {
    'use strict';

    var example;
    beforeEach(function() {
        example = 7; //{}
    });

    describe('Example', function() {
        it('should be an object', function() {
            expect(example).to.be.a('object');
        });
    });
});