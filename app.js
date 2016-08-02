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
        attributes: _.map({
            endurance: ['might', 'resilience'],
            dexterity: ['might', 'grace'],
            aptitude: ['might', 'wisdom'],
            strength: ['might', 'valor'],
            agility: ['resilience', 'grace'],
            focus: ['resilience', 'wisdom'],
            willpower: ['resilience', 'valor'],
            readiness: ['grace', 'wisdom'],
            charisma: ['grace', 'valor'],
            intelligence: ['wisdom', 'valor']
        }, (v, k) => new Attribute({name: k, virtues: v}))
    };
    return Character;
})
