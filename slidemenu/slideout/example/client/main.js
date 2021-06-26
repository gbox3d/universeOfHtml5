import 'bootstrap/dist/js/bootstrap.bundle';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import Slideout from 'slideout'

import './main.html';

Template.hello.onCreated(function helloOnCreated() {

  this.currentPageName = new ReactiveVar("main")
});

Template.hello.onRendered(function () {


  let _panel = document.getElementById('panel')

  this.slideout = new Slideout({
    'panel': _panel,
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
  });

  console.log(window.innerWidth,window.innerHeight)

})

Template.hello.helpers({

  checkPage(pageName) {
    return pageName === Template.instance().currentPageName.get()
  }
});

Template.hello.events({
  'click .toggle-button'(evt,instance) {

    instance.slideout.toggle()

  },
  'click #menu li[name="main"]'(evt,instance) {
    instance.currentPageName.set("main")
    instance.slideout.close()
  },
  'click #menu li[name="about"]'(evt,instance) {
    instance.currentPageName.set("about")
    instance.slideout.close()
  }

});

//
// document.addEventListener('DOMContentLoaded',function (evt) {
//   var slideout = new Slideout({
//     'panel': document.getElementById('panel'),
//     'menu': document.getElementById('menu'),
//     'padding': 256,
//     'tolerance': 70
//   });
//
//   // Toggle button
//   document.querySelector('.toggle-button').addEventListener('click', function() {
//     slideout.toggle();
//   });
// })