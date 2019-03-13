import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';

/**
 * Generated class for the NotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  time=5
  myTimer=null
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage');
     this.myTimer=setInterval(()=>{
      this.time--;
      if(this.time==1){
        if(this.navCtrl.canGoBack()){  
        this.navCtrl.pop()
        }else{
          clearInterval(this.myTimer)
        }
        this.time--
    
      }
      console.log(this.time)
    },1000)
   
    
  }
  //页面离开时，执行清理工作
  ionViewWillLeave(){
    clearInterval(this.myTimer)
  }

}
