import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatFileUploadComponent } from 'mat-file-upload';
import { MessageService } from 'src/app/services/message.service';
import { ProductProxy } from 'src/app/services/proxy/product.proxy';


@Component({
    selector: 'app-admin-product',
    templateUrl: './admin.product.component.html'
})
export class AdminProductComponent implements OnInit {
    @ViewChild("fileUpload")
    fileUpload: MatFileUploadComponent;
    @ViewChild("formGroup")
    formGroup: FormGroupDirective;
    form: FormGroup;
    images: File[] = [];
    isLoading = false;

    constructor(private formBuilder: FormBuilder, private messageService: MessageService, private productProxy: ProductProxy) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            price: [null, Validators.required],
            description: [null, Validators.required]
        });
    }

    onSubmit(): void {
        this.isLoading = true;
        var formData = new FormData();
        formData.append("name", this.form.controls.name.value);
        formData.append("price", this.form.controls.price.value);
        formData.append("description", this.form.controls.description.value);
        for(let image of this.images){
            formData.append("images", image);
        }
        
        this.productProxy.add(formData).subscribe(
            _ => {
                this.images = [];
                this.fileUpload.resetFileInput();
                this.fileUpload.selectedFileText = null;
                this.formGroup.resetForm();
                this.messageService.success("Prodotto aggiunto con successo");
            },
            err => { this.messageService.error(err.error.message); this.isLoading = false },
            () => this.isLoading = false);
    }

    onSelectedFilesChanged($event: FileList): void {
        this.images = $event ? Array.from($event) : null;
    }
}
