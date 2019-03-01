import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Book } from '../../../models/book.model';
import { BookRestProvider } from '../../providers/book-rest/book-rest';
import { CartPage } from '../cart/cart';
import { BookDetailPage } from '../book-detail/book-detail';


@Component({
  selector: 'page-topseller',
  templateUrl: 'topseller.html',
})
export class TopsellerPage {

  books:Book;
  category:string;
  loading: any;

  numItem: number;

  constructor(public modalCtrl:ModalController,public loadingController:LoadingController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public bookRestProvider: BookRestProvider) {
  }

  showCart(){    
    let modal=this.modalCtrl.create(CartPage);
    modal.onDidDismiss( (data)=>{
      if (data.clear==true){
        this.refreshNumItem();
      }      
    });
    modal.present();   
     
  }

  refreshNumItem(){
    if (localStorage.getItem('numItem')==null || Number.isNaN(Number(localStorage.getItem('numItem')))){      
      localStorage.setItem('numItem','0');
      this.numItem=0;
    }else{
      this.numItem=Number(localStorage.getItem('numItem'));
    }
  }
  
  ionViewWillEnter(){        
    this.loading = this.loadingController.create({ content: "please wait..." });
    this.loading.present();   

    this.refreshNumItem();
    
    
    this.bookRestProvider.gettopsellerlist().subscribe(  
      data=>{                
          this.books=data.filter(book => (book!=null)); 
          this.loading.dismissAll();
      } 
      ,
      (err) => {
        this.loading.dismissAll();
        console.log(err);
      }
    );
    
  }

  ShowDetail(bookId:number) {
    this.navCtrl.push(BookDetailPage,
      {bookId:bookId}
      );
  }



  BookAdd(bookId:number,title:string,price:number) { 
    

  }  

  goBack() {
    this.navCtrl.pop();
  }

}
