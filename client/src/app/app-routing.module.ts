import { BlogsComponent } from './blogs/blogs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
   {
      path: '',
      component: HomeComponent
   },
   {
      path: 'projects',
      component: ProjectsComponent
   },
   {
      path: 'blogs',
      component: BlogsComponent
   },
   {
      path: 'contact',
      component: ContactComponent
   },
   {
      path: '**',
      component: HomeComponent
   }
];

@NgModule({
   declarations: [],
   imports: [
      RouterModule.forRoot(routes)
   ],
   providers: [],
   bootstrap: [],
   exports: [
      RouterModule
   ]
})

export class AppRoutingModule {}