import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss'],
})
export class FabricComponent implements AfterViewInit {
cleanSelect() {
  this.canvas.discardActiveObject().renderAll();
}
  clone() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
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
  public size: any = {
    width: 500,
    height: 800,
  };

  // public json: any;
  private globalEditor = false;
  public textEditor = false;
  private imageEditor = false;
  public figureEditor = false;
  public selected: any;

  // public canvas!: fabric.Canvas;
  // public url: any = '';
  // public selected: any;

  constructor() {}

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
      console.log('selected called', e.selected![0]);
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
  json = {
    objects: [
      {
        type: 'text',
        originX: 'center',
        originY: 'center',
        left: 50,
        top: 50,
        width: 100,
        height: 50,
        text: 'Basic Pay: 15,000.00\nDearness Allowance: 0.00\nHouse Rent Allowance: 6000.00',
        fontFamily: 'cursive',
        fill: 'rgb(0, 0, 0)', // Set the text color to black
        scaleX: 0.5,
        scaleY: 0.5,
        visible: true, // Set the text visibility to true
        textAlign: 'left', // Align the text to the left
        splitBy: '\n', // Split the text into lines by newline character
        0: {
          splitBy: ':',
          styles: {
            0: {
              textAlign: 'left',
            },
            1: {
              textAlign: 'right',
            },
          },
        },
      },
    ],
    background: '',
  };

  loadJsonData() {
    console.log('loadJsonData');

    const objectList = this.canvas.getObjects();
    console.log('objectList', objectList);
    const backgroundImage = this.canvas.backgroundImage;
    // console.log('canvas json', this.canvas.toJSON());

    this.canvas.loadFromJSON(
      this.json,
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
  }
}
