"use strict";

const submitBtn = document.querySelector("#submit");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const messageField = document.querySelector("#message");
const modalTitle = document.querySelector("#modal-title");
const modalMessage = document.querySelector("#modal-message");
const myForm = document.getElementById("myForm");

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");

  if (myForm.checkValidity()) {
      window.location.href='index.html';
  }
};

const openModal = (event) => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    console.log(nameField.value, emailField.value, messageField.value);
    if (nameField.value==="" || emailField.value==="" || messageField.value==="") {
        modalTitle.innerHTML="Error!";
        modalMessage.innerHTML="Please fill in all the fields.";
    }
    else if (nameField.value!=="" && emailField.value!=="" && messageField.value!==""){
        modalTitle.innerHTML="Thank you!";
        modalMessage.innerHTML="Successfully sent a message!";
    }
    event.preventDefault();
};

submitBtn.addEventListener("click", openModal)

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});