import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  constructor( private router: Router) { }
ngOnInit(): void {
}



onSuppComment(){ this.router.navigateByUrl('/supp-comment'); }

onModifArticle(){ this.router.navigateByUrl('/modif-article'); }
}
