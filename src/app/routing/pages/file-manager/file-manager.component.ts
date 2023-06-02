import {Component, OnInit} from '@angular/core';
import {FileManagerService} from "../../../services/file-manager.service";
import {HeaderService} from "../../../services/header.service";
import {IFileItem} from "./list-item/list-item.component";
import {ContextMenuService} from "../../../services/context-menu.service";
import {IMenuItem} from "../../../services/interfaces/menu-item.interface";
import {PromptService} from "../../../services/prompt.service";

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.less']
})
export class FileManagerComponent implements OnInit {

  API_URL = "/api"

  constructor(
    private FM: FileManagerService,
    private header: HeaderService,
    private ctxMenu: ContextMenuService,
    private prompt: PromptService
  ) {}

  path: string[] = [ "" ]
  files: any
  filtered: any

  ctxMenuItems: IMenuItem[] = [
    {
      icon: "create_new_folder",
      title: "Новая директория",
      handleFunc: () => {
        this.prompt.show( "Введите название новой директории", ( newDir: string ) => {
          this.FM.createDirectory( [ this.path.join("/"), newDir ].join("/").slice(1) ).subscribe( ( response ) => {
            if ( response.status_code != 200 ) {
              alert( response.data )
              return
            }

            this.reloadPath()
          } )
        } )
      }
    },
    {
      icon: "link",
      title: "Получить ссылку на файл",
      handleFunc: () => {
        let fileName = "https://klimsystems.ru" + this.API_URL + "/assets/uploads" + this.path.join("/") + "/" + this.itemSelected.fileName
        navigator.clipboard.writeText( fileName )
        alert( "Скопировано: " + fileName )
      }
    },
    {
      icon: "cloud_upload",
      title: "Загрузить файл",
      handleFunc: () => {
        let input = document.createElement('input');
        input.multiple = true
        input.type = 'file';
        input.onchange = e => {
          let fileNames = []
          for ( let i = 0; i < (<HTMLInputElement>e.target).files.length; i++ )
            fileNames.push( "uploads" + this.path.join("/") + "/" + (<HTMLInputElement>e.target).files[ i ].name )

          this.FM.uploadFile( (<HTMLInputElement>e.target).files, fileNames ).subscribe(
            (data) => {
              if ( data.status_code == 200 ) {
                this.reloadPath()
                return
              }
              alert( "Что-то пошло не так: " + data.data )
            }
          )
        }
        input.click();
      }
    },
    {
      icon: "download",
      title: "Скачать файл",
      handleFunc: () => {
        let fileName = this.path.join("/") + "/" + this.itemSelected.fileName
        fetch(this.API_URL + '/assets/uploads/' + fileName)
          .then(response => response.blob())
          .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = this.itemSelected.fileName;
            link.click();
          })
          .catch(console.error);
      }
    },
    {
      icon: "delete",
      title: "Удалить файл",
      handleFunc: () => {
        let fileName = this.path.join("/") + "/" + this.itemSelected.fileName
        this.FM.deleteFile( fileName ).subscribe( (request) => {
          if ( request.status_code != 200 ) {
            alert( "Что то пошло не так: " + request.data )
            return
          }
          this.reloadPath()
        } )
      }
    }
  ]
  itemSelected: IFileItem
  invokeCtxMenu( event: MouseEvent, item: IFileItem ) {
    this.itemSelected = item
    this.ctxMenu.onClicked.next( event )
  }

  clicked( item: IFileItem ) {

    if ( item.isDir && !item.isRedirect ) {
      this.path.push( item.fileName )
    }

    if ( item.isRedirect && this.path.length > 1 ) {
      this.path = this.path.slice(0, -1)
    }



    this.reloadPath()
  }

  defaultItem: IFileItem = {
    isDir: true,
    fileName: "<--",
    isRedirect: true
  }


  reloadPath() {
    this.FM.ls( this.path.join( '/' ) ).subscribe( response => {
      if ( response.data == null ) {
        this.files = [ this.defaultItem ]
        this.filtered = this.files
        return
      }
      response.data.push( this.defaultItem )
      response.data.sort( function (a, b) {
        if (a.isDir) return -1
        else return 1
      } )
      this.files = response.data
      this.filtered = response.data
    } )
    this.header.searchTerm.subscribe( term => {
      if ( term.trim().length === 0 ) {
        this.filtered = this.files
        return
      }
      this.filtered = this.files.filter( item => item.fileName.toLowerCase().includes( term.toLowerCase() ))
    } )
    this.header.title.next( this.path.join( "/" ) )
  }

  ngOnInit() {
    this.reloadPath()
  }

}
