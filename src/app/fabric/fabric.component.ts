import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
// var newData=new Array();
// var finalString="hello";
@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss'],
})

export class FabricComponent implements AfterViewInit {
ExcelData:any;
readExcel(event: any) {
// throw new Error('Method not implemented.');
let file=event.target.files[0];
let fileReader=new FileReader();
fileReader.readAsBinaryString(file);

fileReader.onload=  (e)=>{
  var workBook = XLSX.read(fileReader.result,{type:'binary'});
  var sheetName = workBook.SheetNames;
  this.ExcelData=XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]]);
  console.log(this.ExcelData);
  
  

}
}
  CustomerArray : any[] = [];
  isResultLoaded = false;
  jsonString: any="";
  // temp:String=this.jsonString[1];
  person:any="";
  a:any="a";
  b:any="b";
  c:any="c";
  finalString="hello";
  // Object.keys(arr)

  // http: any;
  constructor(private http: HttpClient){

  }
  
  async getAllCustomer()
  {
    // console.log("error or not")
    var arr=new Array("Harshit","Sabuja");
    const p=this.http.get("http://localhost:8084/api/v1/customer/getAllCustomer")

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        // console.log(resultData);
        this.CustomerArray = resultData;
        console.log(typeof this.CustomerArray);
        this.jsonString = JSON.stringify(this.CustomerArray[1]);
        console.log(this.jsonString);
        // console.log(typeof this.jsonString)
        this.person = JSON.parse(this.jsonString);
        this.a = this.person.customername;

        this.b = this.person.customeraddress;

        this.c = this.person.mobile;

        console.log("first", this.finalString);
        this.finalString ="  "+this.a +"\n"+"Programmer Analyst";
        console.log("second", this.finalString);
        
        let abc = {"basicpay":2000,"dearness":3000};
        let a=Object.keys(abc).forEach(element => {
          
          
        });;
        console.log(a);
        console.log("final string", this.finalString);
        let json = {
          objects: [
            {
              type: 'text',
              originX: 'center',
              originY: 'center',
              left: 50,
              top: 50,
              width: 80,
              height: 50,
              // font-size:20px,
              text: this.finalString,
              fontFamily: 'cursive',
              fill: 'rgb(0, 0, 0)',
              scaleX: 0.5,
              scaleY: 0.4,
              visible: true,
              textAlign: 'left',
              splitBy: '\n', // Split the text into lines by newline character
            },
          ],
          background: '',
        };
        const objectList = this.canvas.getObjects();
        console.log('objectList', objectList);
        const backgroundImage = this.canvas.backgroundImage;
        // console.log('canvas json', this.canvas.toJSON());
        console.log("json data", json);
        this.canvas.loadFromJSON(
          json,
          this.canvas.renderAll.bind(this.canvas),
          function (o: any, object: any) {
            fabric.log(o, object);
          }
        );

        this.canvas.add.apply(this.canvas, objectList);
        this.canvas.setBackgroundImage(
          backgroundImage!,
          this.canvas.renderAll.bind(this.canvas)
        );
      });
    
  }
cleanSelect() {
  this.canvas.discardActiveObject().renderAll();
}
  clone() {
    const activeObject = this.canvas.getActiveObject();
    // const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }
  bringToFront() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }
  sendToBack() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }
  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
  }
  removeWhite(arg0: any) {
    this.url="";
    throw new Error('Method not implemented.');
  }

  title = 'angular-editor-fabric-js';

  @ViewChild('htmlCanvas') htmlCanvas!: ElementRef;
  @ViewChild('canvas')
  public canvas: fabric.Canvas;
  public props = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: '',
  };

  public textString: string;
  public url: string ="";
  // public size: any = {
  //   width: 500,
  //   height: 800,
  // };

  // public json: any;
  private globalEditor = false;
  public textEditor = false;
  private imageEditor = false;
  public figureEditor = false;
  public selected: any;

  // public canvas!: fabric.Canvas;
  // public url: any = '';
  // public selected: any;

  ngAfterViewInit(): void {
    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      isDrawingMode: false,
      height: 475,
      width: 478.4,
    });
    this.canvas.on('selection:created', (e) => {
      console.log('selected called', e);
      const selectedObject = e.selected![0];
      this.selected = selectedObject;
    });
    this.canvas.on('selection:updated', (e) => {
      console.log('selected updated', e.selected![0]);
      const selectedObject = e.selected![0];
      this.selected = selectedObject;
    });
    this.canvas.on('selection:cleared', (e) => {
      console.log('cleared called', e);
      this.selected = null;
    });

    this.canvas.on('group:selected', (e) => {
      console.log('cleared called', e);
    });
  }
  addImageOnCanvas() {
    // console.log("this.url",this.url);
    if (this.url) {
      fabric.Image.fromURL(this.url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true,
        });
        image.scaleToWidth(200);
        image.scaleToHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {

        this.url = readerEvent.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  rasterize() {
    const image = new Image();
    image.src = this.canvas.toDataURL({ format: 'png' });
    const w = window.open('');
    w!.document.write(image.outerHTML);
    this.downLoadImage();
  }
  downLoadImage() {
    const c = this.canvas.toDataURL({ format: 'png' });
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = c;
    downloadLink.target = '_self';
    downloadLink.download = Date.now() + '.png';
    downloadLink.click();
  }
  getTemplPolaroid(event){
    const el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({
        left: 0,
        top: 0,
        angle: 0,
        hasRotatingPoint: true,
        selectable: true,
      });

      image.scaleToWidth(this.canvas.width! - 3);
      image.scaleToHeight(this.canvas.height! - 3);
      this.canvas.setBackgroundImage(
        image,
        this.canvas.renderAll.bind(this.canvas)
      );
      this.canvas.requestRenderAll();
    });
  }
  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id,
        });
      };
    })(obj.toObject);
  }
  selectItemAfterAdded(obj) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }
  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }
  // json = {
  //   objects: [
  //     {
  //       type: 'text',
  //       originX: 'center',
  //       originY: 'center',
  //       left: 50,
  //       top: 50,
  //       width: 100,
  //       height: 50,
  //       text: this.finalString,
  //       fontFamily: 'cursive',
  //       fill: 'rgb(0, 0, 0)', // Set the text color to black
  //       scaleX: 0.5,
  //       scaleY: 0.5,
  //       visible: true, // Set the text visibility to true
  //       textAlign: 'left', // Align the text to the left
  //       splitBy: '\n', // Split the text into lines by newline character
        
  //     },
  //   ],
  //   background: '',
  // };

  loadJsonData() {
    console.log('loadJsonData');
    this.getAllCustomer();
    // console.log("final string",this.finalString);
    // let json = {
    //   objects: [
    //     {
    //       type: 'text',
    //       originX: 'center',
    //       originY: 'center',
    //       left: 50,
    //       top: 50,
    //       width: 100,
    //       height: 50,
    //       text: this.finalString,
    //       fontFamily: 'cursive',
    //       fill: 'rgb(0, 0, 0)', // Set the text color to black
    //       scaleX: 0.5,
    //       scaleY: 0.5,
    //       visible: true, // Set the text visibility to true
    //       textAlign: 'left', // Align the text to the left
    //       splitBy: '\n', // Split the text into lines by newline character
          
    //     },
    //   ],
    //   background: '',
    // };
    // const objectList = this.canvas.getObjects();
    // console.log('objectList', objectList);
    // const backgroundImage = this.canvas.backgroundImage;
    // // console.log('canvas json', this.canvas.toJSON());
    // console.log("json data",json)
    // this.canvas.loadFromJSON(
    //   json,
    //   this.canvas.renderAll.bind(this.canvas),
    //   function (o: any, object: any) {
    //     fabric.log(o, object);
    //   }
    // );

    // this.canvas.add.apply(this.canvas, objectList);
    // this.canvas.setBackgroundImage(
    //   backgroundImage!,
    //   this.canvas.renderAll.bind(this.canvas)
    // );
  }
}
