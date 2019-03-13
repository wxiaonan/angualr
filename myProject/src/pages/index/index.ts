import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{HttpClient} from '@angular/common/http'
import{DetailPage} from '../detail/detail'

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  detail=DetailPage
  carouselList=[]//保存轮播图数据
  newArrialItems=[]//保存新品上市数据
  recommendedItems=[]//保存推荐商品数据到缩略图显示
  constructor(private myHttp:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');    
    var url="http://localhost:8080/index"
    this.myHttp.get(url).subscribe((result:any)=>{
       console.log(result);
       this.carouselList=result.carouselItems;
       this.newArrialItems=result.newArrialItems;
       this.recommendedItems=result.recommendedItems;
    })
     
  }
 
   
  
}
