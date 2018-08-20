import ePub from 'epubjs';

function loadBook() {
  const App = document.getElementById("App")
  const viewer = document.createElement("div")
  viewer.setAttribute("id", "viewer")
  
  const wrapper = document.createElement("div")
  wrapper.setAttribute("id", "wrapper")
  App.appendChild(wrapper)
  wrapper.appendChild(viewer)

  const prevSectionLink = document.createElement("a")
  const nextSectionLink = document.createElement("a")
  prevSectionLink.setAttribute("id", "prev-section")
  prevSectionLink.setAttribute("href", "#prev-section")
  nextSectionLink.setAttribute("id", "next-section")
  nextSectionLink.setAttribute("href", "#next-section")

  const prevPageLink = document.createElement("a")
  const nextPageLink = document.createElement("a")
  prevPageLink.setAttribute("id", "prev-page")
  prevPageLink.setAttribute("href", "#prev-page")
  prevPageLink.textContent = " < Previous Page "
  nextPageLink.setAttribute("id", "next-page")
  nextPageLink.setAttribute("href", "#next-page")
  nextPageLink.textContent = " Next Page > "

  App.appendChild(prevSectionLink)
  App.appendChild(prevPageLink)
  App.appendChild(nextPageLink)
  App.appendChild(nextSectionLink)

  let book = ePub('../books/Discworld/');
  let rendition = book.renderTo("viewer", {spread: "always", width: "100%", height: "100%" })
  rendition.display()

  nextSectionLink.addEventListener("click", function(e){
    rendition.next();
    e.preventDefault();
  }, false);

  prevSectionLink.addEventListener("click", function(e){
    rendition.prev();
    e.preventDefault();
  }, false);

  nextPageLink.addEventListener("click", function(e) {

  })

  rendition.on("rendered", function(section){
    let nextSection = section.next();
    let prevSection = section.prev();
    let nextNav, nextLabel, prevNav, prevLabel
    if(nextSection) {
      nextNav = book.navigation.get(nextSection.href);
      if(nextNav) {
        nextLabel = nextNav.label;
      } else {
        nextLabel = "next";
      }
      nextSectionLink.textContent = nextLabel + " »";
    } else {
      nextSectionLink.textContent = "";
    }
    if(prevSection) {
      prevNav = book.navigation.get(prevSection.href);
      if(prevNav) {
        prevLabel = prevNav.label;
      } else {
        prevLabel = "previous";
      }
      prevSectionLink.textContent = "« " + prevLabel;
    } else {
      prevSectionLink.textContent = "";
    }
  });

}
// document.body.appendChild(component());
document.addEventListener("DOMContentLoaded", function() {
  loadBook()
})