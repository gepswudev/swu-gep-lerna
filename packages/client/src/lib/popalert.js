import Swal from 'sweetalert2';

export default function swa (options, handlers = null) {
    Swal.fire({
        ...options,
        confirmButtonColor: '#00A2E0',
    }).then((result) => {
        if (result.isConfirmed) {
            if(handlers) {
                handlers()
            }
        }
    })
}
