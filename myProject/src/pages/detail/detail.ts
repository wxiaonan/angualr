import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import{HttpClient} from '@angular/common/http'
import{NotFoundPage} from '../not-found/not-found'
import{LoginPage} from '../login/login'
import { CartPage } from '../cart/cart';
import{MyhttpService} from '../../app/utility/service/myhttp.service'
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',   
})
export class DetailPage {
 // page404=NotFoundPage
  //login=LoginPage

  details={}
  constructor(
    private myService:MyhttpService,
    private myToast:ToastController,
    private myHttp:HttpClient, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    var id=this.navParams.get('id')
    console.log("detail收到的数据是"+id)//接收传来的商品的id
     //请求到id对应的商品详情数据
    var url=" http://localhost:8080/product/detail?lid="+id
   this.myHttp.get(url).subscribe((result:any)=>{
     console.log(result)
     //因为服务器端返回的数据有时不包含details数据，在此做一个条件判断
     if(result.details){
      this.details=result.details;
     }
   
   })
    
  }
  jumpTo404(){
    this.navCtrl.push(NotFoundPage)
  }
  jumpToCart(){
    this.navCtrl.push(CartPage)
    //根据服务器返回的状态码
  
  }
  addToCart(){
    var url="http://localhost:8080/cart/add?buyCount=1&lid="+this.navParams.get('id')
    /*this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{  //登录前，设置凭证
        console.log(result)
        if(result.code==300){
          //未登录，跳转到登录页面
          this.navCtrl.push(LoginPage)
          this.myToast.create({
            message:"未登录，请先登录",
            position:"top",
            duration:1500
          }).present()
        }
        else if(result.code==200){
          this.myToast.create({
            message:"添加成功",
            position:"top",
            duration:1500
          }).present()
        }
        else{
          this.myToast.create({
            message:"添加失败",
            position:"top"
          }).present()
        }
    })  */   
    this.myService.sendGetRequest(url,(result:any)=>{  //登录前，设置凭证
      console.log(result)
      if(result.code==300){
        //未登录，跳转到登录页面
        this.navCtrl.push(LoginPage)
        this.myToast.create({
          message:"未登录，请先登录",
          position:"top",
          duration:1500
        }).present()
      }
      else if(result.code==200){
        this.myToast.create({
          message:"添加成功",
          position:"top",
          duration:1500
        }).present()
      }
      else{
        this.myToast.create({
          message:"添加失败",
          position:"top"
        }).present()
      }
  })
  }
  
}
