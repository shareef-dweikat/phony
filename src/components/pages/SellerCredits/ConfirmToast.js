import Swal from "sweetalert2";

export default Swal.mixin({
    text: "",
    button: "OK",
    timer: 10000,
    timerProgressBar: true,
});
