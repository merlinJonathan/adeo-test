const assert = require('assert');
const { main, verifyAnimal } = require('./main.js'); 

describe('main', () => {
    it('should return nothing without args', () => {
        const args = getDefaultArgs();
        process.argv = args;

        const result = main(args);

        assert.notEqual(result, null);
        assert.strictEqual(result.length, 0);
    });

    it('should return nothing with unfound filter', () => {
        const args = getDefaultArgs();
        args.push("--filter=gnergnengorkg,edrpgb,jo");
        process.argv = args;

        const result = main();

        assert.notEqual(result, null);
        assert.strictEqual(result.length, 0);
    });

    it('should return Dillauti with only Anoa', () => {
        const args = getDefaultArgs();
        args.push("--filter=Anoa");
        process.argv = args;

        const result = main(args);

        assert.notEqual(result, null);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].name, "Dillauti [1]");
        assert.notEqual(result[0].people, null);
        assert.strictEqual(result[0].people.length, 1);
        assert.strictEqual(result[0].people[0].name, 'Winifred Graham [1]');
        assert.notEqual(result[0].people[0].animals, null);
        assert.strictEqual(result[0].people[0].animals.length, 1);
        assert.notEqual(result[0].people[0].animals[0], 'Anoa');
    });

    it('should return multiple country', () => {
        const args = getDefaultArgs();
        args.push("--filter=Duck");
        process.argv = args;

        const result = main(args);

        assert.notEqual(result, null);
        assert.strictEqual(result.length, 3);
        assert.strictEqual(result[0].name, "Dillauti [2]");
        assert.notEqual(result[0].people, null);
        assert.strictEqual(result[0].people.length, 2);
        assert.strictEqual(result[0].people[0].name, 'Winifred Graham [1]');
        assert.strictEqual(result[0].people[1].name, 'Louise Pinzauti [1]');
    });

    function getDefaultArgs() {
        return ['node', 'app.js'];
    }
});

describe('verifyPattern', () => {
    it('should return false without pattern', () => {
        const result = verifyAnimal("toto", "piwi");
        assert.strictEqual(result, false);
    });

    it('should return true with pattern', () => {
        const result = verifyAnimal("toto", "to");
        assert.strictEqual(result, true);
    });

    it('should return false in uppercase with pattern', () => {
        const result = verifyAnimal("TOTO", "to");
        assert.strictEqual(result, false);
    });

    it('should return true in uppercase in both values', () => {
        const result = verifyAnimal("TOTO", "to");
        assert.strictEqual(result, false);
    });
});

