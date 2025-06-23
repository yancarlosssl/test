import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registro-jugador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-jugador.component.html',
  styleUrls: ['./registro-jugador.component.sass']
})
export class RegistroJugadorComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      const userToRegister: User = {
        ...formData,
        juego_id: '3d242438-4b61-4958-a53e-c41ffc55a388'
      };

      console.log('➡ Enviando usuario:', userToRegister);

      this.userService.registerUser(userToRegister).subscribe({
        next: (res: any) => {
          console.log('✅ Usuario registrado', res);
          alert('✅ Usuario registrado correctamente');
        },
        error: (err: any) => {
          console.error('❌ Error al registrar usuario', err.error);
          alert('❌ Error al registrar:\n' + JSON.stringify(err.error));
        }
      });
    }
  }
}
