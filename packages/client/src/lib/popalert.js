import Swal from 'sweetalert2';

export default function swa ({title, text, icon, confirmButtonText}, handlers = null) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            if(handlers) {
                handlers()
            }
        }
    })
}
