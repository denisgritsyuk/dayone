import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var app = new Vue({
    el:'#n1',
    data:{
        search:"",
        students:[],
        currency:[],
        search:"",
        start_ccy:"",
        end_ccy:"",
        sell:0,
        buy:0,
        start_value:0,
        end_value:0,
        result:"",
    },
    methods:
    {
        deletePeople:function (id) {
            this. people =  this. people.filter(elem => elem.id!=id)
          }
        
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response)=>{
            console.log(response.data);
            this.students = response.data;
        })
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
        })
    },
    methods:{
        deleteRow:function(id){
             this.students =  this.students.filter(stud => stud.id!=id)
        },
        convert:function(){
            for(let i=0; i<this.currency.length; i++){
                if (this.currency[i].ccy==this.start_ccy)
                      this.sell=this.currency[i].sale;
                if (this.currency[i].ccy==this.end_ccy)
                      this.buy=this.currency[i].buy;
            }
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " + this.start_ccy + " = " + this.end_value + " " + this.end_ccy;
            
        }
     }
 })

