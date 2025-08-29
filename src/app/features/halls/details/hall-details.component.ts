import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService } from '../../../core/services/hall.service';
import { Hall } from '../../../core/models/hall.model';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.css']
})
export class HallDetailsComponent implements OnInit {
  hall?: Hall;
  constructor(private route: ActivatedRoute, private hallService: HallService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hallService.getById(id).subscribe(h => this.hall = h);
  }
}