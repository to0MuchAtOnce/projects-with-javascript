function scrollAppear() {
  let introText = document.querySelector('.intro-text')
  let introPosition = introText.getBoundingClientRect().top
  var screenPosition = window.innerHeight / 1.2

  if (introPosition < screenPosition) {
    introText.classList.add('intro-appear')
  }
}

window.addEventListener('scroll', scrollAppear)
