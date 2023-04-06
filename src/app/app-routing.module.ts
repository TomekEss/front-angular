import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'geditor',
    loadChildren: () => import('./encyklopedia/geditor/geditor.module').then(m => m.GeditorModule)
  },
  {
    path: 'encyklopedia',
    loadChildren: () => import('./encyklopedia/encyklopedia.module').then(m => m.EncyklopediaModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./encyklopedia/gamedetail/gamedetail.module').then(m => m.GamedetailModule)
  }

];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: QuicklinkStrategy,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}

