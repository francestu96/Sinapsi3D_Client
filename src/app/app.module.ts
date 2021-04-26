import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './pages/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './services/interceptor/auth.interceptor';
import { AuthGuardService } from './services/auth.guard.service';
import { CartModule } from './pages/cart/cart.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductModule } from './pages/product/product.module';
import { OrderModule } from './pages/order/order.module';
import { SignupModule } from './pages/signup/signup.module';
import { LoginModule } from './pages/login/login.module';
import { ProfileModule } from './pages/profile/profile.module';
import { AuthAdminGuardService } from './services/auth.admin.guard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminProdctModule } from './pages/admin/admin-product.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    FlexModule,
    RouterModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    HomeModule,
    ProductModule,
    CartModule,
    AdminProdctModule,
    OrderModule,
    ProfileModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    TranslateModule.forRoot()

  ],
  providers: [AuthInterceptorProviders, AuthGuardService, AuthAdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
