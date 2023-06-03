import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[]=[{file: File, url: 'https://firebasestorage.googleapis.com/v0/b/imageu…=media&token=9cebdde9-a6bd-4c54-a659-be4bf5d17ca6', name: 'thisisengineering-raeng-TXxiFuQLBKQ-unsplash.jpg'}];

  constructor(private uploadService: FileUploadService,) { }

  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }
}
