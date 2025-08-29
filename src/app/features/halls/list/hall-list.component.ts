import { Component, OnInit } from '@angular/core';
import { HallService } from '../../../core/services/hall.service';
import { Hall } from '../../../core/models/hall.model';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css']
})
export class HallListComponent implements OnInit {
  halls: Hall[] = [];
  loading = false;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.loading = true;
    this.hallService.getAll().subscribe({
      next: (data) => this.halls = data,
      error: () => {},
      complete: () => this.loading = false
    });
  }
}