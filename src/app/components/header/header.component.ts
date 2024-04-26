import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  private subscription1: Subscription;
  user: User = new User()

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.subscription1 = this.usersService.getUserEvent().subscribe((user:User) => {
      if(user) this.user = user
    })
    this.user = this.usersService.user
  }

}
