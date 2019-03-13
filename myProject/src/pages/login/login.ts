import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import{HttpClient} from '@angular/common/http'
import{DetailPage} from '../detail/detail'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //和表单元素双向数据绑定
   myName=""
   myPwd=""
  constructor(private myToast:ToastController,private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    //获取用户名、密码
    //请求服务器端验证用户是否有效
    //根据服务器端的结果做处理
  console.log(this.myName)
  console.log(this.myPwd)
  var url="http://localhost:8080/user/login"
  this.myHttp.post(url,//sessionId  登录后添加凭证，证明登录过
    {uname:this.myName,upwd:this.myPwd},
    {withCredentials:true}
  ).subscribe((result:any)=>{
     console.log(result)
    var code=result.code;
    if(code==200){
      this.navCtrl.pop()
    }else{
      this.myToast.create({
        message:"登录失败",
        position:"top"
      }).present()
    }
  })
  }
}
