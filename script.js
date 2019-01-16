new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRuning:false,
        turns:[],
    },
    methods: {
        startGame: function(){
            this.gameIsRuning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function(){
         let damage =this.claculateDamage(2,10)
            this.monsterHealth-= damage;
            this.turns.unshift({
                isPlayer:true,
                text:"Player hits Monster for"+damage
            })
            if(this.chekWin()){
                return;
            };
            this.monsterAttacks();
          
        },
        specialAttack: function(){
            let damage = this.claculateDamage(10,20);
            this.monsterHealth-= damage;
            if(this.chekWin()){
                return;
            };
            this.turns.unshift({
                isPlayer:true,
                text:"Player hits Monster hardfor"+damage
            })
            this.monsterAttacks();
        },
        heal:function(){
           if(this.playerHealth<=90){
               this.playerHealth+=10;
           }else{
               this.playerHealth =100;
           }
           this.turns.unshift({
            isPlayer:true,
            text:"Player  heal 10"
        })
           this.monsterAttacks();
        },
        giveUp:function(){
            this.gameIsRuning = false;
        },
        claculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random()*max)+1,min);},
        chekWin: function(){
            if(this.monsterHealth<=0){
                if(confirm("You WON, New game?")){
                    this.startGame();
                }else{
                    this.gameIsRuning = false;
                }return true;
            }
            else if(this.playerHealth<=0){
                if(confirm("You lost, New game?")){
                    this.startGame();
                }else{
                    this.gameIsRuning = false;
                }
                return true;
            }
            return false;
        },
        monsterAttacks: function(){
            let damage =this.claculateDamage(4,10);
            this.playerHealth-= damage;
            this.chekWin();
            this.turns.unshift({
                isPlayer:false,
                text:"Monster hits Player for"+damage
            })
        }
    },
});