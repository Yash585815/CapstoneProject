import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HallService } from '../../../core/services/hall.service';

@Component({
  selector: 'app-hall-availability',
  templateUrl: './hall-availability.component.html',
  styleUrls: ['./hall-availability.component.css']
})
export class HallAvailabilityComponent {
  result: string | null = null;
  form = this.fb.group({ hallId: [null, Validators.required], date: ['', Validators.required] });
  constructor(private fb: FormBuilder, private hallService: HallService) {}
  check() {
    if (this.form.invalid) return;
    const { hallId, date } = this.form.value;
    this.hallService.checkAvailability(Number(hallId), String(date)).subscribe(r => this.result = r.available ? 'Available' : 'Not Available');
  }
}