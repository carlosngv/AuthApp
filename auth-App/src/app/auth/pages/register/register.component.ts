import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  register() {
    const { email, name, password } = this.myForm.value;

    this.authService.createUser( email, name, password)
      .subscribe( res => {

        if(res === true) { // Verifica si no es error
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', res , 'error');
        }
      })



  }

}
