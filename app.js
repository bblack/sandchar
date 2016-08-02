angular.module('sandchar', [])
.run(($rootScope, Character) => {
    $rootScope.char = Character;
})
.factory('Character', () => {
    function Attribute(a){
        for (prop in a) this[prop] = a[prop];
    }
    Attribute.prototype.rank = function(){
        var v0 = _.find(Character.virtues, {name: this.virtues[0]});
        var v1 = _.find(Character.virtues, {name: this.virtues[1]});
        return Math.floor((v0.rank + v1.rank) / 3);
    };
    function Virtue(name){
        this.name = name;
        this.rank = 0;
    }
    Virtue.prototype.cost = function(){
        return (this.rank + this.rank*this.rank) / 2;
    }
    var Character = {
        name: 'Fredward',
        virtues: ['might', 'resilience', 'grace', 'wisdom', 'valor']
            .map((v) => new Virtue(v)),
        attributes: [{
            name: 'endurance',
            virtues: ['might', 'resilience']
        }, {
            name: 'dexterity',
            virtues: ['might', 'grace']
        }, {
            name: 'aptitude',
            virtues: ['might', 'wisdom']
        }, {
            name: 'strength',
            virtues: ['might', 'valor']
        }, {
            name: 'agility',
            virtues: ['resilience', 'grace']
        }, {
            name: 'focus',
            virtues: ['resilience', 'wisdom']
        }, {
            name: 'willpower',
            virtues: ['resilience', 'valor']
        }, {
            name: 'readiness',
            virtues: ['grace', 'wisdom']
        }, {
            name: 'charisma',
            virtues: ['grace', 'valor']
        }, {
            name: 'intelligence',
            virtues: ['wisdom', 'valor']
        }].map((a) => new Attribute(a))
    };
    return Character;
})
