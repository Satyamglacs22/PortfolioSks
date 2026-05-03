import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Experience, Skills, Projects, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('advanced-portfolio');

  ngOnInit() {
    this.initScrollReveal();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    
    if (dot && outline) {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      
      outline.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      }, { duration: 500, fill: 'forwards' });
    }
  }

  initScrollReveal() {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Wait for components to render
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
  }
}
