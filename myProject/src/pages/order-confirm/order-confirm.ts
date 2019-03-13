import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import{HttpClient} from '@angular/common/http'
import{PayPage} from '../pay/pay'
import{IndexPage} from '../index/index'


/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
 cartList=[]
  constructor(private myModal:ModalController,private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    //发送请求：到购物车列表
    var url=" http://localhost:8080/cart/list"
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
          console.log(result.data)
          this.cartList=result.data;
    })
    
  }
  showModal(){
    var myModal=this.myModal.create(PayPage)
    myModal.present()
    myModal.onDidDismiss((result)=>{
        if(result==1){
          this.navCtrl.parent.select(0)//跳转到首页（让首页的tab被选中）
        }
    })
  }
}
