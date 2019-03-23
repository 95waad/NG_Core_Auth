import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../../interfaces/product';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
    export class ProductListComponent implements OnInit {

    // For the FormControl - Adding products
    insertForm: FormGroup;
    name: FormControl;
    price: FormControl;
    description: FormControl;
    imageUrl:  FormControl;

    // Updating the Product
     updateForm: FormGroup;
    _name: FormControl;
    _price: FormControl;
    _description: FormControl;
    _imageUrl:  FormControl;
    _id: FormControl;


    // Add Modal
    @ViewChild('template') modal : TemplateRef<any>;

    // Update Modal
    @ViewChild('editTemplate') editmodal : TemplateRef<any>;


    // Modal properties
    modalMessage : string;
    modalRef : BsModalRef;
    selectedProduct : Product;
    products$ : Observable<Product[]>;
    products : Product[] = [];
    userRoleStatus : string;


    // Datatables Properties




  constructor() { }

  ngOnInit() {
  }

}
