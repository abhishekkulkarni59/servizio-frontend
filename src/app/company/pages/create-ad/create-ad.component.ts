import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {

  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  postAd() {
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('serviceName', this.validateForm.get('serviceName')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    this.companyService.postAd(formData).subscribe(res => {
      this.notification
        .success(
          'SUCCESS',
          'Ad Posted Successfully!',
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/company/ads');
    }, error => {
      this.notification
        .error(
          'ERROR',
          `${error.error.message}`,
          { nzDuration: 5000 }
        )
    })

  }


}
