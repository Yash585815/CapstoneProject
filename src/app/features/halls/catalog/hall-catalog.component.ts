import { Component, OnInit } from '@angular/core';
import { HallService } from '../../../core/services/hall.service';
import { Hall } from '../../../core/models/hall.model';

@Component({
  selector: 'app-hall-catalog',
  templateUrl: './hall-catalog.component.html',
  styleUrls: ['./hall-catalog.component.css']
})
export class HallCatalogComponent implements OnInit {
  halls: Hall[] = [];
  constructor(private hallService: HallService) {}
  ngOnInit(): void { this.hallService.getAll().subscribe(h => this.halls = h); }
}