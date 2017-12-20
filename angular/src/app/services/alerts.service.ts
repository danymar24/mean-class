import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {
  alerts: Array<Object> = [];
  constructor() { }

  pushAlert(alert) {
    const newAlert: Object = {
      type: alert.errors ? 'danger' : 'success',
      message: alert.message
    };
    this.alerts.push(newAlert);
  }
}
