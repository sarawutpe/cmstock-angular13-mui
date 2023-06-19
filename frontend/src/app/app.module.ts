import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { httpInterceptorProviders } from './interceptors'
import { MaterialModule } from './material/material.module'
import { ProgressComponent } from './progress/progress.component'
import { SideNavComponent } from './side-nav/side-nav.component'
import { StockCreateComponent } from './stock/stock-create/stock-create.component'
import { StockEditComponent } from './stock/stock-edit/stock-edit.component'
import { StockHomeComponent } from './stock/stock-home/stock-home.component';
import { ShopComponent } from './shop/shop.component';
import { SummaryComponent } from './summary/summary.component';
import { CustomerComponent } from './customer/customer.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    StockHomeComponent,
    StockCreateComponent,
    StockEditComponent,
    ProgressComponent,
    ShopComponent,
    SummaryComponent,
    CustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
