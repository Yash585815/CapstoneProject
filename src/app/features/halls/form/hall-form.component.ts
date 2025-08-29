import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from '../../../core/services/hall.service';
import { Hall } from '../../../core/models/hall.model';

@Component({
  selector: 'app-hall-form',
  templateUrl: './hall-form.component.html',
  styleUrls: ['./hall-form.component.css']
})
export class HallFormComponent {
  id: number | null = null;
  form = this.fb.group({
    name: ['', Validators.required],
    capacity: [0, [Validators.required, Validators.min(1)]],
    location: ['', Validators.required],
    pricePerDay: [0, [Validators.required, Validators.min(0)]],
    amenities: [''],
    available: [true]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private hallService: HallService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id) {
      this.hallService.getById(this.id).subscribe(h => this.form.patchValue(h));
    }
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.value as Hall;
    const obs = this.id ? this.hallService.update(this.id, payload) : this.hallService.create(payload);
    obs.subscribe(() => this.router.navigate(['/halls']));
  }
}