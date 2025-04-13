import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedEmail = localStorage.getItem('savedEmail');
      console.log('Email carregado do localStorage:', savedEmail);
  
      if (savedEmail) {
        this.loginForm.patchValue({
          email: savedEmail,
          rememberMe: true,
        });
        console.log('Formulário atualizado com email salvo:', this.loginForm.value);
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Formulário inválido. Não foi possível fazer login.');
      return;
    }
  
    this.loading = true;
  
    try {
      // Simula um delay para o login (opcional)
      await new Promise((resolve) => setTimeout(resolve, 1500));
  
      const email = this.loginForm.value.email; // Obtém o email do formulário
      const rememberMe = this.loginForm.value.rememberMe; // Verifica a opção "Lembrar-me"
  
      if (isPlatformBrowser(this.platformId)) {
        if (email) {
          console.log('Salvando email no localStorage:', email);
          localStorage.setItem('savedEmail', email); // Salva o email
        } else {
          console.log('Opção "Lembrar-me" desmarcada ou email inválido. Não salvando.');
        }
  
        // Verifica novamente o valor salvo
        const savedEmail = localStorage.getItem('savedEmail');
        console.log('Email atual no localStorage:', savedEmail);
      }
  
      console.log('Redirecionando para /dashboard');
      this.router.navigate(['/dashboard']); // Redireciona após salvar o email
    } catch (error) {
      console.error('Erro durante o login:', error);
    } finally {
      this.loading = false;
    }
  }
}