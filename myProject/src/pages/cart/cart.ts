import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{HttpClient} from '@angular/common/http';
import{LoginPage} from '../login/login'
import{OrderConfirmPage} from '../order-confirm/order-confirm'

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartList=[]
  isAllSelected=false;//全选复选框-双向数据绑定
  constructor(private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    var url="http://localhost:8080/cart/add?lid=1&buyCount=1"
    this.myHttp.get(url).subscribe((result:any)=>{
        console.log(result.code)  
    })
   
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter CartPage');
    var url = "http://localhost:8080/cart/list"
                      //{withCredentials:true} 凭证
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result)
      if(result.code == 300){
        this.navCtrl.push(LoginPage)

      }else if(result.code == 200){
        console.log(result)//result.data所对应对象数组,渲染在视图
        this.cartList = result.data
        //遍历购物车列表，给每一个商品指定一个属性 isSelected,来记录当前的商品有没有被
        for (var i=0;i<this.cartList.length;i++){
          this.cartList[i].isSelected=false
        }
      }
    })
  }
  handleAll(){//全选的方法
    for (var i=0;i<this.cartList.length;i++){
      this.cartList[i].isSelected=this.isAllSelected
    }
  }
  handleSelectOne(){//某一个复选框
    //执行一个逻辑与运算，将结果赋值给 isAllSelected
    var result=true;
    for(var i=0;i<this.cartList.length;i++){
      result=result && this.cartList[i].isSelected
    }
    this.isAllSelected=result;
  }
  //结算功能
  getTotalPrice(){
    var result=0;
   for(var i=0;i<this.cartList.length;i++){
     var p=this.cartList[i];
      if(p.isSelected){
        result+=(p.price*p.count)
      }
   }
   return result   
  }
  minCount(index){
     if(this.cartList[index].count==1){
       return
     }
     this.cartList[index].count--;
  }
  addCount(index){
     this.cartList[index].count++
  }
  deleteItem(index){
    this.cartList.splice(index,1)
  }
  jump(){
    this.navCtrl.push(OrderConfirmPage)
  }
}


