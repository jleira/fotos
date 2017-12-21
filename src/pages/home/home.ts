import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {File, DirectoryEntry} from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  image: string = null;
  constructor(public navCtrl: NavController, private camera: Camera, public alertCtrl: AlertController, private file: File) {
    
  }
  presentConfirm() {
 
    let targetPath = this.file.externalDataDirectory;
    let nombrecarpetapadre='OC21';// unidad productiva 
    let idgrupo=1;

    this.file.createDir(targetPath, nombrecarpetapadre ,false).then(()=>{
      //return this.file.createDir(targetPath+`/${nombrecarpetapadre}`, idgrupo.toString() ,false).then(()=>{
     // });
    },()=>{
    }).then(()=>{
      return this.file.createDir(targetPath+`/${nombrecarpetapadre}`, idgrupo.toString() ,false).then(()=>{
         },()=>{});
    });

    let alert = this.alertCtrl.create({
      
      title: 'Desea adjuntar una imagen a esta pregunta',
      message: 'En caso afirmativo debe seleccionar CAMARA si desea tomar una foto, o Escoger galeria si desea ewscoger una foto de su dispositivo',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            return this.galeria();
          }
        },
        {
          text: 'Camara',
          handler: () => {
            return this.getPicture();
            
          }
        }
      ]
    });
    alert.present();
  
    
  }


  getPicture(){
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true 
    }
    this.camera.getPicture( options )
    .then(imageData => {
      console.log(imageData);
    })
    .catch(error =>{
      console.error( error );
    });
  }

  galeria(){
    let options: CameraOptions = {
  //    destinationType: this.camera.PictureSourceType.CAMERA
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      console.log(imageData);
      
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
