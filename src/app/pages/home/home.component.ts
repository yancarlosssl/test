import { Component } from '@angular/core';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { AsideComponent } from '../../component/aside/aside.component';
import { MainComponent } from '../../component/main/main.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,AsideComponent,MainComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
