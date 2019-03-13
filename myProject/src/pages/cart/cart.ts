import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{HttpClient} from '@angular/common/http';
import{LoginPage} from '../login/login'

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
  constructor(private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    var url="http://localhost:8080/cart/add?lid=1&buyCount=1"
    this.myHttp.get(url).subscribe((result:any)=>{
        console.log(result.code)  
    })
   
  }
  ionViewWillEnter() {
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
      }
    })
  }


}


