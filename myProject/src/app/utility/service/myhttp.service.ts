
import {Injectable} from '@angular/core'
import{HttpClient} from "@angular/common/http"
import{LoadingController} from 'ionic-angular'

@Injectable()

export class MyhttpService{
//封装一个方法 ，负责网络通信(loading credentials)
constructor(private myLoading:LoadingController,private myHttp:HttpClient){}

/**
 * 
 * @param url get请求的地址
 * @param callback callback  get请求成功后，要执行的回调函数
 */
    sendGetRequest(url,callback){
        //显示loading
        var myLoading=this.myLoading.create({
            content:'正在加载数据。。。'
        });
        myLoading.present()
        this.myHttp.get(url,{withCredentials:true}).subscribe((result)=>{
        myLoading.dismiss()
        callback(result)
    })
    }
}