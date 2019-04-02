

let unitInfo = new Vue({

  el: '#unitInfo',
  data: {
    unitName: '',
    hp: '',
    attack: '',
    attackBonus: [''],
    armor: '',
    cost: {},
    display: false,
  },
  created() {
    this.aoeUnit();
  },

  methods: {
    async aoeUnit() {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/' + 'https://age-of-empires-2-api.herokuapp.com/api/v1/unit/' + this.unitName);
        this.hp = response.data.hit_points;
        this.attack = response.data.attack;
        this.attackBonus = response.data.attack_bonus;
        this.armor = response.data.armor;
        this.cost = response.data.cost;
        this.display = true;
      } catch (error) {
        console.log(error);
      }
    },

    createUnit(){
      this.display = true;
      this.aoeUnit();
    },
  },

  computed: {
    relatedArr : function (){
      let related = new Array;
      if (this.cost.Wood > 0){
        var temp = {name: 'Wood', price: this.cost.Wood}
        related.push(temp);
      }
      if (this.cost.Food > 0){
        var temp = {name: 'Food', price: this.cost.Food}
        related.push(temp);
      }
      if (this.cost.Gold > 0){
        var temp = {name: 'Gold', price: this.cost.Gold}
        related.push(temp);
      }
      if (this.cost.Stone > 0){
        var temp = {name: 'Stone', price: this.cost.Stone}
        related.push(temp);
      }
      return related;
    },
    bonusArr : function (){
      let bonus = new Array;
      if (this.attackBonus == undefined){return bonus;}
      else {
        bonus.push("Attack Bonus");
        for (let i = 0; i < this.attackBonus.length; i++){
          bonus.push(this.attackBonus[i]);
        }
        return bonus;
      }
    },
  },
});

let unitList = new Vue({
  el: '#unitList',
  data: {
    listUnits: [''],
    ready: false,
  },

  created() {
    this.aoeList();
  },

  methods: {
    async aoeList() {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/' + 'https://age-of-empires-2-api.herokuapp.com/api/v1/units');
        for(let i = 0; i < response.data.units.length; i++){
          this.listUnits[i] = response.data.units[i].name;
        }
        this.ready = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
