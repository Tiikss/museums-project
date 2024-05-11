function filterFunction() {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        console.log(filter);
        if (filter == "") {
            a[i].style.display = "none";
        } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "block";
        } else {
            a[i].style.display = "none";
        }
    }
}

function chooseCity(e) {
    const div = document.getElementById("myDropdown");
    const input = document.getElementById("myInput");

    input.value = e.textContent;

    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        a[i].style.display = "none";
    }
}
