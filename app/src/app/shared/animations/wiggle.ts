import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';

export const wiggle: any = trigger('wiggle', [
  state('true', style({transform: 'rotate(0)'})),
  state('false', style({transform: 'rotate(0)'})),
  transition('* => true', [
    animate('0.8s ease-in', keyframes([
      style({transform: 'rotate(-5deg)'}),
      style({transform: 'scale(0.8)'}),
      style({transform: 'rotate(20deg)'}),
      style({transform: 'scale(1.1)'}),
      style({transform: 'rotate(0)'}),
      style({transform: 'scale(1)'})
    ]))
  ]),
]);
