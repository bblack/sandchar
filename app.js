function p(d){
    return (d + d*d)/2;
}
angular.module('sandchar', [])
.run(($rootScope, Character) => {
    Character.name = 'Fredward';
    Character.aspects = [
        'Sells shady things to shady people.',
        'Mad scientist, easy on the science.'
    ]
    $rootScope.char = Character;
})
.factory('Character', () => {
    function Ability(name){
        this.name = name;
        this.rank = 0;
    }
    Ability.prototype.power = function(){
        return p(this.rank);
    }
    function Attribute(a){
        for (prop in a) this[prop] = a[prop];
    }
    Attribute.prototype.rank = function(){
        var v0 = _.find(Character.virtues, {name: this.virtues[0]});
        var v1 = _.find(Character.virtues, {name: this.virtues[1]});
        return Math.floor((v0.rank + v1.rank) / 3);
    };
    function Skill(name){
        this.name = name;
        this.rank = 0;
    }
    Skill.prototype.power = function(){
        return p(this.rank);
    }
    function Virtue(name){
        this.name = name;
        this.rank = 0;
    }
    Virtue.prototype.power = function(){
        return p(this.rank);
    }
    var Character = {
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
        }, (v, k) => new Attribute({name: k, virtues: v})),
        skills: _.map(['assess person', 'balance', 'block', 'bluff', 'climb',
            'craft', 'deceive', 'disable device', 'dodge', 'gather information',
            'handle animal', 'hide', 'intimidate', 'jump', 'know', 'listen',
            'move silently', 'negotiate', 'perform', 'research', 'ride',
            'search', 'sense motive', 'sleight of hand', 'smell', 'spellcraft',
            'spot', 'survive', 'swim', 'tumble', 'wear armor', 'wield bow',
            'wield melee weapon', 'wield thrown weapon'], (s) => new Skill(s)),
        aspects: [],
        abilities: _.times(3, () => new Ability())
    };
    _.extend(Character, {
        abilitiesPower: () => _.inject(Character.abilities, (m, s) => m + s.power(), 0),
        skillsPower: () => _.inject(Character.skills, (m, s) => m + s.power(), 0),
        virtuesPower: () => _.inject(Character.virtues, (m, v) => m + v.power(), 0),
        totalPower: () => Character.virtuesPower() + Character.skillsPower() +
            Character.abilitiesPower(),
        addAspect: () => Character.aspects.push('')
    })
    return Character;
})
