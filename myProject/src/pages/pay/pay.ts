import { Component } from '@angular/core';
import { LoadingController,ViewController,IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(private myLoading:LoadingController,private myView:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
  closeModal(){
    this.myView.dismiss(0)   //传0--支付失败
  }
  doPay(){
    var myLoading=this.myLoading.create({
      content:'支付中',
      duration:3000
    })
    myLoading.present()
    setTimeout(()=>{
       this.myView.dismiss(1)   //传1--支付成功
    },3000)
  }
}
