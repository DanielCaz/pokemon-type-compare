import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss'],
})
export class TypeListComponent implements OnInit {
  @Input() types!: { name: string }[];

  constructor() {}

  ngOnInit(): void {}
}
