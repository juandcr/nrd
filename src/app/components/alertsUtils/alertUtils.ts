import Swal from "sweetalert2";

export function alertFailure(message:string){
    Swal.fire({
      icon: 'error',
      title: 'Ha sucedido una Bissakeada',
      text: `${message}`
    });
  }

export function alertSuccess(message:string){
    Swal.fire(
      `${message}`
    );
  }