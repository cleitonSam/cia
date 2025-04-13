import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  // Injeta o Router usando a função `inject`
  const router = inject(Router);

  // Obtém o email salvo no localStorage
  const savedEmail = localStorage.getItem('savedEmail');
  const isLoggedIn = savedEmail && savedEmail.trim() !== '';

  if (!isLoggedIn) {
    console.log('Usuário não logado. Redirecionando para /login');
    router.navigate(['/login']); // Redireciona para a página de login
    return false; // Bloqueia o acesso à rota protegida
  }

  console.log('Usuário logado:', savedEmail);
  return true; // Permite o acesso à rota protegida
};