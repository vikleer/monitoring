import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  private sweetAlert = Swal

  constructor() { }

  public contactInformation() {
    this.sweetAlert.fire({
      title: "Contactanos",
      text: "Escribe a soporte:(+57) 319-545-3394",
      confirmButtonText: 'Cerrar'
    });
  }

  public showLoginSuccessNotification() {
    this.sweetAlert.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ha iniciado sesión con éxito',
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  }

  public showRegisterSuccessNotification() {
    this.sweetAlert.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha registrado con exito',
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  }


}
