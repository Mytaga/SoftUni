const assert = require('chai').assert;
const expect = require('chai').expect;
const flowerShop = require('./flowerShop');

describe('calcPriceOfFlowers method', () => {
    it('It should work correct', () => {
        assert.equal(flowerShop.calcPriceOfFlowers('roses', 20, 5), `You need $100.00 to buy roses!`);
    });
    it('It should work correct with decimal', () => {
        assert.equal(flowerShop.calcPriceOfFlowers('roses', 10, 5), `You need $50.00 to buy roses!`);
    });
    it('It should throw exception with non string flower - number', () => {
        expect(() => flowerShop.calcPriceOfFlowers(55, 10, 5)).to.throw('Invalid input!');
    });
    it('It should throw exception with non string flower - array', () => {
        expect(() => flowerShop.calcPriceOfFlowers(['55'], 10, 5)).to.throw('Invalid input!');
    });
    it('It should throw exception with non integer price - array', () => {
        expect(() => flowerShop.calcPriceOfFlowers('roses', [10], 5)).to.throw('Invalid input!');
    });
    it('It should throw exception with non integer price - string', () => {
        expect(() => flowerShop.calcPriceOfFlowers('roses', '10', 5)).to.throw('Invalid input!');
    });
    it('It should throw exception with non integer quantity - array', () => {
        expect(() => flowerShop.calcPriceOfFlowers('roses', 10, [5])).to.throw('Invalid input!');
    });
    it('It should throw exception with non integer quantity - string', () => {
        expect(() => flowerShop.calcPriceOfFlowers('roses', 10, '5')).to.throw('Invalid input!');
    });
})

describe('checkFlowersAvailable method', () => {
    it('should work correct', () => {
        assert.equal(flowerShop.checkFlowersAvailable('roses', ['roses', 'violets']), `The roses are available!`)
    });
    it('should work correct second', () => {
        assert.equal(flowerShop.checkFlowersAvailable('violets', ['violets']), `The violets are available!`)
    });
    it('It should return if the flower doesnt exist', () => {
        assert.equal(flowerShop.checkFlowersAvailable('roses', ['violets']), 'The roses are sold! You need to purchase more!');
    });
    it('It should return if the flower doesnt exist second', () => {
        assert.equal(flowerShop.checkFlowersAvailable('roses', []), 'The roses are sold! You need to purchase more!');
    });

})

describe('sellFlowers method', () => {
    it('should work correct', () => {
        assert.equal(flowerShop.sellFlowers(['roses', 'violets', 'others'], 0), `violets / others`)
    });
    it('It should throw exception for non array - string', () => {
        expect(() => flowerShop.sellFlowers('roses', 'violets', 'others', 0)).to.throw('Invalid input!');
    });
    it('It should throw exception for non array - object', () => {
        expect(() => flowerShop.sellFlowers({}, 0)).to.throw('Invalid input!');
    });
    it('It should throw exception for non integer - object', () => {
        expect(() => flowerShop.sellFlowers(['roses', 'violets', 'others'], {})).to.throw('Invalid input!');
    });
    it('It should throw exception for non integer - string', () => {
        expect(() => flowerShop.sellFlowers(['roses', 'violets', 'others'], '1')).to.throw('Invalid input!');
    });
    it('It should throw exception for index less than zero ', () => {
        expect(() => flowerShop.sellFlowers(['roses', 'violets', 'others'], -1)).to.throw('Invalid input!');
    });
    it('It should throw exception for index more than array length ', () => {
        expect(() => flowerShop.sellFlowers(['roses', 'violets', 'others'], 3)).to.throw('Invalid input!');
    });
})
