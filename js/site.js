function reverseString() {
  let val = document.getElementById("inputstr").value;
  str = val.trim();

  if (str.length == 0) {
      return;
  }

  let rev = "";
  for (i = str.length - 1; i >= 0; i--) {
      rev += str[i];
  }

  document.getElementById("msg").textContent = rev;
  document.getElementById("alert").classList.remove("d-none");
}