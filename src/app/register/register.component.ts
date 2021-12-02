import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import  RegisterUser from '../RegisterUser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser = {userName: "", password: "", password2: ""};
  warning : string | undefined;
  success = false;
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.registerUser.userName == ""){
      console.log("User Name must not be blank");
      this.warning = "Username must not be blank";
    }
    else if(this.registerUser.password != this.registerUser.password2){
      console.log("Passwords do not match!");
      this.warning = "Passwords do not match";
    } else {
      this.loading = true;
      this.authService.register(this.registerUser).subscribe((success) => {
        this.success = true;
        this.warning = "";
        this.loading = false;
      },
      (err) => {
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      }
      )
    }
  }

}
