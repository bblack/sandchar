angular.module('sandchar', [])
.controller('Attributes', ($scope, Character) => {
    $scope.ATTRIBUTES = [{
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
    }];
    $scope.calcAttribute = (attname) => {
        var att = _.find($scope.ATTRIBUTES, {name: attname});
        var v0 = _.find(Character.virtues, {name: att.virtues[0]});
        var v1 = _.find(Character.virtues, {name: att.virtues[1]});
        return Math.floor((v0.rank + v1.rank) / 3);
    }
})
.controller('Virtues', ($scope, Character) => {
    $scope.char = Character;
    $scope.cost = (rank) => 1/2*(rank + rank*rank);
})
.factory('Character', () => {
    return {
        virtues: ['might', 'resilience', 'grace', 'wisdom', 'valor'].map((v) => ({
            name: v,
            rank: 0
        }))
    };
})
