function openPopup1() {
    document.getElementById("popup_1").style.display = "block";
  }
  
  function closePopup1() {
    document.getElementById("popup_1").style.display = "none";
  }
  window.onclick = function(event) {
    var popup = document.getElementById("popup_1");
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }
  function openPopup2() {
    document.getElementById("popup_2").style.display = "block";
  }
  
  function closePopup2() {
    document.getElementById("popup_2").style.display = "none";
  }
  window.onclick = function(event) {
    var popup = document.getElementById("popup_2");
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }
  function openPopup3() {
    document.getElementById("popup_3").style.display = "block";
  }
  
  function closePopup3() {
    document.getElementById("popup_3").style.display = "none";
  }
  
  window.onclick = function(event) {
    var popup = document.getElementById("popup_3");
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }