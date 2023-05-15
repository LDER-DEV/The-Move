let editButton = document.querySelector('.editButton')





function editProfile() {
  const editModal = document.getElementById('editModal');
  const modalObj = new bootstrap.Modal(editModal);
  modalObj.show();
}




editButton.addEventListener('click', editProfile)